import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import menuItemsData from "../utils/menuItems.json";
import {
  FaBook,
  FaCogs,
  FaMoneyCheckAlt,
  FaBoxes,
  FaChevronDown,
  FaUserGraduate,
  FaUniversity,
  FaUsers,
  FaChartBar,
  FaWallet,
  FaFileInvoiceDollar,
  FaBuilding,
  FaLayerGroup,
  FaClipboardList,
  FaListAlt,
  FaRegFileAlt,
  FaRegCreditCard,
  FaRegListAlt,
  FaRegMoneyBillAlt,
  FaRegBuilding,
  FaRegUser,
  FaRegChartBar,
} from "react-icons/fa";

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

  // Icon mapping for main sections
  const sectionIcons = {
    "academic-subject": <FaBook className="me-2" />,
    "academic-setup": <FaCogs className="me-2" />,
    accounts: <FaMoneyCheckAlt className="me-2" />,
    "asset-management": <FaBoxes className="me-2" />,
    attendance: <FaClipboardList className="me-2" />,
    crm: <FaUsers className="me-2" />,
    dashboard: <FaChartBar className="me-2" />,
    "employee-self-service": <FaRegUser className="me-2" />,
    feedback: <FaRegFileAlt className="me-2" />,
    "front-office": <FaBuilding className="me-2" />,
    hrs: <FaRegUser className="me-2" />,
    "hrs-setup": <FaCogs className="me-2" />,
    inventory: <FaLayerGroup className="me-2" />,
    "inventory-setup": <FaLayerGroup className="me-2" />,
    payroll: <FaWallet className="me-2" />,
    "point-of-sale": <FaRegCreditCard className="me-2" />,
    production: <FaRegListAlt className="me-2" />,
    "property-management": <FaRegBuilding className="me-2" />,
    security: <FaRegUser className="me-2" />,
    settings: <FaCogs className="me-2" />,
  };

  return (
    <aside
      className="sidebar-gradient border-end vh-100 d-flex flex-column z-3 position-fixed overflow-hidden"
      style={{
        width: "260px",
        top: "3.5rem",
        left: 0,
        overflow: "hidden",
      }}
    >
      <div className="accordion" id="sidebarAccordion">
        {menuItems.map((item) => {
          const isOpen = openAccordion === item.id;
          const isActiveSection =
            (item.children &&
              item.children.some(
                (sub) => location.pathname === `/${sub.id}`
              )) ||
            location.pathname === `/${item.id}`;
          return (
            <div
              className="accordion-item border-0 bg-transparent mb-3"
              key={item.id}
            >
              <h2 className="accordion-header" id={`heading-${item.id}`}>
                <button
                  className={`accordion-button d-flex align-items-center px-3 py-4 shadow-sm ${
                    item.children ? "" : "collapsed"
                  } ${isActiveSection ? "fw-bold sidebar-active" : ""}`}
                  style={{
                    ...(isActiveSection
                      ? {
                          background:
                            "linear-gradient(90deg, #211D5A 60%, #ff6600 100%)",
                          color: "#fff",
                        }
                      : { background: "#f8f9fa", color: "#211D5A" }),
                    minHeight: 64,
                  }}
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
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow = "0 4px 24px #ff660055")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow = isActiveSection
                      ? "0 2px 12px #211d5a22"
                      : "none")
                  }
                >
                  {sectionIcons[item.id]}
                  {item.label}
                </button>
              </h2>
              {/* Collapsible Body */}
              {item.children && (
                <div
                  id={`collapse-${item.id}`}
                  className={`accordion-collapse collapse mt-3${
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
                              className={`nav-link btn w-100 text-start ps-5 py-2 sidebar-sub-link ${
                                isActiveSub ? "fw-bold sidebar-active-sub" : ""
                              }`}
                              style={
                                isActiveSub
                                  ? {
                                      background:
                                        "linear-gradient(90deg, #ff6600 60%, #211D5A 100%)",
                                      color: "#fff",
                                    }
                                  : { color: "#211D5A" }
                              }
                              onClick={() => handleSelect(`/${sub.id}`)}
                              onMouseEnter={(e) =>
                                (e.currentTarget.style.background = "#ffe5d0")
                              }
                              onMouseLeave={(e) =>
                                (e.currentTarget.style.background = isActiveSub
                                  ? "linear-gradient(90deg, #ff6600 60%, #211D5A 100%)"
                                  : "transparent")
                              }
                            >
                              {sub.label}
                            </button>
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
      <style>{`
        .sidebar-gradient {
          background: linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%);
        }
        .sidebar-logo {
          border-bottom: 1px solid #e9ecef;
        }
        .sidebar-active {
          box-shadow: 0 4px 24px #211d5a33 !important;
        }
        .sidebar-active-sub {
          box-shadow: 0 2px 8px #ff660033 !important;
        }
        .sidebar-sub-link:hover {
          color: #ff6600 !important;
        }
      `}</style>
    </aside>
  );
}
