# 🛠️ tr-tools

> **WordPress Gutenberg Blocks-এর জন্য Shared React UI Components & Utilities Library**

`tr-tools` হলো একটি শেয়ার্ড কম্পোনেন্ট লাইব্রেরি, যা বিভিন্ন ওয়ার্ডপ্রেস গুটেনবার্গ ব্লক প্লাগিনে ব্যবহারের জন্য রিইউজেবল (Reusable) React UI Components এবং Utilities সরবরাহ করে।

---

## 📌 সূচিপত্র (Table of Contents)

1. [ফোল্ডার লোকেশন (Folder Location)](#-ফোল্ডার-লোকেশন-folder-location)
2. [নতুন প্লাগিনে ইন্সটলেশন ও কনফিগারেশন (Setup)](#-নতুন-প্লাগিনে-ইন্সটলেশন-ও-কনফিগারেশন-setup)
3. [কম্পোনেন্ট ডকুমেন্টেশন ডিরেক্টরি (Component Documentation)](#-কম্পোনেন্ট-ডকুমেন্টেশন-ডিরেক্টরি-component-documentation)
4. [নতুন কম্পোনেন্ট যুক্ত করার নিয়ম (Adding New Components)](#-নতুন-কম্পোনেন্ট-যুক্ত-করার-নিয়ম-adding-new-components)
5. [ফোল্ডার স্ট্রাকচার (Folder Structure)](#-ফোল্ডার-স্ট্রাকচার-folder-structure)

---

## 📁 ফোল্ডার লোকেশন (Folder Location)

`tr-tools` ফোল্ডারটি আপনার ওয়ার্ডপ্রেস সাইটের **`wp-content/plugins/`** ফোল্ডারের ভেতর অন্যান্য সমস্ত প্লাগিনের পাশাপাশি (Sibling directory হিসেবে) রাখতে হবে:

```text
wp-content/plugins/
├── tr-tools/                 <-- (শেয়ার্ড লাইব্রেরি ফোল্ডার - এখানে থাকবে)
├── guten-builder-blocks/     <-- (প্লাগিন ১)
├── my-new-block-plugin/      <-- (প্লাগিন ২)
└── another-plugin/           <-- (প্লাগিন ৩)
```

> 💡 **নোট:** কারণ প্লাগিনের `package.json`-এ `"tr-tools": "file:../tr-tools"` লেখা থাকে। `../tr-tools` মানে হলো প্রজেক্টের ঠিক ১ ধাপ বাইরে `wp-content/plugins/` ফোল্ডারে `tr-tools` রাখা থাকতে হবে।

---

## 🚀 নতুন প্লাগিনে ইন্সটলেশন ও কনফিগারেশন (Setup)

যেকোনো ওয়ার্ডপ্রেস প্লাগিনে (যেমন `guten-builder-blocks`) `tr-tools` এর কম্পোনেন্টগুলো ব্যবহার করতে নিচের ধাপ দুটি অনুসরণ করুন:

### ধাপ ১: প্লাগিনের `package.json`-এ যোগ করুন
আপনার প্লাগিনের `package.json` ফাইলের `dependencies` সেকশনে `tr-tools` কে স্থানীয় ফাইল হিসেবে যুক্ত করুন:

```json
"dependencies": {
  "tr-tools": "file:../tr-tools"
}
```

### ধাপ ২: NPM Install চালান
আপনার প্লাগিনের ফোল্ডারে টার্মিনাল খুলে নিচের কমান্ডটি চালান:

```bash
npm install
```

### ধাপ ৩: (ঐচ্ছিক কিন্তু সুনির্দিষ্ট) `jsconfig.json` যোগ করুন
VS Code-এ `tr-tools`-এর কম্পোনেন্টগুলোর মসৃণ **Auto-Import** এবং টাইপ সাজেশন পেতে আপনার নতুন প্লাগিনের রুট ফোল্ডারে একটি `jsconfig.json` ফাইল রাখুন:

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

## 📘 কম্পোনেন্ট ডকুমেন্টেশন ডিরেক্টরি (Component Documentation)

প্রত্যেকটি কম্পোনেন্টের বিস্তারিত প্রপস গাইড ও ব্যবহারের উদাহরণের জন্য নিচের লিঙ্কগুলোতে ক্লিক করুন:

1. 🎨 **[TemplateSelector Documentation](file:///c:/Users/USER/Local%20Sites/production/app/public/wp-content/plugins/tr-tools/Components/TemplateSelector/README.md)**
   - রেডিমেড লেআউট বা ডেমো টেমপ্লেট পছন্দ করার UI।
2. 📋 **[ItemsPanel Documentation](file:///c:/Users/USER/Local%20Sites/production/app/public/wp-content/plugins/tr-tools/Components/ItemsPanel/README.md)**
   - গুটেনবার্গ ব্লকে একের অধিক আইটেম/লিস্ট ম্যানেজ করার জন্য (Add/Edit/Delete/Reorder)।
3. 🔘 **[TabButton Documentation](file:///c:/Users/USER/Local%20Sites/production/app/public/wp-content/plugins/tr-tools/Components/TabButton/README.md)**
   - কাস্টম পিল/সুইচ বাটন ট্যাব ইন্টারফেসের জন্য (General vs Style ইত্যাদি)।

---

## ➕ নতুন কম্পোনেন্ট যুক্ত করার নিয়ম (Adding New Components)

আপনি যদি ভবিষ্যতে `tr-tools`-এ নতুন কোনো UI কম্পোনেন্ট (যেমন: Custom Color Picker, Range Control, Modal) যোগ করতে চান:

1. **ফোল্ডার তৈরি করুন:** `tr-tools/Components/` ফোল্ডারের ভেতর আপনার নতুন কম্পোনেন্টের নামে ফোল্ডার তৈরি করে ফাইল ও তার নিজস্ব `README.md` রাখুন।  
   *উদাহরণ:* `tr-tools/Components/ColorPicker/ColorPicker.jsx`

2. **`Components/index.js`-এ এক্সপোর্ট করুন:**  
   [tr-tools/Components/index.js](file:///c:/Users/USER/Local%20Sites/production/app/public/wp-content/plugins/tr-tools/Components/index.js) ফাইলে গিয়ে আপনার কম্পোনেন্টটি এক্সপোর্ট যোগ করে দিন:

   ```javascript
   export { default as ColorPicker } from './ColorPicker/ColorPicker';
   ```

3. **`index.d.ts`-এ যোগ করুন:**  
   [tr-tools/index.d.ts](file:///c:/Users/USER/Local%20Sites/production/app/public/wp-content/plugins/tr-tools/index.d.ts) ফাইলে Auto-Import এর জন্য টাইপ এক্সপোর্ট ডিক্লেয়ার করে দিন:
   ```typescript
   export const ColorPicker: ComponentType<any>;
   ```

---

## 📂 ফোল্ডার স্ট্রাকচার (Folder Structure)

```text
tr-tools/
├── Components/
│   ├── TemplateSelector/
│   │   ├── TemplateSelector.jsx
│   │   ├── TemplateSelector.scss
│   │   └── README.md            <-- (TemplateSelector-এর বিস্তারিত গাইড)
│   ├── ItemsPanel/
│   │   ├── ItemsPanel.jsx
│   │   ├── ItemsPanel.scss
│   │   └── README.md            <-- (ItemsPanel-এর বিস্তারিত গাইড)
│   ├── TabButton/
│   │   ├── TabButton.jsx
│   │   ├── TabButton.scss
│   │   └── README.md            <-- (TabButton-এর বিস্তারিত গাইড)
│   └── index.js                 <-- (সব কম্পোনেন্টের এক্সপোর্ট হাব)
├── index.js                     <-- (Main Root Entry Point)
├── index.d.ts                   <-- (TypeScript & Auto-Import Definitions)
├── package.json                 <-- (Package Metadata)
└── README.md                    <-- (প্রধান নির্দেশিকা)
```

---

⚡ **Developed & Maintained with Care for WordPress Gutenberg Blocks.**
