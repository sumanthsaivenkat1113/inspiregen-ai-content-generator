import React, { useState } from "react";
import "./SamplePrompts.css";
import {
  Film,
  Megaphone,
  Info,
  CalendarDays,
  LayoutGrid,
  List
} from "lucide-react";

export default function SamplePrompts() {
  const [viewMode, setViewMode] = useState("grid"); // grid | list

  const posterCategories = {
    Advertisement: {
      gradient: "linear-gradient(135deg, #f97316, #fb923c)",
      icon: <Megaphone className="icon-animate" size={18} />,
      prompts: [
        "Create a poster promoting a new premium coffee brand.",
        "Design a bold and energetic poster for a new sports drink launch."
      ]
    },
    Movie: {
      gradient: "linear-gradient(135deg, #ef4444, #f87171)",
      icon: <Film className="icon-animate" size={18} />,
      prompts: [
        "Generate a horror movie poster featuring an abandoned mansion in the woods.",
        "Create a sci-fi movie poster showing a futuristic city skyline."
      ]
    },
    Event: {
      gradient: "linear-gradient(135deg, #3b82f6, #60a5fa)",
      icon: <CalendarDays className="icon-animate" size={18} />,
      prompts: [
        "Design a music festival poster with vibrant colors and abstract shapes.",
        "Create a poster for a tech conference focusing on innovation and AI."
      ]
    },
    Information: {
      gradient: "linear-gradient(135deg, #10b981, #34d399)",
      icon: <Info className="icon-animate" size={18} />,
      prompts: [
        "Create an information poster explaining the benefits of reading books.",
        "Design an infographic-style poster about the importance of mental wellness."
      ]
    }
  };

  const presentations = [
    "Navigating the Global Supply Chain Disruptions and Mitigating Risk.",
    "The Role of Personalized Digital Therapeutics in Chronic Disease Management.",
    "Optimizing the Omnichannel Experience to Drive Customer Loyalty.",
    "Enhancing Employee Engagement and Retention through Holistic Benefits."
  ];

  const blogs = [
    "Write a compelling, visual blog about the daily benefits of yoga with Title, Intro, 3 Main Points, Conclusion.",
    "Write a descriptive blog about 3 hidden beaches in Bali with visual language and structure.",
    "Explain 3 core emotions or concepts shown in modern abstract photography.",
    "Write an article on 3 music genres proven to reduce stress with serene imagery."
  ];

  const handleCopy = async (text) => {
    await navigator.clipboard.writeText(text);
    showCopyToast();
  };

  const showCopyToast = () => {
    const toast = document.createElement("div");
    toast.className = "copy-toast";
    toast.textContent = "✨ Prompt copied!";
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 10);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 1800);
  };

  return (
    <section className="sample-prompts">
      <h2 className="sample-prompts__title">💡 Sample Prompts</h2>
      <p className="sample-prompts__subtitle">Tap any prompt to copy instantly.</p>

      {/* Posters */}
      <div className="section">
        <h3 className="section-title">🖼️ Posters</h3>

        {/* Toggle View Buttons */}
        <div className="view-toggle">
          <button
            className={`toggle-btn ${viewMode === "grid" ? "active" : ""}`}
            onClick={() => setViewMode("grid")}
          >
            <LayoutGrid size={18} /> Grid
          </button>

          <button
            className={`toggle-btn ${viewMode === "list" ? "active" : ""}`}
            onClick={() => setViewMode("list")}
          >
            <List size={18} /> List
          </button>
        </div>

        {Object.entries(posterCategories).map(([category, data]) => (
          <div key={category} className="poster-category">
            <div className="poster-category__header">
              <span
                className="poster-tag"
                style={{ background: data.gradient }}
              >
                {data.icon}
                {category}
              </span>
            </div>

            {/* Dynamic layout */}
            <div
              className={
                viewMode === "grid"
                  ? "sample-prompts__grid"
                  : "sample-prompts__list"
              }
            >
              {data.prompts.map((p, i) => (
                <div
                  key={i}
                  className={`sample-prompts__card ${
                    viewMode === "list" ? "list-mode" : ""
                  }`}
                  onClick={() => handleCopy(p)}
                >
                  {p}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Presentations */}
      <div className="section">
        <h3 className="section-title">👨🏻‍🏫 Presentations</h3>
        <div className="sample-prompts__grid">
          {presentations.map((p, i) => (
            <div key={i} className="sample-prompts__card" onClick={() => handleCopy(p)}>
              {p}
            </div>
          ))}
        </div>
      </div>

      {/* Blogs */}
      <div className="section">
        <h3 className="section-title">📰 Blog Prompts</h3>
        <div className="sample-prompts__grid">
          {blogs.map((p, i) => (
            <div key={i} className="sample-prompts__card" onClick={() => handleCopy(p)}>
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
