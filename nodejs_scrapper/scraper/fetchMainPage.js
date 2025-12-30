const axios = require("axios");
const fs = require("fs");
const path = require("path");

const URL = "https://beyondchats.com/blogs/";

async function fetchMainPage() {
  const res = await axios.get(URL);
  const dir = path.join(__dirname, "../scrapped");
  fs.mkdirSync(dir, { recursive: true });

  fs.writeFileSync(path.join(dir, "main.html"), res.data);
  console.log(" Main page HTML saved");
}

module.exports = fetchMainPage;
