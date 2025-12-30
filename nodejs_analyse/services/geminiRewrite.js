import axios from "axios";
import { sleep } from "../utils/sleep.js";

export const geminiRewrite = async (
  originalText,
  ref1Text,
  ref2Text
) => {
  const prompt = `
You are an expert content editor.

ORIGINAL ARTICLE:
${originalText}

REFERENCE ARTICLE 1:
${ref1Text}

REFERENCE ARTICLE 2:
${ref2Text}

TASK:
- Rewrite the ORIGINAL ARTICLE only
- Improve clarity, structure, and SEO
- Follow the tone and formatting quality of the reference articles
- Do NOT copy sentences or phrases
- Keep the same topic and intent

OUTPUT RULES:
- Use headings prefixed with "## "
- Use bullet lists with "- "
- No HTML
- No references section
- Return ONLY clean markdown text
`;

  try {
    const res = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent",
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        params: { key: process.env.GEMINI_API_KEY },
      }
    );

    return res.data.candidates[0].content.parts[0].text;
  } catch (err) {
    // Handle Gemini rate limit
    if (
      err.response?.status === 429 &&
      err.response.data?.error?.details
    ) {
      const retryInfo = err.response.data.error.details.find(
        (d) => d["@type"]?.includes("RetryInfo")
      );

      const retryDelaySeconds = retryInfo?.retryDelay
        ? parseInt(retryInfo.retryDelay)
        : 45;

      console.log(
        `⏳ Gemini rate-limited. Retrying in ${retryDelaySeconds}s...`
      );

      await sleep(retryDelaySeconds * 1000);

      // ONE retry only
      const retryRes = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
        {
          contents: [{ parts: [{ text: prompt }] }],
        },
        {
          params: { key: process.env.GEMINI_API_KEY },
        }
      );

      return retryRes.data.candidates[0].content.parts[0].text;
    }

    throw err;
  }
};
