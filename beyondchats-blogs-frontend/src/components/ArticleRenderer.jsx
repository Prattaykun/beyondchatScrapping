import SectionRenderer from "./SectionRenderer";

export default function ArticleRenderer({ sections }) {
  return (
    <article className="prose max-w-none">
      {sections.map((section, idx) => (
        <SectionRenderer key={idx} section={section} />
      ))}
    </article>
  );
}
