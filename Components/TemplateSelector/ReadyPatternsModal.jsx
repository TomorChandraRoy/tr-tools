import { __ } from '@wordpress/i18n';
import { useState, createPortal } from '@wordpress/element';

const ReadyPatternsModal = ({ isOpen, onClose, onImportPattern, isPro, proTemplates = [], templates = [], title }) => {
  const [viewMode, setViewMode] = useState('grid');

  if (!isOpen) return null;

  const isProActive = Boolean(isPro) || Boolean(window?.gbbData?.isPro);

  return createPortal(
    <div className="gbb-patterns-modal-overlay" onClick={onClose}>
      <div className="gbb-patterns-modal-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="gbb-patterns-modal-header">
          <div className="gbb-header-left">
            <div className="gbb-block-logo">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            </div>
            <h3 className="gbb-header-title">{title || __('FAQ / Vertical Accordion', 'tr-tools')}</h3>
          </div>

          <div className="gbb-header-right">
            <button 
              type="button" 
              className={`gbb-header-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title={__('List View', 'tr-tools')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <circle cx="3" cy="6" r="1.5" fill="currentColor" />
                <circle cx="3" cy="12" r="1.5" fill="currentColor" />
                <circle cx="3" cy="18" r="1.5" fill="currentColor" />
              </svg>
            </button>
            <button 
              type="button" 
              className={`gbb-header-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title={__('Grid View', 'tr-tools')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
              </svg>
            </button>
            <button 
              type="button" 
              className="gbb-header-btn"
              onClick={() => {}}
              title={__('Refresh Templates', 'tr-tools')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
              </svg>
            </button>

            <button 
              type="button" 
              className="gbb-patterns-modal-close" 
              onClick={onClose} 
              aria-label={__('Close Templates Library', 'tr-tools')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className={`gbb-patterns-modal-body view-mode-${viewMode}`}>
          <div className="gbb-patterns-grid">
            {templates.map((item) => {
              const SvgPreview = item.icon || item.SvgComponent;
              const isItemPro = item.isPro || proTemplates.includes(item.id);
              const isLocked = isItemPro && !isProActive;

              return (
                <div key={item.id} className="gbb-pattern-card">
                  <div className="gbb-pattern-preview-container" style={{ padding: '24px', boxSizing: 'border-box' }}>
                    {SvgPreview ? <SvgPreview /> : <div style={{ height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>{__('No Preview', 'tr-tools')}</div>}
                    <div className="gbb-pattern-overlay">
                      <button type="button" className="gbb-btn-live-preview" onClick={() => onImportPattern(item)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                        {__('Live Preview', 'tr-tools')}
                      </button>
                    </div>
                  </div>

                  <div className="gbb-pattern-details">
                    <span className="gbb-pattern-name">{item.label || item.name}</span>
                    <div className="gbb-pattern-actions">
                      
                      {isLocked ? (
                        <a 
                          href="https://yourwebsite.com/pro" 
                          target="_blank" 
                          rel="noreferrer" 
                          className="gbb-btn-pattern-pro"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px' }}>
                            <path d="M2 17l4-10 6 4 6-4 4 10H2z" />
                            <path d="M2 21h20" />
                          </svg>
                          {__('PRO', 'tr-tools')}
                        </a>
                      ) : (
                        <button 
                          type="button" 
                          className="gbb-btn-pattern-import"
                          onClick={() => onImportPattern(item)}
                        >
                          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '6px' }}>
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                          </svg>
                          {__('Import', 'tr-tools')}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>,
    document.body
  );
};

export default ReadyPatternsModal;
