export default function ImageEditorTools({ styles, updateElement, updateImage }) {
    return (
        <>
            <label>Replace Image</label>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => updateImage(e.target.files[0])}
            />

            <label>Size</label>
            <input
                type="range"
                min="30"
                max="150"
                value={styles.width}
                onChange={e => updateElement({ width: Number(e.target.value) })}
            />

            <label>Rotation</label>
            <input
                type="range"
                min="-45"
                max="45"
                value={styles.rotate}
                onChange={(e) => updateElement({ rotate: Number(e.target.value) })}
            />
        </>
    );
}
