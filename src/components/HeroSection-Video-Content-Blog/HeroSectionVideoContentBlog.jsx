import React from "react";
import "../hero-sec-video-content//HeroSectionVideoContent.css";
import blogVideo from "../../assets/videos/blog-video/blogVideo.mp4"
import { useNavigate } from "react-router-dom";

export default function HeroSectionVideoContentBlogt() {
  const navigate = useNavigate(); 
      const handleGenerateClick = () => {
        navigate("/"); 
        window.scrollTo(0, 0);
      };
  return (
    <section className="hero">
      <div className="hero__content">
        <h1 className="hero__title">AI Powered Blog Generator</h1>
        <p className="hero__subtitle">
          Craft engaging, SEO-friendly blogs in seconds with InspireGen.
          Powered by AI and enhanced with free visuals from  Pexels, Pixabay and Unsplash.
        </p>
      </div>

      <div className="hero__video">
              <video
                className="hero__video-element"
                src={blogVideo}
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
