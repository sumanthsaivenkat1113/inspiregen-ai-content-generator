import React, { useEffect, useState } from "react";
import { useEditor } from "./editor/EditorContext";
import "./PresentationEditorPanel.css";

function TextTools({ value, styles, onChange }) {
  const [local, setLocal] = useState({
    text: value || "",
    fontSize: styles?.fontSize || 16,
    fontWeight: styles?.fontWeight || 400,
    color: styles?.color || "#111",
    rotate: styles?.rotate || 0,
  });

  useEffect(() => {
    setLocal({
      text: value || "",
      fontSize: styles?.fontSize || 16,
      fontWeight: styles?.fontWeight || 400,
      color: styles?.color || "#111",
      rotate: styles?.rotate || 0,
    });
  }, [value, styles]);

  return (
    <div className="editor-section">
      <label className="editor-label">Text</label>
      <textarea
        className="editor-textarea"
        value={local.text}
        onChange={(e) => setLocal((l) => ({ ...l, text: e.target.value }))}
      />

      <label className="editor-label">Font Size</label>
      <input
        type="range" min="10" max="60"
        className="editor-input"
        value={local.fontSize}
        onChange={(e) => setLocal((l) => ({ ...l, fontSize: Number(e.target.value) }))}
      />

      <label className="editor-label">Font Weight</label>
      <select
        className="editor-input"
        value={local.fontWeight}
        onChange={(e) => setLocal((l) => ({ ...l, fontWeight: Number(e.target.value) }))}
      >
        <option value={300}>Light</option>
        <option value={400}>Regular</option>
        <option value={600}>Semi Bold</option>
        <option value={700}>Bold</option>
        <option value={900}>Heavy</option>
      </select>

      <label className="editor-label">Color</label>
      <input
        type="color"
        className="editor-input"
        value={local.color}
        onChange={(e) => setLocal((l) => ({ ...l, color: e.target.value }))}
      />

      <label className="editor-label">Rotate</label>
      <input
        type="range" min="-45" max="45"
        className="editor-input"
        value={local.rotate}
        onChange={(e) => setLocal((l) => ({ ...l, rotate: Number(e.target.value) }))}
      />

      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button
          className="editor-input"
          onClick={() => onChange({ text: local.text })}
        >
          Apply Text
        </button>

        <button
          className="editor-input"
          onClick={() => onChange({ style: { fontSize: local.fontSize, fontWeight: local.fontWeight, color: local.color, rotate: local.rotate } })}
        >
          Apply Style
        </button>
      </div>
    </div>
  );
}

function ImageTools({ styles, onReplace, onStyle }) {
  const [localWidth, setLocalWidth] = useState(styles?.width || 600);
  const [localRotate, setLocalRotate] = useState(styles?.rotate || 0);

  useEffect(() => {
    setLocalWidth(styles?.width || 600);
    setLocalRotate(styles?.rotate || 0);
  }, [styles]);

  return (
    <div className="editor-section">
      <label className="editor-label">Replace Image</label>
      <input type="file" accept="image/*" className="editor-input" onChange={(e) => onReplace(e.target.files?.[0])} />

      <label className="editor-label">Width</label>
      <input type="range" min="100" max="1000" className="editor-input" value={localWidth} onChange={(e) => { const w = Number(e.target.value); setLocalWidth(w); onStyle({ width: w }); }} />

      <label className="editor-label">Rotate</label>
      <input type="range" min="-45" max="45" className="editor-input" value={localRotate} onChange={(e) => { const r = Number(e.target.value); setLocalRotate(r); onStyle({ rotate: r }); }} />
    </div>
  );
}

export default function PresentationEditorPanel() {
  const {
    data,
    activeSlideIndex,
    activeElement,
    setActiveElement,
    updateSlideElement,
    updateSlideStyle,
    updateImageFile,
    updateSlideBullets
  } = useEditor();

  const slide = (data?.slides || [])[activeSlideIndex];

  if (!slide) {
    return (
      <div className="presentation-editor-panel">
        <p style={{ color: "#6b7280" }}>No slide selected</p>
      </div>
    );
  }

  return (
    <div className="presentation-editor-panel">
      <h2 className="editor-title">Slide {activeSlideIndex + 1} Editor</h2>

      {/* Quick Element Selection */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <button className="editor-input" onClick={() => setActiveElement("heading")}>Heading</button>
        <button className="editor-input" onClick={() => setActiveElement("image")}>Image</button>
        <button className="editor-input" onClick={() => setActiveElement("bullets")}>Bullets</button>
        <button className="editor-input" onClick={() => setActiveElement("highlight")}>Highlight</button>
        <button className="editor-input" onClick={() => setActiveElement("cta")}>CTA</button>
      </div>

      {!activeElement && <p style={{ color: "#6b7280" }}>Click an element on the slide or choose a tool above.</p>}

      {/* Heading */}
      {activeElement === "heading" && (
        <TextTools
          value={slide.heading}
          styles={data.slideStyles?.[`${activeSlideIndex}__heading`] || {}}
          onChange={(payload) => {
            if (payload.text !== undefined) updateSlideElement(activeSlideIndex, "heading", { text: payload.text });
            if (payload.style) updateSlideStyle(activeSlideIndex, "heading", payload.style);
          }}
        />
      )}

      {/* Image */}
      {activeElement === "image" && (
        <ImageTools
          styles={data.slideStyles?.[`${activeSlideIndex}__image`] || {}}
          onReplace={(file) => updateImageFile(activeSlideIndex, file)}
          onStyle={(s) => updateSlideStyle(activeSlideIndex, "image", s)}
        />
      )}

      {/* Bullet single item editor */}
      {activeElement?.startsWith("bullet_") && (() => {
        const bi = Number(activeElement.split("_")[1]);
        return (
          <TextTools
            value={slide.bullets?.[bi] || ""}
            styles={data.slideStyles?.[`${activeSlideIndex}__bullet_${bi}`] || {}}
            onChange={(payload) => {
              if (payload.text !== undefined) {
                const updated = [...(slide.bullets || [])];
                updated[bi] = payload.text;
                updateSlideElement(activeSlideIndex, "bullets", { bullets: updated });
              }
              if (payload.style) updateSlideStyle(activeSlideIndex, `bullet_${bi}`, payload.style);
            }}
          />
        );
      })()}

      {/* Bullet list editor */}
      {activeElement === "bullets" && (
        <div className="editor-section">
          <label className="editor-label">Bullets (one per line)</label>
          <textarea
            className="editor-textarea"
            defaultValue={(slide.bullets || []).join("\n")}
            onBlur={(e) => updateSlideBullets(activeSlideIndex, e.target.value.split("\n").filter(Boolean))}
            style={{ minHeight: 120 }}
          />
        </div>
      )}

      {/* Highlight */}
      {activeElement === "highlight" && (
        <TextTools
          value={slide.highlight}
          styles={data.slideStyles?.[`${activeSlideIndex}__highlight`] || {}}
          onChange={(payload) => {
            if (payload.text !== undefined) updateSlideElement(activeSlideIndex, "highlight", { text: payload.text });
            if (payload.style) updateSlideStyle(activeSlideIndex, "highlight", payload.style);
          }}
        />
      )}

      {/* CTA */}
      {activeElement === "cta" && (
        <TextTools
          value={slide.cta}
          styles={data.slideStyles?.[`${activeSlideIndex}__cta`] || {}}
          onChange={(payload) => {
            if (payload.text !== undefined) updateSlideElement(activeSlideIndex, "cta", { text: payload.text });
            if (payload.style) updateSlideStyle(activeSlideIndex, "cta", payload.style);
          }}
        />
      )}

      {/* Delete element */}
      <button
        className="PresentationEditorPanel-delete-btn"
        onClick={() => {
          if (!activeElement) return;
          if (activeElement === "image") updateSlideElement(activeSlideIndex, "image", { image: "" });
          else if (activeElement === "heading") updateSlideElement(activeSlideIndex, "heading", { text: "" });
          else if (activeElement === "highlight") updateSlideElement(activeSlideIndex, "highlight", { text: "" });
          else if (activeElement === "cta") updateSlideElement(activeSlideIndex, "cta", { text: "" });
          else if (activeElement.startsWith("bullet_")) {
            const idx = Number(activeElement.split("_")[1]);
            const newBullets = [...(slide.bullets || [])];
            newBullets.splice(idx, 1);
            updateSlideElement(activeSlideIndex, "bullets", { bullets: newBullets });
          }
          setTimeout(() => setActiveElement(null), 50);
        }}
      >
        Delete Element
      </button>
    </div>
  );
}
