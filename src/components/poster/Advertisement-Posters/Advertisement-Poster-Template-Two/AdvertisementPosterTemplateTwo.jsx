import "./AdvertisementPosterTemplateTwo.css";
export default function AdvertisementPosterTemplateTwo({
    title,
    tagline,
    message,
    image,
    callToAction,
    badgeContent,
    secondaryMessage,
    styles,
    onSelect,
    activeElement,
}) {
    const getStyle = (key) => ({
        ...(styles[key] || {}),
        transform: `rotate(${styles[key]?.rotate || 0}deg)`
    });

    return (
        <div className="AdPosterV5_container">
            {/* IMAGE BLOCK - Centered/Floating Image */}
           

            {/* HEADER / TITLE AREA */}
            <header className="AdPosterV5_header">
                <p
                    className={`AdPosterV5_tagline poster-element ${activeElement === "tagline" ? "active-element" : ""}`}
                    style={getStyle("tagline")}
                    onClick={() => onSelect("tagline")}
                >
                    {tagline}
                </p>
                <h1
                    className={`AdPosterV5_title poster-element ${activeElement === "title" ? "active-element" : ""}`}
                    style={getStyle("title")}
                    onClick={() => onSelect("title")}
                >
                    {title}
                </h1>
            </header>

             <div
                className="AdPosterV5_image-wrapper"
                onClick={() => onSelect("image")}
            >
                <img
                    src={image}
                    alt="Product Feature"
                    className={`AdPosterV5_image poster-element ${activeElement === "image" ? "active-element" : ""}`}
                    style={{
                        ...getStyle("image"),
                        width: styles.image?.width ? styles.image.width + "%" : "100%",
                    }}
                />
            </div>
            
            {/* MESSAGE / DESCRIPTION */}
            <section className="AdPosterV5_offer">
                <p
                    className={`AdPosterV5_message poster-element ${activeElement === "message" ? "active-element" : ""}`}
                    style={getStyle("message")}
                    onClick={() => onSelect("message")}
                >
                    {message}
                </p>
                <p
                    className={`AdPosterV5_secondary-message poster-element ${activeElement === "secondaryMessage" ? "active-element" : ""}`}
                    style={getStyle("secondaryMessage")}
                    onClick={() => onSelect("secondaryMessage")}
                >
                    {secondaryMessage}
                </p>
            </section>

            {/* CTA & BADGE FOOTER BAR */}
            <footer className="AdPosterV5_footer">
                <div 
                    className={`AdPosterV5_badge poster-element ${activeElement === "badgeContent" ? "active-element" : ""}`}
                    style={getStyle("badgeContent")}
                    onClick={() => onSelect("badgeContent")}
                >
                    {badgeContent}
                </div>
                <button
                    className={`AdPosterV5_cta poster-element ${activeElement === "callToAction" ? "active-element" : ""}`}
                    style={getStyle("callToAction")}
                    onClick={() => onSelect("callToAction")}
                >
                    {callToAction} <i className="fas fa-arrow-right"></i>
                </button>
            </footer>
        </div>
    );
}
