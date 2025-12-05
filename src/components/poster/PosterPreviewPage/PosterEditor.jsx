import "./PosterPreview.css";

export default function PosterEditor({ formData, onChange }) {
    return (
        <aside className="sidebar-right">
            <h3 className="panel-title">Edit Poster</h3>

            {Object.entries(formData).map(([key, value]) => (
                <div key={key} className="form-group">
                    <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>

                    {key === "message" || key === "features" ? (
                        <textarea
                            value={value}
                            onChange={(e) => onChange(key, e.target.value)}
                        ></textarea>
                    ) : (
                        <input
                            value={value}
                            onChange={(e) => onChange(key, e.target.value)}
                        />
                    )}
                </div>
            ))}
        </aside>
    );
}
