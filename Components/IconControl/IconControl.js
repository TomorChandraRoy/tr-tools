import { Dropdown, TabPanel, ColorPicker } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { useState } from "@wordpress/element";
import { defaultIcons } from "./icons";
import TabButton from "../TabButton/TabButton";
import "./IconControl.scss";

const IconControl = ({
  label = __("Icon", "guten-builder-blocks"),
  value = "",
  onChange,
  colorValue = "",
  onColorChange,
  enableColor = false,
  icons = defaultIcons,
  defaultValue = "",
  defaultColorValue = "",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeMainTab, setActiveMainTab] = useState("icon");

  const currentValue = value || defaultValue;

  // Convert defaultIcons object to an array of tabs for TabPanel
  const iconTabs = Object.keys(icons).map(key => {
    // Determine a nice title
    let title = key.charAt(0).toUpperCase() + key.slice(1);
    if (key === 'fontawesome') title = 'FontAwesome';
    if (key === 'bootstrap') title = 'Bootstrap';

    return {
      name: key,
      title: title,
      className: `tr-icon-tab-${key}`
    };
  });

  // Find the selected icon anywhere in the icons object
  let selectedIcon = null;
  for (const category in icons) {
    const found = icons[category].find(item => item.value === currentValue);
    if (found) {
      selectedIcon = found;
      break;
    }
  }
  // Fallback to first icon in first category if not found but a value exists? No, keep it null if none selected.
  if (!selectedIcon && Object.keys(icons).length > 0) {
      const firstCategory = Object.keys(icons)[0];
      selectedIcon = icons[firstCategory][0];
  }

  return (
    <div className="tr-icon-control">
      {label && <span className="tr-icon-control__label">{label}</span>}
      <div className="tr-icon-control__actions">
        {value && value !== defaultValue && (
          <button
            type="button"
            className="tr-icon-control__reset-btn"
            title={__("Reset Icon", "guten-builder-blocks")}
            onClick={() => onChange(defaultValue)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </button>
        )}

        <Dropdown
          className="tr-icon-control__dropdown"
          contentClassName="tr-icon-control__popover"
          renderToggle={({ isOpen, onToggle }) => (
            <button
              type="button"
              onClick={onToggle}
              aria-expanded={isOpen}
              className="tr-icon-control__btn"
              title={__("Select Icon", "guten-builder-blocks")}
            >
              <div className="tr-icon-control__btn-icon" style={{ color: colorValue || 'inherit' }}>
                {selectedIcon && selectedIcon.icon}
              </div>
            </button>
          )}
          renderContent={() => (

            <div className="tr-icon-control__content">
              {enableColor && (
                <div style={{ padding: '12px 12px 0 12px' }}>
                  <TabButton
                    tabs={[
                      { name: 'icon', title: __('Icon', 'guten-builder-blocks') },
                      { name: 'color', title: __('Color', 'guten-builder-blocks') }
                    ]}
                    activeTab={activeMainTab}
                    onChange={setActiveMainTab}
                  />
                </div>
              )}

              {activeMainTab === 'icon' && (
                <>
                  <div className="tr-icon-control__search" style={{ padding: '12px 12px 0 12px', marginBottom: 0 }}>
                    <input
                      type="text"
                      placeholder={__("Search icons...", "guten-builder-blocks")}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="tr-icon-control__search-input"
                    />
                  </div>
                  <TabPanel
                    className="tr-icon-control__tabs"
                    activeClass="is-active"
                    tabs={iconTabs}
                  >
                    {
                      (tab) => {
                        const categoryIcons = icons[tab.name] || [];
                        const filteredIcons = categoryIcons.filter((item) =>
                          item.name.toLowerCase().includes(searchTerm.toLowerCase())
                        );

                        return (
                          <div className="tr-icon-control__tab-content">
                            <div className="tr-icon-control__grid">
                              {filteredIcons.length > 0 ? (
                                filteredIcons.map((item, idx) => (
                                  <button
                                    key={idx}
                                    type="button"
                                    className={`tr-icon-control__grid-item ${
                                      currentValue === item.value ? "is-active" : ""
                                    }`}
                                    title={item.name}
                                    onClick={() => onChange(item.value)}
                                  >
                                    {item.icon}
                                  </button>
                                ))
                              ) : (
                                <div className="tr-icon-control__empty">
                                  {__("No icons found.", "guten-builder-blocks")}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      }
                    }
                  </TabPanel>
                </>
              )}

              {activeMainTab === 'color' && enableColor && (
                <div className="tr-icon-control__color-picker" style={{ padding: '12px' }}>
                  <ColorPicker
                    color={colorValue}
                    onChangeComplete={(color) => onColorChange(color?.hex || color)}
                    enableAlpha={true}
                    defaultValue={defaultColorValue}
                  />
                </div>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
};

export const RenderIcon = ({ value, className = "", style = {} }) => {
  if (!value) return null;
  let selectedIcon = null;
  for (const category in defaultIcons) {
    const found = defaultIcons[category].find((item) => item.value === value);
    if (found) {
      selectedIcon = found;
      break;
    }
  }
  return selectedIcon ? <span className={`tr-icon ${className}`} style={style}>{selectedIcon.icon}</span> : null;
};

export default IconControl;
