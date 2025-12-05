import BlogCanvas from "../../Blog-Canvas/BlogCanvas";
import "./CenterCanvas.css";
export default function CenterCanvas({ data, selectedTemplate, activeElement, setActiveElement }) {
  return (
    <div className="center-canvas" >
      <BlogCanvas
        data={data}
        selectedTemplate={selectedTemplate}
        activeElement={activeElement}
        setActiveElement={setActiveElement}
      />
    </div>
  );
}
