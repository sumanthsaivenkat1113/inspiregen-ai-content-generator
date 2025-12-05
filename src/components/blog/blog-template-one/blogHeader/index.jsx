import '../../../../style/BlogOneTemplate.css'
export default function BlogHeader({ heading, headerImageUrl, styles, onElementClick, activeElement }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 32, fontWeight: 700 }}>{heading}</div>
      {headerImageUrl ? (
        <div
          data-key="headerImage"
          onClick={() => onElementClick("headerImage")}
          className={activeElement === "headerImage" ? "selected-element" : ""}
          style={{
            marginTop: 12,
            transform: `rotate(${styles?.headerImage?.rotate ?? 0}deg)`,
            width: styles?.headerImage?.width ? `${styles.headerImage.width}px` : "100%",
            maxWidth: "100%",
          }}
        >
          <img src={headerImageUrl} alt="" style={{ width: "100%", display: "block", borderRadius: 8 }} />
        </div>
      ) : null}
    </div>
  );
}
