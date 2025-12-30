import axios from "axios";

export const googleSearch = async (title) => {
  const response = await axios.get("https://serpapi.com/search", {
    params: {
      q: title,
      api_key: process.env.SERP_API_KEY,
      engine: "google",
      num: 10
    }
  });

  const results = response.data.organic_results || [];

  // Filter only blogs/articles (ignore forums, ads, etc.)
  const filtered = results.filter(r =>
    r.link &&
    !r.link.includes("beyondchats.com") &&
    !r.link.includes("youtube.com") &&
    !r.link.includes("reddit.com")
  );

  // Take top 5
  return filtered.slice(0, 5).map(r => ({
    title: r.title,
    url: r.link
  }));
};
