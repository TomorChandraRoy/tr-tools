# Typography Component - Usage Guide

This guide explains how to define attributes for the `Typography` component in your `block.json`, how to use it inside your Gutenberg blocks, and how to set default values.

## 1. `block.json`-এ Data (Attributes) ডিক্লেয়ার করা

`Typography` কম্পোনেন্টটি ফন্ট সাইজ, ফন্ট ফ্যামিলি, ওয়েট, লাইন হাইট ইত্যাদি ম্যানেজ করে। এর জন্য `block.json`-এ একটি `object` টাইপের অ্যাট্রিবিউট ডিক্লেয়ার করতে হবে। আপনি চাইলে একটি `default` ভ্যালুও দিয়ে দিতে পারেন।

**উদাহরণ (`block.json`):**
```json
{
  "attributes": {
    "titleTypography": {
      "type": "object",
      "default": {
        "fontSize": {
          "desktop": "24px",
          "tablet": "20px",
          "mobile": "18px"
        },
        "fontFamily": "Inter",
        "fontWeight": "700",
        "lineHeight": 1.2,
        "letterSpacing": "0px",
        "textTransform": "capitalize",
        "textDecoration": "none",
        "fontStyle": "normal"
      }
    }
  }
}
```

## 2. Editor-এ `Typography` ইমপোর্ট এবং ব্যবহার করা

আপনার ব্লকের সেটিংস বা প্যানেলে (যেমন: `Style.js` বা `InspectorControls`) `Typography` ইমপোর্ট করে ব্যবহার করতে পারবেন।

**উদাহরণ (`Style.js` বা `edit.js`):**
```javascript
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
// tr-tools থেকে Typography ইমপোর্ট করুন
import { Typography } from 'tr-tools';

export default function Style({ attributes, setAttributes }) {
  const { titleTypography } = attributes;

  return (
    <PanelBody title={__('Typography Settings', 'your-text-domain')}>
      
      <Typography 
        label={__('Title Typography', 'your-text-domain')}
        value={titleTypography}
        defaultTypography={{
          fontSize: { desktop: '24px', tablet: '20px', mobile: '18px' },
          fontFamily: 'Inter',
          fontWeight: '700',
          lineHeight: '1.2'
        }}
        onChange={(val) => setAttributes({ titleTypography: val })}
      />

    </PanelBody>
  );
}
```

## 3. CSS জেনারেট বা Frontend-এ ব্যবহার করা

`Typography`-এর অবজেক্ট থেকে রেস্পন্সিভ CSS জেনারেট করার জন্য `tr-tools` একটি ইউটিলিটি ফাংশন `getTypographyCss` প্রোভাইড করে। এটি ডাইনামিক স্টাইল ফাইলে ব্যবহার করা সবচেয়ে সহজ। এটি স্বয়ংক্রিয়ভাবে গুগল ফন্টও লোড করে নেয়।

**উদাহরণ (`DynamicStyles.js` বা `dynamicStyle.js`):**
```javascript
// tr-tools থেকে getTypographyCss ইমপোর্ট করুন
import { getTypographyCss } from 'tr-tools';

const DynamicStyle = ({ attributes, clientId }) => {
  const { titleTypography } = attributes;

  const selector = `#block-${clientId} .my-title-class`; // বা ফ্রন্টএন্ডের জন্য আপনার পছন্দমতো সিলেক্টর

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          ${selector} {
            ${getTypographyCss(titleTypography)}
            color: #333333;
          }
        `.replace(/\s+/g, ' '),
      }}
    />
  );
};

export default DynamicStyle;
```

### `getTypographyCss` ফাংশনটির প্যারামিটার:
- **প্রথম প্যারামিটার:** আপনার টাইপোগ্রাফি অবজেক্ট (`typo`)
- **দ্বিতীয় প্যারামিটার (অপশনাল):** `important` (boolean)। যদি `true` পাস করেন, তাহলে জেনারেট হওয়া সব CSS প্রপার্টিতে `!important` যুক্ত হয়ে যাবে। (উদাহরণ: `getTypographyCss(titleTypography, true)`)
