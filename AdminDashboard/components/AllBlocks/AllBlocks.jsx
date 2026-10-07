
import { useState } from "react";
import apiFetch from "@wordpress/api-fetch";
import { Button, ToggleControl } from "@wordpress/components";
import "./AllBlocks.scss";
import Banner from "./Banner/Banner";
import DocsModal from "../../DocsModal/DocsModal";
// import DemoModal from "../../DemoModal/DemoModal";

const AllBlocks = (props) => {
  const { availableBlocks = [], activeBlocks = {} } = props;

  // লোকাল স্টেট (ইউজার অন/অফ করলে সাথে সাথে আপডেট দেখানোর জন্য)
  const [blocksState, setBlocksState] = useState(
    activeBlocks?.activeBlocks || activeBlocks || {}
  );
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [docsBlock, setDocsBlock] = useState(null);
  // const [demoBlock, setDemoBlock] = useState(null);

  const isBlockActive = (blockId) => {
    const val = blocksState[blockId];
    return val !== false && val !== "false" && val !== "" && val !== 0;
  };

  // ১. সিঙ্গেল ব্লক অন/অফ টগল করা
  const toggleBlock = (blockId) => {
    setBlocksState((prev) => {
      const currentVal = prev[blockId];
      const active = currentVal !== false && currentVal !== "false" && currentVal !== "" && currentVal !== 0;
      return {
        ...prev,
        [blockId]: !active,
      };
    });
  };

  // ২. সব ব্লক একসাথে অন/অফ করা
  const setAllBlocksState = (status) => {
    const updated = {};
    availableBlocks.forEach((b) => {
      updated[b.id] = status;
    });
    setBlocksState(updated);
  };

  // ৩. সেটিংস ডাটাবেজে সেভ করা (POST Request)
  const saveSettings = () => {
    setIsSaving(true);
    apiFetch({
      path: "/xpo-blocks/v1/settings",
      method: "POST",
      data: {
        activeBlocks: blocksState,
      },
    })
      .then(() => {
        setSaveMessage("Settings saved successfully!");
        setTimeout(() => setSaveMessage(""), 3500);
      })
      .catch(() => {
        setSaveMessage("Error saving settings.");
        setTimeout(() => setSaveMessage(""), 3500);
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  // সার্চ ও ফিল্টার লজিক
  const filteredBlocks = availableBlocks.filter((block) => {
    const matchesSearch =
      block.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      block.desc?.toLowerCase().includes(searchQuery.toLowerCase());

    const isActive = isBlockActive(block.id);

    if (filterStatus === "active") return matchesSearch && isActive;
    if (filterStatus === "inactive") return matchesSearch && !isActive;
    return matchesSearch;
  });

  const totalBlocksCount = availableBlocks.length;
  const activeBlocksCount = availableBlocks.filter(
    (block) => isBlockActive(block.id)
  ).length;
  const disabledBlocksCount = totalBlocksCount - activeBlocksCount;

  return (
    <div className="all-blocks-wrap">
      <div className="all-blocks-header">
        <div>
          <h2 className="all-blocks-title">All Blocks</h2>
          <p className="all-blocks-desc">
            Toggle block availability for the WordPress editor in real-time.
          </p>
        </div>

        <div>
          {saveMessage && <span className="save-message">{saveMessage}</span>}
          <Button
            className="btn-save"
            isPrimary
            onClick={saveSettings}
            isBusy={isSaving}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Toolbar & Grid Code ... */}
      {/* Toolbar: Search, Filter, Bulk Actions */}
      <div className="suite-toolbar">
        <div className="search-input-wrapper">
          <svg
            className="search-icon"
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
            className="search-input"
            placeholder="Search blocks by name or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="clear-search"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        <div className="filter-group">
          <button
            className={`filter-btn ${filterStatus === "all" ? "active" : ""}`}
            onClick={() => setFilterStatus("all")}
          >
            All ({totalBlocksCount})
          </button>
          <button
            className={`filter-btn ${filterStatus === "active" ? "active" : ""}`}
            onClick={() => setFilterStatus("active")}
          >
            Active ({activeBlocksCount})
          </button>
          <button
            className={`filter-btn ${filterStatus === "inactive" ? "active" : ""}`}
            onClick={() => setFilterStatus("inactive")}
          >
            Disabled ({disabledBlocksCount})
          </button>
        </div>

        <div className="bulk-group">
          <button className="bulk-btn" onClick={() => setAllBlocksState(true)}>
            Enable All
          </button>
          <span className="bulk-divider">|</span>
          <button className="bulk-btn" onClick={() => setAllBlocksState(false)}>
            Disable All
          </button>
        </div>
      </div>

      {filteredBlocks.length === 0 ? (
        <div className="empty-blocks-state">
          <p className="empty-title">No matching blocks found</p>
          <p className="empty-desc">
            Try searching for a different keyword or reset your status filter.
          </p>
          <button
            className="btn-secondary"
            onClick={() => {
              setSearchQuery("");
              setFilterStatus("all");
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="blocks-grid">
          {filteredBlocks.map((block) => {
            const isActive = isBlockActive(block.id);
            return (
              <div
                className={`block-card ${isActive ? "is-active" : "is-disabled"}`}
                key={block.id}
              >
                <Banner block={block} />
                <div className="block-content">
                  <div className="block-header">
                    <h3 className="block-title">{block.title}</h3>
                    <span
                      className={`block-badge ${isActive ? "badge-active" : "badge-disabled"}`}
                    >
                      {isActive ? "Active" : "Disabled"}
                    </span>
                  </div>
                  <p className="block-desc">
                    {block.desc || block.description}
                  </p>
                  <div className="block-links">
                    {/* <button
                      type="button"
                      className="block-link demo-link"
                      onClick={(e) => {
                        e.preventDefault();
                        setDemoBlock(block);
                      }}
                    >
                      Live Demo
                    </button> */}
                    <span className="link-divider">|</span>
                    <button
                      type="button"
                      className="block-link docs-link"
                      onClick={(e) => {
                        e.preventDefault();
                        setDocsBlock(block);
                      }}
                    >
                      Read Docs
                    </button>
                  </div>
                  <div className="block-toggle">
                    <ToggleControl
                      label={isActive ? "Enabled for Editor" : "Disabled"}
                      checked={isActive}
                      onChange={() => toggleBlock(block.id)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {docsBlock && <DocsModal block={docsBlock} onClose={() => setDocsBlock(null)} />}
      {/* {demoBlock && <DemoModal block={demoBlock} onClose={() => setDemoBlock(null)} />} */}
    </div>
  );
};

export default AllBlocks;
