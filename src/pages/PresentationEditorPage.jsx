import { useLocation } from "react-router-dom";
import { useState } from "react";
import { EditorProvider } from "../components/presentation/editor/EditorContext";
import EditorLayout from "../components/presentation/editor/EditorLayout";
import SlidesSidebar from "../components/presentation/editor/SlidesSidebar";

import PresentationCanvas from "../components/presentation/PresentationCanvas";
import PresentationEditorPanel from "../components/presentation/PresentationEditorPanel";
import PresentationTemplateSelector from "../components/presentation/PresentationTemplateSelector";
import Navbar from "../components/navbar";

// import "./PresentationPreviewModal.css";  // ← NEW CSS FILE
import "../style/PresentationPreviewModal.css"

export default function PresentationEditorPage() {
  const { state } = useLocation();
  const [showPreview, setShowPreview] = useState(false);

  const stored = (() => {
    try {
      return JSON.parse(sessionStorage.getItem("presentationData") || "null");
    } catch {
      return null;
    }
  })();

  const initialData =
    state?.presentationData ||
    stored || {
      title: "Untitled Presentation",
      subtitle: "",
      slides: [
        {
          heading: "Intro",
          bullets: ["Point one", "Point two"],
          image: "",
          highlight: "",
          layout: "default"
        }
      ],
      agenda: [],
      conclusion: [],
      callToAction: "Get started",
      template: "template1"
    };

  return (
    <EditorProvider initialData={initialData}>

      {/* Navbar with Preview button */}
      <Navbar
        isBtnReq={false}
        previewBtn={{
          req: true,
          label: "Preview Presentation",
          onClick: () => setShowPreview(true)
        }}
        generateName = "Presentation"
      />

      <EditorLayout
        left={
          <>
            <PresentationTemplateSelector />
            <SlidesSidebar />
          </>
        }
        center={<PresentationCanvas />}
        right={<PresentationEditorPanel />}
      />

      {/* ---------- PREVIEW MODAL ---------- */}
      {showPreview && (
        <div className="presentation-preview-overlay" onClick={() => setShowPreview(false)}>
          <div className="presentation-preview-wrapper" onClick={(e) => e.stopPropagation()}>
            <button className="presentation-preview-close" onClick={() => setShowPreview(false)}>
              ✕
            </button>

            {/* Render Presentation in Preview Mode */}
            <div className="presentation-preview-canvas-container">
              <PresentationCanvas isPreviewMode={true} />
            </div>
          </div>
        </div>
      )}
    </EditorProvider>
  );
}
