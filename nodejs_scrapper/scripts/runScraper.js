require("dotenv").config();
const connectDB = require("../config/db");

const fetchMainPage = require("../scraper/fetchMainPage");
const fetchLastPages = require("../scraper/fetchLastPages");
const fetchBlogs = require("../scraper/fetchBlogs");
const parseBlogs = require("../scraper/parseBlogs");

async function runScraper() {
  try {
    await connectDB();
    await fetchMainPage();
    await fetchLastPages();
    await fetchBlogs();
    await parseBlogs();
    console.log("✅ Full scraping pipeline completed");
  } catch (err) {
    console.error("❌ Scraping failed:", err);
  } finally {
    process.exit(0);
  }
}

runScraper();
