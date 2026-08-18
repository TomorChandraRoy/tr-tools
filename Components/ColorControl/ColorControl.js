import { ColorPicker, Dropdown } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import "./ColorControl.scss";

/*
 * @props label: 'Color' (String)
 * @props value: value of color (String)
 * @props enableAlpha: alpha channel enabled (Boolean)
 * @props customColors: array of custom colors (Array)
 * @props defaultColor: default color for reset color (String)
 * @props onChange: (Function)
 * @return color (String)
*/

const DEFAULT_CUSTOM_COLORS = [
  { name: "Orange", color: "#f97316" },
  { name: "White", color: "#ffffff" },
  { name: "Lime", color: "#a3e635" },
  { name: "Dark Charcoal", color: "#262626" },
  { name: "Gray", color: "#737373" },
];

const ColorControl = ({label, value = "", onChange, enableAlpha = true, customColors = DEFAULT_CUSTOM_COLORS, defaultColor = "#475569" }) => {

  const isChanged = Boolean(value && defaultColor && value.trim().toLowerCase() !== defaultColor.trim().toLowerCase(),);

  return (
    <div className="tr-color-control">
      {label && <span className="tr-color-control__label">{label}</span>}
      <div className="tr-color-control__actions">

        {isChanged && (
          <button
            type="button"
            className="tr-color-control__reset-btn"
            title={__("Reset to default color", "guten-builder-blocks")}
            onClick={() => onChange(defaultColor)}
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
          renderToggle={({ isOpen, onToggle }) => (
            <button
              type="button"
              onClick={onToggle}
              aria-expanded={isOpen}
              className="tr-color-control__btn"
              style={{ backgroundColor: value || defaultColor }}
            />
          )}
          renderContent={() => (
            <div className="tr-color-control__popover">
              {/* Top: Color Picker Canvas + Sliders */}
              <div className="tr-color-control__picker-canvas">
                <ColorPicker
                  color={value}
                  onChange={onChange}
                  enableAlpha={enableAlpha}
                  defaultValue={defaultColor}
                />
              </div>

              {/* Custom Colors Section */}
              {customColors && customColors.length > 0 && (
                <div className="tr-color-control__section">
                  <div className="tr-color-control__section-title">
                    {__("Custom colors", "guten-builder-blocks")}
                  </div>
                  <div className="tr-color-control__swatches">
                    {customColors.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`tr-color-control__swatch ${
                          value === item.color ? "active" : ""
                        }`}
                        style={{ backgroundColor: item.color }}
                        title={item.name || item.color}
                        onClick={() => onChange(item.color)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default ColorControl;


