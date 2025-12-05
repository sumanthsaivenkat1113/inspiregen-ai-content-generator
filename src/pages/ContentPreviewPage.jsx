import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { exportBlogToPDF } from "../utils/exportBlogToPDF";
import BlogTemplateOne from "../components/blog/blog-template-one/blog";

export default function ContentPreviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const previewRef = useRef();
  const [isExporting, setIsExporting] = useState(false);
  const sessionBlog = sessionStorage.getItem("blogData");
  const blogData =
    location.state?.blogData || JSON.parse(sessionBlog || "{}");
  const contentJson = blogData?.contentJson;
  const headerImage = blogData?.headerImage;
  if (!contentJson) {
    return (
      <p style={{ textAlign: "center", marginTop: "50px", fontSize: "18px" }}>
        No content to preview. Please generate first.
      </p>
    );
  }

  return (
    <div style={{ marginTop: "30px", padding: "0 20px" }}>
      {/* Buttons */}
      <div style={{ textAlign: "center", margin: "30px 0" }}>
        {/* Edit Button */}
        <button
          onClick={() =>
            navigate("/edit/content", {
              state: { contentJson, headerImage },
            })
          }
          style={{
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "12px 24px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "500",
            boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
            transition: "all 0.3s ease",
            marginRight: "12px",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#1d4ed8";
            e.target.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#2563eb";
            e.target.style.transform = "translateY(0)";
          }}
        >
          Edit Content
        </button>

        {/* Download Button */}
        <button
          onClick={() =>
            exportBlogToPDF(
              previewRef.current,
              contentJson.Header.title,
              setIsExporting
            )
          }
          disabled={isExporting}
          style={{
            backgroundColor: isExporting ? "#94a3b8" : "#22c55e",
            color: "#fff",
            border: "none",
            padding: "12px 24px",
            borderRadius: "8px",
            cursor: isExporting ? "not-allowed" : "pointer",
            fontSize: "16px",
            fontWeight: "500",
            boxShadow: "0 4px 12px rgba(34, 197, 94, 0.3)",
            transition: "all 0.3s ease",
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            if (!isExporting) {
              e.target.style.backgroundColor = "#16a34a";
              e.target.style.transform = "translateY(-2px)";
            }
          }}
          onMouseLeave={(e) => {
            if (!isExporting) {
              e.target.style.backgroundColor = "#22c55e";
              e.target.style.transform = "translateY(0)";
            }
          }}
        >
          {isExporting ? (
            <>
              <span
                style={{
                  display: "inline-block",
                  width: "16px",
                  height: "16px",
                  border: "2px solid transparent",
                  borderTop: "2px solid #fff",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  marginRight: "8px",
                }}
              ></span>
              Generating PDF...
            </>
          ) : (
            "Download as PDF"
          )}
        </button>
      </div>

      {/* Patient Note */}
      {isExporting && (
        <p
          style={{
            textAlign: "center",
            color: "#6b7280",
            fontSize: "14px",
            marginTop: "12px",
            fontStyle: "italic",
          }}
        >
          It may take a few seconds to generate your PDF – please be patient.
        </p>
      )}

      {/* Blog Preview */}
      <div
        ref={previewRef}
        style={{
          backgroundColor: "#fff",
          color: "#222",
          marginTop: "40px",
          padding: "40px 30px",
          borderRadius: "12px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
          maxWidth: "900px",
          margin: "40px auto",
        }}
      >
        <BlogTemplateOne
          heading={contentJson.Header.title}
          headerImageUrl={headerImage}
          introductionText={contentJson.Introduction.introduction}
          content={contentJson.Content}
          conclusion={contentJson.Conclusion.conclusion}
        />
      </div>

      {/* Spinner Animation */}
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
