import React from "react";

export default function DataHeader({
  onAdd,
  title = "Academic Subject List",
  subtitle = "Manage Your Academic Subject",
  buttonText = "+ Add New Academic Subject",
}) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 className="mb-0">{title}</h2>
        <div className="text-secondary small">{subtitle}</div>
      </div>
      <button
        className="btn  text-white fw-semibold px-4 py-2 fs-6"
        style={{ backgroundColor: "#ff6600" }}
        onClick={onAdd}
      >
        {buttonText}
      </button>
    </div>
  );
}
