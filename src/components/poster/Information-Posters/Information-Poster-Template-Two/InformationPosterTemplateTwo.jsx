import "./InformationPosterTemplateTwo.css";
export default function InformationPosterTemplateTwo({
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
        <div className="InformationPosterTemplateTwo_v5_container">

            {/* HEADER */}
            <header className="InformationPosterTemplateTwo_v5_header">
                <h1
                    className={`InformationPosterTemplateTwo_v5_title poster-element ${activeElement === "title" ? "active-element" : ""}`}
                    onClick={() => onSelect("title")}
                    style={getStyle("title")}
                >
                    {title }
                </h1>

                <div className="InformationPosterTemplateTwo_v5_title-underline"></div>

                <p
                    className={`InformationPosterTemplateTwo_v5_tagline poster-element ${activeElement === "tagline" ? "active-element" : ""}`}
                    onClick={() => onSelect("tagline")}
                    style={getStyle("tagline")}
                >
                    {tagline }
                </p>
            </header>

            {/* IMAGE */}
            <div
                className="InformationPosterTemplateTwo_v5_image-wrapper"
                onClick={() => onSelect("image")}
            >
                <img
                    src={image}
                    alt="Nature editorial"
                    className={`InformationPosterTemplateTwo_v5_image poster-element ${activeElement === "image" ? "active-element" : ""}`}
                    style={getStyle("image")}
                />
            </div>

            {/* MESSAGE */}
            <p
                className={`InformationPosterTemplateTwo_v5_message poster-element ${activeElement === "message" ? "active-element" : ""}`}
                onClick={() => onSelect("message")}
                style={getStyle("message")}
            >
                {message }
            </p>

            {/* CTA */}
            <footer className="InformationPosterTemplateTwo_v5_footer">
                <button
                    className={`InformationPosterTemplateTwo_v5_cta poster-element ${activeElement === "callToAction" ? "active-element" : ""}`}
                    onClick={() => onSelect("callToAction")}
                    style={getStyle("callToAction")}
                >
                    {callToAction }
                </button>
            </footer>
        </div>
    );
}
