import React from "react";
import { useEditor } from "./EditorContext";
import "./SlidesSidebar.css";

export default function SlidesSidebar() {
  const {
    data,
    activeSlideIndex,
    setActiveSlideIndex,
    addSlide,
    removeSlide,
    moveSlide
  } = useEditor();

  const slides = data?.slides || [];

  const SlideItem = ({ slide, index, active }) => {
    return (
      <div
        className={`slide-item ${active ? "active" : ""}`}
        onClick={() => setActiveSlideIndex(index)}
      >
        <div className="slide-title">
          {slide.heading || `Slide ${index + 1}`}
        </div>

        <div className="slide-preview">
          {(slide.bullets || []).slice(0, 2).join(" • ")}
        </div>

        <div className="slide-actions">
          <button
            className="SlidesSidebaraction-btn"
            onClick={(e) => {
              e.stopPropagation();
              moveSlide(index, -1);
            }}
            disabled={index === 0}
          >
            ↑
          </button>

          <button
            className="SlidesSidebaraction-btn"
            onClick={(e) => {
              e.stopPropagation();
              moveSlide(index, 1);
            }}
            disabled={index === slides.length - 1}
          >
            ↓
          </button>

          <button
            className="SlidesSidebar-delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              removeSlide(index);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="slides-sidebar">
      <div className="slides-header">
        <h4>Slides</h4>
        {/* <button className="add-btn" onClick={() => addSlide(activeSlideIndex)}>
          + Add
        </button> */}
      </div>

      {slides.map((slide, index) => (
        <SlideItem
          key={index}
          slide={slide}
          index={index}
          active={index === activeSlideIndex}
        />
      ))}
    </div>
  );
}
