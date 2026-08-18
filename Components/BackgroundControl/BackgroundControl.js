import { useState, useRef } from "@wordpress/element";
import { Dropdown, ColorPicker } from "@wordpress/components";
import "./BackgroundControl.scss";

export const DEFAULT_BACKGROUND = {
  type: "none",
  color: "#ffffff",
  gradientType: "linear",
  color1: "#1e69ff",
  color2: "#9c27b0",
  angle: 135,
};

/**
 * Helper function to generate CSS background value from background attribute object
 */
export const getBackgroundCss = (bg) => {
  if (!bg || typeof bg !== "object") return "";
  const type = bg.type || "none";
  if (type === "none") return "transparent";
  if (type === "solid") return bg.color || "#ffffff";
  if (type === "gradient") {
    const gType = bg.gradientType || "linear";

    let stops =
      Array.isArray(bg.stops) && bg.stops.length > 0 ? bg.stops : null;
    if (!stops) {
      stops = [{ color: bg.color1 || "#1e69ff", location: 0 }];
      if (bg.color3) {
        stops.push({ color: bg.color3, location: 50 });
      }
      stops.push({
        color: bg.color2 || "#9c27b0",
        location: 100,
      });
    }

    const stopsStr = stops
      .map((s) => `${s.color} ${s.location !== undefined ? s.location : 0}%`)
      .join(", ");

    if (gType === "radial") {
      return `radial-gradient(circle, ${stopsStr})`;
    }
    const angle = bg.angle !== undefined ? bg.angle : 135;
    return `linear-gradient(${angle}deg, ${stopsStr})`;
  }
  return "";
};

const BackgroundControl = ({
  className = "",
  label = "BACKGROUND",
  value,
  onChange,
  defaultBackground,
  defaultValue,
}) => {
  const fallback = defaultBackground || defaultValue || DEFAULT_BACKGROUND;
  const currentBg = {
    ...DEFAULT_BACKGROUND,
    ...fallback,
    ...(typeof value === "object" && value !== null ? value : {}),
  };

  // Get normalized stops array
  const stops =
    Array.isArray(currentBg.stops) && currentBg.stops.length > 0
      ? currentBg.stops
      : [
          {
            color: currentBg.color1 || "#1e69ff",
            location: 0,
          },
          ...(currentBg.color3
            ? [{ color: currentBg.color3, location: 50 }]
            : []),
          {
            color: currentBg.color2 || "#9c27b0",
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

  const updateBg = (newFields) => {
    if (typeof onChange === "function") {
      onChange({ ...currentBg, ...newFields });
    }
  };

  const updateStops = (newStops) => {
    const updatedFields = {
      stops: newStops,
      color1: newStops[0]?.color || "#1e69ff",
      color2: newStops[newStops.length - 1]?.color || "#9c27b0",
    };
    updateBg(updatedFields);
  };

  const handleStopColorChange = (index, newColor) => {
    const newStops = stops.map((s, idx) =>
      idx === index ? { ...s, color: newColor } : s,
    );
    updateStops(newStops);
  };

  const handleAddStop = () => {
    // Pick preset colors for new stops
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
        currentBg[key] !== undefined &&
        String(currentBg[key]).toLowerCase() !==
          String(fallback[key]).toLowerCase(),
    ),
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
      updateBg({ angle: deg });
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

  const gradientPreviewCss = getBackgroundCss({
    ...currentBg,
    type: "gradient",
    stops,
  });

  return (
    <div className={`tr-bg-control ${className}`.trim()}>
      {/* Header Row */}
      <div className="tr-bg-control__header">
        {label && <span className="tr-bg-control__label">{label}</span>}
        <div className="tr-bg-control__actions">
          {isChanged && (
            <button
              type="button"
              className="tr-bg-control__reset-btn"
              title="Reset background"
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

          {/* Type selector tabs */}
          <div className="tr-bg-control__types">
            {/* None / Transparent */}
            <button
              type="button"
              className={`tr-bg-control__type-btn ${currentBg.type === "none" ? "active" : ""}`}
              title="None"
              onClick={() => updateBg({ type: "none" })}
            >
              <span className="tr-bg-control__icon-check" />
            </button>

            {/* Solid */}
            <button
              type="button"
              className={`tr-bg-control__type-btn ${currentBg.type === "solid" ? "active" : ""}`}
              title="Solid"
              onClick={() => updateBg({ type: "solid" })}
            >
              <span
                className="tr-bg-control__icon-solid"
                style={{ backgroundColor: currentBg.color || "#888888" }}
              />
            </button>

            {/* Gradient */}
            <button
              type="button"
              className={`tr-bg-control__type-btn ${currentBg.type === "gradient" ? "active" : ""}`}
              title="Gradient"
              onClick={() => updateBg({ type: "gradient" })}
            >
              <span
                className="tr-bg-control__icon-gradient"
                style={{ background: gradientPreviewCss }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Body: Solid */}
      {currentBg.type === "solid" && (
        <div className="tr-bg-control__solid-wrapper">
          <div className="tr-bg-control__row">
            <span className="tr-bg-control__sublabel">COLOR</span>
            <Dropdown
              renderToggle={({ isOpen, onToggle }) => (
                <button
                  type="button"
                  onClick={onToggle}
                  aria-expanded={isOpen}
                  className="tr-bg-control__color-swatch-btn"
                  style={{ backgroundColor: currentBg.color || "#ffffff" }}
                />
              )}
              renderContent={() => (
                <div className="tr-bg-control__popover">
                  <ColorPicker
                    color={currentBg.color}
                    onChange={(c) => updateBg({ color: c })}
                    enableAlpha
                  />
                </div>
              )}
            />
          </div>
        </div>
      )}

      {/* Body: Gradient */}
      {currentBg.type === "gradient" && (
        <div className="tr-bg-control__gradient-wrapper">
          {/* Gradient Preview Bar with Dynamic Color Stops */}
          <div
            className="tr-bg-control__bar"
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
                    className="tr-bg-control__stop-btn"
                    title={`Color Stop ${idx + 1}`}
                    style={{
                      backgroundColor: stop.color,
                      left: `${stop.location}%`,
                    }}
                  />
                )}
                renderContent={() => (
                  <div className="tr-bg-control__popover">
                    <ColorPicker
                      color={stop.color}
                      onChange={(c) => handleStopColorChange(idx, c)}
                      enableAlpha
                    />
                    {stops.length > 2 && (
                      <button
                        type="button"
                        className="tr-bg-control__remove-stop-btn"
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
                      className="tr-bg-control__stop-plus"
                      title="Add Color Stop"
                      style={{
                        left: `${plusPos}%`,
                        opacity: isNearExistingStop && !isOpen ? 0 : undefined,
                        pointerEvents: isNearExistingStop && !isOpen ? 'none' : undefined,
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
                      <div className="tr-bg-control__popover">
                        <ColorPicker
                          color={activeStop.color}
                          onChange={(c) => handleStopColorChange(targetIndex, c)}
                          enableAlpha
                        />
                        {stops.length > 2 && (
                          <button
                            type="button"
                            className="tr-bg-control__remove-stop-btn"
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
          <div className="tr-bg-control__controls-row">
            {/* TYPE Dropdown */}
            <div className="tr-bg-control__col">
              <span className="tr-bg-control__field-label">TYPE</span>
              <select
                className="tr-bg-control__select"
                value={currentBg.gradientType || "linear"}
                onChange={(e) => updateBg({ gradientType: e.target.value })}
              >
                <option value="linear">Linear</option>
                <option value="radial">Radial</option>
              </select>
            </div>

            {/* ANGLE Input & Dial */}
            {currentBg.gradientType !== "radial" && (
              <div className="tr-bg-control__col">
                <span className="tr-bg-control__field-label">ANGLE</span>
                <div className="tr-bg-control__angle-wrapper">
                  <div className="tr-bg-control__angle-input-box">
                    <input
                      type="number"
                      className="tr-bg-control__angle-input"
                      value={currentBg.angle ?? 135}
                      min={0}
                      max={360}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        updateBg({ angle: isNaN(val) ? 0 : val });
                      }}
                    />
                    <span className="tr-bg-control__degree-symbol">°</span>
                  </div>

                  {/* Interactive Angle Dial Circle */}
                  <div
                    ref={dialRef}
                    className="tr-bg-control__angle-dial"
                    onPointerDown={handleDialPointerDown}
                    title="Drag to change angle"
                  >
                    <div
                      className="tr-bg-control__dial-pointer"
                      style={{
                        transform: `rotate(${currentBg.angle ?? 135}deg)`,
                      }}
                    >
                      <span className="tr-bg-control__dial-dot" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BackgroundControl;
