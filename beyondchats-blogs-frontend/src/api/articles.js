import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8001/api",
});

export const fetchArticles = async () => {
  const res = await API.get("/articles");
  return res.data.data || res.data || res;
};

export const fetchFormattedArticle = (originalArticleId) =>
  API.get(`/formatted-articles/by-original/${originalArticleId}`)
    .then(res => res.data);

