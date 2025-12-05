import { fetchPixabayImage } from "./pixabay";
import { fetchPexelsImage } from "./pexels";
import { fetchImage as fetchUnsplashImage } from "./unsplash"; // your existing Unsplash function

export async function fetchImageByProvider(provider, keyword) {
  console.log("🔍 Provider Used:", provider);
  console.log("🔎 Search Query:", keyword);

  if (provider === "pixabay") return fetchPixabayImage(keyword);
  if (provider === "pexels") return fetchPexelsImage(keyword);
  if (provider === "unsplash") return fetchUnsplashImage(keyword);

  console.warn("⚠️ Unknown provider. Falling back to Unsplash.");
  return fetchUnsplashImage(keyword); // Fallback
}
