import React from "react";

export default function AcademicSubjectHeader({ onAdd }) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 className="mb-0">Academic Subject List</h2>
        <div className="text-secondary small">Manage Your Academic Subject</div>
      </div>
      <button
        className="btn btn-warning text-white fw-semibold px-4 py-2 fs-6"
        onClick={onAdd}
      >
        + Add New Academic Subject
      </button>
    </div>
  );
}
