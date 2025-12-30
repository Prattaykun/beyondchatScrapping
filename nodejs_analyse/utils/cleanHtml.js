export const cleanText = (text) => {
  if (!text) return "";

  return text
    // Normalize Windows line endings
    .replace(/\r\n/g, "\n")

    // Replace 3 or more newlines with exactly TWO newlines
    .replace(/\n{3,}/g, "\n\n")

    // Replace multiple spaces/tabs with single space
    .replace(/[ \t]+/g, " ")

    // Trim space around newlines
    .replace(/\n +/g, "\n")
    .replace(/ +\n/g, "\n")

    // Final trim
    .trim();
};
