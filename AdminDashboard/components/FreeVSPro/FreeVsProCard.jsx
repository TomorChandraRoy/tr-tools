import './FreeVsProCard.scss';

const FreeVsProCard = () => {
  const comparisonFeatures = [
    {
      feature: 'Gutenberg Block Suite',
      desc: 'High-performance interactive blocks for Gutenberg editor',
      free: '11 Core Blocks',
      pro: '35+ Pro Blocks',
    },
    {
      feature: 'Starter Section Templates',
      desc: 'Ready-to-use section blocks and full page layouts',
      free: '14 Free Layouts',
      pro: '100+ Premium Templates',
    },
    {
      feature: 'Support & Lifetime Updates',
      desc: 'Dedicated technical support and continuous plugin improvements',
      free: 'Community Forum',
      pro: '24/7 Priority Support + Updates',
    },
  ];

  return (
    <div className="overview-free-vs-pro-wrap">
      <div className="free-vs-pro-card">
        {/* Single Unified Header Banner */}
        <div className="card-top-banner">
          <div className="banner-left">
            <h2>Compare Free vs PRO Features</h2>
            <p>Supercharge your WordPress Gutenberg editing experience with Guten Builder PRO.</p>
          </div>
          <div className="banner-right">
            <a
              href="https://gutenbuilder.com/pro"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-upgrade-pro"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="m2 4 3 12h14l3-12-6 7-4-5-4 5-6-7z" />
                <path d="M5 20h14" />
              </svg>
              <span>Upgrade to PRO Now</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="arrow-icon">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <span className="guarantee-text">🔒 14-Day Money-Back Guarantee • Instant Activation</span>
          </div>
        </div>

        {/* Feature Comparison Grid */}
        <div className="comparison-table-container">
          <div className="table-header">
            <div className="col-feature">FEATURE COMPARISON</div>
            <div className="col-free">FREE PLAN</div>
            <div className="col-pro">
              PRO PLAN
            </div>
          </div>
          <div className="table-body">
            {comparisonFeatures.map((item, index) => (
              <div className="table-row" key={index}>
                <div className="col-feature">
                  <span className="feature-name">{item.feature}</span>
                  <span className="feature-desc">{item.desc}</span>
                </div>
                <div className="col-free">
                  <span className="badge-free">
                    {item.free}
                  </span>
                </div>
                <div className="col-pro">
                  <span className="badge-pro">
                    {item.pro}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeVsProCard;
