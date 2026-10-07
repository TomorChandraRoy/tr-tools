# SpacingControl Component - Usage Guide

`SpacingControl` কম্পোনেন্টটি মার্জিন (Margin), প্যাডিং (Padding) এবং বর্ডার রেডিয়াস (Border Radius) কন্ট্রোল করার জন্য ব্যবহৃত হয়। এটি রেস্পন্সিভ (Desktop, Tablet, Mobile) এবং নন-রেস্পন্সিভ উভয় মোডে কাজ করে।

---

## 1. `block.json`-এ Data (Attributes) ডিক্লেয়ার করা

### **Option A: Responsive Mode (`responsive={true}`)**
রেস্পন্সিভ স্পেসিং এর জন্য `block.json`-এ অ্যাট্রিবিউটের টাইপ `object` দিতে হবে যেখানে `desktop`, `tablet`, `mobile` কি (key) থাকবে।

```json
{
  "attributes": {
    "myPadding": {
      "type": "object",
      "default": {
        "desktop": "20px 20px 20px 20px",
        "tablet": "15px 15px 15px 15px",
        "mobile": "10px 10px 10px 10px"
      }
    }
  }
}
```

### **Option B: Non-Responsive Mode (ডিফল্ট)**
যদি রেস্পন্সিভ না লাগে, তবে টাইপ `string` (CSS shorthand) বা `object` দিতে পারেন।

**১. String টাইপ (Recommended):**
```json
{
  "attributes": {
    "myPadding": {
      "type": "string",
      "default": "20px 20px 20px 20px"
    }
  }
}
```
*(অথবা ৪ দিক একই থাকলে সংক্ষেপে `"20px"` দিতে পারেন)*

**২. Object টাইপ:**
```json
{
  "attributes": {
    "myPadding": {
      "type": "object",
      "default": {
        "top": "20px",
        "right": "20px",
        "bottom": "20px",
        "left": "20px"
      }
    }
  }
}
```

---

## 2. Editor-এ `SpacingControl` ব্যবহার করা (`Style.js`)

### **Responsive Usage (`responsive={true}`):**
```javascript
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { SpacingControl } from 'tr-tools';

export default function Style({ attributes, setAttributes }) {
  const { myPadding } = attributes;

  return (
    <PanelBody title={__('Spacing Settings', 'your-text-domain')}>
      <SpacingControl
        label={__('Padding', 'your-text-domain')}
        value={myPadding}
        onChange={(val) => setAttributes({ myPadding: val })}
        responsive={true}
        defaultVal={{ desktop: "20px", tablet: "15px", mobile: "10px" }}
      />
    </PanelBody>
  );
}
```

### **Non-Responsive Usage (ডিফল্ট):**
```javascript
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { SpacingControl } from 'tr-tools';

export default function Style({ attributes, setAttributes }) {
  const { myPadding } = attributes;

  return (
    <PanelBody title={__('Spacing Settings', 'your-text-domain')}>
      <SpacingControl
        label={__('Padding', 'your-text-domain')}
        value={myPadding}
        onChange={(val) => setAttributes({ myPadding: val })}
        defaultVal={{ top: '20px', right: '20px', bottom: '20px', left: '20px' }}
      />
    </PanelBody>
  );
}
```

---

## 3. CSS জেনারেট বা Frontend-এ ব্যবহার করা (`DynamicStyles.js`)

### **Responsive Style:**
```javascript
import { tabBreakpoint, mobileBreakpoint } from 'tr-tools';

const DynamicStyle = ({ attributes, clientId }) => {
  const { myPadding } = attributes;
  const selector = `#block-${clientId} .my-container`;

  return (
    <style>
      {`
        ${selector} {
          padding: ${myPadding?.desktop || '0px'};
        }
        ${tabBreakpoint} {
          ${selector} {
            padding: ${myPadding?.tablet || myPadding?.desktop || '0px'};
          }
        }
        ${mobileBreakpoint} {
          ${selector} {
            padding: ${myPadding?.mobile || myPadding?.tablet || myPadding?.desktop || '0px'};
          }
        }
      `}
    </style>
  );
};
```

### **Non-Responsive Style:**
```javascript
const DynamicStyle = ({ attributes, clientId }) => {
  const { myPadding } = attributes;
  const selector = `#block-${clientId} .my-container`;

  // myPadding object বা string উভয় ক্ষেত্রেই CSS shorthand অথবা custom helper দিয়ে ব্যবহার করা যায়
  const paddingVal = typeof myPadding === 'string' 
    ? myPadding 
    : `${myPadding?.top || '0px'} ${myPadding?.right || '0px'} ${myPadding?.bottom || '0px'} ${myPadding?.left || '0px'}`;

  return (
    <style>
      {`
        ${selector} {
          padding: ${paddingVal};
        }
      `}
    </style>
  );
};
```
