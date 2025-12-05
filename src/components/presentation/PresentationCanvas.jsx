import React, { useState } from "react";
import { useEditor } from "./editor/EditorContext";
import "./PresentationCanvas.css";

export default function PresentationCanvas({ isPreviewMode = false }) {
  const {
    data,
    activeSlideIndex,
    activeElement,
    setActiveElement
  } = useEditor();

  const slide = (data?.slides || [])[activeSlideIndex];
  const slideStyles = data?.slideStyles || {};

  // Reads live styles from context
  const getStyle = (key) => {
    const s = slideStyles?.[`${activeSlideIndex}__${key}`] || {};
    return {
      fontSize: s.fontSize ? `${s.fontSize}px` : undefined,
      fontWeight: s.fontWeight,
      color: s.color,
      transform: s.rotate ? `rotate(${s.rotate}deg)` : undefined,
      width: s.width ? `${s.width}px` : undefined,
    };
  };

  /**
   * HoverBox – but now with previewMode disabled behaviour
   */
  const HoverBox = ({ keyId, onClick, children }) => {
    const [hovered, setHovered] = useState(false);
    const isActive = activeElement === keyId;

    return (
      <div
        className={`hover-box 
          ${hovered && !isPreviewMode ? "hovered" : ""} 
          ${isActive && !isPreviewMode ? "active" : ""}`}
        onClick={(e) => {
          if (isPreviewMode) return; // Disable click in preview
          e.stopPropagation();
          onClick?.();
        }}
        onMouseEnter={() => !isPreviewMode && setHovered(true)}
        onMouseLeave={() => !isPreviewMode && setHovered(false)}
      >
        {children}
      </div>
    );
  };

  if (!slide) return <div className="no-slide">No slide selected</div>;

  return (
    <div
      className={`canvas-wrapper ${isPreviewMode ? "preview-mode" : ""}`}
    >
      <div className="canvas-card">

        {/* Heading */}
        <HoverBox keyId="heading" onClick={() => setActiveElement("heading")}>
          <h2 className="slide-heading" style={getStyle("heading")}>
            {slide.heading || "Untitled"}
          </h2>
        </HoverBox>

        {/* Image */}
        {slide.image && (
          <HoverBox keyId="image" onClick={() => setActiveElement("image")}>
            <img
              src={slide.image}
              alt=""
              className="slide-image"
              style={getStyle("image")}
            />
          </HoverBox>
        )}

        {/* Bullets */}
        <div className="bullets-container">
          {(slide.bullets || []).map((b, bi) => (
            <HoverBox
              key={bi}
              keyId={`bullet_${bi}`}
              onClick={() => setActiveElement(`bullet_${bi}`)}
            >
              <div className="bullet-row">
                <div className="bullet-dot"></div>
                <div className="bullet-text" style={getStyle(`bullet_${bi}`)}>
                  {b}
                </div>
              </div>
            </HoverBox>
          ))}
        </div>

        {/* Highlight */}
        {slide.highlight && (
          <HoverBox keyId="highlight" onClick={() => setActiveElement("highlight")}>
            <div className="slide-highlight">
              {slide.highlight}
            </div>
          </HoverBox>
        )}

        {/* CTA */}
        <HoverBox keyId="cta" onClick={() => setActiveElement("cta")}>
          <div className="cta-wrapper">
            <button className="cta-btn">
              {slide.cta || data.callToAction || "Learn more"}
            </button>
          </div>
        </HoverBox>

      </div>
    </div>
  );
}
