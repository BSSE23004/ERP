import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import menuItemsData from "../utils/menuItems.json";

export default function Sidebar() {
  const [menuItems, setMenuItems] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setMenuItems(menuItemsData);
  }, []);

  const handleSelect = (path) => navigate(path);

  return (
    <aside
      className="bg-white border-end vh-100 d-flex flex-column z-3 position-fixed overflow-scroll"
      style={{ width: "250px", top: "4rem" }}
    >
      <div className="accordion" id="sidebarAccordion">
        {menuItems.map((item) => (
          <div className="accordion-item" key={item.id}>
            {/* Header */}
            <h2 className="accordion-header" id={`heading-${item.id}`}>
              <button
                className={`accordion-button d-flex align-items-center ${
                  item.children ? "" : "collapsed"
                }`}
                type="button"
                data-bs-toggle={item.children ? "collapse" : undefined}
                data-bs-target={
                  item.children ? `#collapse-${item.id}` : undefined
                }
                aria-expanded="false"
                aria-controls={
                  item.children ? `collapse-${item.id}` : undefined
                }
                onClick={() => !item.children && handleSelect(`/${item.id}`)}
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
                className="accordion-collapse collapse"
                aria-labelledby={`heading-${item.id}`}
                data-bs-parent="#sidebarAccordion"
              >
                <div className="accordion-body p-0">
                  <ul className="list-unstyled mb-0">
                    {item.children.map((sub) => (
                      <li key={sub.id}>
                        <button
                          className={`nav-link btn w-100 text-start ps-5 ${
                            location.pathname === `/${sub.id}` ? "active" : ""
                          }`}
                          onClick={() => handleSelect(`/${sub.id}`)}
                        >
                          {sub.label}
                        </button>
                        <br />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
