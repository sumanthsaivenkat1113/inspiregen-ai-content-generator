import React from "react";
import "../hero-sec-video-content//HeroSectionVideoContent.css";
import posterVideo from "../../assets/videos/poster-video/posterVideo.mp4"
import { useNavigate } from "react-router-dom";

export default function HeroSectionVideoContentPoster() {
  const navigate = useNavigate(); 
    const handleGenerateClick = () => {
      navigate("/"); 
      window.scrollTo(0, 0);
    };
  return (
    <section className="hero">
      <div className="hero__content">
        <h1 className="hero__title">AI Powered Poster Generator</h1>
        <p className="hero__subtitle">
          Transform your ideas into stunning posters with InspireGen’s smart
          design engine — fast, beautiful, and professional.
        </p>
      </div>

      <div className="hero__video">
        <video
          className="hero__video-element"
          src={posterVideo}
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
