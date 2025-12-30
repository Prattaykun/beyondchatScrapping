const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const axios = require("axios");

async function fetchBlogs() {
  const lastPagesDir = path.join(__dirname, "../scrapped/lastpages");
  const blogDir = path.join(__dirname, "../scrapped/blogs");
  fs.mkdirSync(blogDir, { recursive: true });

  const files = fs.readdirSync(lastPagesDir);
  const blogLinks = new Set();

  for (const file of files) {
    const html = fs.readFileSync(`${lastPagesDir}/${file}`, "utf-8");
    const $ = cheerio.load(html);

    $("h2.entry-title a").each((_, el) => {
      blogLinks.add($(el).attr("href"));
    });
  }

  let count = 1;
  for (const link of blogLinks) {
    const res = await axios.get(link);
    fs.writeFileSync(`${blogDir}/blog-${count}.html`, res.data);
    console.log(` Saved blog ${count}`);
    count++;
  }

  return [...blogLinks];
}

module.exports = fetchBlogs;
