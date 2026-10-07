# ColorControl Component - Usage Guide

`ColorControl` কম্পোনেন্টটি কালার পিকার হিসেবে কাজ করে এবং এটি কালার সিলেক্ট, ক্লিয়ার বা ডিফল্ট ভ্যালু রিসেট করার জন্য চমৎকার একটি ইউজার ইন্টারফেস দেয়।

## 1. `block.json`-এ Data (Attributes) ডিক্লেয়ার করা

কালার কোড (যেমন: `#ffffff`, `rgba(0,0,0,1)`) সেভ করার জন্য `string` টাইপের অ্যাট্রিবিউট ডিক্লেয়ার করতে হয়।

**উদাহরণ (`block.json`):**
```json
{
  "attributes": {
    "myTextColor": {
      "type": "string",
      "default": "#333333"
    },
    "myBgColor": {
      "type": "string",
      "default": ""
    }
  }
}
```

## 2. Editor-এ `ColorControl` ব্যবহার করা

**উদাহরণ (`Style.js` বা `edit.js`):**
```javascript
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { ColorControl } from 'tr-tools';

export default function Style({ attributes, setAttributes }) {
  const { myTextColor, myBgColor } = attributes;

  return (
    <PanelBody title={__('Color Settings', 'your-text-domain')}>
      <ColorControl
        label={__('Text Color', 'your-text-domain')}
        value={myTextColor}
        defaultColor="#333333"
        onChange={(val) => setAttributes({ myTextColor: val || '#333333' })}
      />

      <ColorControl
        label={__('Background Color', 'your-text-domain')}
        value={myBgColor}
        defaultColor="#ffffff"
        onChange={(val) => setAttributes({ myBgColor: val || '' })}
      />
    </PanelBody>
  );
}
```

## 3. Frontend-এ ব্যবহার করা

ডাইনামিক সিএসএস ফাইলে সরাসরি ভেরিয়েবল হিসেবে ইনজেক্ট করতে পারেন।

```javascript
const DynamicStyle = ({ attributes, clientId }) => {
  const { myTextColor, myBgColor } = attributes;
  const selector = `#block-${clientId} .my-element`;

  return (
    <style>
      {`
        ${selector} {
          ${myTextColor ? `color: ${myTextColor};` : ''}
          ${myBgColor ? `background-color: ${myBgColor};` : ''}
        }
      `}
    </style>
  );
};
```
