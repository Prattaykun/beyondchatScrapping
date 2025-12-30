import FormattedArticle from "../models/formattedArticle.js";

export const saveFormattedArticle = async ({
  article,
  formattedSections,
  references,
}) => {
  return await FormattedArticle.create({
    originalArticleId: article._id,
    title: article.title,
    slug: article.slug,

    originalSections: article.sections,
    formattedSections,

    references,
  });
};
