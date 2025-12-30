const mongoose = require("mongoose");

const SectionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["heading", "paragraph", "image", "list"],
      required: true
    },

    // For headings
    level: String,

    // For paragraph & heading text (HTML preserved)
    text: String,

    // For images
    src: String,

    // For lists
    ordered: Boolean,
    items: [String]
  },
  { _id: false }
);

const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },

    sections: {
      type: [SectionSchema],
      required: true
    },

    sourceUrl: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", ArticleSchema);
