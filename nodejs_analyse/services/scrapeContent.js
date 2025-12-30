import axios from "axios";
import * as cheerio from "cheerio";
import { cleanText } from "../utils/cleanHtml.js";

export const scrapeContent = async (url) => {
  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Accept":
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Referer": "https://www.google.com/",
      },
      timeout: 10000,
    });

    const $ = cheerio.load(data);

    // Remove junk
    $("script, style, nav, footer, header, noscript").remove();

    // Get visible text
    const text = $("body").text();

    return cleanText(text);
  } catch (err) {
    console.error("❌ Scrape failed:", url);
    return "";
  }
};
