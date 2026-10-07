# ShadowControl Component - Usage Guide

`ShadowControl` কম্পোনেন্টটি বক্স শ্যাডো (Box Shadow) অ্যাড করার জন্য ব্যবহৃত হয়। এটি দিয়ে h-offset, v-offset, blur, spread এবং color খুব সহজেই কন্ট্রোল করা যায়।

## 1. `block.json`-এ Data (Attributes) ডিক্লেয়ার করা

Shadow-এর ডেটা সেভ করার জন্য `block.json`-এ একটি `object` টাইপের অ্যাট্রিবিউট ডিক্লেয়ার করতে হয়।

**উদাহরণ (`block.json`):**
```json
{
  "attributes": {
    "boxShadow": {
      "type": "object",
      "default": {
        "hOffset": "0px",
        "vOffset": "4px",
        "blur": "10px",
        "spread": "0px",
        "color": "rgba(0,0,0,0.1)"
      }
    }
  }
}
```

## 2. Editor-এ `ShadowControl` ব্যবহার করা

আপনার ব্লকের সেটিং ফাইলে (যেমন: `Style.js`) এটি ব্যবহার করতে পারবেন।

**উদাহরণ (`Style.js`):**
```javascript
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { ShadowControl } from 'tr-tools';

export default function Style({ attributes, setAttributes }) {
  const { boxShadow } = attributes;

  return (
    <PanelBody title={__('Shadow Settings', 'your-text-domain')}>
      <ShadowControl
        label={__('Box Shadow', 'your-text-domain')}
        value={boxShadow}
        onChange={(val) => setAttributes({ boxShadow: val })}
        defaultShadow={{
          hOffset: "0px",
          vOffset: "4px",
          blur: "10px",
          spread: "0px",
          color: "rgba(0,0,0,0.1)"
        }}
      />
    </PanelBody>
  );
}
```

## 3. CSS জেনারেট বা Frontend-এ ব্যবহার করা

`tr-tools` থেকে `getShadowCss` ফাংশন ব্যবহার করে সহজেই শ্যাডো সিএসএস জেনারেট করা যায়।

```javascript
import { getShadowCss } from 'tr-tools/utils/getCSS';

const DynamicStyle = ({ attributes, clientId }) => {
  const { boxShadow } = attributes;
  const selector = `#block-${clientId} .my-card`;

  const shadowCss = getShadowCss(boxShadow);

  return (
    <style>
      {`
        ${selector} {
          ${shadowCss ? `box-shadow: ${shadowCss};` : ''}
        }
      `}
    </style>
  );
};
```
