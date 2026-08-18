import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import './TabButton.scss';

const DefaultGeneralIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const DefaultStyleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
    <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.92 0 1.7-.71 1.7-1.63 0-.44-.17-.86-.48-1.18-.32-.32-.48-.74-.48-1.19 0-.92.78-1.63 1.7-1.63h2.56c2.76 0 5-2.24 5-5 0-5.5-4.5-10-10-10Z" />
  </svg>
);

/**
 * Reusable TabButton Component
 * Supports custom icons, labels, and active tab state management.
 */
const TabButton = ({
  tabs = [
    { name: 'general', title: __('General', 'guten-builder-blocks'), icon: <DefaultGeneralIcon /> },
    { name: 'style', title: __('Style', 'guten-builder-blocks'), icon: <DefaultStyleIcon /> },
  ],
  activeTab,
  onChange,
  className = '',
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(tabs[0]?.name || 'general');

  const currentActiveTab = activeTab !== undefined ? activeTab : internalActiveTab;

  const handleTabChange = (tabName) => {
    if (activeTab === undefined) {
      setInternalActiveTab(tabName);
    }
    if (typeof onChange === 'function') {
      onChange(tabName);
    }
  };

  return (
    <div className={`tr-tab-buttons ${className}`}>
      {tabs.map((tab, index) => {
        const isActive = currentActiveTab === tab.name;
        return (
          <span key={tab.name || index} style={{ display: 'contents' }}>
            <button
              type="button"
              className={`tr-subtab-btn ${isActive ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.name)}
            >
              {tab.icon && <span className="tr-tab-icon">{tab.icon}</span>}
              {tab.title || tab.label || tab.name}
            </button>
            {index < tabs.length - 1 && <div className="tr-tab-divider" />}
          </span>
        );
      })}
    </div>
  );
};

export default TabButton;
