import { useState, useEffect, createPortal } from "@wordpress/element";
import { navCategories, docsContentData } from "./data.js";
import "./docsModal.scss";

const DocsModal = ({ block, onClose }) => {
  if (!block) return null;

  const resolveKey = (b) => {
    if (!b) return "table-of-contents";
    let raw = typeof b === "string" ? b : (b.id || b.key || b.name || "");
    const cleanKey = String(raw)
      .trim()
      .replace(/^xpo-block\//, "")
      .replace(/^wp-block-xpo-block-/, "");
    return docsContentData[cleanKey] ? cleanKey : "table-of-contents";
  };

  const [activeKey, setActiveKey] = useState(() => resolveKey(block));

  // State to track expanded/collapsed navigation categories
  const [expandedCats, setExpandedCats] = useState({
    "getting-started": true,
    "how-to-use": true,
    faqs: true,
  });

  const toggleCategory = (catKey) => {
    setExpandedCats((prev) => ({
      ...prev,
      [catKey]: !prev[catKey],
    }));
  };

  useEffect(() => {
    if (block) {
      setActiveKey(resolveKey(block));
    }
  }, [block]);

  const doc = docsContentData[activeKey] || docsContentData["table-of-contents"];

  const modalContent = (
    <div className="docs-modal-overlay" onClick={onClose}>
      <div
        className="docs-layout-wrapper"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button */}
        <button
          type="button"
          className="docs-modal-close-btn"
          onClick={onClose}
          aria-label="Close Documentation"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Left Documentation Sidebar */}
        <aside className="docs-sidebar">
          <div className="sidebar-header">
            <svg
              className="sidebar-brand-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2563eb"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            <span className="sidebar-brand-title">XpoBlock Docs</span>
          </div>

          <nav className="sidebar-nav">
            {navCategories.map((cat) => {
              const isExpanded = expandedCats[cat.key] !== false;

              return (
                <div key={cat.key} className="nav-group">
                  <button
                    type="button"
                    className="nav-group-header-btn"
                    onClick={() => toggleCategory(cat.key)}
                    aria-expanded={isExpanded}
                  >
                    <span>{cat.label}</span>
                    <svg
                      className={`group-arrow ${isExpanded ? "open" : ""}`}
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  {isExpanded && (
                    <ul className="nav-items-list">
                      {cat.items.map((item) => (
                        <li key={item.key}>
                          <button
                            type="button"
                            className={`nav-item-btn ${
                              activeKey === item.key ? "active" : ""
                            }`}
                            onClick={() => {
                              if (docsContentData[item.key]) {
                                setActiveKey(item.key);
                              }
                            }}
                          >
                            {item.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </nav>
        </aside>

        {/* Right Main Content Area */}
        <main className="docs-main-content">
          {/* Breadcrumb Bar */}
          <div className="docs-breadcrumb-bar">
            <svg
              className="home-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-link">Docs</span>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-link">{doc.category || "How To Use"}</span>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">{doc.title}</span>
          </div>

          {/* Scrollable Content Body */}
          <div className="docs-content-body">
            <div className="content-title-section">
              <span className="docs-type-badge">{doc.category || "GUIDE"}</span>
              <h1 className="docs-title-heading">{doc.title}</h1>
              <p className="docs-summary-lead">{doc.summary}</p>
              {doc.details && <p className="docs-details-text">{doc.details}</p>}
            </div>

            {/* Preview Window Frame Illustration */}


            {/* Key Features Section */}
            {doc.features && doc.features.length > 0 && (
              <div className="docs-detail-section">
                <h3>✨ Key Features</h3>
                <ul className="docs-features-grid">
                  {doc.features.map((feat, index) => (
                    <li key={index}>
                      <span className="feature-check">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* How To Use Steps Section */}
            {doc.usageSteps && doc.usageSteps.length > 0 && (
              <div className="docs-detail-section">
                <h3>🚀 How To Use</h3>
                <ol className="docs-steps-list">
                  {doc.usageSteps.map((step, index) => (
                    <li key={index}>
                      <span className="step-badge">{index + 1}</span>
                      <span className="step-desc">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : modalContent;
};

export default DocsModal;
