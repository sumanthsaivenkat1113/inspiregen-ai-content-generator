// src/utils/exportPresentationToPDF.js
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const exportPresentationToPDF = async (element, title, setExporting) => {
  if (!element) return;
  setExporting(true);

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
      logging: false,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = pdf.internal.pageSize.getHeight();
    const imgHeight = (canvas.height * width) / canvas.width;

    let y = 0;
    let remainingHeight = imgHeight;

    while (remainingHeight > 0) {
      pdf.addImage(imgData, "PNG", 0, -y, width, imgHeight);
      remainingHeight -= height;
      y += height;
      if (remainingHeight > 0) pdf.addPage();
    }

    pdf.save(`${title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.pdf`);
  } catch (err) {
    console.error("PDF export error:", err);
    alert("Export failed. Try again.");
  } finally {
    setExporting(false);
  }
};