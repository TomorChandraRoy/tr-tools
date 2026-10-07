import { useState } from 'react';
import DocsModal from '../../DocsModal/DocsModal';
import './QuickLinks.scss';

const QuickLinks = () => {
  const [docsBlock, setDocsBlock] = useState(null);

  const links = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      ),
      badgeClass: 'blue',
      title: 'Documentation',
      desc: 'Explore comprehensive guides & block customization docs.',
      actionText: 'Read Docs →',
      onClick: () => setDocsBlock({ id: 'intro' }),
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="23 7 16 12 23 17 23 7" />
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
      ),
      badgeClass: 'purple',
      title: 'Video Tutorials',
      desc: 'Watch step-by-step video guides to build pages fast.',
      actionText: 'Watch Videos →',
      url: '#',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
      badgeClass: 'green',
      title: 'Need Help?',
      desc: 'Facing issues? Reach out to our dedicated support team.',
      actionText: 'Get Support →',
      url: '#',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
      badgeClass: 'gold',
      title: 'Leave a Review',
      desc: 'If you like Guten Builder, consider leaving a 5-star review.',
      actionText: 'Rate Plugin ★★★★★',
      url: '#',
    },
  ];

  return (
    <div className="overview-quick-links-wrap">
      <h3 className="section-title">Help & Resources</h3>
      <div className="quick-links-grid">
        {links.map((item, index) => (
          <div className="quick-link-card" key={index}>
            <div className={`link-icon-wrap ${item.badgeClass}`}>
              {item.icon}
            </div>
            <div className="link-content">
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
              {item.onClick ? (
                <button
                  type="button"
                  className="link-action link-action-btn"
                  onClick={item.onClick}
                >
                  {item.actionText}
                </button>
              ) : (
                <a href={item.url} className="link-action">
                  {item.actionText}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {docsBlock && (
        <DocsModal
          block={docsBlock}
          onClose={() => setDocsBlock(null)}
        />
      )}
    </div>
  );
};

export default QuickLinks;
