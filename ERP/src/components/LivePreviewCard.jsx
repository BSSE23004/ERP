import React from "react";

export default function LivePreviewCard({
  title,
  color = "#e3e6fd",
  children,
  style = {},
}) {
  return (
    <div
      style={{
        borderRadius: 18,
        background: "#fff",
        boxShadow: "0 2px 16px #211d5a11",
        overflow: "hidden",
        minWidth: 340,
        ...style,
      }}
    >
      <div
        style={{
          background: color,
          padding: "1.2rem 1.5rem 1rem 1.5rem",
          fontWeight: 700,
          fontSize: 26,
          color: "#211d5a",
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          textAlign: "center",
        }}
      >
        {title}
      </div>
      <div style={{ padding: "1.5rem 1.5rem 1.2rem 1.5rem" }}>{children}</div>
    </div>
  );
}
