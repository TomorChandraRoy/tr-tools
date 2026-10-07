import { useState } from "react";
import "./Changelog.scss";


/**
 * Supported badgeType options:
 * - "stable"  : Green badge  (e.g., "Initial Stable Release", "Stable Release")
 * - "major"   : Blue badge   (e.g., "Major Update", "v2.0 Big Launch")
 * - "minor"   : Teal badge   (e.g., "Feature Update", "Minor Release")
 * - "patch"   : Amber badge  (e.g., "Patch Update", "Bug Fix Release")
 * - "hotfix"  : Red badge    (e.g., "Critical Hotfix", "Security Patch")
 * - "beta"    : Purple badge (e.g., "Beta Preview", "Pre-Release")
 */
const defaultChangelogData = [
  {
    version: "v1.1.0",
    date: "October 05, 2026",
    badge: "Feature Update",
    badgeType: "minor",
    summary:
      "Added brand new block features, enhanced loading performance, and resolved minor styling issues.",
    categories: [
      {
        name: "✨ New Features",
        type: "feat",
        items: [
          "Added new interactive block presets and animations.",
          "Introduced customizable responsive controls for mobile breakpoints.",
        ],
      },
      {
        name: "⚡ Speed & Performance",
        type: "perf",
        items: [
          "Optimized asset delivery and reduced JS bundle size by 15%.",
          "Improved layout render timing with asynchronous icon loading.",
        ],
      },
      {
        name: "🐛 Bug Fixes & Improvements",
        type: "fix",
        items: [
          "Fixed rare alignment shift in tablet viewport.",
          "Resolved Gutenberg block attribute persistence issue.",
        ],
      },
    ],
  },
  {
    version: "v1.0.1",
    date: "October 02, 2026",
    badge: "Patch Release",
    badgeType: "patch",
    summary:
      "Quick maintenance patch resolving responsive styling and editor inspector control conflicts.",
    categories: [
      {
        name: "🐛 Bug Fixes & Improvements",
        type: "fix",
        items: [
          "Fixed responsive layout glitch on mobile viewports for nested block columns.",
          "Resolved admin editor inspector controls re-rendering conflict.",
          "Fixed cross-browser font smoothing and CSS variable inheritance.",
        ],
      },
    ],
  },
  {
    version: "v1.0.0",
    date: "September 30, 2026",
    badge: "Initial Stable Release",
    badgeType: "stable",
    summary:
      "First official stable release featuring 11+ high-performance Gutenberg blocks, rock-solid stability, and zero jQuery dependency.",
    categories: [
      {
        name: "✨ New Features",
        type: "feat",
        items: [
          "Introduced 11 high-performance Gutenberg blocks (Before/After Slider, Accordion, Audio Player, Pricing Table, etc.).",
          "Rich block customization controls with live preview and typography options.",
        ],
      },
      {
        name: "⚡ Speed & Performance",
        type: "perf",
        items: [
          "Optimized frontend asset loading with conditional script & stylesheet enqueuing.",
          "Zero jQuery dependency — pure lightweight vanilla JavaScript implementation.",
          "CSS bundle size minimized with optimized layout rendering and zero layout shifts.",
        ],
      },
    ],
  },
];

const Changelog = ({ changelog, version, slug }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const data = Array.isArray(changelog) && changelog.length > 0 ? changelog : defaultChangelogData;
  const currentVersion = version
    ? (String(version).startsWith("v") ? version : `v${version}`)
    : (data[0]?.version || "v1.0.0");
  const pluginTitle = slug || "XpoBlock";

  return (
    <div className="changelog-wrapper">
      {/* Header Banner */}
      <div className="changelog-hero">
        <div className="hero-content">
          <div className="hero-title-group">
            <span className="hero-icon">🚀</span>
            <div>
              <h1 className="hero-title">Release Notes & Changelog</h1>
              <p className="hero-subtitle">
                Track updates, new Gutenberg blocks, performance optimizations, and bug fixes for {pluginTitle}.
              </p>
            </div>
          </div>

          <div className="hero-stats">
            <div className="stat-pill">
              <span className="stat-label">Current Release</span>
              <span className="stat-value">{currentVersion}</span>
            </div>
            <div className="stat-pill">
              <span className="stat-label">Total Releases</span>
              <span className="stat-value">
                {data.length} {data.length === 1 ? "Release" : "Releases"}
              </span>
            </div>
            <div className="stat-pill">
              <span className="stat-label">Status</span>
              <span className="stat-badge-online">● Active & Stable</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="changelog-toolbar">
        <div className="search-box">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search release notes (e.g. Accordion, Slider, FIX)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-chips">
          <button
            type="button"
            className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
            onClick={() => setActiveFilter("all")}
          >
            All Changes
          </button>
          <button
            type="button"
            className={`filter-btn ${activeFilter === "feat" ? "active" : ""}`}
            onClick={() => setActiveFilter("feat")}
          >
            New Features
          </button>
          <button
            type="button"
            className={`filter-btn ${activeFilter === "perf" ? "active" : ""}`}
            onClick={() => setActiveFilter("perf")}
          >
            Speed & Perf
          </button>
          <button
            type="button"
            className={`filter-btn ${activeFilter === "fix" ? "active" : ""}`}
            onClick={() => setActiveFilter("fix")}
          >
            Bug Fixes
          </button>
        </div>
      </div>

      {/* Timeline Releases List */}
      <div className="changelog-timeline-list">
        {data.map((release, idx) => {
          return (
            <div key={idx} className="timeline-release-card">
              <div className="release-node-badge">
                <span className="pulse-dot"></span>
              </div>

              <div className="release-card-inner">
                {/* Release Card Header */}
                <div className="release-card-header">
                  <div className="version-info">
                    <span className="version-tag">{release.version}</span>
                    <span className="release-date">📅 {release.date}</span>
                    <span className={`status-badge ${release.badgeType}`}>
                      {release.badge}
                    </span>
                  </div>
                </div>

                <p className="release-summary">{release.summary}</p>

                {/* Categorized Changes */}
                <div className="release-categories">
                  {release.categories && release.categories.map((cat, cIdx) => {
                    if (
                      activeFilter !== "all" &&
                      activeFilter !== cat.type
                    ) {
                      return null;
                    }

                    const filteredItems = (cat.items || []).filter((item) =>
                      item.toLowerCase().includes(searchQuery.toLowerCase())
                    );

                    if (searchQuery && filteredItems.length === 0) {
                      return null;
                    }

                    return (
                      <div key={cIdx} className={`category-block ${cat.type}`}>
                        <h4 className="category-title">{cat.name}</h4>
                        <ul className="category-items-list">
                          {filteredItems.map((item, iIdx) => (
                            <li key={iIdx}>
                              <span className="check-bullet">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Changelog;
