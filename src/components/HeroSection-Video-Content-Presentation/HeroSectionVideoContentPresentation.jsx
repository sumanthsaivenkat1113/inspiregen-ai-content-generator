import React from "react";
import "../hero-sec-video-content//HeroSectionVideoContent.css";
import presentationVideo from "../../assets/videos/presentation-video/presentationVideo.mp4"
import { useNavigate } from "react-router-dom";

export default function HeroSectionVideoContentPresentation() {
  const navigate = useNavigate(); 
        const handleGenerateClick = () => {
          navigate("/"); 
          window.scrollTo(0, 0);
        };
  return (
    <section className="hero">
      <div className="hero__content">
        <h1 className="hero__title">AI Powered Presentation Generator</h1>
        <p className="hero__subtitle">
          Build professional, ready-to-present slides effortlessly using
          InspireGen — powered by AI and stunning free visuals.

        </p>
      </div>

      <div className="hero__video">
        <video
          className="hero__video-element"
          src={presentationVideo}
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
      <div className="hero__content">
        <button className="hero__btn" onClick={handleGenerateClick}>Generate Content</button>
      </div>
    </section>
  );
}
