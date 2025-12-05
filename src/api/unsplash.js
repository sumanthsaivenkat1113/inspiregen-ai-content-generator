export async function fetchImage(query) {
  const UNSPLASH_API = import.meta.env.VITE_UNSPLASH_API_KEY
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&client_id=${UNSPLASH_API}`
  );
  const data = await response.json();
  return data.results?.[0]?.urls?.regular || '';
}
