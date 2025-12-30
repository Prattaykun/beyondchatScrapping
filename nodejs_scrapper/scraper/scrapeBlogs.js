require("dotenv").config();
const axios = require("axios");
const cheerio = require("cheerio");
const connectDB = require("../config/db");
const Article = require("../models/Article");

async function scrapeBlogs() {
  await connectDB();
  console.log(" MongoDB Connected");

  const BASE_URL = "https://beyondchats.com";
  const response = await axios.get(`${BASE_URL}/blogs/`);
  const $ = cheerio.load(response.data);

  const links = new Set();

  $("a").each((_, el) => {
    let href = $(el).attr("href");
    if (!href) return;

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
      if (!title) continue;

      const sections = [];
      const images = [];

      // Collect images from figure tags
      $$("figure img").each((_, img) => {
        const src = $$(img).attr("src");
        if (src) images.push(src);
      });

      // Parse h3 + consecutive p tags
      $$("#content h3").each((_, h3) => {
        const heading = $$(h3).text().trim();
        const paragraphs = [];

        let next = $$(h3).next();
        while (next.length && next[0].tagName === "p") {
          const text = next.text().trim();
          if (text) paragraphs.push(text);
          next = next.next();
        }

        if (heading && paragraphs.length) {
          sections.push({
            heading,
            paragraphs
          });
        }
      });

      await Article.create({
        title,
        sourceUrl: link,
        publishedAt: new Date(),
        sections,
        images
      });

      console.log("Saved blog:", title);
    } catch (err) {
      console.error(" Failed to scrape:", link);
    }
  }

  console.log(" scraping completed successfully!");
  process.exit();
}

scrapeBlogs();
