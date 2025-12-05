import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./posterPreview.css";
import './posterPreviewModal.css'

import TemplateSelector from "./TemplateSelector";
import PosterCanvas from "./PosterCanvas";
import EditorPanel from "../PosterPreviewPage/EditorPanel";
import Navbar from "../../navbar";



export default function PosterPreviewPage() {
  const { state } = useLocation();
  // take posterData and posterCategory from navigation state if available
  const navPosterData = state?.posterData || null;
  const navPosterCategory = state?.posterCategory || null;

  // fallback to session storage so reload still works
  const storedPosterData = (() => {
    try {
      return JSON.parse(sessionStorage.getItem("posterData") || "null");
    } catch {
      return null;
    }
  })();

  const storedPosterCategory = sessionStorage.getItem("posterCategory") || "movie";

  const posterData = navPosterData || storedPosterData;
  const posterCategory = navPosterCategory || storedPosterCategory;

  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const [activeElement, setActiveElement] = useState(null);
  const [data, setData] = useState(null);
  const [showPreview, setShowPreview] = useState(false);


  // define how many templates available per category (keeps TemplateSelector accurate)
  const CATEGORY_TEMPLATES_CONFIG = {
    movie: ["template1", "template2", "template3"],
    event: ["template1", "template2", "template3"],
    information: ["template1", "template2", "template3"],
    advertisement: ["template1", "template2", "template3"],
  };

  useEffect(() => {
    if (posterData) {
      setData({
        ...posterData,
        styles: {
          title: { fontSize: null, color: "", rotate: 0, fontWeight: null },
          tagline: { fontSize: null, color: "", rotate: 0 },
          message: { fontSize: null, color: "", rotate: 0 },
          callToAction: { fontSize: null, color: "", rotate: 0 },
          image: { rotate: 0, width: null }
        }
      });
    }
  }, [posterData]);

  useEffect(() => {
    // ensure selectedTemplate exists in category, otherwise reset to first
    const available = CATEGORY_TEMPLATES_CONFIG[posterCategory] || ["template1"];
    if (!available.includes(selectedTemplate)) setSelectedTemplate(available[0]);
  }, [posterCategory]); // eslint-disable-line

  if (!posterData || !data) {
    return <h2 style={{ padding: 20 }}>⏳ Loading poster data...</h2>;
  }

  const updateElement = (key, updates) => {
    setData(prev => ({
      ...prev,
      [key]: updates.text !== undefined ? updates.text : prev[key],
      styles: {
        ...prev.styles,
        [key]: { ...prev.styles[key], ...updates }
      }
    }));
  };

  const updateImage = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setData(prev => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const deleteElement = (key) => {
    setData(prev => ({ ...prev, [key]: "" }));
  };

  const availableTemplates = CATEGORY_TEMPLATES_CONFIG[posterCategory] || ["template1"];



  return (
    <>
      {/* <Navbar isBtnReq={false}/> */}
      {/* <Navbar
        isBtnReq={false}
        exportBtn={{
          req: true,
          label: "Export PDF",
          onClick: handleExportPDF
        }}
      /> */}
      <Navbar
        isBtnReq={false}
        previewBtn={{
          req: true,
          label: "Preview Poster",
          onClick: () => setShowPreview(true)
        }}
        generateName = "Poster"
      />


      <div className="poster-preview-layout">
        <TemplateSelector
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
          availableTemplates={availableTemplates}
          posterCategory={posterCategory}
        />

        <PosterCanvas
          data={data}
          selectedTemplate={selectedTemplate}
          setActiveElement={setActiveElement}
          posterCategory={posterCategory}
        />
        {/* ********************* */}
        {showPreview && (
          <div className="poster-preview-modal">
            <div className="poster-preview-backdrop" onClick={() => setShowPreview(false)} />

            <div className="poster-preview-content">
              {/* Use your existing PosterCanvas, but NOT interactive */}
              <PosterCanvas
                data={data}
                selectedTemplate={selectedTemplate}
                posterCategory={posterCategory}
                isPreview={true}
              />

              <button className="close-preview-btn" onClick={() => setShowPreview(false)}>
                ✖ Close
              </button>
            </div>
          </div>
        )}


        <EditorPanel
          activeElement={activeElement}
          data={data}
          updateElement={updateElement}
          updateImage={updateImage}
          deleteElement={deleteElement}
        />
      </div>
    </>
  );
}
