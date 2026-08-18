# BorderControl Component - Usage Guide

এই গাইডটিতে `BorderControl` কম্পোনেন্টটি আপনার `block.json`-এ কীভাবে ডিক্লেয়ার করবেন এবং গুটেনবার্গ ব্লকে কীভাবে ব্যবহার করবেন তা দেখানো হলো।

## 1. `block.json`-এ Data (Attributes) ডিক্লেয়ার করা

`BorderControl` কম্পোনেন্টটি একসাথে বর্ডারের প্রস্থ (Width), স্টাইল (Style), কালার (Color) এবং কোন পাশে বর্ডার হবে (Sides) তা ম্যানেজ করে। এর জন্য `block.json`-এ একটি `object` টাইপের অ্যাট্রিবিউট ডিক্লেয়ার করতে হবে।

**উদাহরণ (`block.json`):**
```json
{
  "attributes": {
    "myBorder": {
      "type": "object",
      "default": {
        "width": "",
        "style": "solid",
        "color": "",
        "side": "all"
      }
    }
  }
}
```

## 2. Editor-এ `BorderControl` ইমপোর্ট এবং ব্যবহার করা

আপনার ব্লকের সেটিংস বা ইন্সপেক্টর কন্ট্রোলে (InspectorControls / PanelBody) `BorderControl` ইমপোর্ট করে ব্যবহার করতে পারবেন।

**উদাহরণ (`edit.js` বা `Style.js`):**
```javascript
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
// tr-tools থেকে BorderControl ইমপোর্ট করুন
import { BorderControl } from 'tr-tools';

export default function Edit({ attributes, setAttributes }) {
  const { myBorder } = attributes;

  return (
    <PanelBody title={__('Border Settings', 'your-text-domain')}>
      
      <BorderControl
        label={__('Box Border', 'your-text-domain')}
        value={myBorder}
        onChange={(val) => setAttributes({ myBorder: val })}
      />

    </PanelBody>
  );
}
```

## 3. CSS জেনারেট বা Frontend-এ ব্যবহার করা

`tr-tools` থেকে `getBorderCss` ফাংশনটি ইমপোর্ট করে খুব সহজেই আপনি CSS জেনারেট করতে পারবেন। এটি বর্ডারের সব ডেটা চেক করে সঠিক CSS প্রপার্টি তৈরি করে দেবে (যেমন: `border: 1px solid #000;` অথবা `border-bottom: 2px dashed red;`)।

**উদাহরণ (`save.js` বা `DynamicStyles.js`):**
```javascript
// DynamicStyles.js উদাহরণ
import { getBorderCss } from 'tr-tools';

const DynamicStyles = ({ attributes, id }) => {
  const { myBorder } = attributes;

  const selector = `#${id} .my-custom-box`;

  return (
    <style>
      {`
        ${selector} {
          ${getBorderCss(myBorder)}
        }
      `}
    </style>
  );
};
```

### বিশেষ দ্রষ্টব্য:
* এই কম্পোনেন্টের ডানপাশে থাকা "পেন্সিল" (Edit) আইকনে ক্লিক করলে একটি পপওভার ওপেন হবে।
* স্টাইলগুলো ইন্টারনালভাবে (`BorderControl.scss`-এর মাধ্যমে) ম্যানেজ করা আছে, তাই এক্সট্রা কোনো CSS কল করার প্রয়োজন নেই।
