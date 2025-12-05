
import "./EventPosterTemplateThree.css";
export default function EventPosterTemplateThree({
    title,
    tagline,
    message,
    image,
    callToAction,
    styles = {},
    onSelect,
    activeElement
}) {
    // Safe getter to avoid undefined rotate errors
    const safe = (key) => ({
        ...(styles[key] || {}),
        rotate: styles[key]?.rotate || 0
    });

    return (
        <div className="EventPosterTemplateThree_poster-container">

            {/* Background Effects */}
            <div className="EventPosterTemplateThree_grid-overlay"></div>
            <div className="EventPosterTemplateThree_light-beam EventPosterTemplateThree_beam-1"></div>
            <div className="EventPosterTemplateThree_light-beam EventPosterTemplateThree_beam-2"></div>
            <div className="EventPosterTemplateThree_light-beam EventPosterTemplateThree_beam-3"></div>

            {/* HEADER */}
            <header className="EventPosterTemplateThree_header">

                {/* TITLE */}
                <h1
                    className={`EventPosterTemplateThree_title poster-element ${
                        activeElement === "title" ? "active-element" : ""
                    }`}
                    style={{
                        ...safe("title"),
                        transform: `rotate(${safe("title").rotate}deg)`
                    }}
                    onClick={() => onSelect("title")}
                >
                    {title}
                </h1>

                {/* TAGLINE */}
                <p
                    className={`EventPosterTemplateThree_tagline poster-element ${
                        activeElement === "tagline" ? "active-element" : ""
                    }`}
                    style={{
                        ...safe("tagline"),
                        transform: `rotate(${safe("tagline").rotate}deg)`
                    }}
                    onClick={() => onSelect("tagline")}
                >
                    {tagline}
                </p>
            </header>

            {/* MAIN CONTENT */}
            <section className="EventPosterTemplateThree_main-content">

                {/* IMAGE */}
                <img
                    src={image}
                    alt="Poster Visual"
                    className={`EventPosterTemplateThree_main-image poster-element ${
                        activeElement === "image" ? "active-element" : ""
                    }`}
                    style={{
                        width: (styles?.image?.width || 100) + "%",
                        transform: `rotate(${styles?.image?.rotate || 0}deg)`
                    }}
                    onClick={() => onSelect("image")}
                />

                {/* ICON ROW (non-editable) */}
                <div className="EventPosterTemplateThree_icon-pulse">
                    <i className="fas fa-headphones-alt EventPosterTemplateThree_icon-item"></i>
                    <i className="fas fa-waveform EventPosterTemplateThree_icon-item"></i>
                    <i className="fas fa-drum-steelpan EventPosterTemplateThree_icon-item"></i>
                    <i className="fas fa-users-viewfinder EventPosterTemplateThree_icon-item"></i>
                </div>

                {/* MESSAGE */}
                <p
                    className={`EventPosterTemplateThree_message poster-element ${
                        activeElement === "message" ? "active-element" : ""
                    }`}
                    style={{
                        ...safe("message"),
                        transform: `rotate(${safe("message").rotate}deg)`
                    }}
                    onClick={() => onSelect("message")}
                >
                    {message}
                </p>
            </section>

            {/* FOOTER CTA */}
            <footer className="EventPosterTemplateThree_footer">
                <div
                    className={`EventPosterTemplateThree_cta poster-element ${
                        activeElement === "callToAction" ? "active-element" : ""
                    }`}
                    onClick={() => onSelect("callToAction")}
                    style={{
                        ...safe("callToAction"),
                        transform: `rotate(${safe("callToAction").rotate}deg)`
                    }}
                >
                    {callToAction}
                </div>
            </footer>
        </div>
    );
}
