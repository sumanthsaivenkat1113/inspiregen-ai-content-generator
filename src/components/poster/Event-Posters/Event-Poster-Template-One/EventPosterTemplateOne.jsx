import "./EventPosterTemplateOne.css";
export default function EventPosterTemplateOne({ title, tagline, message, image, callToAction, styles, onSelect, activeElement }) {
    return (
        <>
            <div className="EventPosterTemplateOne_poster-container-v2">
                <div className="EventPosterTemplateOne_dynamic-shape EventPosterTemplateOne_shape-1"></div>
                <div className="EventPosterTemplateOne_dynamic-shape EventPosterTemplateOne_shape-2"></div>
                <div className="EventPosterTemplateOne_dynamic-shape EventPosterTemplateOne_shape-3"></div>

                <header className="EventPosterTemplateOne_header">
                    <h1
                        className={`EventPosterTemplateOne_title poster-element ${activeElement === "title" ? "active-element" : ""}`}
                        // FIX: Use transform for rotation
                        style={{ ...styles.title, transform: `rotate(${styles.title.rotate}deg)` }}
                        onClick={() => onSelect("title")}
                    >
                        {title}
                    </h1>

                    <p
                        className={`EventPosterTemplateOne_tagline poster-element ${activeElement === "tagline" ? "active-element" : ""}`}
                        // FIX: Use transform for rotation
                        style={{ ...styles.tagline, transform: `rotate(${styles.tagline.rotate}deg)` }}
                        onClick={() => onSelect("tagline")}
                    >
                        {tagline}
                    </p>
                </header>

                <section className="EventPosterTemplateOne_main-content">
                    <div
                        className="EventPosterTemplateOne_image-clip"
                    >
                        <img
                            src={image}
                            className={`EventPosterTemplateOne_festival-image poster-element ${activeElement === "image" ? "active-element" : ""}`}
                            style={{ width: styles.image.width + "%", transform: `rotate(${styles.image.rotate}deg)` }}
                            onClick={() => onSelect("image")}
                        />
                    </div>

                    <p
                        className={`EventPosterTemplateOne_message poster-element ${activeElement === "message" ? "active-element" : ""}`}
                        // FIX: Use transform for rotation
                        style={{ ...styles.message, transform: `rotate(${styles.message.rotate}deg)` }}
                        onClick={() => onSelect("message")}
                    >
                        {message}
                    </p>
                </section>

                <footer className="EventPosterTemplateOne_footer">
                    <div
                        className={`EventPosterTemplateOne_cta poster-element ${activeElement === "callToAction" ? "active-element" : ""}`}
                        // FIX 1: Change onSelect key to "callToAction"
                        onClick={() => onSelect("callToAction")}
                        // FIX 2: Correctly apply styles using 'callToAction' key and apply transform for rotation
                        style={{
                            ...styles.callToAction,
                            transform: `rotate(${styles.callToAction.rotate}deg)`
                        }}
                    >
                        <p>{callToAction}</p>
                    </div>
                </footer>
            </div>
        </>
    );
}