import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useBlogGenerator } from "../hooks/useBlogGenerator";
import { usePosterGenerator } from "../hooks/usePosterGenerator";
import { usePresentationGenerator } from "../hooks/usePresentationGenerator";

import AiGeneratorInput from "../components/AI-GENERATOR-INPUT";
import Loader from "../components/Loader/Loader";
import Navbar from "../components/navbar";
import SamplePrompts from "../components/Sample-Prompts/SamplePrompts";

export default function GenerateContentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const autoTriggeredRef = useRef(false);

  const [type, setType] = useState("blog");

  /* ------------------- BLOG HOOK ------------------- */
  const {
    contentJson,
    headerImage,
    loading: blogLoading,
    error: blogError,
    generateBlog,
  } = useBlogGenerator();

  /* ------------------- POSTER HOOK ------------------- */
  const {
    posterJson,
    posterImage,
    loading: posterLoading,
    error: posterError,
    generatePoster,
  } = usePosterGenerator();

  /* ---------------- PRESENTATION HOOK ---------------- */
  const {
    presentationJson,
    slideImages,
    loading: presLoading,
    error: presError,
    generatePresentation,
  } = usePresentationGenerator();


  /* ---------------------------------------------------------
      HANDLE INPUT → TRIGGER RIGHT GENERATOR
  -----------------------------------------------------------*/
  const handleGenerate = async (topic, selectedType, posterCategory, provider) => {
    setType(selectedType);

    // ❌ Do NOT clear all storage
    // sessionStorage.clear();

    // ✔ Only reset needed fields
    sessionStorage.removeItem("blogData");
    sessionStorage.removeItem("posterData");
    sessionStorage.removeItem("presentationData");
    sessionStorage.removeItem("posterCategory");

    sessionStorage.setItem("imageProvider", provider || "unsplash");

    console.log("🔥 Selected Provider:", provider);

    switch (selectedType) {
      case "blog":
        generateBlog(topic, provider);
        break;

      case "poster":
        sessionStorage.setItem("posterCategory", posterCategory || "movie");
        generatePoster(topic, posterCategory, provider);
        break;

      case "presentation":
        generatePresentation(topic, provider);
        break;

      default:
        console.warn("Unknown type:", selectedType);
    }
  };


  /* ---------------------------------------------------------
      AUTO-TRIGGER WHEN COMING FROM HOMEPAGE
  -----------------------------------------------------------*/
  useEffect(() => {
    if (autoTriggeredRef.current) return;

    const s = location?.state;
    if (s && s.topic && s.type) {
      autoTriggeredRef.current = true;

      handleGenerate(
        s.topic,
        s.type,
        s.posterCategory,
        s.provider || "unsplash"
      );

      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);


  /* ---------------------------------------------------------
      BLOG READY → PREVIEW
  -----------------------------------------------------------*/
  useEffect(() => {
    if (!contentJson) return;

    const blogData = { contentJson, headerImage };
    sessionStorage.setItem("blogData", JSON.stringify(blogData));

    navigate("/preview/blog", { state: { blogData } });
  }, [contentJson, headerImage, navigate]);


  /* ---------------------------------------------------------
      POSTER READY → PREVIEW
  -----------------------------------------------------------*/
  useEffect(() => {
    if (!posterJson) return;

    const posterData = {
      title: posterJson.Header?.title || "Untitled Poster",
      tagline: posterJson.Header?.tagline || "",
      message: posterJson.MainText?.message || "",
      callToAction: posterJson.CallToAction?.text || "",
      designHints: posterJson.DesignHints || [],
      image: posterImage || "",
    };

    sessionStorage.setItem("posterData", JSON.stringify(posterData));

    const cat = sessionStorage.getItem("posterCategory") || "movie";

    navigate("/preview/poster", {
      state: { posterData, posterCategory: cat },
    });
  }, [posterJson, posterImage, navigate]);


  /* ---------------------------------------------------------
      PRESENTATION READY → EDITOR
  -----------------------------------------------------------*/
  useEffect(() => {
    if (!presentationJson || !slideImages) return;

    const presentationData = {
      title: presentationJson?.TitleSlide?.title || "Presentation",
      subtitle: presentationJson?.TitleSlide?.subtitle || "",
      agenda: presentationJson?.Agenda || [],
      slides: (presentationJson?.Slides || []).map((slide, i) => ({
        heading: slide.heading || "Slide",
        bullets: slide.bullets || [],
        highlight: slide.highlight || "",
        image: slideImages[i] || "",
      })),
      conclusion: presentationJson?.Conclusion || [],
      callToAction: presentationJson?.CallToAction || "Get Started Today!",
    };

    sessionStorage.setItem(
      "presentationData",
      JSON.stringify(presentationData)
    );

    navigate("/editor/presentation", { state: { presentationData } });
  }, [presentationJson, slideImages, navigate]);


  const isLoading = blogLoading || posterLoading || presLoading;
  const error = blogError || posterError || presError;


  return (
    <>
      <Navbar isBtnReq={false} />

      {isLoading && (
        <>
          <Loader />
          <p style={{ textAlign: "center", marginTop: 10 }}>
            Generating your AI-powered {type}...
          </p>
        </>
      )}

      <AiGeneratorInput onGenerate={handleGenerate} />

      <SamplePrompts/>

      {error && (
        <div
          style={{
            padding: "14px",
            marginTop: "20px",
            borderRadius: "8px",
            background: "#ffebee",
            color: "#b71c1c",
          }}
        >
          <strong>Error:</strong> {error}
        </div>
      )}
    </>
  );
}
