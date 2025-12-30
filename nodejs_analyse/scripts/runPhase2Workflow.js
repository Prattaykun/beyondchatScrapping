import mongoose from "mongoose";
import dotenv from "dotenv";
import { sleep } from "../utils/sleep.js";

import { fetchArticles } from "../services/fetchArticles.js";
import { googleSearch } from "../services/googleSearch.js";
import { scrapeContent } from "../services/scrapeContent.js";
import { geminiRewrite } from "../services/geminiRewrite.js";
import { saveFormattedArticle } from "../services/saveFormattedArticle.js";
import FormattedArticle from "../models/formattedArticle.js";

import {
  sectionsToText,
  textToSections,
} from "../utils/sectionConverter.js";

dotenv.config();

const isValidContent = (text) =>
  typeof text === "string" && text.trim().length > 300;

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log(" MongoDB connected");

  const articles = await fetchArticles();

  for (const article of articles) {
    console.log(`\n➡ Processing: ${article.title}`);

    const exists = await FormattedArticle.findOne({
      originalArticleId: article._id,
    });
    if (exists) {
      console.log(" Already formatted — skipping");
      continue;
    }

    const searchResults = await googleSearch(article.title);
    if (!searchResults || searchResults.length < 2) continue;

    // Scrape progressively
    let refs = [];
    let refMeta = [];

    for (const r of searchResults) {
      if (refs.length === 2) break;

      const scraped = await scrapeContent(r.url);
      if (isValidContent(scraped)) {
        refs.push(scraped);
        refMeta.push({ title: r.title, url: r.url });
      }
    }

    if (refs.length < 2) {
      console.log(" Not enough valid references — skipping");
      continue;
    }

    // Convert sections → text
    const originalText = sectionsToText(article.sections);

// Gemini rewrite
const rewrittenText = await geminiRewrite(
  originalText,
  refs[0],
  refs[1]
);

await sleep(3000); // 3 seconds between Gemini calls

if (!isValidContent(rewrittenText)) {
  console.log(" Weak Gemini output — skipping");
  continue;
}

    // Convert text → sections
    const formattedSections = textToSections(rewrittenText);

    await saveFormattedArticle({
      article,
      formattedSections,
      references: refMeta,
    });

    console.log(" Saved formatted article");
  }

  console.log("\n Phase-2 workflow completed");
  process.exit(0);
})();
