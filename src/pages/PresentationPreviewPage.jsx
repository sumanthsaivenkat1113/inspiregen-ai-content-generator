import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { exportPresentationToPDF } from "../utils/exportPresentationToPDF";
import "../style/presentationPreview.css";

export default function PresentationPreviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const previewRef = useRef();
  const [isExporting, setIsExporting] = useState(false);
  const [presentationData, setPresentationData] = useState(null);

  useEffect(() => {
    const fromState = location.state?.presentationData;
    const fromStorage = sessionStorage.getItem("presentationData");

    let data = fromState || (fromStorage ? JSON.parse(fromStorage) : null);
    if (fromState) sessionStorage.setItem("presentationData", JSON.stringify(fromState));

    setPresentationData(data);
  }, [location.state]);

  if (!presentationData) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <p style={{ fontSize: "18px", color: "#666" }}>
          No presentation content to preview. Please generate first.
        </p>

        <button
          onClick={() => navigate("/generate/content")}
          className="preview-btn btn-primary"
          style={{ marginTop: "20px" }}
        >
          Generate Presentation
        </button>
      </div>
    );
  }

  return (
    <div className="preview-wrapper">
      {/* Header Buttons */}
      <div className="preview-header-btns">
        <button
          onClick={() => navigate("/generate/content")}
          className="preview-btn btn-primary"
        >
          Back to Generator
        </button>

        <button
          onClick={() =>
            exportPresentationToPDF(
              previewRef.current,
              presentationData.title,
              setIsExporting
            )
          }
          disabled={isExporting}
          className={`preview-btn ${isExporting ? "btn-disabled" : "btn-success"}`}
        >
          {isExporting ? "Exporting..." : "Download PDF"}
        </button>
      </div>

      {/* Preview */}
      <div ref={previewRef} className="preview-container">

        {/* Title Slide */}
        <div className="title-slide">
          <h1>{presentationData.title}</h1>
          <p>{presentationData.subtitle}</p>
        </div>

        {/* Agenda */}
        {presentationData.agenda?.length > 0 && (
          <div className="slide-card">
            <h2 className="slide-heading">Agenda</h2>
            <ul className="slide-bullets">
              {presentationData.agenda.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Slides */}
        {presentationData.slides.map((slide, i) => (
          <div key={i} className="slide-card">
            {slide.image && (
              <img src={slide.image} alt="" className="slide-image" />
            )}

            <h2 className="slide-heading">{slide.heading}</h2>

            <ul className="slide-bullets">
              {slide.bullets.map((b, j) => (
                <li key={j}>
                  {b.startsWith("**") ? (
                    <strong>{b.replace(/\*\*/g, "")}</strong>
                  ) : (
                    b
                  )}
                </li>
              ))}
            </ul>

            {slide.highlight && (
              <div className="slide-highlight">
                {slide.highlight}
              </div>
            )}
          </div>
        ))}

        {/* Conclusion */}
        {presentationData.conclusion?.length > 0 && (
          <div className="slide-card">
            <h2 className="slide-heading">Key Takeaways</h2>

            <ul className="slide-bullets">
              {presentationData.conclusion.map((c, i) => (
                <li key={i} style={{ fontWeight: "600", color: "#1e40af" }}>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA */}
        <div className="slide-cta">
          <h2>Ready to Take Action?</h2>
          <p>{presentationData.callToAction}</p>
        </div>
      </div>
    </div>
  );
}
