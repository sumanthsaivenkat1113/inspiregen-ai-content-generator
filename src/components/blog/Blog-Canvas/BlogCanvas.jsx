import BlogTemplateOne from "../blog-template-one/blog";
// import "./blogCanvas.css"; // minimal CSS (selection outline etc.)

export default function BlogCanvas({ data, selectedTemplate, setActiveElement, activeElement }) {
  // currently we only have BlogTemplateOne; can switch by template
  return (
    <div className="blog-canvas"
      style={{ background: "#fff", padding: 24, borderRadius: 8 }}
    >
      {selectedTemplate === "template1" && (
        <BlogTemplateOne
          data={data}
          styles={data.styles}
          onElementClick={(key) => setActiveElement(key)}
          activeElement={activeElement}
        />
      )}

      {/* future templates */}
      {selectedTemplate === "template2" && (
        <div style={{ padding: 20 }}>
          <h3>Template 2 (coming)</h3>
          {/* you could create a new BlogTemplateTwo similarly */}
          <BlogTemplateOne
            data={data}
            styles={data.styles}
            onElementClick={(key) => setActiveElement(key)}
            activeElement={activeElement}
          />
        </div>
      )}
    </div>
  );
}
