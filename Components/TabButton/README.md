# 🔘 TabButton Component

`TabButton` (বা `TabButtons`) হলো একটি রেডিমেড কাস্টম পিল/সুইচ বাটন ট্যাব অপশন কম্পোনেন্ট। এর মাধ্যমে গুটেনবার্গ ইন্সপেক্টর প্যানেলে সুন্দরভাবে "General" এবং "Style" বা কাস্টম ট্যাব সুইচার তৈরি করা যায়।

---

## 📋 Props Reference

| Prop Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| **`tabs`** | `Array` | `[General, Style]` | প্রদর্শনের জন্য ট্যাব অবজেক্টের অ্যারে `[{ name, title, icon }]` । |
| **`activeTab`** | `String` | `'general'` | বর্তমান অ্যাক্টিভ ট্যাবের নাম (Name)। |
| **`onChange`** | `Function` | `undefined` | ইউজার নতুন কোনো ট্যাবে ক্লিক করলে অ্যাক্টিভ ট্যাব নেম সহ ট্রিগার হয় `(tabName) => void` । |
| **`className`** | `String` | `''` | অতিরিক্ত কাস্টম CSS ক্লাস যোগ করার জন্য। |

---

## 💻 ব্যবহারের উদাহরণ (Usage Example)

### ১. ডিফল্ট General & Style ট্যাব হিসেবে:

```jsx
import { useState } from '@wordpress/element';
import { TabButton } from 'tr-tools';

export default function SettingsPanel() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div>
      <TabButton
        activeTab={activeTab}
        onChange={(tabName) => setActiveTab(tabName)}
      />

      {activeTab === 'general' && <div>General Settings Body...</div>}
      {activeTab === 'style' && <div>Style Settings Body...</div>}
    </div>
  );
}
```

---

### ২. কাস্টম ট্যাব ও আইকন দিয়ে:

```jsx
import { useState } from '@wordpress/element';
import { TabButton } from 'tr-tools';

export default function CustomTabSection() {
  const [tab, setTab] = useState('content');

  const myTabs = [
    { name: 'content', title: 'Content Settings' },
    { name: 'style', title: 'Style Options' },
    { name: 'advanced', title: 'Advanced' },
  ];

  return (
    <TabButton
      tabs={myTabs}
      activeTab={tab}
      onChange={(newTab) => setTab(newTab)}
    />
  );
}
```
