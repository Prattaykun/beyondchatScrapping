const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const Article = require("../models/Article");

async function parseBlogs() {
  const blogDir = path.join(__dirname, "../scrapped/blogs");
  const files = fs.readdirSync(blogDir);

  for (const file of files) {
    const html = fs.readFileSync(path.join(blogDir, file), "utf-8");
    const $ = cheerio.load(html);

    const title = $("h1").first().text().trim();
    if (!title) continue;

    const slug = file.replace(".html", "");

    const contentRoot = $("#content");
    if (!contentRoot.length) {
      console.warn("⚠️ #content not found for:", title);
      continue;
    }

    const sections = [];

    contentRoot
      .find("h2, h3, h4, h5, h6, p, figure, ul, ol")
      .each((_, el) => {
        const tag = el.tagName.toLowerCase();

        if (tag.startsWith("h")) {
          const text = $(el).text().trim();
          if (text) {
            sections.push({
              type: "heading",
              level: tag,
              text
            });
          }
        }

        else if (tag === "p") {
          const htmlText = $(el).html()?.trim();
          if (htmlText) {
            sections.push({
              type: "paragraph",
              text: htmlText
            });
          }
        }

        else if (tag === "figure") {
          const img = $(el).find("img").attr("src");
          if (img) {
            sections.push({
              type: "image",
              src: img
            });
          }
        }

        else if (tag === "ul" || tag === "ol") {
          const items = [];
          $(el).find("li").each((_, li) => {
            const t = $(li).text().trim();
            if (t) items.push(t);
          });

          if (items.length) {
            sections.push({
              type: "list",
              ordered: tag === "ol",
              items
            });
          }
        }
      });

    if (!sections.length) {
      console.warn("⚠️ Sections empty for:", title);
      continue;
    }

    // ✅ UPSERT (NO DUPLICATES)
    await Article.findOneAndUpdate(
      { slug },
      {
        title,
        slug,
        sections,
        sourceUrl: ""
      },
      { upsert: true, new: true }
    );

    console.log(`📦 Stored/Updated article: ${title}`);
  }
}

module.exports = parseBlogs;
