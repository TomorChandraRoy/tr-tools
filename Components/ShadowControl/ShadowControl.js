import { __ } from '@wordpress/i18n';
import { Dropdown, Button, PanelRow, __experimentalUnitControl as WPUnitControl } from '@wordpress/components';
import ColorControl from '../ColorControl/ColorControl';
import './ShadowControl.scss';

export const DEFAULT_SHADOW = {
  hOffset: '0px',
  vOffset: '0px',
  blur: '0px',
  spread: '0px',
  color: ''
};

const ShadowControl = ({
  label = __('Box Shadow', 'guten-builder-blocks'),
  value,
  onChange,
  defaultShadow,
  defaultValue,
  defaultVal,
}) => {
  const fallback = defaultShadow || defaultValue || defaultVal;
  const currentVal = {
    ...DEFAULT_SHADOW,
    ...fallback,
    ...(typeof value === 'object' && value !== null ? value : {}),
  };

  const updateField = (field, val) => {
    if (onChange) {
      onChange({ ...currentVal, [field]: val });
    }
  };

  const resetVal = { ...DEFAULT_SHADOW, ...fallback };
  const isChanged = value && typeof value === 'object' && Object.keys(value).some(key => value[key] !== resetVal[key]);

  const handleReset = () => {
    if (onChange) {
      onChange(undefined);
    }
  };

  return (
    <PanelRow className="tr-shadow-control-wrapper">
      <span>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Dropdown
          className="tr-shadow-control-dropdown"
          contentClassName="tr-shadow-control-popover"
          popoverProps={{ placement: 'bottom-end' }}
          renderToggle={({ isOpen, onToggle }) => (
            <Button
              icon="edit"
              variant="secondary"
              onClick={onToggle}
              aria-expanded={isOpen}
              className="tr-shadow-control-toggle"
            />
          )}
          renderContent={() => (
            <div className="tr-shadow-control-content">
              <div className="tr-shadow-control-field">
                <span className="tr-shadow-control-label">{__('Horizontal Offset:', 'guten-builder-blocks')}</span>
                <WPUnitControl
                  className="tr-shadow-input tr-custom-unit-control"
                  value={currentVal.hOffset}
                  onChange={(val) => updateField('hOffset', val)}
                  units={[{ value: 'px', label: 'PX' }]}
                />
              </div>

              <div className="tr-shadow-control-field">
                <span className="tr-shadow-control-label">{__('Vertical Offset:', 'guten-builder-blocks')}</span>
                <WPUnitControl
                  className="tr-shadow-input tr-custom-unit-control"
                  value={currentVal.vOffset}
                  onChange={(val) => updateField('vOffset', val)}
                  units={[{ value: 'px', label: 'PX' }]}
                />
              </div>

              <div className="tr-shadow-control-field">
                <span className="tr-shadow-control-label">{__('Blur:', 'guten-builder-blocks')}</span>
                <WPUnitControl
                  className="tr-shadow-input tr-custom-unit-control"
                  value={currentVal.blur}
                  onChange={(val) => updateField('blur', val)}
                  units={[{ value: 'px', label: 'PX' }]}
                />
              </div>

              <div className="tr-shadow-control-field">
                <span className="tr-shadow-control-label">{__('Spread:', 'guten-builder-blocks')}</span>
                <WPUnitControl
                  className="tr-shadow-input tr-custom-unit-control"
                  value={currentVal.spread}
                  onChange={(val) => updateField('spread', val)}
                  units={[{ value: 'px', label: 'PX' }]}
                />
              </div>

              <ColorControl
                label={__('Color:', 'guten-builder-blocks')}
                value={currentVal.color}
                onChange={(val) => updateField('color', val)}
                defaultColor=""
              />
            </div>
          )}
        />
        {isChanged && (
          <Button
            icon="image-rotate"
            className="bPlResetVal"
            title={__('Reset', 'guten-builder-blocks')}
            onClick={handleReset}
          />
        )}
      </div>
    </PanelRow>
  );
};

export default ShadowControl;
