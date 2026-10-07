import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import DocsModal from '../../AdminDashboard/DocsModal/DocsModal';
import './DocsLink.scss';

const ExternalLinkIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const DocsLink = ({ link, text }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getBlockKey = (url) => {
    if (!url) return 'table-of-contents';
    const cleanUrl = String(url).trim().replace(/\/$/, '');
    const parts = cleanUrl.split('/');
    return parts[parts.length - 1] || 'table-of-contents';
  };

  const blockKey = getBlockKey(link);

  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };

  return (
    <>
      <div className="gbb-inspector-docs-wrapper">
        <a
          href={link || '#'}
          onClick={handleClick}
          style={{ cursor: 'pointer' }}
        >
          {text || __('Documentation', 'tr-tools')}
          <ExternalLinkIcon />
        </a>
      </div>

      {isOpen && (
        <DocsModal
          block={{ id: blockKey }}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default DocsLink;
