import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePosterGenerator } from "../hooks/usePosterGenerator";

export default function PosterGeneratorPage() {
  const [topic, setTopic] = useState("");
  const { posterJson, posterImage, loading, error, generatePoster } = usePosterGenerator();
  const navigate = useNavigate();

  const handleGenerateAndPreview = async () => {
    if (!topic.trim()) return alert("Please enter a topic first.");
    sessionStorage.removeItem("posterData"); // Clear old data
    await generatePoster(topic);
  };

  const handlePreview = () => {
    if (!posterJson || !posterImage) return alert("Generate a poster first.");

    const posterData = {
      title: posterJson.Header?.title || "Untitled Poster",
      tagline: posterJson.Header?.tagline || "",
      message: posterJson.MainText?.message || "",
      callToAction: posterJson.CallToAction?.text || "",
      designHints: posterJson.DesignHints || [],
      image: posterImage,
    };

    sessionStorage.setItem("posterData", JSON.stringify(posterData));
    navigate("/preview/poster", { state: { posterData } });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>AI Poster Generator</h2>

      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter your topic (e.g. Climate Change)"
        style={{
          padding: "10px",
          width: "300px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginTop: "20px",
        }}
      />
      <br />

      <button
        onClick={handleGenerateAndPreview}
        disabled={loading}
        style={{
          backgroundColor: "#2563eb",
          color: "#fff",
          border: "none",
          padding: "10px 24px",
          borderRadius: "8px",
          cursor: loading ? "not-allowed" : "pointer",
          marginTop: "20px",
        }}
      >
        {loading ? "Generating..." : "Generate Poster"}
      </button>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

      {posterJson && !loading && (
        <div style={{ marginTop: "30px" }}>
          <h3>Preview Summary:</h3>
          <p><strong>Title:</strong> {posterJson.Header?.title}</p>
          <p><strong>Tagline:</strong> {posterJson.Header?.tagline}</p>
          <p><strong>Message:</strong> {posterJson.MainText?.message}</p>

          <button
            onClick={handlePreview}
            style={{
              backgroundColor: "#22c55e",
              color: "#fff",
              border: "none",
              padding: "10px 24px",
              borderRadius: "8px",
              marginTop: "20px",
              cursor: "pointer",
            }}
          >
            Preview Full Poster
          </button>
        </div>
      )}
    </div>
  );
}