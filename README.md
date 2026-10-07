# 🛠️ tr-tools

> **Shared React UI Components & Utilities Library for WordPress Gutenberg Blocks**

`tr-tools` is a shared component library that provides reusable React UI Components and Utilities designed for use in various WordPress Gutenberg block plugins.

---

## 📌 Table of Contents

1. [Folder Location](#-folder-location)
2. [Installation & Configuration (Setup)](#-installation--configuration-setup)
3. [Component Documentation Directory](#-component-documentation-directory)
4. [Adding New Components](#-adding-new-components)
5. [Folder Structure](#-folder-structure)

---

## 📁 Folder Location

The `tr-tools` folder must be placed inside your WordPress site's **`wp-content/plugins/`** directory, alongside your other plugins (as a sibling directory):

```text
wp-content/plugins/
├── tr-tools/                 <-- (Shared library folder - Place here)
├── guten-builder-blocks/     <-- (Plugin 1)
├── my-new-block-plugin/      <-- (Plugin 2)
└── another-plugin/           <-- (Plugin 3)
```

> 💡 **Note:** This is required because the plugin's `webpack.config.js` uses an alias resolving to `'../tr-tools'`. The `../tr-tools` path expects `tr-tools` to be located exactly one level up, inside the `wp-content/plugins/` folder.

---

## 🚀 Installation & Configuration (Setup)

To use the components from `tr-tools` in any WordPress plugin (e.g., `xpo-blocks`), follow these steps:

### Step 1: Add Webpack Alias
Open your plugin's `webpack.config.js` file and add the `tr-tools` alias under the `resolve` settings so that Webpack knows where to find the shared components:

```javascript
module.exports = {
  ...defaultConfig,
  resolve: {
    ...defaultConfig.resolve,
    alias: {
      ...(defaultConfig.resolve ? defaultConfig.resolve.alias : {}),
      'tr-tools': path.resolve(__dirname, '../tr-tools'),
    },
  },
};
```

### Step 3: (Optional but Recommended) Add `jsconfig.json`
For smooth **Auto-Import** and type suggestions of `tr-tools` components in VS Code, place a `jsconfig.json` file in the root folder of your new plugin:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "moduleResolution": "node",
    "target": "es2020",
    "checkJs": false
  },
  "include": ["src/**/*"]
}
```

---

## 📘 Component Documentation Directory

Click on the links below for detailed prop guides and usage examples for each component:

1. 🎨 **[TemplateSelector Documentation](Components/TemplateSelector/README.md)**
   - UI for selecting pre-made layouts or demo templates.
2. 📋 **[ItemsPanel Documentation](Components/ItemsPanel/README.md)**
   - For managing multiple items/lists inside a Gutenberg block (Add/Edit/Delete/Reorder).
3. 🔘 **[TabButton Documentation](Components/TabButton/README.md)**
   - For creating custom pill/switch button tab interfaces (e.g., General vs Style).

---

## ➕ Adding New Components

If you want to add a new UI component (e.g., Custom Color Picker, Range Control, Modal) to `tr-tools` in the future:

1. **Create a Folder:** Create a folder named after your new component inside the `tr-tools/Components/` directory and place the component file and its own `README.md` inside it.
   *Example:* `tr-tools/Components/ColorPicker/ColorPicker.jsx`

2. **Export in `Components/index.js`:**
   Open the `tr-tools/Components/index.js` file and add the export for your component:

   ```javascript
   export { default as ColorPicker } from './ColorPicker/ColorPicker';
   ```

3. **Add to `index.d.ts`:**
   Declare the type export in the `tr-tools/index.d.ts` file to enable Auto-Import:
   ```typescript
   export const ColorPicker: ComponentType<any>;
   ```

---

## 📂 Folder Structure

```text
tr-tools/
├── Components/
│   ├── TemplateSelector/
│   │   ├── TemplateSelector.jsx
│   │   ├── TemplateSelector.scss
│   │   └── README.md            <-- (Detailed guide for TemplateSelector)
│   ├── ItemsPanel/
│   │   ├── ItemsPanel.jsx
│   │   ├── ItemsPanel.scss
│   │   └── README.md            <-- (Detailed guide for ItemsPanel)
│   ├── TabButton/
│   │   ├── TabButton.jsx
│   │   ├── TabButton.scss
│   │   └── README.md            <-- (Detailed guide for TabButton)
│   └── index.js                 <-- (Export hub for all components)
├── index.js                     <-- (Main Root Entry Point)
├── index.d.ts                   <-- (TypeScript & Auto-Import Definitions)
├── package.json                 <-- (Package Metadata)
└── README.md                    <-- (Main guidelines)
```

---

## ⚖️ License & Copyright Notice

This library is open-source and released under the **[GPL-3.0-or-later License](https://www.gnu.org/licenses/gpl-3.0.txt)**. 

While you are free to clone, modify, and use this code in your own projects, **you must adhere to the following rules:**
1. **Preserve Copyright:** You are strictly prohibited from removing or modifying the original `@copyright` and `@author` notices inside the source code files.
2. **Open Source Requirement:** If you modify and distribute this code publicly, your project must also be released under a compatible GPL license.
3. **Legal Action:** Any unauthorized removal of copyright attribution or violation of the GPL terms may result in a **DMCA Takedown Notice** on platforms like GitHub, WordPress.org, or your hosting provider.

---

⚡ **Developed & Maintained with Care for WordPress Gutenberg Blocks.**
