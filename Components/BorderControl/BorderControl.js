import { __ } from '@wordpress/i18n';
import { Dropdown, Button, PanelRow, SelectControl, __experimentalUnitControl as WPUnitControl } from '@wordpress/components';
import ColorControl from '../ColorControl/ColorControl';
import './BorderControl.scss';

export const DEFAULT_BORDER = {
  width: '',
  style: 'solid',
  color: '',
  side: 'all'
};


const BorderControl = ({
  label = __('Border', 'guten-builder-blocks'),
  value,
  onChange,
  defaultBorder,
  defaultValue,
  defaultVal,
}) => {
  const fallback = defaultBorder || defaultValue || defaultVal;
  const currentVal = {
    ...DEFAULT_BORDER,
    ...fallback,
    ...(typeof value === 'object' && value !== null ? value : {}),
  };

  const updateField = (field, val) => {
    if (onChange) {
      onChange({ ...currentVal, [field]: val });
    }
  };

  const resetVal = { ...DEFAULT_BORDER, ...fallback };
  const isChanged = value && typeof value === 'object' && Object.keys(value).some(key => value[key] !== resetVal[key]);

  const handleReset = () => {
    if (onChange) {
      onChange(undefined);
    }
  };

  return (
    <PanelRow className="tr-border-control-wrapper">
      <span >{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Dropdown
          className="tr-border-control-dropdown"
          contentClassName="tr-border-control-popover"
          popoverProps={{ placement: 'bottom-end' }}
          renderToggle={({ isOpen, onToggle }) => (
            <Button
              icon="edit"
              variant="secondary"
              onClick={onToggle}
              aria-expanded={isOpen}
              className="tr-border-control-toggle"
            />
          )}
          renderContent={() => (
            <div className="tr-border-control-content">

            <div className="tr-border-control-field">
                <span className="tr-border-control-label">{__('Width:', 'guten-builder-blocks')}</span>
                <WPUnitControl
                    className="tr-border-width-input tr-custom-unit-control"
                    value={currentVal.width}
                    onChange={(val) => updateField('width', val)}
                    units={[{ value: 'px', label: 'PX' }]}
                />
            </div>

            <div className="tr-border-control-field">
                <span className="tr-border-control-label">{__('Style:', 'guten-builder-blocks')}</span>
                <SelectControl
                    className="tr-border-style-select"
                    value={currentVal.style}
                    options={[
                        { label: 'Solid', value: 'solid' },
                        { label: 'Dashed', value: 'dashed' },
                        { label: 'Dotted', value: 'dotted' },
                        { label: 'Double', value: 'double' },
                        { label: 'None', value: 'none' },
                    ]}
                    onChange={(val) => updateField('style', val)}
                />
            </div>

            <ColorControl
                label={__('Color:', 'guten-builder-blocks')}
                value={currentVal.color}
                onChange={(val) => updateField('color', val)}
                defaultColor=""
            />

            <div className="tr-border-control-field">
                <span className="tr-border-control-label">{__('Sides:', 'guten-builder-blocks')}</span>
                <SelectControl
                    className="tr-border-side-select"
                    value={currentVal.side}
                    options={[
                        { label: 'All Sides', value: 'all' },
                        { label: 'Top', value: 'top' },
                        { label: 'Right', value: 'right' },
                        { label: 'Bottom', value: 'bottom' },
                        { label: 'Left', value: 'left' },
                        { label: 'Top Right', value: 'top-right' },
                        { label: 'Top Bottom', value: 'top-bottom' },
                        { label: 'Top Left', value: 'top-left' },
                        { label: 'Top Right Bottom', value: 'top-right-bottom' },
                        { label: 'Top Right Left', value: 'top-right-left' },
                        { label: 'Top Bottom Left', value: 'top-bottom-left' },
                        { label: 'Right Bottom', value: 'right-bottom' },
                        { label: 'Right Left', value: 'right-left' },
                        { label: 'Right Bottom Left', value: 'right-bottom-left' },
                        { label: 'Bottom Left', value: 'bottom-left' },
                    ]}
                    onChange={(val) => updateField('side', val)}
                />
            </div>
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

export default BorderControl;
