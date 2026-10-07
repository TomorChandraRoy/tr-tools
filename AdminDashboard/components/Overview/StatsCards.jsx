import "./StatsCards.scss";


const StatsCards = (props) => {



  const { activeBlocks, availableBlocks, isPro, wpVersion, phpVersion } = props;

  const totalBlocksCount = availableBlocks?.length || 0;
  const activeBlocksCount = availableBlocks?.filter((b) => {
    // Check if block is active in activeBlocks object (handling both nested activeBlocks or direct object)
    const blockState = activeBlocks?.activeBlocks?.[b.id] ?? activeBlocks?.[b.id];
    return blockState !== false;
  }).length || 0;

  return (
    <>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrap green">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            </svg>
          </div>
          <div className="stat-info">
            <h3 className="stat-label">INCLUDED BLOCKS</h3>
            <div className="stat-value">{totalBlocksCount}</div>
            <p className="stat-desc">Essential Gutenberg blocks in suite</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap blue">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 11 12 14 22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
          </div>
          <div className="stat-info">
            <h3 className="stat-label">ACTIVE BLOCKS</h3>
            <div className="stat-value">{activeBlocksCount}</div>
            <p className="stat-desc">Enabled in Gutenberg editor</p>
          </div>
        </div>

        {/* <div className="stat-card">
          <div className="stat-icon-wrap gold">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m2 4 3 12h14l3-12-6 7-4-5-4 5-6-7z" />
              <path d="M5 20h14" />
            </svg>
          </div>
          <div className="stat-info">
            <h3 className="stat-label">LICENSE PLAN</h3>
            <div className="stat-value">
              {isPro ? "Paid Version" : "Free Version"}
            </div>
            <p className="stat-desc">
              {isPro
                ? "All Pro features unlocked"
                : "Upgrade for 15+ Pro Blocks"}
            </p>
          </div>
        </div> */}

        <div className="stat-card">
          <div className="stat-icon-wrap teal">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div className="stat-info">
            <h3 className="stat-label">COMPATIBILITY</h3>
            <div className="stat-value">
              {wpVersion ? `WP ${wpVersion} Ready` : "WP 6.x Ready"}
            </div>
            <p className="stat-desc">
              {phpVersion
                ? `PHP ${phpVersion.split(".").slice(0, 2).join(".")} & Sync Verified`
                : "Fully optimized & sync verified"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatsCards;
