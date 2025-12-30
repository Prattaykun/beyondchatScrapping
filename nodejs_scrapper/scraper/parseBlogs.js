const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const Article = require("../models/Article");

async function parseBlogs() {
  const dir = path.join(__dirname, "../scrapped/blogs");
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const html = fs.readFileSync(`${dir}/${file}`, "utf-8");
    const $ = cheerio.load(html);

    const title = $("h1").first().text().trim();
    const author = $('[itemprop="author"]').text().trim();
    const date = $('[itemprop="datePublished"] time').text().trim();
    const category = $(".elementor-post-info__terms-list-item").first().text();
    const content = $("#content").text().trim();

    if (!title) continue;

    await Article.create({
      title,
      author,
      date,
      category,
      content
    });

    console.log(` Stored: ${title}`);
  }
}

module.exports = parseBlogs;
