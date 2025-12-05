import BlogTemplateSelector from "../../Blog-Template-Selector/BlogTemplateSelector";
import "./LeftPanel.css";

export default function LeftPanel({ selectedTemplate, setSelectedTemplate, availableTemplates }) {
  return (
    <div className="left-panel">
      <BlogTemplateSelector
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
        availableTemplates={availableTemplates}
      />
    </div>
  );
}
