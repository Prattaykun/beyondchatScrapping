import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
  {
    title: String,
    content: String
  },
  { timestamps: true }
);

export default mongoose.model("Article", ArticleSchema);
