import "./HeroSectionVideoContent.css";
import inspireGenHome from "../../assets/videos/main-video/inspireGenHome.mp4";
import { useNavigate } from "react-router-dom";

export default function HeroSectionVideoContent() {
  const navigate = useNavigate(); 
  const handleGenerateClick = () => {
    navigate("/"); 
    window.scrollTo(0, 0);
  };
  return (
    <section className="hero">
      <div className="hero__content">
        <h1 className="hero__title">AI Powered Generator</h1>
        <p className="hero__subtitle">
          Powered by advanced AI and free image APIs like Pexels, Pixabay and Unsplash
          InspireGen helps you create faster and design smarter.
        </p>
      </div>

      <div className="hero__video">
        <video
          className="hero__video-element"
          src={inspireGenHome}
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
