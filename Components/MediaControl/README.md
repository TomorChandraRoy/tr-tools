# MediaControl Component - Usage Guide

`MediaControl` কম্পোনেন্টটি ইমেজ, অডিও বা ভিডিও আপলোড ও সিলেক্ট করার জন্য ব্যবহার করা হয়।

## 1. `block.json`-এ Data (Attributes) ডিক্লেয়ার করা

Media-এর URL সেভ করার জন্য `block.json`-এ একটি `string` টাইপের অ্যাট্রিবিউট ডিক্লেয়ার করতে হয়।

**উদাহরণ (`block.json`):**
```json
{
  "attributes": {
    "audioUrl": {
      "type": "string",
      "default": ""
    }
  }
}
```

## 2. Editor-এ `MediaControl` ব্যবহার করা

**উদাহরণ (`Style.js` বা `edit.js`):**
```javascript
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { MediaControl } from 'tr-tools';

export default function Edit({ attributes, setAttributes }) {
  const { audioUrl } = attributes;

  return (
    <PanelBody title={__('Media Settings', 'your-text-domain')}>
      <MediaControl
        label={__('Audio File', 'your-text-domain')}
        value={audioUrl}
        onChange={(val) => setAttributes({ audioUrl: val })}
        allowedTypes={['audio']} // ['image'], ['video'] ইত্যাদি ব্যবহার করতে পারেন
        buttonLabel={__('Upload Audio', 'your-text-domain')}
      />
    </PanelBody>
  );
}
```

## 3. Frontend-এ ব্যবহার করা

Frontend-এ সরাসরি অ্যাট্রিবিউট থেকে URL ব্যবহার করে `<audio>`, `<video>`, বা `<img>` ট্যাগ রেন্ডার করতে পারেন।

```javascript
const Save = ({ attributes }) => {
  const { audioUrl } = attributes;

  return (
    <div>
      {audioUrl && (
        <audio controls>
          <source src={audioUrl} type="audio/mpeg" />
        </audio>
      )}
    </div>
  );
};
```
