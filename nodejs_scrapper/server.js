require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const fetchMainPage = require("./scraper/fetchMainPage");
const fetchLastPages = require("./scraper/fetchLastPages");
const fetchBlogs = require("./scraper/fetchBlogs");
const parseBlogs = require("./scraper/parseBlogs");

const app = express();

async function bootstrap() {
  await connectDB();
  await fetchMainPage();
  await fetchLastPages();
  await fetchBlogs();
  await parseBlogs();
  console.log("Full scraping pipeline completed");
}

bootstrap();

app.listen(process.env.PORT || 5000, () =>
  console.log("Server running")
);
