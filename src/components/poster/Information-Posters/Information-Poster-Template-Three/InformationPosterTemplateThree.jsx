import "./InformationPosterTemplateThree.css";
import React from "react";
export default function InformationPosterTemplateThree({
    title,
    tagline,
    message,
    image,
    callToAction,
    styles,
    onSelect,
    activeElement,
}) {
    const getStyle = (key) => ({
        ...(styles[key] || {}),
        transform: `rotate(${styles[key]?.rotate || 0}deg)`
    });

    return (
        <div className="InformationPosterTemplateThree_magazine-container">
            
            {/* Gradient Background Circle */}
            <div className="InformationPosterTemplateThree_bg-accent"></div>

            {/* Header */}
            <header className="InformationPosterTemplateThree_header-v5">
                <h1
                    className={`InformationPosterTemplateThree_title-v5 poster-element ${activeElement === "title" ? "active-element" : ""}`}
                    style={getStyle("title")}
                    onClick={() => onSelect("title")}
                >
                    {title }
                </h1>

                <p
                    className={`InformationPosterTemplateThree_tagline-v5 poster-element ${activeElement === "tagline" ? "active-element" : ""}`}
                    style={getStyle("tagline")}
                    onClick={() => onSelect("tagline")}
                >
                    {tagline }
                </p>
            </header>

            {/* Image Section */}
            <div 
                className="InformationPosterTemplateThree_imageFrame-v5"
                onClick={() => onSelect("image")}
            >
                <img
                    src={image }
                    className={`InformationPosterTemplateThree_mainImage-v5 poster-element ${activeElement === "image" ? "active-element" : ""}`}
                    alt="Editorial wellness visual"
                    style={getStyle("image")}
                />
            </div>

            {/* Main Message */}
            <p
                className={`InformationPosterTemplateThree_message-v5 poster-element ${activeElement === "message" ? "active-element" : ""}`}
                style={getStyle("message")}
                onClick={() => onSelect("message")}
            >
                {message }
            </p>

            {/* CTA */}
            <div 
                className={`InformationPosterTemplateThree_footerCTA-v5 poster-element ${activeElement === "callToAction" ? "active-element" : ""}`}
                onClick={() => onSelect("callToAction")}
                style={getStyle("callToAction")}
            >
                {callToAction }
            </div>
        </div>
    );
}
