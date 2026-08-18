const FONT_VARIANTS_MAP = {
  inter: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  roboto: [100, 300, 400, 500, 700, 900],
  outfit: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  "open sans": [300, 400, 500, 600, 700, 800],
  poppins: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  montserrat: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  "playfair display": [400, 500, 600, 700, 800, 900],
  lato: [100, 300, 400, 700, 900],
  oswald: [200, 300, 400, 500, 600, 700],
  merriweather: [300, 400, 700, 900],
};

/**
 * Dynamic Google Font Loader
 */
export const loadGoogleFont = (fontFamily) => {
  if (!fontFamily || fontFamily.toLowerCase() === "default" || typeof document === "undefined") {
    return;
  }

  const slug = fontFamily.toLowerCase().replace(/\s+/g, "-");
  const fontId = `gbb-google-font-${slug}`;

  const variants = FONT_VARIANTS_MAP[fontFamily.toLowerCase()] || [400, 500, 600, 700];
  const wghtParam = `:wght@${variants.join(";")}`;
  const fontUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontFamily)}${wghtParam}&display=swap`;

  const injectLink = (targetDoc) => {
    if (!targetDoc || !targetDoc.head || targetDoc.getElementById(fontId)) return;
    const link = targetDoc.createElement("link");
    link.id = fontId;
    link.rel = "stylesheet";
    link.href = fontUrl;
    targetDoc.head.appendChild(link);
  };

  injectLink(document);

  const editorIframe = document.querySelector('iframe[name="editor-canvas"]');
  if (editorIframe && editorIframe.contentDocument) {
    injectLink(editorIframe.contentDocument);
  }
};

/**
 * Helper function to generate CSS string from typography attribute object
 * @param {Object} typo - Typography value object
 * @param {boolean} [important=false] - Whether to append !important to styles
 * @returns {string} CSS styles string
 */
export const getTypographyCss = (typo = {}, important = false) => {
  if (!typo || typeof typo !== "object") return "";

  const imp = important ? " !important" : "";

  const fontSize = typo.fontSize;
	const desktopFontSize = fontSize?.desktop || (typeof fontSize === 'string' || typeof fontSize === 'number' ? fontSize : '');
  const tabletFontSize = fontSize?.tablet || desktopFontSize;
  const mobileFontSize = fontSize?.mobile || tabletFontSize;

	const checkUnit = (size) => {
    const value = String(size);
    const units = ["px", "em", "rem", "%", "vh", "vw"];

    if (units.some((unit) => value.endsWith(unit))) {
      return value;
    } else if (typeof size === "number" || (!isNaN(size) && size !== "")) {
      return `${value}px`;
    }

    return "";
  };

  const styles = [];

  if (typo.fontSize) {
    styles.push(`font-size: ${checkUnit(desktopFontSize)}${imp};`);
    
    if (tabletFontSize && tabletFontSize !== desktopFontSize) {
      styles.push(`@media (max-width: 1024px) { font-size: ${checkUnit(tabletFontSize)}${imp}; }`);
    }
    if (mobileFontSize && mobileFontSize !== tabletFontSize) {
      styles.push(`@media (max-width: 767px) { font-size: ${checkUnit(mobileFontSize)}${imp}; }`);
    }
  }
  if (typo.fontFamily && typo.fontFamily.toLowerCase() !== "default") {
    loadGoogleFont(typo.fontFamily);
    styles.push(`font-family: '${typo.fontFamily}', sans-serif${imp};`);
  }
  if (typo.fontWeight) {
    styles.push(`font-weight: ${typo.fontWeight}${imp};`);
  }
  if (typo.lineHeight) {
    styles.push(`line-height: ${typo.lineHeight}${imp};`);
  }
  if (typo.letterSpacing !== undefined && typo.letterSpacing !== "" && typo.letterSpacing !== 0) {
    styles.push(`letter-spacing: ${checkUnit(typo.letterSpacing)}${imp};`);
  }
  if (typo.textTransform && typo.textTransform !== "none") {
    styles.push(`text-transform: ${typo.textTransform}${imp};`);
  }
  if (typo.textDecoration && typo.textDecoration !== "none") {
    styles.push(`text-decoration: ${typo.textDecoration}${imp};`);
  }
  if (typo.fontStyle && typo.fontStyle !== "normal") {
    styles.push(`font-style: ${typo.fontStyle}${imp};`);
  }

  return styles.join("\n");
};

/**
 * Helper function to generate CSS string for border radius
 * @param {Object|string} radius - Border radius value object or string
 * @returns {string} CSS border-radius string
 */
export const getBorderRadiusCss = (radius) => {
  if (!radius) return "";
  if (typeof radius === "string") return `border-radius: ${radius};`;
  return `border-radius: ${radius?.top || "0px"} ${radius?.right || "0px"} ${radius?.bottom || "0px"} ${radius?.left || "0px"};`;
};

/**
 * Helper function to generate CSS string for border
 * @param {Object} border - Border value object
 * @returns {string} CSS border string
 */
export const getBorderCss = (border) => {
  if (!border || typeof border !== 'object') return '';
  const { width, style, color, side } = border;

  if (!width) return '';

  const borderValue = `${width} ${style || 'solid'} ${color || 'transparent'}`;

  if (side === 'all' || !side) {
    return `border: ${borderValue};`;
  } else {
    const sides = side.split('-');
    return sides.map(s => `border-${s}: ${borderValue};`).join(' ');
  }
};
