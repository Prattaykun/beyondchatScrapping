import mongoose from "mongoose";
import dotenv from "dotenv";

import { fetchArticles } from "../services/fetchArticles.js";
import { googleSearch } from "../services/googleSearch.js";
import { scrapeContent } from "../services/scrapeContent.js";
import { geminiRewrite } from "../services/geminiRewrite.js";
import { saveFormattedArticle } from "../services/saveFormattedArticle.js";
import FormattedArticle from "../models/formattedArticle.js";

dotenv.config();

/**
 * Helper: check if text is usable
 */
const isValidContent = (text) => {
  return (
    typeof text === "string" &&
    text.trim().length > 300 // minimal useful length
  );
};

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected");

    const articles = await fetchArticles();

    for (const article of articles) {
      console.log(`\n➡ Processing: ${article.title}`);

      /* -------------------------------
         1. Skip if already processed
      -------------------------------- */
      const alreadyExists = await FormattedArticle.findOne({
        originalArticleId: article._id,
      });

      if (alreadyExists) {
        console.log("⚠️ Already formatted — skipping");
        continue;
      }

      /* -------------------------------
         2. Google Search
      -------------------------------- */
      let searchResults = [];
      try {
        searchResults = await googleSearch(article.title);
      } catch (err) {
        console.log("❌ Google search failed — skipping");
        continue;
      }

      if (!searchResults || searchResults.length < 2) {
        console.log("⚠️ Not enough search results — skipping");
        continue;
      }

      /* -------------------------------
         3. Scrape Reference Articles
      -------------------------------- */
      let ref1Content = "";
      let ref2Content = "";

      try {
        ref1Content = await scrapeContent(searchResults[0].url);
      } catch (_) {}

      try {
        ref2Content = await scrapeContent(searchResults[1].url);
      } catch (_) {}

      if (
        !isValidContent(ref1Content) ||
        !isValidContent(ref2Content)
      ) {
        console.log(
          "⚠️ Reference content blocked / insufficient — skipping"
        );
        continue;
      }

      /* -------------------------------
         4. Gemini Rewrite
      -------------------------------- */
      let updatedContent = "";
      try {
        updatedContent = await geminiRewrite(
          article.content,
          ref1Content,
          ref2Content
        );
      } catch (err) {
        console.log("❌ Gemini failed — skipping");
        continue;
      }

      if (!updatedContent || updatedContent.length < 300) {
        console.log("⚠️ Gemini returned weak output — skipping");
        continue;
      }

      /* -------------------------------
         5. Append References
      -------------------------------- */
      updatedContent += `

## References
1. ${searchResults[0].title} – ${searchResults[0].url}
2. ${searchResults[1].title} – ${searchResults[1].url}
`;

      /* -------------------------------
         6. Save to DB
      -------------------------------- */
      await saveFormattedArticle({
        article,
        updatedContent,
        references: searchResults,
      });

      console.log("✅ Saved formatted article");
    }

    console.log("\n🎉 Phase-2 workflow completed");
    process.exit(0);
  } catch (err) {
    console.error("🔥 Fatal error in Phase-2 workflow:", err);
    process.exit(1);
  }
})();
