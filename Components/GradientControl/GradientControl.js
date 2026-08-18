import { useState, useRef } from "@wordpress/element";
import { Dropdown, ColorPicker } from "@wordpress/components";
import "./GradientControl.scss";

export const DEFAULT_GRADIENT = {
  gradientType: "linear",
  color1: "#1e69ff",
  color2: "#9c27b0",
  angle: 135,
};

/**
 * Helper function to generate CSS gradient string from gradient attribute object
 */
export const getGradientCss = (gradient) => {
  if (!gradient || typeof gradient !== "object") return "";
  const gType = gradient.gradientType || "linear";

  let stops =
    Array.isArray(gradient.stops) && gradient.stops.length > 0
      ? gradient.stops
      : null;
  if (!stops) {
    stops = [
      { color: gradient.color1 || "#1e69ff", location: 0 },
    ];
    if (gradient.color3) {
      stops.push({ color: gradient.color3, location: 50 });
    }
    stops.push({
      color: gradient.color2 || "#9c27b0",
      location: 100,
    });
  }

  const stopsStr = stops
    .map((s) => `${s.color} ${s.location !== undefined ? s.location : 0}%`)
    .join(", ");

  if (gType === "radial") {
    return `radial-gradient(circle, ${stopsStr})`;
  }
  const angle = gradient.angle !== undefined ? gradient.angle : 135;
  return `linear-gradient(${angle}deg, ${stopsStr})`;
};

const GradientControl = ({
  className = "",
  label = "Background",
  value,
  onChange,
  defaultGradient,
  defaultValue,
}) => {
  const fallback = defaultGradient || defaultValue || DEFAULT_GRADIENT;
  const currentGradient = {
    ...DEFAULT_GRADIENT,
    ...fallback,
    ...(typeof value === "object" && value !== null ? value : {}),
  };

  // Get normalized stops array
  const stops =
    Array.isArray(currentGradient.stops) && currentGradient.stops.length > 0
      ? currentGradient.stops
      : [
          {
            color: currentGradient.color1 || "#1e69ff",
            location: 0,
          },
          ...(currentGradient.color3
            ? [{ color: currentGradient.color3, location: 50 }]
            : []),
          {
            color: currentGradient.color2 || "#9c27b0",
            location: 100,
          },
        ];

  const dialRef = useRef(null);
  const animFrameRef = useRef(null);
  const [plusPos, setPlusPos] = useState(50);
  const [isPlusOpen, setIsPlusOpen] = useState(false);

  const handleBarMouseMove = (e) => {
    if (isPlusOpen) return; // Freeze + button position while picking color
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width > 0) {
      const clientX = e.clientX;
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      animFrameRef.current = requestAnimationFrame(() => {
        const mouseX = clientX - rect.left;
        let percent = (mouseX / rect.width) * 100;
        percent = Math.max(5, Math.min(95, percent));
        setPlusPos(percent);
      });
    }
  };

  const updateGradient = (newFields) => {
    if (typeof onChange === "function") {
      onChange({ ...currentGradient, ...newFields });
    }
  };

  const updateStops = (newStops) => {
    const updatedFields = {
      stops: newStops,
      color1: newStops[0]?.color || "#1e69ff",
      color2: newStops[newStops.length - 1]?.color || "#9c27b0",
    };
    updateGradient(updatedFields);
  };

  const handleStopColorChange = (index, newColor) => {
    const newStops = stops.map((s, idx) =>
      idx === index ? { ...s, color: newColor } : s
    );
    updateStops(newStops);
  };

  const handleAddStop = () => {
    const presetColors = [
      "#00d2ff",
      "#f59e0b",
      "#10b981",
      "#ec4899",
      "#8b5cf6",
      "#ef4444",
    ];
    const newColor = presetColors[(stops.length - 2) % presetColors.length];

    const newStop = { color: newColor, location: plusPos };
    const newStops = [...stops, newStop].sort((a, b) => a.location - b.location);

    updateStops(newStops);
  };

  const handleRemoveStop = (index) => {
    if (stops.length <= 2) return;
    const newStops = stops.filter((_, idx) => idx !== index);
    const step = 100 / (newStops.length - 1);
    const evenlySpaced = newStops.map((s, i) => ({
      ...s,
      location: Math.round(i * step),
    }));
    updateStops(evenlySpaced);
  };

  const isChanged = Boolean(
    fallback &&
      Object.keys(fallback).some(
        (key) =>
          currentGradient[key] !== undefined &&
          String(currentGradient[key]).toLowerCase() !==
            String(fallback[key]).toLowerCase()
      )
  );

  const handleReset = () => {
    if (typeof onChange === "function") {
      onChange(fallback);
    }
  };

  // Handle Angle Dial pointer drag
  const handleDialPointerDown = (e) => {
    e.preventDefault();
    const updateAngleFromEvent = (event) => {
      if (!dialRef.current) return;
      const rect = dialRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const clientX =
        event.clientX ??
        (event.touches && event.touches[0] ? event.touches[0].clientX : 0);
      const clientY =
        event.clientY ??
        (event.touches && event.touches[0] ? event.touches[0].clientY : 0);
      const rad = Math.atan2(clientY - centerY, clientX - centerX);
      let deg = Math.round(rad * (180 / Math.PI)) + 90;
      if (deg < 0) deg += 360;
      updateGradient({ angle: deg });
    };

    updateAngleFromEvent(e);

    const onMove = (moveEvent) => updateAngleFromEvent(moveEvent);
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const gradientPreviewCss = getGradientCss({
    ...currentGradient,
    stops,
  });

  return (
    <div className={`tr-gradient-control ${className}`.trim()}>
      {/* Header Row with Pencil Icon Toggle */}
      <div className="tr-gradient-control__header">
        {label && <span className="tr-gradient-control__label">{label}</span>}
        <div className="tr-gradient-control__actions">
          {isChanged && (
            <button
              type="button"
              className="tr-gradient-control__reset-btn"
              title="Reset gradient"
              onClick={handleReset}
            >
              <svg
                width="16"
                height="16"
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
                className={`tr-gradient-control__trigger-btn ${isOpen ? "active" : ""}`}
                title="Edit Gradient Background"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </button>
            )}
            renderContent={() => (
              <div className="tr-gradient-control__popover">
                {/* Body: Gradient controls inside popover */}
                <div className="tr-gradient-control__gradient-wrapper">
                  {/* Gradient Preview Bar with Dynamic Color Stops */}
                  <div
                    className="tr-gradient-control__bar"
                    style={{ background: gradientPreviewCss }}
                    onMouseMove={handleBarMouseMove}
                  >
                    {stops.map((stop, idx) => (
                      <Dropdown
                        key={idx}
                        renderToggle={({ isOpen, onToggle }) => (
                          <button
                            type="button"
                            onClick={onToggle}
                            aria-expanded={isOpen}
                            className="tr-gradient-control__stop-btn"
                            title={`Color Stop ${idx + 1}`}
                            style={{
                              backgroundColor: stop.color,
                              left: `${stop.location}%`,
                            }}
                          />
                        )}
                        renderContent={() => (
                          <div className="tr-gradient-control__stop-popover">
                            <ColorPicker
                              color={stop.color}
                              onChange={(c) => handleStopColorChange(idx, c)}
                              enableAlpha
                            />
                            {stops.length > 2 && (
                              <button
                                type="button"
                                className="tr-gradient-control__remove-stop-btn"
                                onClick={() => handleRemoveStop(idx)}
                              >
                                Remove Stop
                              </button>
                            )}
                          </div>
                        )}
                      />
                    ))}

                    {/* Hover + Button dynamically moving with mouse position */}
                    {(() => {
                      const isNearExistingStop = stops.some(
                        (s) => Math.abs(plusPos - s.location) < 8
                      );
                      return (
                        <Dropdown
                          onToggle={(nextState) => setIsPlusOpen(nextState)}
                          renderToggle={({ isOpen, onToggle }) => (
                            <button
                              type="button"
                              onClick={(e) => {
                                if (!isOpen) {
                                  handleAddStop();
                                }
                                onToggle(e);
                              }}
                              aria-expanded={isOpen}
                              className="tr-gradient-control__stop-plus"
                              title="Add Color Stop"
                              style={{
                                left: `${plusPos}%`,
                                opacity: isNearExistingStop && !isOpen ? 0 : undefined,
                                pointerEvents:
                                  isNearExistingStop && !isOpen ? "none" : undefined,
                              }}
                            >
                              +
                            </button>
                          )}
                          renderContent={() => {
                            const targetIndex = stops.length > 2 ? stops.length - 2 : 1;
                            const activeStop =
                              stops[targetIndex] || stops[stops.length - 1];
                            return (
                              <div className="tr-gradient-control__stop-popover">
                                <ColorPicker
                                  color={activeStop.color}
                                  onChange={(c) => handleStopColorChange(targetIndex, c)}
                                  enableAlpha
                                />
                                {stops.length > 2 && (
                                  <button
                                    type="button"
                                    className="tr-gradient-control__remove-stop-btn"
                                    onClick={() => handleRemoveStop(targetIndex)}
                                  >
                                    Remove Stop
                                  </button>
                                )}
                              </div>
                            );
                          }}
                        />
                      );
                    })()}
                  </div>

                  {/* Controls Row: TYPE & ANGLE */}
                  <div className="tr-gradient-control__controls-row">
                    {/* TYPE Dropdown */}
                    <div className="tr-gradient-control__col">
                      <span className="tr-gradient-control__field-label">TYPE</span>
                      <select
                        className="tr-gradient-control__select"
                        value={currentGradient.gradientType || "linear"}
                        onChange={(e) => updateGradient({ gradientType: e.target.value })}
                      >
                        <option value="linear">Linear</option>
                        <option value="radial">Radial</option>
                      </select>
                    </div>

                    {/* ANGLE Input & Dial */}
                    {currentGradient.gradientType !== "radial" && (
                      <div className="tr-gradient-control__col">
                        <span className="tr-gradient-control__field-label">ANGLE</span>
                        <div className="tr-gradient-control__angle-wrapper">
                          <div className="tr-gradient-control__angle-input-box">
                            <input
                              type="number"
                              className="tr-gradient-control__angle-input"
                              value={currentGradient.angle ?? 135}
                              min={0}
                              max={360}
                              onChange={(e) => {
                                const val = parseInt(e.target.value, 10);
                                updateGradient({ angle: isNaN(val) ? 0 : val });
                              }}
                            />
                            <span className="tr-gradient-control__degree-symbol">°</span>
                          </div>

                          {/* Interactive Angle Dial Circle */}
                          <div
                            ref={dialRef}
                            className="tr-gradient-control__angle-dial"
                            onPointerDown={handleDialPointerDown}
                            title="Drag to change angle"
                          >
                            <div
                              className="tr-gradient-control__dial-pointer"
                              style={{
                                transform: `rotate(${currentGradient.angle ?? 135}deg)`,
                              }}
                            >
                              <span className="tr-gradient-control__dial-dot" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default GradientControl;
