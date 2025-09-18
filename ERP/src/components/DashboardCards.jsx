import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import dashboardCardsData from "../utils/dashboardCards.json";

function DashboardCards() {
  const [dashboardCards, setDashboardCards] = useState([]);
  const [hovered, setHovered] = useState(null);
  useEffect(() => {
    setDashboardCards(dashboardCardsData);
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1.5rem",
        justifyContent: "flex-start",
        margin: "2.5rem 4% 0 4%",
      }}
    >
      {dashboardCards.map((card, idx) => (
        <Link
          to={card.path}
          key={card.label}
          style={{
            flex: "1 1 260px",
            maxWidth: 320,
            minWidth: 220,
            background: "#fff",
            borderRadius: 12,
            boxShadow:
              hovered === idx
                ? "0 12px 32px 0 rgba(60,72,88,0.35), 0 2px 8px 0 rgba(60,72,88,0.18)"
                : "0 2px 10px 0 rgba(60,72,88,0.18)",
            display: "flex",
            alignItems: "center",
            padding: "1.5rem 2rem",
            textDecoration: "none",
            position: "relative",
            border: "1px solid #eee",
            transform: hovered === idx ? "translateY(-8px)" : "none",
            transition:
              "box-shadow 0.2s, transform 0.2s, text-decoration 0.2s, color 0.2s",
            cursor: "pointer",
          }}
          onMouseEnter={() => setHovered(idx)}
          onMouseLeave={() => setHovered(null)}
        >
          <div
            style={{
              background: card.color,
              borderRadius: "50%",
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 20,
              transition: "background 0.2s",
            }}
          >
            <i
              className={card.icon}
              style={{ fontSize: 28, color: "#4b4b7c" }}
            ></i>
          </div>
          <div
            style={{
              fontWeight: 600,
              fontSize: 18,
              color: "#18184a",
              textDecoration: hovered === idx ? "underline" : "none",
              transition: "text-decoration 0.2s",
            }}
          >
            {card.label}
          </div>
          {card.notification && (
            <span
              style={{
                position: "absolute",
                right: 24,
                top: 18,
                background: "#ffb300",
                color: "#fff",
                borderRadius: 12,
                fontSize: 13,
                padding: "2px 10px",
                fontWeight: 600,
              }}
            >
              <i className="bx bx-bell" style={{ marginRight: 4 }}></i>
              {card.notification}
            </span>
          )}
        </Link>
      ))}
    </div>
  );
}

export default DashboardCards;
