import './PopularBlocks.scss';

const PopularBlocks = () => {
  const blocks = [
    {
      title: 'Audio Player',
      desc: 'Custom waveform audio player with playlist support.',
      tag: 'New',
      tagColor: 'green',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      ),
    },
    {
      title: 'Accordion & FAQ',
      desc: 'Interactive collapsible accordion with schema markup.',
      tag: 'Trending',
      tagColor: 'purple',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      ),
    },
    {
      title: 'QR Code Generator',
      desc: 'Generate dynamic vector QR codes directly in Gutenberg.',
      tag: 'Essential',
      tagColor: 'blue',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
          <path d="M14 14h3v3h-3zM18 18h3v3h-3zM14 18h3v3h-3z" />
        </svg>
      ),
    },
    {
      title: 'Pricing Table',
      desc: 'Create beautiful, responsive pricing plans with feature comparison.',
      tag: 'Popular',
      tagColor: 'orange',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="9" y1="21" x2="9" y2="9" />
        </svg>
      ),
    },
  ];

  return (
    <div className="overview-popular-blocks-wrap">
      <h3 className="section-title">Popular Blocks</h3>
      <div className="popular-blocks-grid">
        {blocks.map((item, index) => (
          <div className="block-card" key={index}>
            <div className="block-card-header">
              <div className="block-icon">{item.icon}</div>
              <span className={`block-badge ${item.tagColor}`}>{item.tag}</span>
            </div>
            <h4>{item.title}</h4>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularBlocks;
