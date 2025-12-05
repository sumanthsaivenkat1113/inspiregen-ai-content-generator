const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY; 

export async function fetchPexelsImage(query) {
  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`,
      { headers: { Authorization: PEXELS_API_KEY } }
    );
    const data = await res.json();
    return data.photos?.[0]?.src?.large || null;
  } catch (err) {
    console.error("Error fetching from Pexels:", err);
    return null;
  }
}
