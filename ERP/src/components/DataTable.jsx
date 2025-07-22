import React, { useState, useEffect } from "react";

export default function DataTable({ data, showCount, onEdit, onDelete }) {
  // Sorting state
  const [sortBy, setSortBy] = useState("sr"); // "sr", "code", "name", "status"
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" or "desc"

  // Keep a copy of original order for Sr#
  const [originalData, setOriginalData] = useState(data);
  useEffect(() => {
    setOriginalData(data);
  }, [data]);
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(data.length / showCount) || 1;
  const startIdx = (page - 1) * showCount;
  const endIdx = startIdx + showCount;

  // Sorting logic
  let sortedData = [...data];
  if (sortBy === "code") {
    sortedData.sort((a, b) =>
      sortOrder === "asc"
        ? a.code.localeCompare(b.code)
        : b.code.localeCompare(a.code)
    );
  } else if (sortBy === "name") {
    sortedData.sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
  } else if (sortBy === "status") {
    sortedData.sort((a, b) =>
      sortOrder === "asc"
        ? a.status.localeCompare(b.status)
        : b.status.localeCompare(a.status)
    );
  } else {
    // Sr# (original order)
    sortedData = [...originalData];
  }
  const pageData = sortedData.slice(startIdx, endIdx);

  // Sorting handler
  const handleSort = (col) => {
    if (sortBy === col) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(col);
      setSortOrder("asc");
    }
    setPage(1);
  };

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  // Reset to page 1 if data or showCount changes
  useEffect(() => {
    setPage(1);
  }, [data, showCount]);

  return (
    <div className="bg-white rounded shadow-sm overflow-auto">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th style={{ cursor: "pointer" }} onClick={() => handleSort("sr")}>
              Sr# {sortBy === "sr" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => handleSort("code")}
            >
              Code {sortBy === "code" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => handleSort("name")}
            >
              Name {sortBy === "name" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th>Description</th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => handleSort("status")}
            >
              Status {sortBy === "status" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pageData.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-4 text-secondary">
                No data found
              </td>
            </tr>
          ) : (
            pageData.map((s, i) => (
              <tr key={s.code}>
                <td>{startIdx + i + 1}</td>
                <td>{s.code}</td>
                <td>{s.name}</td>
                <td>{s.description}</td>
                <td>
                  <span
                    className={`badge px-3 py-2 fw-semibold ${
                      s.status === "Active" ? "bg-success" : "bg-danger"
                    }`}
                  >
                    {s.status}
                  </span>
                </td>
                <td>
                  <button
                    title="Edit"
                    className="btn btn-link p-0 me-2"
                    onClick={() => onEdit(s)}
                  >
                    <i className="bx bx-edit text-primary fs-5"></i>
                  </button>
                  <button
                    title="Delete"
                    className="btn btn-link p-0"
                    onClick={() => onDelete(s)}
                  >
                    <i className="bx bx-trash text-danger fs-5"></i>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="py-3 text-center text-secondary border-top fw-medium d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
        <span>
          Showing {data.length === 0 ? 0 : startIdx + 1} to{" "}
          {Math.min(endIdx, data.length)} of {data.length} entries
        </span>
        <div>
          <button
            className="btn btn-outline-primary btn-sm me-2"
            onClick={handlePrev}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="mx-2">
            Page {page} of {totalPages}
          </span>
          <button
            className="btn btn-outline-primary btn-sm ms-2"
            onClick={handleNext}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
