export async function fetchPixabayImage(query) {
  const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY
  const endpoint = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&per_page=3`;
  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error("Pixabay API error");
    const data = await response.json();
    return data.hits?.[0]?.webformatURL || "";
  } catch (error) {
    console.error("⚠️ Error fetching image from Pixabay:", error);
    return "";
  }
}
