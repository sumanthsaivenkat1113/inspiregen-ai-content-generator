import "./AdvertisementPosterTemplateThree.css";
import React from "react";

export default function AdvertisementPosterTemplateThree({
    title,
    tagline,
    message,
    image,
    callToAction,
    badgeContent,
    styles,
    onSelect,
    activeElement,
}) {
    const getStyle = (key) => ({
        ...(styles[key] || {}),
        transform: `rotate(${styles[key]?.rotate || 0}deg)`,
    });

    return (
        <div className="AdTemplate3_container">
            {/* IMAGE + DISCOUNT */}
            <div
                className="AdTemplate3_imageSection"
                onClick={() => onSelect("image")}
            >
                <img
                    src={image}
                    alt="promo"
                    className={`AdTemplate3_image poster-element ${
                        activeElement === "image" ? "active-element" : ""
                    }`}
                    style={getStyle("image")}
                />

                <div
                    className={`AdTemplate3_discountTag poster-element ${
                        activeElement === "badgeContent" ? "active-element" : ""
                    }`}
                    style={getStyle("badgeContent")}
                    onClick={(e) => { e.stopPropagation(); onSelect("badgeContent"); }}
                >
                    {badgeContent}
                </div>
            </div>

            {/* HEADER */}
            <header className="AdTemplate3_header">
                <h1
                    className={`AdTemplate3_title poster-element ${
                        activeElement === "title" ? "active-element" : ""
                    }`}
                    style={getStyle("title")}
                    onClick={() => onSelect("title")}
                >
                    {title}
                </h1>

                <p
                    className={`AdTemplate3_tagline poster-element ${
                        activeElement === "tagline" ? "active-element" : ""
                    }`}
                    style={getStyle("tagline")}
                    onClick={() => onSelect("tagline")}
                >
                    {tagline}
                </p>
            </header>

            {/* MAIN CONTENT */}
            <section className="AdTemplate3_mainContent">
                <p
                    className={`AdTemplate3_message poster-element ${
                        activeElement === "message" ? "active-element" : ""
                    }`}
                    style={getStyle("message")}
                    onClick={() => onSelect("message")}
                >
                    {message}
                </p>

                <i
                    className={`fas fa-plane-up AdTemplate3_icon poster-element ${
                        activeElement === "icon" ? "active-element" : ""
                    }`}
                    style={getStyle("icon")}
                    onClick={() => onSelect("icon")}
                ></i>
            </section>

            {/* CTA */}
            <footer className="AdTemplate3_footer">
                <div
                    className={`AdTemplate3_cta poster-element ${
                        activeElement === "callToAction" ? "active-element" : ""
                    }`}
                    style={getStyle("callToAction")}
                    onClick={() => onSelect("callToAction")}
                >
                    {callToAction}
                </div>
            </footer>
        </div>
    );
}
