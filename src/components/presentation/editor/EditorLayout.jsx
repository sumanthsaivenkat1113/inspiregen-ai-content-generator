
import "./EditorLayout.css";
export default function EditorLayout({ left, center, right }) {
  return (
    <div className="editor-layout">
      <div className="editor-left">{left}</div>

      <div className="editor-center-wrapper">
        <div className="editor-center-scroll">{center}</div>
      </div>

      <div className="editor-right">{right}</div>
    </div>
  );
}
