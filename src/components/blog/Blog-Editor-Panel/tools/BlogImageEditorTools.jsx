export default function BlogImageEditorTools({
  styles,
  updateElement,
  updateImageFile
}) {
  return (
    <>
      <label>Replace Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => updateImageFile(e.target.files[0])}
      />

      <label>Image Size</label>
      <input
        type="range"
        min="50"
        max="300"
        value={styles.width || 150}
        onChange={(e) => updateElement({ width: Number(e.target.value) })}
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
