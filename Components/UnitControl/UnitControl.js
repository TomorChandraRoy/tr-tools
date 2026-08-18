import { __ } from "@wordpress/i18n";
import {  __experimentalUnitControl as WPUnitControl, Button } from "@wordpress/components";
import "./UnitControl.scss";

const UnitControl = ({
  label,
  value,
  onChange,
  units,
  defaultVal,
  isResetValueOnUnitChange = true,
  className = 'mt20',
  ...props
}) => {
  const showReset = value !== undefined && value !== "" && value !== defaultVal;

  const handleReset = () => {
    if (onChange) {
      onChange(undefined);
    }
  };

  return (
    <div className={className} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      {label && <span style={{ fontSize: '13px', fontWeight: 500, color: '#1e293b' }}>{label}</span>}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <WPUnitControl
          className="tr-custom-unit-control"
          value={value}
          onChange={onChange}
          units={units}
          isResetValueOnUnitChange={isResetValueOnUnitChange}
          style={{ maxWidth: '130px', marginBottom: 0 }}
          {...props}
        />
        {showReset && (
          <Button
            icon="image-rotate"
            className="bPlResetVal"
            title={__('Reset', 'guten-builder-blocks')}
            onClick={handleReset}
          />
        )}
      </div>
    </div>
  );
};

export default UnitControl;
