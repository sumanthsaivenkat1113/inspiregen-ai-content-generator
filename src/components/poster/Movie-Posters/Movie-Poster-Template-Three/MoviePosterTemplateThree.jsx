import "./MoviePosterTemplateThree.css";
// Utility function to safely get style and rotation, defaulting to 0 for rotate
const getStyle = (styles, key) => ({
  ...(styles[key] || {}),
  transform: `rotate(${styles[key]?.rotate || 0}deg)`,
});

export default function MoviePosterTemplateThree({
  title,
  tagline,
  message,
  image,
  callToAction,
  styles = {},
  onSelect,
  activeElement,
}) {
  const defaultTitle = "";

  const midLayerStyle = {
    ...getStyle(styles, "image"),
    ...(image && { backgroundImage: `url('${image}')` }),
  };

  // Split title into words and letters but keep light-comedy spacing
  const renderTitle = (text) => {
    const words = (text || defaultTitle).split(" ").filter(Boolean);
    return words.map((w, wi) => (
      <span key={wi} className="mp3-title-word">
        {w.split("").map((ch, ci) => (
          <span key={`${wi}-${ci}`} className="mp3-title-char">
            {ch}
          </span>
        ))}
      </span>
    ));
  };

  return (
    <div className="MoviePosterTemplateThree_poster-v3">
      {/* Hero Image (editable) */}
      <div
        className={`MoviePosterTemplateThree_hero-image poster-element ${
          activeElement === "image" ? "active-element" : ""
        }`}
        style={midLayerStyle}
        onClick={() => onSelect("image")}
        aria-hidden
      />

      {/* Soft top vignette to keep readability */}
      <div className="MoviePosterTemplateThree_image-overlay" />

      {/* Content stack */}
      <div className="MoviePosterTemplateThree_content">
        <h1
          className={`MoviePosterTemplateThree_title-v3 poster-element ${
            activeElement === "title" ? "active-element" : ""
          }`}
          style={getStyle(styles, "title")}
          onClick={() => onSelect("title")}
        >
          {renderTitle(title)}
        </h1>

        <p
          className={`MoviePosterTemplateThree_tagline-v3 poster-element ${
            activeElement === "tagline" ? "active-element" : ""
          }`}
          style={getStyle(styles, "tagline")}
          onClick={() => onSelect("tagline")}
        >
          {tagline }
        </p>

        <div className="MoviePosterTemplateThree_accent-line" />

        <p
          className={`MoviePosterTemplateThree_message-v3 poster-element ${
            activeElement === "message" ? "active-element" : ""
          }`}
          style={getStyle(styles, "message")}
          onClick={() => onSelect("message")}
        >
          {message }
        </p>

        <button
          type="button"
          className={`MoviePosterTemplateThree_cta-v3 poster-element ${
            activeElement === "callToAction" ? "active-element" : ""
          }`}
          style={{
            ...getStyle(styles, "callToAction"),
            color: styles?.callToAction?.color || undefined,
            background: styles?.callToAction?.background || undefined,
          }}
          onClick={() => onSelect("callToAction")}
        >
          {callToAction }
        </button>

        
      </div>
    </div>
  );
}
