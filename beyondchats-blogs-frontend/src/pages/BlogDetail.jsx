import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchFormattedArticle } from "../api/articles";
import Tabs from "../components/Tabs";
import ArticleRenderer from "../components/ArticleRenderer";
import mergeImagesIntoFormatted from "../utils/mergeImagesIntoFormatted";

export default function BlogDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("formatted");

  useEffect(() => {
    fetchFormattedArticle(id).then(setData);
  }, [id]);

  if (!data) return <div className="p-6">Loading...</div>;

  const formattedWithImages = mergeImagesIntoFormatted(
    data.formattedSections,
    data.originalSections
  );

  return (
<div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
  <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-6">
    {data.title}
  </h1>

  <Tabs active={activeTab} setActive={setActiveTab} />

  <div className="mt-8">
    {activeTab === "formatted" ? (
      <ArticleRenderer sections={formattedWithImages} />
    ) : (
      <ArticleRenderer sections={data.originalSections} />
    )}
  </div>
</div>

  );
}
