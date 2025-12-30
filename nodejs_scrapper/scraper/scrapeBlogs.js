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

    if (href.startsWith(`${BASE_URL}/blogs/`)) {
      links.add(href);
    }
  });

  console.log("🔗 Found links:", links.size);

  for (const link of [...links].slice(0, 5)) {
    try {
      const page = await axios.get(link);
      const $$ = cheerio.load(page.data);

      const title = $$("h1").first().text().trim();
      if (!title) continue;

      const sections = [];
      const images = [];

      // ✅ Collect images
      $$("figure img").each((_, img) => {
        const src = $$(img).attr("src");
        if (src) images.push(src);
      });

      // ✅ Parse sections under each h3
      $$("#content h3").each((_, h3) => {
        const heading = $$(h3).text().trim();
        const blocks = [];

        let next = $$(h3).next();

        while (next.length) {
          const tag = next[0].tagName;

          // Stop at next section
          if (tag === "h3") break;

          // Paragraph block
          if (tag === "p") {
            const text = next.text().trim();
            if (text) {
              blocks.push({
                type: "paragraph",
                text
              });
            }
          }

          // Ordered / Unordered list block
          if (tag === "ol" || tag === "ul") {
            const ordered = tag === "ol";
            const items = [];

            next.find("li").each((_, li) => {
              const strong = $$(li).find("strong").first();
              let title = "";
              let description = "";

              if (strong.length) {
                title = strong.text().replace(":", "").trim();
                strong.remove();
                description = $$(li).text().trim();
              } else {
                description = $$(li).text().trim();
              }

              items.push({ title, description });
            });

            if (items.length) {
              blocks.push({
                type: "list",
                ordered,
                items
              });
            }
          }

          next = next.next();
        }

        if (heading && blocks.length) {
          sections.push({
            heading,
            blocks
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

      console.log(" Saved structured blog:", title);
    } catch (err) {
      console.error(" Failed to scrape:", link);
    }
  }

  console.log(" Structured scraping completed successfully!");
  process.exit();
}

scrapeBlogs();
