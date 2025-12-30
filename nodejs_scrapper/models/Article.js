const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: String,
  sourceUrl: String,
  publishedAt: Date,
  sections: [
    {
      heading: String,
      paragraphs: [String]
    }
  ],
  images: [String]
});

module.exports = mongoose.model("Article", articleSchema);
