import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { exportPosterToPDF } from "../utils/exportPosterToPDF";
import PosterLayoutOne from "../components/poster/PosterLayoutOne/PosterLayoutOne";
import PosterLayoutTwo from "../components/poster/PosterLayoutTwo/PosterLayoutTwo";
import PosterLayoutThree from "../components/poster/PosterLayoutThree/PosterLayoutThree";
import PosterLayoutFour from "../components/poster/PosterLayoutFour/PosterLayoutFour";
import PosterLayoutFive from "../components/poster/PosterLayoutFive/PosterLayoutFive";
import PosterLayoutSix from "../components/poster/PosterLayoutSix/PosterLayoutSix";
import PosterLayoutSeven from "../components/poster/PosterLayoutSeven/PosterLayoutSeven";
import PosterLayoutEight from "../components/poster/PosterLayoutEight/PosterLayoutEight";
import PosterLayoutNine from "../components/poster/PosterLayoutNine/PosterLayoutNine";
const LAYOUTS = [
  { id: 1, name: "Classic Grid", Component: PosterLayoutOne },
  { id: 2, name: "Diagonal Impact", Component: PosterLayoutTwo },
  { id: 3, name: "Magazine Style", Component: PosterLayoutThree },
  { id: 4, name: "Clean Event", Component: PosterLayoutFour },
  { id: 5, name: "Bold Future", Component: PosterLayoutFive },
  { id: 6, name: "Overlay Pro", Component: PosterLayoutSix },
  { id: 7, name: "Split Badge", Component: PosterLayoutSeven },
  { id: 8, name: "Word Art", Component: PosterLayoutEight },
  { id: 9, name: "Cutout Tag", Component: PosterLayoutNine },
];
const SPACING = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  xxl: "48px",
};

const COLORS = {
  primary: "#2563eb", // Blue-600
  primaryDark: "#1d4ed8", // Blue-700
  secondary: "#10b981", // Emerald-500 for success/download
  secondaryDark: "#16a34a", // Emerald-600
  background: "#f8fafc", // Slate-50
  surface: "#ffffff",
  border: "#e2e8f0", // Slate-200
  textPrimary: "#1e293b", // Slate-800
  textSecondary: "#64748b", // Slate-500
  neutral: "#94a3b8", // Slate-400 for disabled/inactive
};
const pageStyles = {
  display: "flex",
  height: "100vh",
  fontFamily: "Inter, system-ui, sans-serif",
  background: `linear-gradient(135deg, ${COLORS.background} 0%, #e2e8f0 100%)`,
};
const sidebarStyles = {
  marginTop: '30px',
  marginLeft: '30px',
  width: "300px", // Fixed width sidebar for a professional feel
  minWidth: "250px", // Added min-width
  background: `rgba(255,255,255,0.95)`,
  backdropFilter: "blur(10px)",
  borderRight: `1px solid ${COLORS.border}`,
  overflowY: "auto",
  padding: `${SPACING.lg} ${SPACING.md}`,
  boxShadow: "4px 0 12px rgba(0,0,0,0.05)",
};
const mainStyles = {
  flex: 1,
  overflowY: "auto",
  padding: SPACING.xl,
  position: "relative",
};
export default function PosterPreviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const previewRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);
  const [posterData, setPosterData] = useState(null);
  const [selectedLayoutId, setSelectedLayoutId] = useState(4);

  // Load poster data (Logic is unchanged)
  useEffect(() => {
    const fromState = location.state?.posterData;
    const fromStorage = sessionStorage.getItem("posterData");
    let data = null;

    if (fromState) {
      data = fromState;
      sessionStorage.setItem("posterData", JSON.stringify(fromState));
    } else if (fromStorage) {
      try {
        data = JSON.parse(fromStorage);
      } catch (e) {
        console.error("Failed to parse posterData", e);
      }
    }
    setPosterData(data);
  }, [location.state]);
  const getButtonHoverStyle = (e) => (e.currentTarget.style.transform = "scale(1.03)");
  const getButtonLeaveStyle = (e) => (e.currentTarget.style.transform = "scale(1)");
  if (!posterData) {
    const noDataButtonStyles = {
      background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.primaryDark})`,
      color: COLORS.surface,
      border: "none",
      padding: "14px 30px",
      borderRadius: "10px",
      fontSize: "1rem",
      cursor: "pointer",
      fontWeight: 600,
      boxShadow: `0 4px 12px ${COLORS.primary}4D`, // Light shadow of primary color
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
    };
    return (
      <div
        style={{
          textAlign: "center",
          padding: SPACING.xxl,
          background: `linear-gradient(135deg, ${COLORS.background} 0%, #e2e8f0 100%)`,
          minHeight: "100vh",
        }}
      >
        <h2 style={{ color: COLORS.textPrimary, fontWeight: "700", fontSize: "1.8rem" }}>
          🚫 No poster data found
        </h2>
        <p style={{ color: COLORS.textSecondary, marginBottom: SPACING.lg }}>
          Please generate a poster first to preview or download it.
        </p>
        <button
          onClick={() => navigate("/generate/poster")}
          style={noDataButtonStyles}
          onMouseEnter={getButtonHoverStyle}
          onMouseLeave={getButtonLeaveStyle}
        >
          Go to Generator
        </button>
      </div>
    );
  }
  const header = posterData.Header || posterData.posterJson?.Header || {
    title: posterData.title,
    tagline: posterData.tagline,
  };
  const mainText =
    posterData.MainText ||
    posterData.posterJson?.MainText || { message: posterData.message };
  const cta =
    posterData.CallToAction ||
    posterData.posterJson?.CallToAction || { text: posterData.callToAction };
  const hints =
    posterData.DesignHints ||
    posterData.posterJson?.DesignHints ||
    posterData.designHints ||
    [];
  const imageUrl =
    posterData.image ||
    posterData.posterImage ||
    "https://via.placeholder.com/700x1000?text=Placeholder+Image";

  const commonProps = {
    title: header.title || "Untitled Event",
    subtitle:
      header.tagline || mainText.message || "Join us for something amazing",
    imageUrl,
    ctaText: cta.text || "Learn More",
  };

  const layoutProps = {
    eventDate: header.date || "Date TBD",
    themeColor: "#f97316", // Orange-500
    emphasisWord: header.emphasisWord || header.title?.split(" ")[0],
    secondaryColor: "#06b6d4", // Cyan-500
    category: header.category || "FEATURE",
    badge: header.badge || "LIMITED",
    accentColor: "#8b5cf6", // Violet-500
    highlightColor: "#ec4899", // Pink-500
    tagline: header.tagline || "NEW",
    primaryColor: "#10b981", // Emerald-500
    ...commonProps,
  };
  const SelectedLayout =
    LAYOUTS.find((l) => l.id === selectedLayoutId)?.Component;
  return (
    <div style={pageStyles}>
      {/* ============ SIDEBAR: Layout Selection ============ */}
      <aside style={sidebarStyles}>
        <h2
          style={{
            fontSize: "1.2rem", // Slightly smaller heading
            fontWeight: 700,
            marginBottom: SPACING.lg,
            color: COLORS.textPrimary,
          }}
        >
          🎨 Choose Layout
        </h2>

        <div style={{ display: "grid", gap: SPACING.md }}>
          {LAYOUTS.map(({ id, name, Component }) => {
            const isActive = selectedLayoutId === id;
            
            // **Reduce Template Size** - adjusted the container size to 150px
            const layoutContainerStyle = {
                all: "unset",
                cursor: "pointer",
                borderRadius: "10px",
                overflow: "hidden",
                background: isActive ? "#eff6ff" : COLORS.surface, // Blue-50 for active background
                boxShadow: isActive
                  ? `0 0 0 2px ${COLORS.primary}, 0 4px 10px rgba(0,0,0,0.1)`
                  : "0 1px 4px rgba(0,0,0,0.05)",
                transition: "all 0.2s ease",
                transform: isActive ? "translateY(-2px)" : "none",
                display: "block",
                position: "relative",
                // Set fixed dimensions for the template thumbnail container
                width: "150px", 
                height: "220px", 
                margin: "0 auto", 
            };

            const layoutPreviewStyle = {
                // Scaling down the 700x1000 poster to fit the 150x220 container
                transform: "scale(0.214)", // 150/700 ≈ 0.214 (Slightly smaller than original 0.25)
                transformOrigin: "top left",
                width: 700,
                height: 1000,
                pointerEvents: "none",
                position: "absolute",
                top: 0,
                left: 0,
            };
            
            const layoutNameStyle = {
                padding: SPACING.sm,
                background: isActive ? COLORS.primary : COLORS.border,
                color: isActive ? COLORS.surface : COLORS.textPrimary,
                textAlign: "center",
                fontWeight: 600,
                fontSize: "0.85rem",
                borderTop: isActive ? "none" : `1px solid ${COLORS.border}`,
                borderRadius: "0 0 10px 10px",
            };
            
            return (
              <div key={id}>
                <button
                  onClick={() => setSelectedLayoutId(id)}
                  style={{
                      ...layoutContainerStyle,
                      marginBottom: "0",
                      padding: "0",
                      width: "100%", // Full width of sidebar item
                      height: "auto",
                  }}
                  onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
                      e.currentTarget.style.transform = isActive ? "translateY(-2px)" : "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.05)";
                      e.currentTarget.style.transform = isActive ? "translateY(-2px)" : "none";
                  }}
                >
                  <div
                    style={{
                        position: "relative",
                        width: "100%",
                        height: "0",
                        paddingBottom: "142.85%", // Ratio for 700x1000 poster (1000/700 * 100)
                        overflow: "hidden",
                        borderRadius: "10px 10px 0 0",
                        background: COLORS.surface,
                    }}
                  >
                    <div style={layoutPreviewStyle}>
                      <Component {...layoutProps} />
                    </div>
                  </div>

                  <div style={layoutNameStyle}>
                    {name}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </aside>

      {/* ============ PREVIEW AREA ============ */}
      <main style={mainStyles}>
        {/* Buttons */}
        <div style={{ textAlign: "center", marginBottom: SPACING.xl }}>
          <button
            onClick={() => navigate("/generate/poster")}
            style={{
              background: COLORS.textSecondary,
              color: COLORS.surface,
              border: "none",
              padding: "12px 28px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 500,
              marginRight: SPACING.md,
              transition: "transform 0.2s ease, background 0.2s ease",
            }}
            onMouseEnter={getButtonHoverStyle}
            onMouseLeave={getButtonLeaveStyle}
          >
            ← Back to Editor
          </button>

          <button
            onClick={() =>
              exportPosterToPDF(
                previewRef.current,
                commonProps.title.replace(/[^a-z0-9]/gi, "_").toLowerCase(),
                setIsExporting
              )
            }
            disabled={isExporting}
            style={{
              background: isExporting
                ? COLORS.neutral
                : `linear-gradient(90deg, ${COLORS.secondary}, ${COLORS.secondaryDark})`,
              color: COLORS.surface,
              border: "none",
              padding: "12px 32px",
              borderRadius: "8px",
              cursor: isExporting ? "not-allowed" : "pointer",
              fontWeight: 600,
              fontSize: "1rem",
              boxShadow: isExporting ? "none" : `0 4px 12px ${COLORS.secondary}4D`,
              transition: "all 0.3s ease",
            }}
          >
            {isExporting ? "Exporting..." : "⬇ Download PDF"}
          </button>
        </div>

        {isExporting && (
          <p
            style={{
              textAlign: "center",
              color: COLORS.textSecondary,
              fontStyle: "italic",
              marginBottom: SPACING.lg,
            }}
          >
            Generating high-quality PDF — please wait...
          </p>
        )}

        {/* Poster Preview */}
        <div
          ref={previewRef}
          style={{
         // **Reduced Preview Size** (from 820px)
            margin: "0 auto",
            background: COLORS.surface,
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            padding: SPACING.lg, // Reduced padding inside the frame
            transition: "transform 0.3s ease",
            aspectRatio: "700 / 1000", // Maintain poster ratio
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              // Ensure the poster component itself fills the container
            }}
          >
            {SelectedLayout ? (
              <SelectedLayout {...layoutProps} />
            ) : (
              <p
                style={{
                  textAlign: "center",
                  color: COLORS.neutral,
                  fontSize: "1.0rem",
                  padding: SPACING.xxl,
                }}
              >
                Select a layout to preview
              </p>
            )}
          </div>
        </div>

        {/* Design Hints */}
        {hints.length > 0 && (
          <div
            style={{
              maxWidth: 500, // Match the preview max-width
              margin: `${SPACING.xl} auto ${SPACING.xl}`,
              background: "#f1f5f9", // Slate-100
              borderRadius: "12px",
              padding: SPACING.md,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <p
              style={{
                fontWeight: 700,
                color: COLORS.textPrimary,
                marginBottom: SPACING.sm,
                fontSize: "0.95rem",
              }}
            >
              💡 AI Design Suggestions
            </p>
            <ul
              style={{
                color: COLORS.textSecondary,
                fontSize: "0.85rem",
                paddingLeft: SPACING.lg,
                lineHeight: 1.5,
              }}
            >
              {hints.map((hint, i) => (
                <li key={i} style={{ marginBottom: SPACING.xs }}>
                  {hint}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}

