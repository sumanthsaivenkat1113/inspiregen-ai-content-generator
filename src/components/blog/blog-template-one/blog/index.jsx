import { useState } from "react";
export default function BlogTemplateOne({
  data,
  styles,
  onElementClick,
  activeElement // Still received, but no longer controls visual border
}) {
  const getStyle = (key) => ({
    fontSize: styles[key]?.fontSize,
    color: styles[key]?.color,
    fontWeight: styles[key]?.fontWeight,
    transform: `rotate(${styles[key]?.rotate || 0}deg)`,
    width: styles[key]?.width || "auto",
  });

  // --- MODIFIED HoverBox component ---
  const HoverBox = ({ keyId, onClick, children }) => {
    const [hovered, setHovered] = useState(false);

    // The 'isActive' check is no longer used for visual styling
    // const isActive = activeElement === keyId; 

    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          // Activation (border/background) now ONLY depends on 'hovered' state
          border: hovered
            ? "2px solid #2563eb" // Show activation color on hover
            : "2px solid transparent", // Hidden otherwise

          background: hovered
            ? "rgba(37, 99, 235, 0.1)" // Light blue background on hover
            : "transparent",

          // Consistent padding and styling
          borderRadius: 6,
          padding: 6, // Use a fixed padding to prevent layout shifts
          transition: "0.15s ease",
          cursor: "pointer",

          // prevent layout shift
          boxSizing: "border-box",
          marginBottom: 16,
        }}
      >
        {children}
      </div>
    );
  };
  // --- END MODIFIED HoverBox ---

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>

      {/* HEADER */}
      <HoverBox keyId="header" onClick={() => onElementClick("header")}>
        <h1 style={getStyle("header")}>{data.header}</h1>
      </HoverBox>

      {/* HEADER IMAGE */}
      {data.headerImage && (
        <HoverBox
          keyId="headerImage"
          onClick={() => onElementClick("headerImage")}
        >
          <img
            src={data.headerImage}
            alt=""
            style={{
              ...getStyle("headerImage"),
              maxWidth: "100%",
              display: "block",
            }}
            // Add fallback in case image URL fails
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/900x300/e5e7eb/374151?text=Image+Placeholder"; }}
          />
        </HoverBox>
      )}

      {/* INTRODUCTION */}
      <HoverBox
        keyId="introduction"
        onClick={() => onElementClick("introduction")}
      >
        <p style={getStyle("introduction")}>{data.introduction}</p>
      </HoverBox>

      {/* CONTENT SECTIONS */}
      {data.contentSections.map((section, i) => (
        <div key={i} style={{ marginBottom: 24 }}>
          {/* SUBHEADING */}
          <HoverBox
            keyId={`subHeading_${i}`}
            onClick={() => onElementClick(`subHeading_${i}`)}
          >
            <h2 style={getStyle(`subHeading_${i}`)}>
              {section.subHeading}
            </h2>
          </HoverBox>

          {/* IMAGE */}
          {section.image && (
            <HoverBox
              keyId={`image_${i}`}
              onClick={() => onElementClick(`image_${i}`)}
            >
              <img
                src={section.image}
                alt=""
                style={{
                  ...getStyle(`image_${i}`),
                  maxWidth: "100%",
                  display: "block",
                }}
                // Add fallback in case image URL fails
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/900x300/e5e7eb/374151?text=Section+Image"; }}
              />
            </HoverBox>
          )}

          {/* CONTENT */}
          <HoverBox
            keyId={`content_${i}`}
            onClick={() => onElementClick(`content_${i}`)}
          >
            <p style={getStyle(`content_${i}`)}>{section.content}</p>
          </HoverBox>
        </div>
      ))}

      {/* CONCLUSION */}
      <HoverBox
        keyId="conclusion"
        onClick={() => onElementClick("conclusion")}
      >
        <p style={getStyle("conclusion")}>{data.conclusion}</p>
      </HoverBox>
    </div>
  );
}