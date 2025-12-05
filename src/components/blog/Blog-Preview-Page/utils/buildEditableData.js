// utils/buildEditableData.js
export default function buildEditableData(contentJson, headerImage) {
  if (!contentJson) return null;

  const contentArr = (contentJson.Content || []).map((s) => ({
    subHeading: s.subheading || "",
    image: s.imageUrl || "",
    content: s.details || "",
  }));

  const base = {
    header: contentJson.Header?.title || "",
    headerImage: headerImage || contentJson.Header?.headerImage || "",
    introduction: contentJson.Introduction?.introduction || "",
    contentSections: contentArr,
    conclusion: contentJson.Conclusion?.conclusion || "",
  };

  const styles = {
    header: { fontSize: 32, color: "#111827", rotate: 0, fontWeight: 700 },
    headerImage: { rotate: 0, width: 800 },
    introduction: { fontSize: 16, color: "#374151", rotate: 0, fontWeight: 400 },
    conclusion: { fontSize: 16, color: "#374151", rotate: 0, fontWeight: 400 },
  };

  base.contentSections.forEach((_, i) => {
    styles[`subHeading_${i}`] = { fontSize: 20, color: "#111827", rotate: 0, fontWeight: 600 };
    styles[`content_${i}`] = { fontSize: 15, color: "#4b5563", rotate: 0, fontWeight: 400 };
    styles[`image_${i}`] = { rotate: 0, width: 600 };
  });

  return { ...base, styles };
}
