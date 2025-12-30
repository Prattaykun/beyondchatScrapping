import express from "express";
import FormattedArticle from "../models/formattedArticle.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  const doc = await FormattedArticle.create(req.body);
  res.json(doc);
});

// READ ALL
router.get("/", async (_, res) => {
  const docs = await FormattedArticle.find().sort({ createdAt: -1 });
  res.json(docs);
});

// BY ORIGINAL ARTICLE
router.get("/by-original/:id", async (req, res) => {
  const doc = await FormattedArticle.findOne({
    originalArticleId: req.params.id
  });
  res.json(doc);
});

export default router;
