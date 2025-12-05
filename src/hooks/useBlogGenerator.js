import { useState } from "react";
import { queryAI } from "../api/huggingface";
import { extractJsonFromTags, safeParseJson } from "../utils/jsonUtils";
import { fetchImageByProvider } from "../api/imageService";

// -----------------------------------------
// BLOG PROMPT
// -----------------------------------------
const generatePrompt = (topic) => `
You are an AI blog generator.
Generate a detailed blog about "${topic}" in JSON format.
Wrap your response strictly inside <json>...</json> tags.
<json>
{
  "Header": { "title": "A blog post about ${topic}" },
  "Introduction": { "introduction": "Write a short, engaging introduction." },
  "Content": [
    { "subheading": "Main point 1", "details": "Details for point 1" },
    { "subheading": "Main point 2", "details": "Details for point 2" },
    { "subheading": "Main point 3", "details": "Details for point 3" }
  ],
  "Conclusion": { "conclusion": "Wrap up the topic with final thoughts." }
}
</json>
`;


// -----------------------------------------
// BLOG GENERATOR HOOK
// -----------------------------------------
export const useBlogGenerator = () => {
  const [contentJson, setContentJson] = useState(null);
  const [headerImage, setHeaderImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Generate Blog (topic + provider)
   * @param {string} topic 
   * @param {string} provider (pixabay | pexels | unsplash)
   */
  const generateBlog = async (topic, provider = "unsplash") => {
    setLoading(true);
    setError(null);
    setContentJson(null);

    console.log("%c[BLOG] Provider Selected:", "color: green; font-weight: bold;", provider);

    try {
      // -----------------------------------------
      // AI RESPONSE
      // -----------------------------------------
      const aiResp = await queryAI([{ 
        role: "user", 
        content: generatePrompt(topic) 
      }]);

      const aiText = aiResp?.choices?.[0]?.message?.content?.trim();
      if (!aiText) throw new Error("Empty AI response");

      const jsonBlock = extractJsonFromTags(aiText);
      const parsed = safeParseJson(jsonBlock);

      if (!parsed) throw new Error("Invalid JSON from AI");


      // -----------------------------------------
      // FETCH MAIN HEADER IMAGE
      // -----------------------------------------
      const mainImage = await fetchImageByProvider(provider, topic);
      setHeaderImage(mainImage || "");


      // -----------------------------------------
      // FETCH IMAGES FOR EACH CONTENT SECTION
      // -----------------------------------------
      const contentImages = await Promise.all(
        (parsed.Content || []).map(async (section) => {
          const keyword =
            section.subheading?.split(":").pop()?.trim() || section.subheading;

          return await fetchImageByProvider(provider, keyword);
        })
      );

      // Attach images to content
      const contentWithImages = parsed.Content.map((section, i) => ({
        ...section,
        imageUrl:
          contentImages[i] ||
          "https://via.placeholder.com/800x400?text=No+Image",
      }));

      parsed.Content = contentWithImages;

      // Save final JSON
      setContentJson(parsed);

    } catch (err) {
      console.error("Blog generation error:", err);

      setError(
        err.message.includes("402")
          ? "Hugging Face API key limit exceeded or invalid."
          : err.message.includes("json")
          ? "AI returned invalid JSON. Please try again."
          : "Failed to generate blog. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return { contentJson, headerImage, loading, error, generateBlog };
};
