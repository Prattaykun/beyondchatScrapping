const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
  sourceUrl: String,
  publishedAt: Date
}, { timestamps: true });

module.exports = mongoose.model("Article", articleSchema);
