import "./PosterPreview.css";
export default function TemplateSelector({
  selectedTemplate,
  setSelectedTemplate,
  availableTemplates = [],
  posterCategory
}) {
  return (
    <aside className="sidebar-left">
      <h3 className="panel-title">Templates — {posterCategory?.toUpperCase()}</h3>

      {availableTemplates.map((t, i) => (
        <div
          key={t}
          className={`template-option ${selectedTemplate === t ? "active" : ""}`}
          onClick={() => setSelectedTemplate(t)}
        >
          {`Template ${i + 1}`}
        </div>
      ))}
    </aside>
  );
}
