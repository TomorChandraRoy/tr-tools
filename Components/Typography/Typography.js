import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { Button, Dropdown, Flex, PanelRow, RangeControl, SelectControl, __experimentalUnitControl as UnitControl } from "@wordpress/components";
import fontList from "./fontList";
import { Devices } from "../index";
import { FONT_STYLES, TEXT_TRANSFORMS, TEXT_DECORATIONS, WEIGHT_LABELS } from "./options";
import { pxUnit, remUnit, emUnit, vwUnit,perUnit } from "../../utils";
import "./Typography.scss";

/**
 * Typography Component
 *
 * @param {Object} props
 * @param {string} [props.className] - Optional CSS class name (e.g. 'mt20')
 * @param {string} [props.label='Typography'] - Label for the typography control
 * @param {Object|number|string} [props.value] - Typography value object or font size
 * @param {number} [props.value.fontSize] - Font size in px
 * @param {string} [props.value.fontFamily] - Font family name
 * @param {string|number} [props.value.fontWeight] - Font weight (e.g. '400', '600', '700')
 * @param {number} [props.value.lineHeight] - Line height value
 * @param {number} [props.value.letterSpacing] - Letter spacing in px
 * @param {string} [props.value.textTransform] - Text transform ('none', 'capitalize', 'uppercase', 'lowercase')
 * @param {string} [props.value.textDecoration] - Text decoration ('none', 'underline', 'line-through', 'overline')
 * @param {string} [props.value.fontStyle] - Font style ('normal', 'italic', 'oblique')
 * @param {Object} [props.defaultValue] - Default typography object for reset
 * @param {Object} [props.defaultTypography] - Default typography object for reset
 * @param {Function} props.onChange - Change handler callback function
 * @returns {JSX.Element} Typography control component
 */

const Typography = ({ className = "", label = __('Typography:'), value = {}, onChange, defaultValue, defaultTypography }) => {

  const resetVal = defaultTypography || defaultValue || {};

  const currentVal = typeof value === "object" && value !== null ? value : { fontSize: value };
  const [device, setDevice] = useState('desktop');

  const getFontSizeForDevice = () => {
    let size = '';
    if (currentVal.fontSize && typeof currentVal.fontSize === 'object') {
      size = currentVal.fontSize[device];
    } else if (device === 'desktop') {
      size = currentVal.fontSize;
    }

    // Convert legacy raw numbers to strings with 'px'
    if (typeof size === 'number' || (typeof size === 'string' && size !== '' && !isNaN(size))) {
      return `${size}px`;
    }

    return size || '';
  };

  const handleFontSizeChange = (newSize) => {
    let newFontSizeObj = typeof currentVal.fontSize === 'object' ? { ...currentVal.fontSize } : { desktop: currentVal.fontSize || '' };
    newFontSizeObj[device] = newSize;
    updateField('fontSize', newFontSizeObj);
  };


  const fontOptions = fontList.map((item) => ({
    label: item.family,
    value: item.family === "Default" ? "" : item.family,
  }));

  const selectedFontObj =
    fontList.find(
      (item) =>
        item.family.toLowerCase() === (currentVal.fontFamily || "default").toLowerCase(),
    ) || fontList[0];

  const weightOptions = [
    { label: "Default", value: "" },
    ...(selectedFontObj.variants || []).map((v) => ({
      label: WEIGHT_LABELS[v] || `${v}`,
      value: String(v),
    })),
  ];

  const isChanged = Boolean(
    resetVal &&
      Object.keys(resetVal).some(
        (key) =>
          currentVal[key] !== undefined &&
          JSON.stringify(currentVal[key]).toLowerCase() !== JSON.stringify(resetVal[key]).toLowerCase(),
      ),
  );

  const updateField = (fieldKey, fieldVal) => {
    if (typeof onChange === "function") {
      onChange({ ...currentVal, [fieldKey]: fieldVal });
    }
  };

  const handleReset = () => {
    if (typeof onChange === "function") {
      onChange(resetVal);
    }
  };


  const getDefault = (property) => resetVal?.[property];
  const setDefault = (property) => updateField(property, undefined);
  const resetValue = property => currentVal?.[property] !== undefined && currentVal?.[property] !== "" && currentVal?.[property] !== getDefault(property) ? <Button icon='image-rotate' className='bPlResetVal' onClick={() => setDefault(property)} /> : null;

  return (
    <div className={`tr-typography-control ${className}`.trim()}>
      {label && <span className="tr-typography-control__label">{label}</span>}

      <div className="tr-typography-control__actions">
        {isChanged && (
          <button
            type="button"
            className="tr-typography-control__reset-btn"
            title="Reset to default typography"
            onClick={handleReset}
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
              className={`tr-typography-control__trigger-btn ${isOpen ? "active" : ""}`}
              title="Edit Typography"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="4 7 4 4 20 4 20 7" />
                <line x1="9" y1="20" x2="15" y2="20" />
                <line x1="12" y1="4" x2="12" y2="20" />
              </svg>
            </button>
          )}
          renderContent={() => (
            <div className="tr-typography-control__popover">
              {/* Font Family */}
              <SelectControl
                label={__("Font Family :", "guten-builder-blocks")}
                value={currentVal.fontFamily || ""}
                options={fontOptions}
                onChange={(val) => updateField("fontFamily", val)}
              />

              {/* Font Weight */}
              <SelectControl
                label={__("Font Weight :", "guten-builder-blocks")}
                value={currentVal.fontWeight || ""}
                options={weightOptions}
                onChange={(val) => updateField("fontWeight", val)}
              />



            {/* Font Size */}
                <Flex className='mt20' align="center" justify="space-between">
                  <span className="tr-typography-control__field-label" style={{ marginBottom: 0, whiteSpace: 'nowrap', marginRight: '8px' }}>{__("Font Size :", "guten-builder-blocks")}</span>
                  <Flex align="center" gap={2} style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <Devices device={device} onChange={setDevice} />
                    <div className="tr-custom-unit-control" style={{ width: '100px' }}>
                      <UnitControl
                        key={device}
                        value={getFontSizeForDevice()}
                        onChange={handleFontSizeChange}
                        units={[pxUnit(), remUnit(), emUnit(), vwUnit()]}
                      />
                    </div>
                  </Flex>
                </Flex>
            {/* Letter Spacing */}
            <PanelRow className='mt20' style={{ alignItems: 'center' }}>
              <UnitControl className="tr-custom-unit-control" label={__('Letter Spacing:')} labelPosition='left' value={currentVal.letterSpacing}  onChange={(val) => updateField("letterSpacing", val)} units={[pxUnit(), emUnit(), remUnit()]} />
              {resetValue('letterSpacing')}
            </PanelRow>


            {/* Line Height */}
            <PanelRow className='mt20' style={{ alignItems: 'center' }}>
              <UnitControl className="tr-custom-unit-control" label={__('Line Height:')} labelPosition='left'  value={currentVal.lineHeight} onChange={(val) => updateField("lineHeight", val)} units={[pxUnit(), perUnit(), emUnit(), remUnit()]} isResetValueOnUnitChange={true} />
              {resetValue('lineHeight')}
            </PanelRow>

              {/* Font Style */}
              <div className="tr-typography-control__field">
                <span className="tr-typography-control__field-label">
                  {__("Font Style :", "guten-builder-blocks")}
                </span>
                <div className="tr-typography-control__btn-group">
                  {FONT_STYLES.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      title={item.label}
                      className={`tr-typography-control__option-btn ${
                        (currentVal.fontStyle || "normal") === item.value
                          ? "active"
                          : ""
                      }`}
                      onClick={() => updateField("fontStyle", item.value)}
                    >
                      {item.icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Transform */}
              <div className="tr-typography-control__field">
                <span className="tr-typography-control__field-label">
                  {__("Text Transform :", "guten-builder-blocks")}
                </span>
                <div className="tr-typography-control__btn-group">
                  {TEXT_TRANSFORMS.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      title={item.label}
                      className={`tr-typography-control__option-btn ${
                        (currentVal.textTransform || "none") === item.value
                          ? "active"
                          : ""
                      }`}
                      onClick={() => updateField("textTransform", item.value)}
                    >
                      {item.icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Decoration */}
              <div className="tr-typography-control__field">
                <span className="tr-typography-control__field-label">
                  {__("Text Decoration :", "guten-builder-blocks")}
                </span>
                <div className="tr-typography-control__btn-group">
                  {TEXT_DECORATIONS.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      title={item.label}
                      className={`tr-typography-control__option-btn ${
                        (currentVal.textDecoration || "none") === item.value
                          ? "active"
                          : ""
                      }`}
                      onClick={() => updateField("textDecoration", item.value)}
                    >
                      {item.icon}
                    </button>
                  ))}
                </div>
              </div>


            </div>
          )}
        />
      </div>
    </div>
  );
};

export default Typography;
