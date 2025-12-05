import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./AiGeneratorInput.css";

const POSTER_TYPES = [
  { id: "movie", label: "Movie 🎬" },
  { id: "event", label: "Event 🎉" },
  { id: "information", label: "Information ℹ️" },
  { id: "advertisement", label: "Advertisement 📣" },
];

const IMAGE_PROVIDERS = [
  { id: "pixabay", label: "Pixabay" },
  { id: "pexels", label: "Pexels" },
  { id: "unsplash", label: "Unsplash" },
];

export default function AiGeneratorInput({ onGenerate }) {
  const [type, setType] = useState("blog");
  const [topic, setTopic] = useState("");
  const [posterCategory, setPosterCategory] = useState("movie");
  const [provider, setProvider] = useState("pixabay");  // default provider
  const [error, setError] = useState("");

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      setError("Please login or signup to generate content.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    // Pass provider correctly
    onGenerate(topic, type, posterCategory, provider);
  };

  return (
    <section className="ai-generator">
      <header className="ai-generator__header">
        <h1 className="ai-generator__title">InspireGen</h1>
        <p className="ai-generator__tagline">
          Transform your ideas into engaging blogs, stunning posters, and
          beautiful presentations — all powered by AI.
        </p>
      </header>

      <form className="ai-generator__form" onSubmit={handleSubmit}>
        <div className="ai-generator__card">

          {/* TOPIC INPUT */}
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Describe what you want to create..."
            className="ai-generator__textarea"
            required
          />

          {/* POSTER CATEGORY (Only visible for Poster type) */}
          {type === "poster" && (
            <div className="poster-category-box">
              <p className="poster-category-title">Select the poster type:</p>

              <div className="poster-button-group">
                {POSTER_TYPES.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className={`poster-button ${
                      posterCategory === p.id ? "active" : ""
                    }`}
                    onClick={() => setPosterCategory(p.id)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* FOOTER CONTROLS (Type selector + Provider + Submit) */}
          <div className="ai-generator__footer">
            <select
              className="ai-generator__select"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="blog">Blog</option>
              <option value="presentation">Presentation</option>
              <option value="poster">Poster</option>
            </select>

            {/* IMAGE PROVIDER SELECT */}
            <select
              className="ai-generator__select"
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
            >
              {IMAGE_PROVIDERS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>

            <button type="submit" className="ai-generator__button">
              Generate ✨
            </button>
          </div>

          {/* LOGIN WARNING */}
          {error && <p className="login-warning">{error}</p>}
        </div>
      </form>
    </section>
  );
}
