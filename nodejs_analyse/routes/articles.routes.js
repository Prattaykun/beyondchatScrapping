import express from "express";
import Article from "../models/Article.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  const article = await Article.create(req.body);
  res.json(article);
});

// READ ALL
router.get("/", async (_, res) => {
  const articles = await Article.find().sort({ createdAt: -1 });
  res.json(articles);
});

// READ ONE
router.get("/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.json(article);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const updated = await Article.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;
