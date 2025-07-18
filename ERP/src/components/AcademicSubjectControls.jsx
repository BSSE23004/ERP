import React from "react";

export default function AcademicSubjectControls({
  showCount,
  setShowCount,
  search,
  setSearch,
}) {
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
        <button title="Export PDF" className="btn btn-light border">
          <i className="bx bxs-file-pdf text-danger fs-5"></i>
        </button>
        <button title="Export Excel" className="btn btn-light border">
          <i className="bx bxs-file text-success fs-5"></i>
        </button>
        <button title="Print" className="btn btn-light border">
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
