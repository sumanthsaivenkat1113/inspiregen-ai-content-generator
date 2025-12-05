import React from "react";
import "./About.css";
import profilePic from "../../assets/Profile.jpeg";

export default function About() {
  return (
    <section className="about">
      <div className="about__container fade-in">
        <div className="about__image">
          <img
            src={profilePic}
            alt="Gunji Sumanth - Full-Stack Developer"
            className="about__photo"
          />
        </div>

        <div className="about__content">
          <h1 className="about__title">
            Hi, I’m <span>Gunji Sumanth</span> 👋
          </h1>
          <h3 className="about__subtitle">Full-Stack Developer | AI Enthusiast</h3>

          <p className="about__text">
            I’m a B.Tech CSE graduate passionate about building modern and
            intelligent web applications. I enjoy turning ideas into interactive,
            real-world solutions using technologies like React, Node.js, Flask, and
            Python. Always learning, exploring AI innovations, and seeking
            opportunities to collaborate on impactful projects.
          </p>

          <div className="about__socials">
            <a
              href="https://github.com/YOUR_GITHUB"
              target="_blank"
              rel="noopener noreferrer"
              className="about__btn github"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/YOUR_LINKEDIN"
              target="_blank"
              rel="noopener noreferrer"
              className="about__btn linkedin"
            >
              LinkedIn
            </a>
            <a
              href="https://x.com/YOUR_TWITTER"
              target="_blank"
              rel="noopener noreferrer"
              className="about__btn x"
            >
              X (Twitter)
            </a>
            <a
              href="https://yourportfolio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="about__btn portfolio"
            >
              Portfolio
            </a>
            <a
              href="mailto:youremail@gmail.com"
              className="about__btn email"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
