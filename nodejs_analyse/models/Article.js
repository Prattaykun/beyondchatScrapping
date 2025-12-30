import mongoose from "mongoose";

const SectionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["heading", "paragraph", "image", "list"],
      required: true,
    },
    level: String,
    text: String,
    src: String,
    ordered: Boolean,
    items: [String],
  },
  { _id: false }
);

const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    sections: { type: [SectionSchema], required: true },
    sourceUrl: String,
  },
  { timestamps: true }
);

export default mongoose.model("Article", ArticleSchema);
