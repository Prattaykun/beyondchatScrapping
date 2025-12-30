import axios from "axios";

export const geminiRewrite = async (
  original,
  ref1,
  ref2
) => {
  const prompt = `
Original Article:
${original}

Reference Article 1:
${ref1}

Reference Article 2:
${ref2}

Rewrite the original article with improved formatting,
clarity, and SEO. Do not copy text.
`;

  const res = await axios.post(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
    {
      contents: [{ parts: [{ text: prompt }] }]
    },
    {
      params: { key: process.env.GEMINI_API_KEY }
    }
  );

  return res.data.candidates[0].content.parts[0].text;
};
