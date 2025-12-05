export async function queryAI(messages) {
  const HF_API = import.meta.env.VITE_HF_API_KEY;
  const response = await fetch(
    "https://router.huggingface.co/v1/chat/completions",
    {
      headers: {
        Authorization: `Bearer ${HF_API}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        messages,
        model: "meta-llama/Llama-3.1-8B-Instruct:novita",
      }),
    }
  );
  return response.json();
}
