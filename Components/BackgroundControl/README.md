# BackgroundControl Component Documentation

`BackgroundControl` is a comprehensive Gutenberg component that lets users toggle between **None (transparent)**, **Solid Color**, and **Gradient Background** modes for block styling.

---

## 🌟 Features

- **3 Background Modes**: `none` (transparent), `solid` (color picker), and `gradient` (multi-stop gradient builder).
- **Solid Color Picker**: Integrated WordPress color picker with alpha channel support.
- **Gradient Builder**: Multi-color stops, linear & radial types, and interactive 360° angle dial.
- **Clean API**: Automatically calculates color stop locations without needing `location1` or `location2`.

---

## 🚀 Step-by-Step Implementation Guide

### Step 1: Define Attribute in `block.json`

Add the `headerBackground` (or custom background attribute) to your block's `block.json`:

```json
{
  "attributes": {
    "headerBackground": {
      "type": "object",
      "default": {
        "type": "none",
        "color": "#ffffff",
        "gradientType": "linear",
        "color1": "#1e69ff",
        "color2": "#9c27b0",
        "angle": 135
      }
    }
  }
}
```

---

### Step 2: Use Component in Inspector Controls (`Style.js` or `edit.js`)

Import `BackgroundControl` from `tr-tools` and pass your attribute:

```javascript
import { __ } from '@wordpress/i18n';
import { BackgroundControl } from 'tr-tools';

const Style = ({ attributes, setAttributes }) => {
  const { headerBackground } = attributes;

  return (
    <BackgroundControl
      label={__('BACKGROUND', 'my-plugin')}
      value={headerBackground}
      onChange={(newBg) => setAttributes({ headerBackground: newBg })}
    />
  );
};

export default Style;
```

---

### Step 3: Convert Attribute to CSS String for Output

Import the `getBackgroundCss` helper function to generate valid CSS for inline styles:

```javascript
import { getBackgroundCss } from 'tr-tools';

// Inside your render logic:
const bgCss = getBackgroundCss(attributes.headerBackground);

// Output Examples:
// Mode "none"     -> "transparent"
// Mode "solid"    -> "#ffffff"
// Mode "gradient" -> "linear-gradient(135deg, #1e69ff 0%, #9c27b0 100%)"
```

---

### Step 4: Dynamically Apply CSS by Classname / Block ID

#### Method A: React Editor Side (`DynamicStyles.js`)

Inject dynamic CSS targeting specific element classnames using `<style dangerouslySetInnerHTML>`:

```javascript
import { getBackgroundCss } from 'tr-tools';

const DynamicStyles = ({ attributes, id, clientId }) => {
  const { headerBackground, blockId } = attributes;

  const currentId = id || blockId || (clientId ? `gbb-faq-${clientId}` : '');
  const mainSl = currentId ? `#${currentId}` : '';
  const headerClass = `${mainSl} .gbb-faq-header`; // Target specific class

  const bgStyle = getBackgroundCss(headerBackground);

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
        ${headerClass} {
          background: ${bgStyle} !important;
        }
        `,
      }}
    />
  );
};

export default DynamicStyles;
```

#### Method B: PHP Frontend Side (`render.php`)

In your PHP template file, target the classname using inline style or a dynamic `<style>` tag:

```php
<?php
$block_id = ! empty( $attributes['blockId'] ) ? $attributes['blockId'] : '';
$bg_attr  = ! empty( $attributes['headerBackground'] ) ? $attributes['headerBackground'] : [];

$type = $bg_attr['type'] ?? 'none';
$color = $bg_attr['color'] ?? '#ffffff';
$gradient_type = $bg_attr['gradientType'] ?? 'linear';
$color1 = $bg_attr['color1'] ?? '#1e69ff';
$color2 = $bg_attr['color2'] ?? '#9c27b0';
$angle  = $bg_attr['angle'] ?? 135;

$bg_css = 'transparent';
if ( 'solid' === $type ) {
    $bg_css = $color;
} elseif ( 'gradient' === $type ) {
    $bg_css = ( 'radial' === $gradient_type )
        ? "radial-gradient(circle, {$color1} 0%, {$color2} 100%)"
        : "linear-gradient({$angle}deg, {$color1} 0%, {$color2} 100%)";
}
?>

<!-- Target classname with inline style attribute -->
<div class="gbb-faq-header my-custom-class" style="background: <?php echo esc_attr( $bg_css ); ?>;">
    <!-- Content -->
</div>

<!-- OR inject style tag targeting classname -->
<style>
    #gbb-faq-<?php echo esc_attr( $block_id ); ?> .gbb-faq-header {
        background: <?php echo esc_html( $bg_css ); ?> !important;
    }
</style>
```

---

## ⚙️ Component Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `label` | `string` | `"BACKGROUND"` | Control title label. |
| `value` | `object` | `{}` | Background attribute object storing `type`, `color`, `color1`, `color2`, `angle`, `gradientType`. |
| `onChange` | `function` | — | Callback function triggered on any value change. |
| `defaultBackground` | `object` | Internal Default | Optional custom default object for reset functionality. |
| `className` | `string` | `""` | Optional additional wrapper CSS class. |
