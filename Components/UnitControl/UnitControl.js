import { __ } from "@wordpress/i18n";
import {
  __experimentalUnitControl as WPUnitControl,
  Button,
} from "@wordpress/components";
import { useState } from "@wordpress/element";
import Devices from "../Devices/Devices";
import "./UnitControl.scss";

const UnitControl = ({
  label,
  value,
  onChange,
  units,
  defaultVal,
  responsive = false,
  isResetValueOnUnitChange = true,
  className = "mt20",
  ...props
}) => {
  const [device, setDevice] = useState("desktop");

  const currentValue = responsive ? value?.[device] || "" : value;
  const currentDefault = responsive && typeof defaultVal === 'object' ? defaultVal?.[device] || "" : defaultVal;
  
  const showReset =
    currentValue !== undefined &&
    currentValue !== "" &&
    currentValue !== currentDefault;

  const handleReset = () => {
    if (onChange) {
      const resetValue = currentDefault !== "" ? currentDefault : undefined;
      if (responsive) {
        onChange({ ...(typeof value === "object" ? value : {}), [device]: resetValue });
      } else {
        onChange(resetValue);
      }
    }
  };

  const handleChange = (val) => {
    if (responsive) {
      onChange({ ...(typeof value === "object" ? value : {}), [device]: val });
    } else {
      onChange(val);
    }
  };

  return (
    <div
      className={className}
      style={{ display: "flex", flexDirection: "column", gap: "8px" }}
    >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {label && (
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#1e293b",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </span>
            )}
            {responsive && <Devices device={device} onChange={setDevice} />}
          </div>
          {showReset && (
            <button
              type="button"
              className="tr-spacing-reset-btn bPlResetVal"
              onClick={handleReset}
              title={__("Reset", "guten-builder-blocks")}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              <span className="dashicons dashicons-image-rotate"></span>
            </button>
          )}
        </div>
      <WPUnitControl
        className="tr-custom-unit-control"
        value={currentValue}
        onChange={handleChange}
        units={units}
        isResetValueOnUnitChange={isResetValueOnUnitChange}
        style={{ width: "100%", marginBottom: 0 }}
        {...props}
      />
    </div>
  );
};

export default UnitControl;
