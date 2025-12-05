import BlogEditorPanel from "../../Blog-Editor-Panel/BlogEditorPanel";
import "./RightEditorPanel.css";

export default function RightEditorPanel({
  activeElement,
  data,
  updateElement,
  updateImageFile,
  deleteElement,
}) {
  return (
    <div className="blog-right-panel">
      <BlogEditorPanel
        activeElement={activeElement}
        data={data}
        updateElement={updateElement}
        updateImageFile={updateImageFile}
        deleteElement={deleteElement}
      />
    </div>
  );
}
