import React from "react";
import "./Note.css";

export default function Note() {
  return (
    <div className="note">
      <div className="note__icon">⚠️</div>
      <div className="note__content">
        <h3 className="note__title">Important Notice</h3>
        <p className="note__text">
          You can generate a limited number of blogs, posters, and presentations.  
          Since the app uses free APIs, only a limited number of requests are allowed.  
          Please use your generations wisely!
        </p>
      </div>
    </div>
  );
}
