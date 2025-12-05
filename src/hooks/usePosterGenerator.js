import { useState } from "react";
import { queryAI } from "/src/api/huggingface.js";
import { extractJsonFromTags, safeParseJson } from "/src/utils/jsonUtils.js";
import { fetchImageByProvider } from "/src/api/imageService.js";

// --- Word Limit Configuration ---
const WORD_LIMITS = {
    MOVIE: { title: 5, tagline: 8, message: 12, cta: 7, desc: "dramatic, suspenseful, or blockbuster" },
    EVENTS: { title: 4, tagline: 6, message: 10, cta: 5, desc: "energetic, clear, and inviting" },
    INFORMATION: { title: 6, tagline: 8, message: 15, cta: 8, desc: "informative, formal, and trustworthy" },
    ADVERTISEMENT: { title: 5, tagline: 7, message: 10, cta: 6, desc: "enthusiastic, persuasive, and benefit-driven" },
    DEFAULT: { title: 6, tagline: 10, message: 15, cta: 10, desc: "creative, engaging, and general" }
};

const generatePosterPrompt = (topic, category = "") => {
    const key = category.toUpperCase() || "DEFAULT";
    const limits = WORD_LIMITS[key] || WORD_LIMITS.DEFAULT;

    return `
You are an AI poster designer specializing in the **${key}** category.

Generate a creative and catchy poster content for "${topic}" in JSON format, with strict word limits:
* title: Max ${limits.title} words
* tagline: Max ${limits.tagline} words
* message: Max ${limits.message} words
* CallToAction.text: Max ${limits.cta} words

Tone: **${limits.desc}**.

Wrap the response exactly inside:
<json> ... </json>

<json>
{
  "Header": { 
    "title": "A short title",
    "tagline": "A catchy tagline"
  },
  "MainText": {
    "message": "Main message"
  },
  "CallToAction": {
    "text": "Action line"
  },
  "DesignHints": ["Use bold typography", "High contrast colors"]
}
</json>
`;
};

export const usePosterGenerator = () => {
    const [posterJson, setPosterJson] = useState(null);
    const [posterImage, setPosterImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Generates poster content + image
     * @param {string} topic 
     * @param {string} category 
     * @param {string} provider - unsplash | pixabay | pexels
     */
    const generatePoster = async (topic, category = "", provider = "unsplash") => {
        setLoading(true);
        setError(null);
        setPosterJson(null);
        setPosterImage("");

        // DEBUG LOGS
        console.log("%c[Poster Generator] Provider:", "color:#4CAF50;font-weight:bold;", provider);
        console.log("%c[Poster Generator] Topic:", "color:#2196F3;font-weight:bold;", topic);
        console.log("%c[Poster Generator] Category:", "color:#FF9800;font-weight:bold;", category);

        try {
            // ---------------------------
            // 1️⃣ Generate text using AI
            // ---------------------------
            const aiResp = await queryAI([
                { role: "user", content: generatePosterPrompt(topic, category) }
            ]);

            const aiText = aiResp?.choices?.[0]?.message?.content?.trim();
            if (!aiText) throw new Error("AI returned no text");

            const jsonBlock = extractJsonFromTags(aiText);
            const parsed = safeParseJson(jsonBlock);

            const safeJson = parsed || {
                Header: { title: `Poster: ${topic}`, tagline: `Category: ${category}` },
                MainText: { message: "Failed to generate message." },
                CallToAction: { text: "Learn More" },
                DesignHints: ["High contrast colors", "Clean modern layout"]
            };

            // ---------------------------
            // 2️⃣ Fetch image (provider-based)
            // ---------------------------
            console.log(
                "%c[Poster Generator] Fetching image from:",
                "color:purple;font-weight:bold;",
                provider
            );

            const keyword =
                safeJson?.Header?.title ||
                safeJson?.MainText?.message?.split(" ")?.[0] ||
                topic;

            const imageUrl = await fetchImageByProvider(provider, keyword);

            if (!imageUrl) {
                console.warn("⚠ No image found — fallback applied.");
            }

            setPosterImage(imageUrl || "");
            setPosterJson(safeJson);

        } catch (err) {
            console.error("Poster generation error:", err);
            setError(err.message || "Failed to generate poster.");
        } finally {
            setLoading(false);
        }
    };

    return {
        posterJson,
        posterImage,
        loading,
        error,
        generatePoster
    };
};
