import "./Advertisement-Poster-Template-One.css";
export default function AdvertisementPosterTemplateOne({
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
        <div className="AdvertisementPosterTemplateOne_container">

            {/* TOP GRADIENT STRIP */}
            <div className="AdvertisementPosterTemplateOne_top-strip" />

            {/* DISCOUNT BADGE */}
            <div
                className={`AdvertisementPosterTemplateOne_badge poster-element ${activeElement === "badge" ? "active-element" : ""}`}
                style={getStyle("badge")}
                onClick={() => onSelect("badge")}
            >
                {badgeContent}
            </div>

            {/* TITLE + TAGLINE */}
            <header className="AdvertisementPosterTemplateOne_header">
                <h1
                    className={`AdvertisementPosterTemplateOne_title poster-element ${activeElement === "title" ? "active-element" : ""}`}
                    style={getStyle("title")}
                    onClick={() => onSelect("title")}
                >
                    {title}
                </h1>

                <p
                    className={`AdvertisementPosterTemplateOne_tagline poster-element ${activeElement === "tagline" ? "active-element" : ""}`}
                    style={getStyle("tagline")}
                    onClick={() => onSelect("tagline")}
                >
                    {tagline}
                </p>
            </header>

            {/* IMAGE */}
            <div
                className="AdvertisementPosterTemplateOne_image-wrapper"
                onClick={() => onSelect("image")}
            >
                <img
                    src={image}
                    alt="Ad visual"
                    className={`AdvertisementPosterTemplateOne_image poster-element ${activeElement === "image" ? "active-element" : ""}`}
                    style={{
                        ...getStyle("image"),
                        width: styles.image?.width ? styles.image.width + "%" : "100%",
                    }}
                />
            </div>

            {/* MESSAGE */}
            <p
                className={`AdvertisementPosterTemplateOne_message poster-element ${activeElement === "message" ? "active-element" : ""}`}
                style={getStyle("message")}
                onClick={() => onSelect("message")}
            >
                {message}
            </p>

            {/* CTA */}
            <div
                className={`AdvertisementPosterTemplateOne_cta poster-element ${activeElement === "callToAction" ? "active-element" : ""}`}
                style={getStyle("callToAction")}
                onClick={() => onSelect("callToAction")}
            >
                {callToAction}
            </div>

            {/* BOTTOM GRADIENT */}
            <div className="AdvertisementPosterTemplateOne_bottom-strip" />
        </div>
    );
}
