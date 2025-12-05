import { useNavigate } from "react-router-dom";

export default function PosterTestPage() {
  const navigate = useNavigate();

  const handlePreview = () => {
    const posterData = {
      title: "AI-Powered Innovation",
      description:
        "This poster showcases how artificial intelligence is reshaping the digital landscape with creativity and automation.",
      image: "https://via.placeholder.com/800x400.png?text=AI+Poster+Preview",
    };

    navigate("/preview/poster", { state: { posterData } });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Test Poster Generation</h2>
      <button
        onClick={handlePreview}
        style={{
          backgroundColor: "#2563eb",
          color: "#fff",
          padding: "12px 24px",
          borderRadius: "8px",
          fontSize: "16px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Generate & Preview Poster
      </button>
    </div>
  );
}
