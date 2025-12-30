import Article from "../models/Article.js";

export const fetchArticles = async () => {
  return await Article.find();
};
