
// src/hooks/usePresentationGenerator.js
import { useState } from "react";
import { queryAI } from "../api/huggingface";
import { extractJsonFromTags, safeParseJson } from "../utils/jsonUtils";
import { fetchImageByProvider } from "../api/imageService";

// ---------------------------
// AI Prompt
// ---------------------------
const generatePresentationPrompt = (topic) => `
You are a professional presentation designer and content strategist.

Create a **complete, 8-12 slide corporate-style presentation** about "${topic}" in **strict JSON format** inside <json>...</json> tags.

<json>
{
  "TitleSlide": { "title": "${topic}", "subtitle": "An In-Depth Analysis" },
  "Agenda": ["Introduction", "Market Trends", "Key Insights", "Solutions", "Conclusion"],
  "Slides": [
    {
      "heading": "Introduction",
      "bullets": ["What is ${topic}?", "Why it matters in 2025", "Global impact stats"],
      "highlight": "1.2B people affected worldwide",
      "imageHint": "global map"
    },
    {
      "heading": "Current Challenges",
      "bullets": ["Challenge #1 with example", "Challenge #2 with data", "Rising costs: +35% YoY"],
      "highlight": null,
      "imageHint": "bar chart"
    }
  ],
  "Conclusion": ["${topic} is the future", "Act now to stay ahead", "Innovation drives success"],
  "CallToAction": "Start your ${topic} journey today – contact us!"
}
</json>`;
  

// ---------------------------
// Hook
// ---------------------------
export const usePresentationGenerator = () => {
  const [presentationJson, setPresentationJson] = useState(null);
  const [slideImages, setSlideImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generatePresentation = async (topic) => {
    setLoading(true);
    setError(null);
    setPresentationJson(null);
    setSlideImages([]);

    try {
      // STEP 1 — Read provider from sessionStorage
      const provider = sessionStorage.getItem("imageProvider") || "unsplash";
      console.log("📸 Presentation Image Provider:", provider);

      // STEP 2 — AI call
      const aiResp = await queryAI([
        { role: "user", content: generatePresentationPrompt(topic) }
      ]);

      const aiText = aiResp?.choices?.[0]?.message?.content?.trim();
      if (!aiText) throw new Error("Empty AI response");

      // STEP 3 — Extract JSON
      const jsonBlock = extractJsonFromTags(aiText);
      const parsed = safeParseJson(jsonBlock);

      if (!parsed || !parsed.Slides) {
        throw new Error("Invalid presentation structure");
      }

      // STEP 4 — Fetch slide images
      const imagePromises = parsed.Slides.map((slide) => {
        const hint = slide.imageHint || slide.heading;
        return fetchImageByProvider(provider, hint);
      });

      const images = await Promise.all(imagePromises);

      setSlideImages(images);
      setPresentationJson(parsed);
    } catch (err) {
      console.error("Presentation generation error:", err);
      setError("Failed to generate rich presentation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    presentationJson,
    slideImages,
    loading,
    error,
    generatePresentation
  };
};
