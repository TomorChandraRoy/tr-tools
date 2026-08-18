# 📋 ItemsPanel Component

`ItemsPanel` হলো একটি ডায়নামিক গুটেনবার্গ লিস্ট/আইটেম ম্যানেজার কম্পোনেন্ট। এর মাধ্যমে খুব সহজেই অ্যাকর্ডিয়ন আইটেম, স্লাইডার আইটেম বা লিস্ট আইটেম তৈরি, আপডেট, সাজানো (Reorder) এবং ডিলিট করা যায়।

---

## 📋 Props Reference

| Prop Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| **`title`** | `String` | `'📋 Items Manager'` | প্যানেল হেডারের টাইটেল ٹیکسٹ। |
| **`initialOpen`** | `Boolean` | `true` | প্যানেলটি শুরুতেই খোলা থাকবে কিনা। |
| **`items`** | `Array` | `[]` | বর্তমান আইটেম অবজেক্টগুলোর অ্যারে। |
| **`onChange`** | `Function` | `undefined` | আইটেম যুক্ত/মুছে ফেলা/পরিবর্তন/পুনর্বিন্যাস করলে নতুন অ্যারে রিটার্ন করে। |
| **`defaultItem`** | `Object` | `{}` | নতুন আইটেম যুক্ত করার সময় তার ডিফল্ট ভ্যালু অবজেক্ট। |
| **`addButtonLabel`** | `String` / `Element` | `'＋ Add New Item'` | "Add New" বাটনের লেবেল। |
| **`itemTitleKey`** | `String` | `'title'` | লিস্টের টাইটেল হিসেবে প্রদর্শনের জন্য অবজেক্টের কি (Key)। |
| **`fields`** | `Array` | `[]` | অটো-জেনারেটেড ফিল্ডের কনফিগারেশন অ্যারে (`text`, `textarea`, `toggle`, `select`)। |
| **`renderItemFields`** | `Function` | `undefined` | কাস্টম ফিল্ড রেন্ডার করার জন্য ফাংশন `(item, index, handleUpdateField)`। |

---

## 💻 ব্যবহারের উদাহরণ (Usage Example)

### সাধারণ ডিক্লারেটিভ উপায়ে (Using `fields` prop):

```jsx
import { PanelBody } from '@wordpress/components';
import { ItemsPanel } from 'tr-tools';

export default function InspectorControls({ attributes, setAttributes }) {
  const { faqs = [] } = attributes;

  return (
    <ItemsPanel
      title="FAQ Items Manager"
      items={faqs}
      addButtonLabel="+ Add New FAQ"
      itemTitleKey="question"
      defaultItem={{ question: 'New Question', answer: 'New Answer' }}
      fields={[
        { key: 'question', label: 'Question', type: 'text' },
        { key: 'answer', label: 'Answer', type: 'textarea', rows: 4 },
        { key: 'isOpen', label: 'Open by default', type: 'toggle' },
      ]}
      onChange={(newItems) => setAttributes({ faqs: newItems })}
    />
  );
}
```

---

### কাস্টম রেন্ডারার দিয়ে (Using `renderItemFields` prop):

```jsx
import { TextControl } from '@wordpress/components';
import { ItemsPanel } from 'tr-tools';

export default function CustomManager({ attributes, setAttributes }) {
  return (
    <ItemsPanel
      items={attributes.items}
      onChange={(newItems) => setAttributes({ items: newItems })}
      renderItemFields={(item, index, updateField) => (
        <div>
          <TextControl
            label="Custom Title"
            value={item.title}
            onChange={(val) => updateField('title', val)}
          />
        </div>
      )}
    />
  );
}
```
