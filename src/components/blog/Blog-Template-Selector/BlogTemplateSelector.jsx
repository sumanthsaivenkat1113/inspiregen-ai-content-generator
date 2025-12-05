export default function BlogTemplateSelector({ selectedTemplate, setSelectedTemplate, availableTemplates }) {
  return (
    <div style={{ padding: 12 }}>
      <h4 style={{ marginBottom: 10 }}>Templates</h4>
      {availableTemplates.map(t => (
        <button
          key={t}
          onClick={() => setSelectedTemplate(t)}
          style={{
            display: "block",
            width: "100%",
            padding: "10px 12px",
            marginBottom: 8,
            textAlign: "left",
            borderRadius: 8,
            border: selectedTemplate === t ? "2px solid #2563eb" : "1px solid #e5e7eb",
            background: selectedTemplate === t ? "#eff6ff" : "#fff",
            cursor: "pointer"
          }}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
