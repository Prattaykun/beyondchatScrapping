require("dotenv").config();
const axios = require("axios");
const cheerio = require("cheerio");
const connectDB = require("../config/db");
const Article = require("../models/Article");

const BASE_URL = "https://beyondchats.com";

async function scrapeBlogs() {
  await connectDB();
  console.log("✅ MongoDB Connected");

  // 1️⃣ Load blogs list
  const listRes = await axios.get(`${BASE_URL}/blogs/`);
  const $ = cheerio.load(listRes.data);

  const blogLinks = new Set();

  $("a[href]").each((_, a) => {
    let href = $(a).attr("href");
    if (!href) return;
    if (href.startsWith("/")) href = BASE_URL + href;
    if (href.startsWith(`${BASE_URL}/blogs/`)) {
      blogLinks.add(href);
    }
  });

  console.log("🔗 Blog URLs found:", blogLinks.size);

  // 2️⃣ Visit blogs
  for (const link of [...blogLinks].slice(0, 5)) {
    try {
      // Dedup
      const exists = await Article.findOne({ sourceUrl: link });
      if (exists) continue;

      const pageRes = await axios.get(link);
      const $$ = cheerio.load(pageRes.data);

      const title = $$("h1").first().text().trim();
      if (!title) continue;

      // 3️⃣ CONTENT DIV — THIS IS KEY
      const contentDiv =
        $$(".entry-content").first().length
          ? $$(".entry-content").first()
          : $$("article").first();

      if (!contentDiv.length) {
        console.warn("⚠️ No content div:", link);
        continue;
      }

      const images = [];
      const contentBlocks = [];

      // Images (figure only, as requested)
      contentDiv.find("figure img").each((_, img) => {
        const src = $$(img).attr("src");
        if (src && !images.includes(src)) images.push(src);
      });

      // 4️⃣ Walk content DIV sequentially
      contentDiv.children().each((_, el) => {
        const tag = el.tagName?.toLowerCase();
        const node = $$(el);

        // Headings h2–h6
        if (["h2", "h3", "h4", "h5", "h6"].includes(tag)) {
          const text = node.text().trim();
          if (text) {
            contentBlocks.push({
              type: "heading",
              level: Number(tag[1]),
              text
            });
          }
        }

        // Paragraph
        if (tag === "p") {
          const text = node.text().trim();
          if (text) {
            contentBlocks.push({
              type: "paragraph",
              text
            });
          }
        }

        // Ordered / Unordered lists
        if (tag === "ol" || tag === "ul") {
          const ordered = tag === "ol";
          const items = [];

          node.find("li").each((_, li) => {
            const liNode = $$(li);
            const strong = liNode.find("strong").first();

            let title = "";
            let description = "";

            if (strong.length) {
              title = strong.text().replace(":", "").trim();
              description = liNode
                .clone()
                .children("strong")
                .remove()
                .end()
                .text()
                .trim();
            } else {
              description = liNode.text().trim();
            }

            if (title || description) {
              items.push({ title, description });
            }
          });

          if (items.length) {
            contentBlocks.push({
              type: "list",
              ordered,
              items
            });
          }
        }
      });
      console.log("Blocks found:", contentBlocks.length);
      console.log("Images found:", images.length);

      await Article.create({
        title,
        sourceUrl: link,
        publishedAt: new Date(),
        images,
        contentBlocks
      });

      console.log("✅ Saved:", title);
    } catch (err) {
      console.error("❌ Failed:", link, err.message);
    }
  }

  console.log(" Scraping completed successfully");
  process.exit();
}

scrapeBlogs();
