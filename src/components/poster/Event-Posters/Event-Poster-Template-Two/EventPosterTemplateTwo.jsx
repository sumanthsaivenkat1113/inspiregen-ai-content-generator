
import "./EventPosterTemplateTwo.css";
export default function EventPosterTemplateTwo({
    title,
    tagline,
    message,
    image,
    date = "Coming Soon!",
    venue = "Downtown Gallery",
    callToAction,
    styles = {},
    onSelect,
    activeElement
}) {

    // SAFE getter for all style blocks
    const safe = (key) => ({
        ...(styles[key] || {}),
        rotate: styles[key]?.rotate || 0
    });

    return (
        <div className="EventPosterTemplateTwo_poster-container-v2">

            {/* Background visuals */}
            <div className="background-wave-abstract wave-1"></div>
            <div className="background-wave-abstract wave-2"></div>
            <div className="background-splatter"></div>

            {/* HEADER */}
            <header className="EventPosterTemplateTwo_header">

                {/* TITLE */}
                <h1
                    className={`EventPosterTemplateTwo_title poster-element ${
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
                    className={`EventPosterTemplateTwo_tagline poster-element ${
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
            <section className="EventPosterTemplateTwo_main-content">

                {/* IMAGE */}
                <div className="EventPosterTemplateTwo_image-mask">
                    <img
                        src={image}
                        alt="Poster Main Visual"
                        className={`EventPosterTemplateTwo_main-image poster-element ${
                            activeElement === "image" ? "active-element" : ""
                        }`}
                        style={{
                            width: (styles?.image?.width || 100) + "%",
                            transform: `rotate(${styles?.image?.rotate || 0}deg)`
                        }}
                        onClick={() => onSelect("image")}
                    />
                </div>

                {/* MESSAGE */}
                <p
                    className={`EventPosterTemplateTwo_message poster-element ${
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

                {/* EVENT DETAILS */}
                <div className="EventPosterTemplateTwo_event-details">

                    {/* DATE */}
                    <div
                        className={`EventPosterTemplateTwo_detail-item poster-element ${
                            activeElement === "date" ? "active-element" : ""
                        }`}
                        style={{
                            ...safe("date"),
                            transform: `rotate(${safe("date").rotate}deg)`
                        }}
                        onClick={() => onSelect("date")}
                    >
                        <i className="fas fa-calendar-alt"></i>
                        <span>Date: {date}</span>
                    </div>

                    {/* VENUE */}
                    <div
                        className={`EventPosterTemplateTwo_detail-item poster-element ${
                            activeElement === "venue" ? "active-element" : ""
                        }`}
                        style={{
                            ...safe("venue"),
                            transform: `rotate(${safe("venue").rotate}deg)`
                        }}
                        onClick={() => onSelect("venue")}
                    >
                        <i className="fas fa-map-marker-alt"></i>
                        <span>Venue: {venue}</span>
                    </div>
                </div>
            </section>

            {/* FOOTER CTA */}
            <footer className="EventPosterTemplateTwo_footer">
                <div
                    className={`EventPosterTemplateTwo_cta poster-element ${
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
