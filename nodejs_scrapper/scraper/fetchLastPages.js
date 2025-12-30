const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const axios = require("axios");

async function fetchLastPages() {
  const mainHtml = fs.readFileSync(
    path.join(__dirname, "../scrapped/main.html"),
    "utf-8"
  );

  const $ = cheerio.load(mainHtml);

  let lastPageNumber = 1;

  // Find the highest page number from pagination
  $(".page-numbers").each((_, el) => {
    const text = $(el).text().trim();
    const num = parseInt(text, 10);
    if (!isNaN(num) && num > lastPageNumber) {
      lastPageNumber = num;
    }
  });

  console.log(" Last page detected:", lastPageNumber);

  // Generate last 3 pages: last, last-1, last-2
  const pagesToFetch = [
    lastPageNumber,
    lastPageNumber - 1,
    lastPageNumber - 2
  ].filter(p => p > 0);

  const dir = path.join(__dirname, "../scrapped/lastpages");
  fs.mkdirSync(dir, { recursive: true });

  for (const pageNo of pagesToFetch) {
    const url = `https://beyondchats.com/blogs/page/${pageNo}/`;
    const res = await axios.get(url);
    fs.writeFileSync(`${dir}/page-${pageNo}.html`, res.data);
    console.log(` Saved page ${pageNo}`);
  }

  return pagesToFetch;
}

module.exports = fetchLastPages;
