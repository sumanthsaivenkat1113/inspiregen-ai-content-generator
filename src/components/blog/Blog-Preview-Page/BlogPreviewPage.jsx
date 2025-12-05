import { useLocation } from "react-router-dom";
import { useState } from "react";
import Navbar from "../../navbar";

import { CATEGORY_TEMPLATES_CONFIG } from "./config/templates";
import { useBlogData } from "./hooks/useBlogData";

import LeftPanel from "./layout/LeftPanel";
import CenterCanvas from "./layout/CenterCanvas";
import RightEditorPanel from "./layout/RightEditorPanel";

import "./BlogPreviewPage.css";

export default function BlogPreviewPage() {
  const { state } = useLocation();
  const navBlogData = state?.blogData || null;
  const navBlogTemplate = state?.blogTemplate || null;

  const {
    data,
    setData,
    activeElement,
    setActiveElement,
    selectedTemplate,
    setSelectedTemplate,
  } = useBlogData(navBlogData, navBlogTemplate, CATEGORY_TEMPLATES_CONFIG);

  const [showPreview, setShowPreview] = useState(false);

  if (!data) return <h2 style={{ padding: 20 }}>⏳ Loading blog data...</h2>;

  // updateElement / updateImageFile / deleteElement remain same as before
  // (no inline styles here so leaving logic unchanged)

  const updateElement = (key, updates) => {
    setData((prev) => {
      const next = { ...prev };

      if (key.startsWith("subHeading_") || key.startsWith("content_") || key.startsWith("image_")) {
        const [type, idx] = key.split("_");
        const index = Number(idx);

        next.contentSections = prev.contentSections.map((s, i) => {
          if (i !== index) return s;

          if (type === "image") return { ...s, image: updates.image ?? s.image };
          if (type === "subHeading") return { ...s, subHeading: updates.text ?? s.subHeading };
          if (type === "content") return { ...s, content: updates.text ?? s.content };
          return s;
        });
      } else {
        if (updates.text !== undefined) next[key] = updates.text;
        if (updates.image !== undefined) next[key] = updates.image;
      }

      next.styles = { ...next.styles, [key]: { ...next.styles[key], ...updates } };
      return next;
    });
  };

  const updateImageFile = (key, file) => {
    const reader = new FileReader();
    reader.onload = () => updateElement(key, { image: reader.result });
    reader.readAsDataURL(file);
  };

  const deleteElement = (key) => {
    setData((prev) => {
      const next = { ...prev };

      if (key.startsWith("image_")) {
        const idx = Number(key.split("_")[1]);
        next.contentSections[idx].image = "";
      } else if (["subHeading", "content"].some((t) => key.startsWith(t))) {
        const [type, idx] = key.split("_");
        next.contentSections[idx][type] = "";
      } else {
        next[key] = "";
      }

      return next;
    });

    setActiveElement(null);
  };

 

  return (
    <>
      {/* <Navbar isBtnReq={false} /> */}
      <Navbar
        isBtnReq={false}
        previewBtn={{
          req: true,
          label: "Preview Blog",
          onClick: () => setShowPreview(true)
        }}
        generateName = 'Blog'
      />


      <div className="blog-preview-container">
        <LeftPanel
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
          availableTemplates={CATEGORY_TEMPLATES_CONFIG.blog}
        />

        <CenterCanvas
          data={data}
          selectedTemplate={selectedTemplate}
          activeElement={activeElement}
          setActiveElement={setActiveElement}
        />

        <RightEditorPanel
          activeElement={activeElement}
          data={data}
          updateElement={updateElement}
          updateImageFile={updateImageFile}
          deleteElement={deleteElement}
        />
      </div>

      {/* ---------------- PREVIEW MODAL ---------------- */}
      {showPreview && (
        <div className="blog-preview-modal">
          <div
            className="blog-preview-backdrop"
            onClick={() => setShowPreview(false)}
          />

          <div className="blog-preview-content">
            <div id="blog-preview-canvas">
              <CenterCanvas
                data={data}
                selectedTemplate={selectedTemplate}
                activeElement={null}
                setActiveElement={() => { }}
                isPreview={true}
              />
            </div>

            <button
              className="close-blog-preview-btn"
              onClick={() => setShowPreview(false)}
            >
              ✖ Close Preview
            </button>
          </div>
        </div>
      )}
    </>
  );
}
