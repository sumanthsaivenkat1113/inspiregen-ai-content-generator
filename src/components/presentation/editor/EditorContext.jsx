import React, { createContext, useContext, useState, useEffect } from "react";

const EditorContext = createContext();
export const useEditor = () => useContext(EditorContext);

export function EditorProvider({ initialData, children }) {
  const [data, setData] = useState(initialData);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [activeElement, setActiveElement] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(initialData?.template || "template1");

  // persist to sessionStorage (throttle not implemented for brevity)
  useEffect(() => {
    try {
      sessionStorage.setItem("presentationData", JSON.stringify({ ...data, template: selectedTemplate }));
    } catch (e) {
      // Ignore storage errors
    }
  }, [data, selectedTemplate]);

  // --- Slide / Element operations (exposed by context) ---
  const addSlide = (at = -1) => {
    const newSlide = { heading: "New Slide", bullets: [], image: "", highlight: "", cta: "", layout: "default", styles: {} };
    setData(prev => {
      const slides = [...(prev.slides || [])];
      // insert after `at` index, if at is -1 append
      const insertIndex = at >= 0 ? at + 1 : slides.length;
      slides.splice(insertIndex, 0, newSlide);
      return { ...prev, slides };
    });
    setActiveSlideIndex(prevIndex => {
      const newIndex = (at >= 0 ? at + 1 : (data.slides ? data.slides.length : 0));
      return newIndex;
    });
    setActiveElement("heading");
  };

  const removeSlide = (index) => {
    setData(prev => {
      const slides = (prev.slides || []).filter((_, i) => i !== index);
      return { ...prev, slides };
    });
    setActiveSlideIndex(prev => Math.max(0, prev === index ? 0 : prev - (index < prev ? 1 : 0)));
    setActiveElement(null);
  };

  const moveSlide = (index, dir) => {
    setData(prev => {
      const slides = [...(prev.slides || [])];
      const to = index + dir;
      if (to < 0 || to >= slides.length) return prev;
      [slides[index], slides[to]] = [slides[to], slides[index]];
      return { ...prev, slides };
    });
    setActiveSlideIndex(i => (i === index ? i + dir : i));
  };

  const updateSlideElement = (slideIndex, key, updates) => {
    setData(prev => {
      const slides = (prev.slides || []).map((s, i) => {
        if (i !== slideIndex) return s;
        // key-specific handling
        if (key === "image" && updates.image !== undefined) return { ...s, image: updates.image };
        if (key === "bullets" && updates.bullets !== undefined) return { ...s, bullets: updates.bullets };
        // generic: if updates has text property, set the key to text, else merge
        if (updates && typeof updates === "object" && updates.text !== undefined) return { ...s, [key]: updates.text };
        return { ...s, [key]: typeof updates === "object" ? { ...(s[key] || {}), ...updates } : updates };
      });
      return { ...prev, slides };
    });
  };

  const updateSlideStyle = (slideIndex, styleKey, updates) => {
    setData(prev => {
      const slideStyles = { ...(prev.slideStyles || {}) };
      const key = `${slideIndex}__${styleKey}`;
      slideStyles[key] = { ...(slideStyles[key] || {}), ...updates };
      return { ...prev, slideStyles };
    });
  };

  const updateGlobal = (key, updates) => {
    setData(prev => ({ ...prev, [key]: updates && updates.text !== undefined ? updates.text : updates }));
  };

  const updateGlobalStyle = (key, updates) => {
    setData(prev => ({ ...prev, globalStyles: { ...(prev.globalStyles || {}), [key]: { ...((prev.globalStyles||{})[key]||{}), ...updates } } }));
  };

  const updateImageFile = (slideIndex, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      updateSlideElement(slideIndex, "image", { image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const updateSlideBullets = (slideIndex, bullets) => {
    setData(prev => {
      const slides = (prev.slides || []).map((s, i) => i === slideIndex ? { ...s, bullets } : s);
      return { ...prev, slides };
    });
  };

  // Expose everything needed by child components
  const ctx = {
    data,
    setData,
    activeSlideIndex,
    setActiveSlideIndex,
    activeElement,
    setActiveElement,
    selectedTemplate,
    setSelectedTemplate,
    // actions
    addSlide,
    removeSlide,
    moveSlide,
    updateSlideElement,
    updateSlideStyle,
    updateImageFile,
    updateGlobal,
    updateGlobalStyle,
    updateSlideBullets,
  };

  return <EditorContext.Provider value={ctx}>{children}</EditorContext.Provider>;
}
