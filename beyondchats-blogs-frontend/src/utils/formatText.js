export function formatGeminiText(input = "") {
  let text = input;

  // Ensure it's a string
  text = String(text);

  // Convert ### headings
  text = text.replace(
    /^###\s*(.*)$/gm,
    `<span class="block text-lg font-semibold mt-8 mb-3">$1</span>`
  );

  // Convert **bold**
  text = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");

  // Convert *italic*
  text = text.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Remove leftover markdown bullets
  text = text.replace(/^[-*]\s+/gm, "");

  return text;
}
