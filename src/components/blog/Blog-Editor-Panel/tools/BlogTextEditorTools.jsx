export default function BlogTextEditorTools({ text, styles, updateElement }) {
  return (
    <>
      <label>Text</label>
      <textarea
        value={text}
        onChange={(e) => updateElement({ text: e.target.value })}
      />

      <label>Font Size</label>
      <input
        type="range"
        min="12"
        max="80"
        value={styles.fontSize || 24}
        onChange={(e) => updateElement({ fontSize: Number(e.target.value) })}
      />

      <label>Font Weight</label>
      <select
        value={styles.fontWeight || 400}
        onChange={(e) =>
          updateElement({ fontWeight: Number(e.target.value) })
        }
      >
        <option value="300">Light</option>
        <option value="400">Regular</option>
        <option value="600">Semi Bold</option>
        <option value="700">Bold</option>
        <option value="900">Heavy</option>
      </select>

      <label>Text Color</label>
      <input
        type="color"
        value={styles.color || "#000000"}
        onChange={(e) => updateElement({ color: e.target.value })}
      />

      <label>Rotation</label>
      <input
        type="range"
        min="-45"
        max="45"
        value={styles.rotate || 0}
        onChange={(e) => updateElement({ rotate: Number(e.target.value) })}
      />
    </>
  );
}
