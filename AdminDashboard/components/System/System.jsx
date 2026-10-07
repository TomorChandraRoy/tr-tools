import { useState } from "react";
import "./System.scss";

const System = (props) => {
  const {
    version = "1.0.0",
    wpVersion = "6.7",
    phpVersion = "8.0",
    adminUrl = "",
    slug = "guten-builder-blocks",
    isPro = false,
    availableBlocks = [],
    activeBlocks = {},
  } = props;

  const [copied, setCopied] = useState(false);

  // Calculate active blocks count
  const totalBlocks = availableBlocks.length || 11;
  const activeCount =
    Object.keys(activeBlocks).length > 0
      ? Object.values(activeBlocks).filter(Boolean).length
      : totalBlocks;

  const handleCopyReport = () => {
    const report = `
=== Guten Builder Blocks System Report ===
Plugin Name: ${slug}
Plugin Version: v${version}
License Status: ${isPro ? "PRO Edition" : "Free Edition"}
WordPress Version: v${wpVersion}
PHP Version: v${phpVersion}
Admin URL: ${adminUrl}
Active Blocks: ${activeCount} of ${totalBlocks} Enabled
Memory Limit: 256M
Max Upload Size: 64MB
    `.trim();

    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="system-wrapper">
      {/* System Hero Header */}
      {/* <div className="system-hero-card">
        <div className="hero-left">
          <span className="system-hero-icon">⚙️</span>
          <div>
            <h1 className="system-title">System Information</h1>
            <p className="system-desc">
              WordPress environment parameters, active plugin runtime, and server configuration details.
            </p>
          </div>
        </div>

        <div className="hero-right">
          <button
            type="button"
            className="btn-copy-report"
            onClick={handleCopyReport}
          >
            {copied ? (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Report Copied!
              </>
            ) : (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                Copy System Report
              </>
            )}
          </button>
        </div>
      </div> */}

      {/* Grid Status Cards */}
      <div className="system-grid">
        {/* Card 1: Plugin & License */}
        <div className="system-card">
          <div className="card-header">
            <span className="card-icon">🔌</span>
            <h3>Plugin & License Details</h3>
          </div>
          <div className="info-list">
            <div className="info-row">
              <span className="info-key">Plugin Slug</span>
              <span className="info-val code-text">{slug}</span>
            </div>
            <div className="info-row">
              <span className="info-key">Plugin Version</span>
              <span className="info-val badge-blue">v{version}</span>
            </div>
            {/* <div className="info-row">
              <span className="info-key">License Plan</span>
              <span className={`info-val ${isPro ? "badge-pro" : "badge-free"}`}>
                {isPro ? "★ PRO License Active" : "Free Edition"}
              </span>
            </div> */}
            <div className="info-row">
              <span className="info-key">Active Gutenberg Blocks</span>
              <span className="info-val badge-emerald">
                {activeCount} of {totalBlocks} Active
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: WordPress Environment */}
        <div className="system-card">
          <div className="card-header">
            <span className="card-icon">🌐</span>
            <h3>WordPress Environment</h3>
          </div>
          <div className="info-list">
            <div className="info-row">
              <span className="info-key">WordPress Version</span>
              <span className="info-val badge-dark">v{wpVersion}</span>
            </div>
            <div className="info-row">
              <span className="info-key">PHP Version</span>
              <span className="info-val badge-purple">v{phpVersion}</span>
            </div>
            {/* <div className="info-row">
              <span className="info-key">Admin Dashboard URL</span>
              <span className="info-val code-text url-text" title={adminUrl}>
                {adminUrl ? adminUrl.replace(/^https?:\/\//, "") : "Localhost"}
              </span>
            </div> */}
          </div>
        </div>

        {/* Card 3: Server & Memory Limits
        <div className="system-card">
          <div className="card-header">
            <span className="card-icon">🖥️</span>
            <h3>Server & Memory Limits</h3>
          </div>
          <div className="info-list">
            <div className="info-row">
              <span className="info-key">Memory Limit</span>
              <span className="info-val">256MB</span>
            </div>
            <div className="info-row">
              <span className="info-key">Max Upload Size</span>
              <span className="info-val">64MB</span>
            </div>
            <div className="info-row">
              <span className="info-key">JSON / REST API</span>
              <span className="info-val badge-emerald">✓ Enabled</span>
            </div>
            <div className="info-row">
              <span className="info-key">Block Asset Loader</span>
              <span className="info-val badge-blue">On-Demand Dynamic</span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default System;
