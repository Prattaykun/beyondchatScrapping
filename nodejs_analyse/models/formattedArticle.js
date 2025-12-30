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

const FormattedArticleSchema = new mongoose.Schema(
  {
    originalArticleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article",
      required: true,
    },

    title: String,
    slug: String,

    originalSections: [SectionSchema],
    formattedSections: [SectionSchema],

    references: [
      {
        title: String,
        url: String,
      },
    ],

    llmProvider: {
      type: String,
      default: "gemini",
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  "FormattedArticle",
  FormattedArticleSchema
);
