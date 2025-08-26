import React from "react";
// Add these imports for export functionality
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export default function DataControls({
  showCount,
  setShowCount,
  search,
  setSearch,
  data = [], // Accept data as prop for export
  title = "Academic Subjects", // Add title prop for context
  columns = [
    { field: "code", header: "Code" },
    { field: "name", header: "Name" },
    { field: "description", header: "Description" },
    { field: "status", header: "Status" },
  ],
}) {
  // Export PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text(title, 14, 10);
    autoTable(doc, {
      head: [columns.map((col) => col.header)],
      body: data.map((row) => columns.map((col) => row[col.field])),
    });
    doc.save(`${title.replace(/\s+/g, "_").toLowerCase()}.pdf`);
  };

  // Export Excel
  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      data.map((row) => {
        const obj = {};
        columns.forEach((col) => {
          obj[col.header] = row[col.field];
        });
        return obj;
      })
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, title);
    XLSX.writeFile(wb, `${title.replace(/\s+/g, "_").toLowerCase()}.xlsx`);
  };

  // Print
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    const tableRows = data
      .map(
        (row) =>
          `<tr>${columns
            .map((col) => `<td>${row[col.field]}</td>`)
            .join("")}</tr>`
      )
      .join("");
    printWindow.document.write(`
      <html><head><title>Print ${title}</title></head><body>
      <h2>${title}</h2>
      <table border="1" cellpadding="5" cellspacing="0">
        <thead><tr>${columns
          .map((col) => `<th>${col.header}</th>`)
          .join("")}</tr></thead>
        <tbody>${tableRows}</tbody>
      </table>
      </body></html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
      <div className="d-flex align-items-center">
        <span>Show per page :</span>
        <select
          className="form-select ms-2 py-1"
          style={{ width: 80 }}
          value={showCount}
          onChange={(e) => setShowCount(Number(e.target.value))}
        >
          {[10, 25, 50, 100].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
      <div className="d-flex align-items-center gap-2">
        <button
          title="Export PDF"
          className="btn btn-light border"
          onClick={handleExportPDF}
        >
          <i className="bx bxs-file-pdf text-danger fs-5"></i>
        </button>
        <button
          title="Export Excel"
          className="btn btn-light border"
          onClick={handleExportExcel}
        >
          <i className="bx bxs-file text-success fs-5"></i>
        </button>
        <button
          title="Print"
          className="btn btn-light border"
          onClick={handlePrint}
        >
          <i className="bx bxs-printer text-primary fs-5"></i>
        </button>
        <span className="ms-3">Search:</span>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control ms-2 py-1"
          style={{ width: 180 }}
        />
      </div>
    </div>
  );
}
