import './Navbar.scss';


const Navbar = ({activeTab, setActiveTab}) => {


  return (
    <>
      {/* Tabs */}
      <nav className="guten-builder-tabs" aria-label="Admin Navigation">
        <button
          type="button"
          className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          <svg
            className="tab-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
          </svg>
          Overview
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === "all-blocks" ? "active" : ""}`}
          onClick={() => setActiveTab("all-blocks")}
        >
          <svg
            className="tab-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
          All Blocks
        </button>

        <button
          type="button"
          className={`tab-btn ${activeTab === "changelog" ? "active" : ""}`}
          onClick={() => setActiveTab("changelog")}
        >
          <svg
            className="tab-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          Release (Changelog)
        </button>

        {/* <button
          type="button"
          className={`tab-btn ${activeTab === "contact-support" ? "active" : ""}`}
          onClick={() => setActiveTab("contact-support")}
        >
          <svg
            className="tab-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="4" />
            <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
            <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
            <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
            <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
          </svg>
          Contact Support
        </button> */}

        {/* <button
          type="button"
          className={`tab-btn ${activeTab === "free-vs-pro" ? "active" : ""}`}
          onClick={() => setActiveTab("free-vs-pro")}
        >
          <svg
            className="tab-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m2 4 3 12h14l3-12-6 7-4-5-4 5-6-7z" />
            <path d="M5 20h14" />
          </svg>
          Free vs PRO
        </button> */}

        <button
          type="button"
          className={`tab-btn ${activeTab === "system" ? "active" : ""}`}
          onClick={() => setActiveTab("system")}
        >
          <svg
            className="tab-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          System Info
        </button>

        {/* <button
          type="button"
          className={`tab-btn ${activeTab === "feedback" ? "active" : ""}`}
          onClick={() => setActiveTab("feedback")}
        >
          <svg
            className="tab-icon"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Feedback
        </button> */}
      </nav>
    </>
  );
};

export default Navbar;
