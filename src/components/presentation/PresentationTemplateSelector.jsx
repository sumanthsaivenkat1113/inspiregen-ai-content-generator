import "./PresentationTemplateSelector.css";

export default function PresentationTemplateSelector({ selectedTemplate, setSelectedTemplate }) {
  const templates = ["template1"];

  return (
    <div className="presentation-template-selector">
      <h4 style={{ marginTop: 0 }}>Templates</h4>

      {templates.map((t) => (
        <div
          key={t}
          className={`template-item ${selectedTemplate === t ? "template-selected" : ""}`}
          onClick={() => setSelectedTemplate(t)}
        >
          {t}
        </div>
      ))}
    </div>
  );
}
