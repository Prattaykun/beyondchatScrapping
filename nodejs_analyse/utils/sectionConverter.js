// Convert sections → plain text (for Gemini)
export const sectionsToText = (sections) => {
  let output = "";

  for (const section of sections) {
    if (section.type === "heading") {
      output += `\n\n${section.text}\n`;
    }

    if (section.type === "paragraph") {
      output += `\n${section.text}\n`;
    }

    if (section.type === "list" && section.items?.length) {
      for (const item of section.items) {
        output += `- ${item}\n`;
      }
      output += "\n";
    }
  }

  return output.trim();
};

// Convert Gemini text → sections (simple + safe)
export const textToSections = (text) => {
  const lines = text.split("\n").filter(Boolean);
  const sections = [];

  for (const line of lines) {
    if (line.startsWith("## ")) {
      sections.push({
        type: "heading",
        level: "h2",
        text: line.replace("## ", ""),
      });
    } else if (line.startsWith("- ")) {
      const last = sections[sections.length - 1];
      if (last?.type === "list") {
        last.items.push(line.replace("- ", ""));
      } else {
        sections.push({
          type: "list",
          ordered: false,
          items: [line.replace("- ", "")],
        });
      }
    } else {
      sections.push({
        type: "paragraph",
        text: line,
      });
    }
  }

  return sections;
};
