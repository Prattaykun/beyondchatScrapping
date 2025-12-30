export default function mergeImagesIntoFormatted(
  formattedSections,
  originalSections
) {
  const images = originalSections.filter(s => s.type === "image");

  if (!images.length) return formattedSections;

  const result = [];
  let imageIndex = 0;
  const interval = Math.floor(formattedSections.length / images.length) || 3;

  formattedSections.forEach((section, idx) => {
    result.push(section);

    if (
      imageIndex < images.length &&
      idx !== 0 &&
      idx % interval === 0
    ) {
      result.push(images[imageIndex]);
      imageIndex++;
    }
  });

  return result;
}
