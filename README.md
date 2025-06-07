# @skynoveau/editor

A modern, lightweight **Word to HTML editor** built with React. Easily paste Microsoft Word or rich text content and get clean, editable, and semantic HTML output. Ideal for CMS integrations, admin panels, or any application needing clean HTML from rich text.

---

## ✨ Features

- 📄 Paste content from Microsoft Word, Google Docs, or web
- ✨ Clean, semantic HTML output
- 🧼 Auto-remove unwanted Word styles and tags
- 💡 Supports inline editing
- 🎯 Built with React — easy to integrate
- ⚙️ Fully customizable

---

## 📦 Installation

```bash
npm install @skynoveau/editor
```

or

```bash
yarn add @skynoveau/editor
```

---

## 🚀 Usage

```tsx
import React from 'react';
import { Editor } from '@skynoveau/editor';
import '@skynoveau/editor/editor/editor.module.css';
import '@skynoveau/editor/editor/editor.override.css';

function App() {
  const handleChange = (html: string) => {
    console.log("Clean HTML:", html);
  };

  return (
    <div style={{ padding: 20 }}>
      <Editor onChange={handleChange} />
    </div>
  );
}

export default App;
```

---

## 🔧 Props

| Prop          | Type                      | Description                              |
|---------------|---------------------------|------------------------------------------|
| `onChange`    | `(html: string) => void`  | Callback with cleaned HTML output        |
| `initialHtml` | `string`                  | (Optional) Initial HTML content          |
| `className`   | `string`                  | (Optional) Custom class for styling      |
| `style`       | `React.CSSProperties`     | (Optional) Inline styles                 |

---

## 🧪 Example Output

**Paste from Word:**

```
My Bold Text with header and footers
```

**Clean HTML Output:**

```html
<p><strong>My Bold Text</strong> with header and footers</p>
```

---

## 🏗️ Folder Structure

```
editor/
  header/
  html-editor/
  ui-preview/
  word-editor/
  editor.module.css
  editor.override.css
  index.jsx
```

---

## 🛠️ Build & Publish

To include CSS and folders in the final npm package:

### 1. Add to `package.json`

```json
"files": [
  "dist",
  "editor"
],
"scripts": {
  "build": "rimraf dist && tsc && cpx \"src/editor/**/*.css\" dist/editor"
}
```

> `cpx` is used to copy `.css` files into the `dist` folder for npm packaging:
> Install with:  
> `npm install --save-dev cpx`

### 2. Import Styles in Components

```jsx
import './editor.module.css';
import './editor.override.css';
```

---

## 📜 License

MIT — Free for personal and commercial use.

---

## 🤝 Contributing

We welcome contributions! Feel free to open issues, suggest features, or submit pull requests.

---

## 🏷️ Tags

React, HTML Editor, Word to HTML, Rich Text, Paste Clean HTML, @skynoveau/editor
