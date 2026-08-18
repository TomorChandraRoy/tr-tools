# GradientControl Component Documentation

`GradientControl` is a modern, lightweight Gutenberg React component for selecting and customizing CSS linear & radial gradients. It features a compact header with a pencil edit icon (✏️) toggle that opens a popover containing interactive gradient controls.

---

## 🌟 Key Features

- **Compact UI Header**: Clean design displaying the label and a pencil toggle button (`✏️`).
- **Interactive Multi-Color Stop Bar**: Dynamically add, remove, and adjust color stops on the gradient bar.
- **Linear & Radial Support**: Switch seamlessly between `linear` and `radial` gradient types.
- **360° Angle Dial & Numeric Input**: Rotate the dial or type exact degree angles for linear gradients.
- **Clean Developer API**: No need to specify legacy `location1` or `location2` properties.

---

## 🚀 Step-by-Step Implementation Guide

### Step 1: Add Block Attribute in `block.json`

Define the attribute in your block's `block.json` file. Only specify `gradientType`, `color1`, `color2`, and `angle` (no location properties required):

```json
{
  "attributes": {
    "gradientBg": {
      "type": "object",
      "default": {
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

### Step 2: Import & Use Component in React Inspector Controls

In your block's settings component (e.g. `Style.js` or `edit.js`), import `GradientControl` from `tr-tools` and pass your attribute:

```javascript
import { __ } from '@wordpress/i18n';
import { GradientControl } from 'tr-tools';

const Style = ({ attributes, setAttributes }) => {
  const { gradientBg } = attributes;

  return (
    <GradientControl
      label={__('Background', 'my-plugin')}
      value={gradientBg}
      onChange={(newGradient) => setAttributes({ gradientBg: newGradient })}
    />
  );
};

export default Style;
```

---

### Step 3: Generate CSS for Frontend / Editor Styles

Use the helper function `getGradientCss` to convert the `gradientBg` attribute object into a valid CSS string for inline styles or dynamic stylesheets:

```javascript
import { getGradientCss } from 'tr-tools';

// Inside your component or render logic:
const backgroundStyle = getGradientCss(attributes.gradientBg);

// Result string example:
// "linear-gradient(135deg, #1e69ff 0%, #9c27b0 100%)"
```

---

### Step 4: Dynamically Apply CSS by Classname / Block ID

#### Method A: React Editor Side (`DynamicStyles.js`)

Inject dynamic CSS targeting specific element classnames using `<style dangerouslySetInnerHTML>`:

```javascript
import { getGradientCss } from 'tr-tools';

const DynamicStyles = ({ attributes, id, clientId }) => {
  const { gradientBg, blockId } = attributes;

  const currentId = id || blockId || (clientId ? `gbb-faq-${clientId}` : '');
  const mainSl = currentId ? `#${currentId}` : '';
  const headerClass = `${mainSl} .gbb-faq-header`; // Target specific class

  const gradientStyle = getGradientCss(gradientBg);

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
        ${headerClass} {
          background: ${gradientStyle} !important;
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
$gradient_bg = ! empty( $attributes['gradientBg'] ) ? $attributes['gradientBg'] : [];

$gradient_type = $gradient_bg['gradientType'] ?? 'linear';
$color1 = $gradient_bg['color1'] ?? '#1e69ff';
$color2 = $gradient_bg['color2'] ?? '#9c27b0';
$angle  = $gradient_bg['angle'] ?? 135;

$bg_css = "linear-gradient({$angle}deg, {$color1} 0%, {$color2} 100%)";
if ( 'radial' === $gradient_type ) {
    $bg_css = "radial-gradient(circle, {$color1} 0%, {$color2} 100%)";
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

## ⚙️ Component Props Reference

| Prop Name | Type | Default Value | Description |
| :--- | :--- | :--- | :--- |
| `label` | `string` | `"Background"` | Label text displayed on the compact header row. |
| `value` | `object` | `{}` | Current gradient attribute object storing `color1`, `color2`, `stops`, `angle`, `gradientType`. |
| `onChange` | `function` | — | Callback function triggered when gradient properties are changed. |
| `defaultGradient` | `object` | Internal Default | Optional object to override fallback defaults. |
| `className` | `string` | `""` | Additional CSS class for container styling. |

---

## 🎨 Overriding Default Gradient (Optional)

If a developer wants to pass a custom default gradient for a specific block:

```javascript
<GradientControl
  label={__('Header Gradient', 'my-plugin')}
  value={gradientBg}
  onChange={(val) => setAttributes({ gradientBg: val })}
  defaultGradient={{
    gradientType: 'linear',
    color1: '#ff4500',
    color2: '#8a2be2',
    angle: 90
  }}
/>
```
