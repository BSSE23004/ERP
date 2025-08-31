import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import menuItemsData from "../utils/menuItems.json";

export default function Sidebar() {
  const [menuItems, setMenuItems] = useState([]);
  // Track which accordion is open
  const [openAccordion, setOpenAccordion] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setMenuItems(menuItemsData);
    // On location change, open the relevant accordion
    const current = menuItemsData.find((item) => {
      if (item.children) {
        return item.children.some((sub) => location.pathname === `/${sub.id}`);
      }
      return location.pathname === `/${item.id}`;
    });
    setOpenAccordion(current ? current.id : null);
  }, [location.pathname]);

  const handleSelect = (path) => navigate(path);

  return (
    <aside
      className="bg-white border-end vh-100 d-flex flex-column z-3 position-fixed overflow-scroll"
      style={{ width: "250px", top: "4rem" }}
    >
      <div className="accordion" id="sidebarAccordion">
        {menuItems.map((item) => {
          const isOpen = openAccordion === item.id;
          // Highlight parent if its child is active or itself is active
          const isActiveSection =
            (item.children &&
              item.children.some(
                (sub) => location.pathname === `/${sub.id}`
              )) ||
            location.pathname === `/${item.id}`;
          return (
            <div className="accordion-item" key={item.id}>
              {/* Header */}
              <h2 className="accordion-header" id={`heading-${item.id}`}>
                <button
                  className={`accordion-button d-flex align-items-center ${
                    item.children ? "" : "collapsed"
                  } ${isActiveSection ? "fw-bold" : ""}`}
                  style={
                    isActiveSection
                      ? { backgroundColor: "#211D5A", color: "#fff" }
                      : {}
                  }
                  type="button"
                  data-bs-toggle={item.children ? "collapse" : undefined}
                  data-bs-target={
                    item.children ? `#collapse-${item.id}` : undefined
                  }
                  aria-expanded={isOpen ? "true" : "false"}
                  aria-controls={
                    item.children ? `collapse-${item.id}` : undefined
                  }
                  onClick={() => {
                    if (!item.children) {
                      handleSelect(`/${item.id}`);
                    } else {
                      setOpenAccordion(isOpen ? null : item.id);
                    }
                  }}
                >
                  <i className={`${item.icon} me-2`}></i>
                  {item.label}
                </button>
              </h2>
              <br />
              {/* Collapsible Body */}
              {item.children && (
                <div
                  id={`collapse-${item.id}`}
                  className={`accordion-collapse collapse${
                    isOpen ? " show" : ""
                  }`}
                  aria-labelledby={`heading-${item.id}`}
                  data-bs-parent="#sidebarAccordion"
                >
                  <div className="accordion-body p-0">
                    <ul className="list-unstyled mb-0">
                      {item.children.map((sub) => {
                        const isActiveSub = location.pathname === `/${sub.id}`;
                        return (
                          <li key={sub.id}>
                            <button
                              className={`nav-link btn w-100 text-start ps-5 ${
                                isActiveSub ? "fw-bold" : ""
                              }`}
                              style={
                                isActiveSub
                                  ? {
                                      backgroundColor: "#ff6600",
                                      color: "#fff",
                                    }
                                  : {}
                              }
                              onClick={() => handleSelect(`/${sub.id}`)}
                            >
                              {sub.label}
                            </button>
                            <br />
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
