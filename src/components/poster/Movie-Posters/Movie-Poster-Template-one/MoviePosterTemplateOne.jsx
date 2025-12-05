import "./MoviePosterTemplateOne.css";
export default function MoviePosterTemplateOneV2({
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
        transform: `rotate(${styles[key]?.rotate || 0}deg)`,
    });

    const imageStyle = {
        ...getStyle("image"),
        ...(image && { backgroundImage: `url('${image}')`, width : '100%' }),
    };

    return (
        <div className="movieV2-container">

            {/* Background image */}
            <div
                className={`movieV2-bg poster-element ${activeElement === "image" ? "active-element" : ""}`}
                style={imageStyle}
                onClick={() => onSelect("image")}
            ></div>

            {/* Gradient overlay */}
            <div className="movieV2-overlay"></div>

            {/* Content */}
            <div className="movieV2-content">

                {/* Title */}
                <h1
                    className={`movieV2-title poster-element ${activeElement === "title" ? "active-element" : ""}`}
                    style={getStyle("title")}
                    onClick={() => onSelect("title")}
                >
                    {title}
                </h1>

                {/* Tagline */}
                <p
                    className={`movieV2-tagline poster-element ${activeElement === "tagline" ? "active-element" : ""}`}
                    style={getStyle("tagline")}
                    onClick={() => onSelect("tagline")}
                >
                    {tagline }
                </p>

                {/* Center Message */}
                <p
                    className={`movieV2-message poster-element ${activeElement === "message" ? "active-element" : ""}`}
                    style={getStyle("message")}
                    onClick={() => onSelect("message")}
                >
                    {message}
                </p>

                {/* CTA */}
                <p
                    className={`movieV2-cta poster-element ${activeElement === "callToAction" ? "active-element" : ""}`}
                    style={getStyle("callToAction")}
                    onClick={() => onSelect("callToAction")}
                >
                    {callToAction}
                </p>

            </div>
        </div>
    );
}
