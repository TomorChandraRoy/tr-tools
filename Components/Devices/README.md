# Devices Component - Usage Guide

`Devices` কম্পোনেন্টটি রেস্পন্সিভ টগল (Desktop, Tablet, Mobile আইকন) দেখানোর জন্য ব্যবহার করা হয়। সাধারণত অন্যান্য কম্পোনেন্ট (যেমন: Typography, SpacingControl) এটিকে ইন্টারনালি ব্যবহার করে। তবে আপনি চাইলে নিজের কাস্টম কম্পোনেন্টেও এটি ব্যবহার করতে পারেন।

## 1. Editor-এ `Devices` ব্যবহার করা

এটি সাধারণত কোনো ডেটা সেভ করে না, বরং স্টেট (State) ম্যানেজ করার জন্য ব্যবহৃত হয়।

**উদাহরণ (`MyCustomResponsiveControl.js`):**
```javascript
import { useState } from '@wordpress/element';
import { Devices } from 'tr-tools';

const MyCustomResponsiveControl = ({ value, onChange }) => {
  // বর্তমান সিলেক্টেড ডিভাইস (desktop, tablet, mobile)
  const [device, setDevice] = useState("desktop");

  const currentValue = value?.[device] || '';

  const handleChange = (val) => {
    onChange({
      ...value,
      [device]: val
    });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <label>My Responsive Field</label>
        {/* Devices Component কল করা */}
        <Devices device={device} onChange={(newDevice) => setDevice(newDevice)} />
      </div>
      
      <input 
        type="text" 
        value={currentValue} 
        onChange={(e) => handleChange(e.target.value)} 
      />
    </div>
  );
};

export default MyCustomResponsiveControl;
```

এখানে `block.json`-এ ডেটা `object` টাইপের হবে (যাতে `{ desktop, tablet, mobile }` সেভ করা যায়)।
