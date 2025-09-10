import React, { useState, useEffect } from "react";

export default function DataTable({
  data,
  showCount,
  onEdit,
  onDelete,
  columns,
}) {
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

  // Dynamic sorting logic for all columns
  let sortedData = [...data];
  if (sortBy && sortBy !== "sr") {
    sortedData.sort((a, b) => {
      let aVal = a[sortBy] ?? "";
      let bVal = b[sortBy] ?? "";
      // Numeric sort for amount, totalCredit, totalDebit
      if (
        sortBy === "amount" ||
        sortBy === "programFee" ||
        sortBy === "totalCredit" ||
        sortBy === "totalDebit"
      ) {
        aVal = Number(aVal) || 0;
        bVal = Number(bVal) || 0;
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      }
      // Date sort for paymentDate, chequeDate, etc.
      if (sortBy.toLowerCase().includes("date")) {
        const aDate = new Date(aVal);
        const bDate = new Date(bVal);
        return sortOrder === "asc" ? aDate - bDate : bDate - aDate;
      }
      // String sort for all other columns
      return sortOrder === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
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
            <th>Sr #</th>
            {columns.map((col) => (
              <th
                key={col.field}
                style={col.sortable ? { cursor: "pointer" } : {}}
                onClick={col.sortable ? () => handleSort(col.field) : undefined}
              >
                {col.header}
                {col.sortable && sortBy === col.field && (
                  <span className="ms-1">
                    {sortOrder === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pageData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + 2}
                className="text-center py-4 text-secondary"
              >
                No data found
              </td>
            </tr>
          ) : (
            pageData.map((row, i) => (
              <tr key={row.id}>
                <td>{startIdx + i + 1}</td>
                {columns.map((col) => (
                  <td key={col.field + "-" + row.id}>
                    {col.field === "status" ? (
                      <span
                        className={`badge px-3 py-2 fw-semibold ${
                          row.status === "Active" ? "bg-success" : "bg-danger"
                        }`}
                      >
                        {row.status}
                      </span>
                    ) : (
                      row[col.field]
                    )}
                  </td>
                ))}
                <td>
                  <button
                    title="Edit"
                    className="btn btn-link p-0 me-2"
                    onClick={() => onEdit(row)}
                  >
                    <i className="bx bx-edit text-primary fs-5"></i>
                  </button>
                  <button
                    title="Delete"
                    className="btn btn-link p-0"
                    onClick={() => onDelete(row)}
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
