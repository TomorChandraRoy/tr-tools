export const FONT_STYLES = [
  {
    label: "Normal",
    value: "normal",
    icon: <span style={{ fontStyle: "normal", fontWeight: "600", fontSize: "13px" }}>N</span>,
  },
  {
    label: "Italic",
    value: "italic",
    icon: <span style={{ fontStyle: "italic", fontWeight: "600", fontSize: "13px", fontFamily: "serif" }}>I</span>,
  },
  {
    label: "Oblique",
    value: "oblique",
    icon: <span style={{ fontStyle: "oblique", fontWeight: "600", fontSize: "13px", fontFamily: "serif" }}>O</span>,
  },
];

export const TEXT_TRANSFORMS = [
  {
    label: "None",
    value: "none",
    icon: <span style={{ fontSize: "14px", fontWeight: "600", lineHeight: "1" }}>N</span>,
  },
  {
    label: "Capitalize",
    value: "capitalize",
    icon: <span style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "-0.5px" }}>Aa</span>,
  },
  {
    label: "UPPERCASE",
    value: "uppercase",
    icon: <span style={{ fontSize: "11px", fontWeight: "700", letterSpacing: "-0.5px" }}>AA</span>,
  },
  {
    label: "lowercase",
    value: "lowercase",
    icon: <span style={{ fontSize: "12px", fontWeight: "600", letterSpacing: "-0.5px" }}>aa</span>,
  },
];

export const TEXT_DECORATIONS = [
  {
    label: "None",
    value: "none",
    icon: <span style={{ fontSize: "14px", fontWeight: "600", lineHeight: "1" }}>N</span>,
  },
  {
    label: "Underline",
    value: "underline",
    icon: <span style={{ textDecoration: "underline", fontSize: "13px", fontWeight: "600" }}>U</span>,
  },
  {
    label: "Line-through",
    value: "line-through",
    icon: <span style={{ textDecoration: "line-through", fontSize: "13px", fontWeight: "600" }}>S</span>,
  },
  {
    label: "Overline",
    value: "overline",
    icon: <span style={{ textDecoration: "overline", fontSize: "13px", fontWeight: "600" }}>O</span>,
  },
];

export const WEIGHT_LABELS = {
  100: "Thin (100)",
  200: "Extra Light (200)",
  300: "Light (300)",
  400: "Regular (400)",
  500: "Medium (500)",
  600: "Semi Bold (600)",
  700: "Bold (700)",
  800: "Extra Bold (800)",
  900: "Black (900)",
};
