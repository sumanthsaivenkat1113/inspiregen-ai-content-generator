export default function SlideItem({
  slide,
  index,
  active,
  onSelect,
  onMoveUp,
  onMoveDown,
  onDelete
}) {
  return (
    <div
      onClick={onSelect}
      style={{
        padding: 10,
        borderRadius: 8,
        background: active ? "#eef2ff" : "#fff",
        border: "1px solid #e5e7eb",
        marginBottom: 8,
        cursor: "pointer"
      }}
    >
      <strong>{slide.heading || `Slide ${index + 1}`}</strong>

      <div style={{ marginTop: 8, display: "flex", gap: 6 }}>
        <button disabled={index === 0} onClick={(e) => { e.stopPropagation(); onMoveUp(); }}>↑</button>
        <button
          disabled={false}
          onClick={(e) => { e.stopPropagation(); onMoveDown(); }}
        >↓</button>
        <button onClick={(e) => { e.stopPropagation(); onDelete(); }} style={{ color: "red" }}>
          Delete
        </button>
      </div>
    </div>
  );
}
