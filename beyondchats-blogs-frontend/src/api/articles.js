import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8001/api",
});

export const fetchArticles = async () => {
  const res = await API.get("/articles");
  return res.data.data || res.data || res;
};

export const fetchFormattedArticle = (originalArticleId) =>
  API.get(`/formatted-articles/by-original/${originalArticleId}`)
    .then(res => res.data);

