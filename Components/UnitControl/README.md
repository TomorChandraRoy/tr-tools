# UnitControl Component - Usage Guide

This guide explains how to define attributes for the `UnitControl` component in your `block.json` and how to use it inside your Gutenberg blocks.

## 1. `block.json`-এ Data (Attributes) ডিক্লেয়ার করা

`UnitControl` সাধারণত সাইজ, স্পেসিং বা অন্যান্য পরিমাপের (যেমন: px, em, %, rem) জন্য ব্যবহার করা হয়। এর জন্য `block.json`-এ একটি `string` বা `number` টাইপের অ্যাট্রিবিউট ডিক্লেয়ার করতে হবে।

**উদাহরণ (`block.json`):**
```json
{
  "attributes": {
    "myLineHeight": {
      "type": "string",
      "default": ""
    },
    "myLetterSpacing": {
      "type": "string",
      "default": "0px"
    }
  }
}
```

## 2. Editor-এ `UnitControl` ইমপোর্ট এবং ব্যবহার করা

আপনার ব্লকের সেটিংস বা ইন্সপেক্টর কন্ট্রোলে (InspectorControls / PanelBody) `UnitControl` ইমপোর্ট করে ব্যবহার করতে পারবেন।

**উদাহরণ (`edit.js` বা `Style.js`):**
```javascript
import { __ } from '@wordpress/i18n';
import { PanelBody, PanelRow } from '@wordpress/components';
// tr-tools থেকে UnitControl ইমপোর্ট করুন
import { UnitControl } from 'tr-tools';
import { pxUnit, emUnit, remUnit, perUnit } from 'tr-tools'; // আপনার প্রয়োজনীয় ইউনিটগুলো

export default function Edit({ attributes, setAttributes }) {
  const { myLineHeight, myLetterSpacing } = attributes;

  return (
    <PanelBody title={__('Typography Settings', 'your-text-domain')}>
      
      {/* Line Height Control */}
      <UnitControl
        label={__('Line Height:', 'your-text-domain')}
        value={myLineHeight}
        onChange={(val) => setAttributes({ myLineHeight: val })}
        units={[pxUnit(), perUnit(), emUnit(), remUnit()]}
        // isResetValueOnUnitChange={true} দিলে ইউনিট পরিবর্তন করলে ভ্যালু রিসেট হবে
      />

      {/* Letter Spacing Control */}
      <UnitControl
        label={__('Letter Spacing:', 'your-text-domain')}
        value={myLetterSpacing}
        onChange={(val) => setAttributes({ myLetterSpacing: val })}
        units={[pxUnit(), emUnit(), remUnit()]}
      />

    </PanelBody>
  );
}
```

## 3. CSS জেনারেট বা Frontend-এ ব্যবহার করা

`UnitControl`-এর ভ্যালুটি আপনি ইনলাইন স্টাইলে ব্যবহার করতে পারেন বা ডাইনামিক CSS জেনারেট করার সময় কাজে লাগাতে পারেন।

**উদাহরণ (`save.js` বা `DynamicStyles.js`):**
```javascript
// DynamicStyles.js উদাহরণ
const DynamicStyles = ({ attributes, id }) => {
  const { myLineHeight, myLetterSpacing } = attributes;

  const selector = `#${id} .my-custom-element`;

  return (
    <style>
      {`
        ${selector} {
          ${myLineHeight ? `line-height: ${myLineHeight};` : ''}
          ${myLetterSpacing ? `letter-spacing: ${myLetterSpacing};` : ''}
        }
      `}
    </style>
  );
};
```

### বিশেষ দ্রষ্টব্য:
* এই `UnitControl`-এ বিল্ট-ইন **Reset** বাটন আছে। যদি কোনো ভ্যালু দেওয়া থাকে, তবে ডানপাশে একটি রোটেট আইকন দেখাবে। সেখানে ক্লিক করলে ভ্যালুটি স্বয়ংক্রিয়ভাবে মুছে যাবে (undefined হয়ে যাবে)।
* এর স্টাইলগুলো ইন্টারনালভাবে ম্যানেজ করা আছে, তাই এক্সট্রা কোনো CSS কল করার প্রয়োজন নেই।
