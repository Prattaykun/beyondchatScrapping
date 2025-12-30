import ImageBlock from "./ImageBlock";
import { formatGeminiText } from "../utils/formatText";

export default function SectionRenderer({ section }) {
  /* ---------- HEADINGS ---------- */
  if (section.type === "heading") {
    const Tag = section.level;
    return (
      <Tag className="mt-12 mb-4 font-bold">
        {section.text}
      </Tag>
    );
  }

  /* ---------- PARAGRAPHS ---------- */
  if (section.type === "paragraph") {
    return (
      <p
        className="text-justify leading-relaxed mb-4"
        dangerouslySetInnerHTML={{
          __html: formatGeminiText(section.text)
        }}
      />
    );
  }

  /* ---------- LISTS (FIXED) ---------- */
  if (section.type === "list") {
    const ListTag = section.ordered ? "ol" : "ul";

    return (
      <ListTag
        className={`pl-6 mb-6 space-y-2 ${
          section.ordered ? "list-decimal" : "list-disc"
        }`}
      >
        {section.items.map((item, idx) => (
          <li
            key={idx}
            className="text-justify leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: formatGeminiText(item)
            }}
          />
        ))}
      </ListTag>
    );
  }

  /* ---------- IMAGES ---------- */
  if (section.type === "image") {
    return <ImageBlock src={section.src} />;
  }

  return null;
}
