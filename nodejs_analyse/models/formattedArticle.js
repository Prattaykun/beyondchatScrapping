import mongoose from "mongoose";

const FormattedArticleSchema = new mongoose.Schema(
  {
    originalArticleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article",
      required: true
    },
    title: String,
    originalContent: String,
    updatedContent: String,
    references: [
      {
        title: String,
        url: String
      }
    ],
    llmProvider: {
      type: String,
      default: "gemini"
    }
  },
  { timestamps: true }
);

export default mongoose.model(
  "FormattedArticle",
  FormattedArticleSchema
);
