# 🎨 TemplateSelector Component

`TemplateSelector` হলো একটি হিউমান-ডিজাইন করা গুটেনবার্গ টেমপ্লেট সিলেকশন ইউজার ইন্টারফেস। এটি রেডিমেড লেআউট বা ডেমো টেমপ্লেট পছন্দ করার অপশন প্রদান করে।

---

## 📋 Props Reference

| Prop Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| **`onSelect`** | `Function` | `undefined` | টেমপ্লেট কাড সিলেক্ট করলে কলব্যাক হিসেবে সিলেক্টেড টেমপ্লেট অবজেক্ট রিটার্ন করে। |
| **`onSkip`** | `Function` | `undefined` | ইউজার "Skip" বাটনে ক্লিক করলে এই ফাংশনটি ট্রিগার হয়। |
| **`attributes`** | `Object` | `{}` | গুটেনবার্গ ব্লকের কারেন্ট অ্যাট্রিবিউট অবজেক্ট। |
| **`setAttributes`** | `Function` | `undefined` | গুটেনবার্গ ব্লকের অ্যাট্রিবিউট আপডেট করার ফাংশন। |

---

## 💻 ব্যবহারের উদাহরণ (Usage Example)

```jsx
import { useState } from '@wordpress/element';
import { TemplateSelector } from 'tr-tools';

export default function Edit({ attributes, setAttributes }) {
  const { isTemplateSelected = false } = attributes;

  if (!isTemplateSelected) {
    return (
      <TemplateSelector
        onSelect={(template) => {
          setAttributes({ 
            isTemplateSelected: true,
            layout: template.id 
          });
        }}
        onSkip={() => {
          setAttributes({ isTemplateSelected: true });
        }}
      />
    );
  }

  return <div>Block Content...</div>;
}
```
