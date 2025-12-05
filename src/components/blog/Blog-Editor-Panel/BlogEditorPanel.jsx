import "./BlogEditorPanel.css";
import BlogTextEditorTools from "./tools/BlogTextEditorTools";
import BlogImageEditorTools from "./tools/BlogImageEditorTools";

export default function BlogEditorPanel({
  activeElement,
  data,
  updateElement,
  updateImageFile,
  deleteElement
}) {

  if (!activeElement) {
    return (
      <div className="sidebar-right">
        <h2>Select a part of the blog to edit</h2>
      </div>
    );
  }

  const isImage =
    activeElement === "headerImage" || activeElement.startsWith("image_");

  const value = (() => {
    if (activeElement === "header") return data.header;
    if (activeElement === "introduction") return data.introduction;
    if (activeElement === "conclusion") return data.conclusion;

    if (activeElement.startsWith("subHeading_")) {
      const i = Number(activeElement.split("_")[1]);
      return data.contentSections[i]?.subHeading || "";
    }

    if (activeElement.startsWith("content_")) {
      const i = Number(activeElement.split("_")[1]);
      return data.contentSections[i]?.content || "";
    }

    return "";
  })();

  const styles = data.styles?.[activeElement] || {};

  return (
    <div className="sidebar-right">
      <h2>Edit: {activeElement}</h2>

      <div className="editor-section">
        {isImage ? (
          <BlogImageEditorTools
            styles={styles}
            updateElement={(upd) => updateElement(activeElement, upd)}
            updateImageFile={(file) => updateImageFile(activeElement, file)}
          />
        ) : (
          <BlogTextEditorTools
            text={value}
            styles={styles}
            updateElement={(upd) => updateElement(activeElement, upd)}
          />
        )}
      </div>

      <button
        className="EditorPanel_delete-btn"
        onClick={() => deleteElement(activeElement)}
      >
        Delete Element
      </button>
    </div>
  );
}
