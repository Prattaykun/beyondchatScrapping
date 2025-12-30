import FormattedArticle from "../models/formattedArticle.js";

export const saveFormattedArticle = async ({
  article,
  updatedContent,
  references
}) => {
  return await FormattedArticle.create({
    originalArticleId: article._id,
    title: article.title,
    originalContent: article.content,
    updatedContent,
    references
  });
};
