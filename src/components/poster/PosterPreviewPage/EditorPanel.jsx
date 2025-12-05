import "./EditorPanel.css";
import TextEditorTools from "./tools/TextEditorTools";
import ImageEditorTools from "./tools/ImageEditorTools";
export default function EditorPanel({
    activeElement,
    data,
    updateElement,
    updateImage,
    deleteElement
}) {
    if (!activeElement) {
        return (
            <div className="sidebar-right">
                <h2>Select an element to edit</h2>
            </div>
        );
    }
    const value = data[activeElement];
    const styles = data.styles[activeElement];
    const isImage = activeElement === "image";
    return (
        <div className="sidebar-right">
            <h2>Edit: {activeElement}</h2>

            <div className="editor-section">
                {isImage ? (
                    <ImageEditorTools
                        styles={styles}
                        updateElement={(upd) => updateElement("image", upd)}
                        updateImage={updateImage}
                    />
                ) : (
                    <TextEditorTools
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
