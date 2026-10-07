# IconControl Component

The `IconControl` is a custom Gutenberg settings component that allows users to easily search and select an SVG icon from a dropdown menu. It also includes an optional built-in color picker.

## Features
- Searchable icon dropdown.
- Grouped icons (categorized using tabs like Bootstrap, FontAwesome, etc.).
- Optional color picker for the icon.
- `RenderIcon` helper component to easily display the selected icon in your frontend or block preview.

## How to Use `IconControl` (Backend/Settings)

Import the component into your settings panel (usually inside `InspectorControls` or your custom panel):

```jsx
import { IconControl } from 'tr-tools';

export default function SettingsPanel({ attributes, setAttributes }) {
  const { planIcon, planIconColor } = attributes;

  return (
    <IconControl 
      label="Plan Icon" 
      value={planIcon} 
      onChange={val => setAttributes({ planIcon: val })} 
      enableColor={true} 
      colorValue={planIconColor} 
      onColorChange={val => setAttributes({ planIconColor: val })} 
    />
  );
}
```

### Props
| Prop Name | Type | Default | Description |
|-----------|------|---------|-------------|
| `label` | `String` | `"Icon"` | The label displayed above the control. |
| `value` | `String` | `""` | The ID of the currently selected icon (e.g. `"bi-check"`). |
| `onChange` | `Function`| Required | Callback function triggered when an icon is selected. |
| `enableColor` | `Boolean`| `false` | If `true`, a color picker tab will be available. |
| `colorValue` | `String` | `""` | The current hex code for the selected color. |
| `onColorChange`| `Function`| `null` | Callback function triggered when a color is selected. |
| `icons` | `Object` | `defaultIcons`| Custom icon library object. Defaults to the built-in library. |


## How to Display the Icon (Frontend/Preview)

Since `IconControl` only saves a string ID (like `"bi-check"`) to the database, you must use the `RenderIcon` helper component to convert this ID back into the actual SVG.

Import `RenderIcon` in your block's `save.js` or `edit.js` (UI Template):

```jsx
import { RenderIcon } from 'tr-tools';

export default function ThemeOne({ attributes }) {
  const { planIcon, planIconColor } = attributes;

  return (
    <div className="my-pricing-card">
      
      {/* 
        Wrap the RenderIcon inside a span or div.
        You can apply the selected color to the wrapper's CSS inline styles.
      */}
      <span className="my-icon-wrapper" style={{ color: planIconColor }}>
        
        {/* RenderIcon takes the string ID and outputs the SVG */}
        <RenderIcon value={planIcon} />
        
      </span>
      
    </div>
  );
}
```

### `RenderIcon` Props
| Prop Name | Type | Default | Description |
|-----------|------|---------|-------------|
| `value` | `String` | Required | The ID of the icon to render (e.g. `"bi-check"`). |
| `className` | `String` | `""` | Custom CSS classes to add to the SVG wrapper. |
