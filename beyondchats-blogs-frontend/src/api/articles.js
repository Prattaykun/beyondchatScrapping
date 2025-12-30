import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8001/api"||"https://beyondchat-scrapping-twit.vercel.app/api"||"https://beyondchatscrapping.onrender.com/api",
});

export const fetchArticles = async () => {
  const res = await API.get("/articles");
  return res.data.data || res.data || res;
};

export const fetchFormattedArticle = (originalArticleId) =>
  API.get(`/formatted-articles/by-original/${originalArticleId}`)
    .then(res => res.data);

