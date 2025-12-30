const Article = require("../models/Article");

exports.getAllArticles = async (req, res) => {
  const articles = await Article.find().sort({ createdAt: -1 });
  res.json(articles);
};

exports.getArticle = async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.json(article);
};

exports.createArticle = async (req, res) => {
  const article = await Article.create(req.body);
  res.status(201).json(article);
};

exports.updateArticle = async (req, res) => {
  const updated = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteArticle = async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
};
