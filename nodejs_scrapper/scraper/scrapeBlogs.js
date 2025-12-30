require("dotenv").config();
const axios = require("axios");
const cheerio = require("cheerio");
const connectDB = require("../config/db");
const Article = require("../models/Article");

async function scrapeBlogs() {
  await connectDB();
  console.log("✅ MongoDB Connected");

  const BASE_URL = "https://beyondchats.com";
  const response = await axios.get(`${BASE_URL}/blogs/`);
  const $ = cheerio.load(response.data);

  console.log("Page loaded successfully");

  const links = new Set();

  $("a").each((_, el) => {
    let href = $(el).attr("href");

    if (!href) return;

    // Fix relative vs absolute URLs
    if (href.startsWith("/")) {
      href = BASE_URL + href;
    }

    if (href.startsWith("https://beyondchats.com/blogs/")) {
      links.add(href);
    }
  });

  console.log("Found links:", links.size);

  for (const link of [...links].slice(0, 5)) {
    try {
      const page = await axios.get(link);
      const $$ = cheerio.load(page.data);

      const title = $$("h1").first().text().trim();
      const content = $$("article").text().trim();

      if (!title) continue;

      await Article.create({
        title,
        content,
        sourceUrl: link,
        publishedAt: new Date()
      });

      console.log("✅ Saved:", title);
    } catch (err) {
      console.error("❌ Failed to scrape:", link);
    }
  }

  console.log("🎉 Scraping completed successfully!");
  process.exit();
}

scrapeBlogs();
