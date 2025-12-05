
import "./InformationPosterTemplateOne.css";
export default function InformationPosterTemplateOne({
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
        <div className="InformationPosterTemplateOne_container">

            {/* HEADER */}
            <header className="InformationPosterTemplateOne_header">
                <h1
                    className={`InformationPosterTemplateOne_title poster-element ${
                        activeElement === "title" ? "active-element" : ""
                    }`}
                    style={getStyle("title")}
                    onClick={() => onSelect("title")}
                >
                    {title}
                </h1>

                <p
                    className={`InformationPosterTemplateOne_tagline poster-element ${
                        activeElement === "tagline" ? "active-element" : ""
                    }`}
                    style={getStyle("tagline")}
                    onClick={() => onSelect("tagline")}
                >
                    {tagline}
                </p>
            </header>

            {/* IMAGE */}
            <div
                className="InformationPosterTemplateOne_image-wrapper"
                onClick={() => onSelect("image")}
            >
                <img
                    src={image}
                    alt="Main visual"
                    className={`InformationPosterTemplateOne_image poster-element ${
                        activeElement === "image" ? "active-element" : ""
                    }`}
                    style={getStyle("image")}
                />
            </div>

            {/* MESSAGE */}
            <p
                className={`InformationPosterTemplateOne_message poster-element ${
                    activeElement === "message" ? "active-element" : ""
                }`}
                style={getStyle("message")}
                onClick={() => onSelect("message")}
            >
                {message }
            </p>

            {/* CTA */}
            <footer className="InformationPosterTemplateOne_footer">
                <div
                    className={`InformationPosterTemplateOne_cta poster-element ${
                        activeElement === "callToAction" ? "active-element" : ""
                    }`}
                    style={getStyle("callToAction")}
                    onClick={() => onSelect("callToAction")}
                >
                    {callToAction }
                </div>
            </footer>
        </div>
    );
}
