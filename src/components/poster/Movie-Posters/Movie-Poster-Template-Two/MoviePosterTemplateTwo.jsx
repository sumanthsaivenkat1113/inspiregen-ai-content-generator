import "./MoviePosterTemplateTwo.css";
import React, { useEffect, useRef } from 'react';
const getStyle = (styles, key) => ({
    ...(styles[key] || {}),
    transform: `rotate(${styles[key]?.rotate || 0}deg)`,
});
export default function MoviePosterTemplateTwo({
    title,
    tagline,
    message,
    image,
    callToAction,
    styles = {},
    onSelect,
    activeElement,
}) {
    const sparkContainerRef = useRef(null);
    const defaultTitle = "NOVOCAINE";

    // Effect to handle the dynamic 'spark' generation
    useEffect(() => {
        const poster = sparkContainerRef.current;
        if (!poster) return;

        function createSpark() {
            // 1. Create the DOM element
            const spark = document.createElement('div');
            spark.classList.add('MoviePosterTemplateTwo_spark');
            
            // 2. Set dynamic styles (replicating original JS logic)
            // --x drives the horizontal trajectory in the CSS animation
            const x = (Math.random() - 0.5) * 300; 
            spark.style.setProperty('--x', x + 'px');
            spark.style.left = (Math.random() * 100) + '%';
            spark.style.top = '85%';

            // 3. Append to the DOM
            poster.appendChild(spark);

            // 4. Clean up (remove element after animation finishes)
            // Animation duration is 2000ms (2s) in CSS
            setTimeout(() => spark.remove(), 2000);
        }

        // Start the continuous spark creation interval (every 300ms)
        const intervalId = setInterval(createSpark, 300);

        // Cleanup: Clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []); // Run only once on mount

    const midLayerStyle = {
        ...getStyle(styles, "image"),
        // If an image URL is provided via prop, override the default CSS background image
        ...(image && { backgroundImage: `url('${image}')`, width : '100%' })
    };

    return (
        <div className="MoviePosterTemplateTwo_poster-v3" ref={sparkContainerRef}>
            
            {/* Back Layer */}
            <div className="MoviePosterTemplateTwo_layer MoviePosterTemplateTwo_layer-back"></div>

            {/* Mid Layer - Hero Image (Editable via props/onSelect) */}
            <div
                className={`MoviePosterTemplateTwo_layer MoviePosterTemplateTwo_layer-mid poster-element ${activeElement === "image" ? "active-element" : ""}`}
                style={midLayerStyle}
                onClick={() => onSelect("image")}
            >
                {/* Image is set via CSS background-image */}
            </div>

            {/* Front Layer - Content */}
            <div className="MoviePosterTemplateTwo_layer MoviePosterTemplateTwo_layer-front">
                
                {/* Title with Floating Letters */}
                <h1
                    className={`MoviePosterTemplateTwo_title-v3 poster-element ${activeElement === "title" ? "active-element" : ""}`}
                    style={getStyle(styles, "title")}
                    onClick={() => onSelect("title")}
                >
                    {title}
                </h1>

                {/* Tagline */}
                <p
                    className={`MoviePosterTemplateTwo_tagline-v3 poster-element ${activeElement === "tagline" ? "active-element" : ""}`}
                    style={getStyle(styles, "tagline")}
                    onClick={() => onSelect("tagline")}
                >
                    {tagline }
                </p>

                {/* Main Message */}
                <p
                    className={`MoviePosterTemplateTwo_message-v3 poster-element ${activeElement === "message" ? "active-element" : ""}`}
                    style={getStyle(styles, "message")}
                    onClick={() => onSelect("message")}
                >
                    {message }
                </p>

                {/* CTA */}
                <div
                    className={`MoviePosterTemplateTwo_cta-v3 poster-element ${activeElement === "callToAction" ? "active-element" : ""}`}
                    style={getStyle(styles, "callToAction")}
                    onClick={() => onSelect("callToAction")}
                >
                    {callToAction }
                </div>
            </div>
        </div>
    );
}