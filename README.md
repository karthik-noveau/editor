# @skynoveau/editor

A modern, lightweight **Word to HTML editor** for React. Effortlessly paste content from Microsoft Word or rich text sources and receive clean, semantic, and editable HTML. Perfect for CMS integrations, admin panels, or any app needing reliable HTML from pasted rich text.

---

## ✨ Features

- 📄 Paste from Microsoft Word, Google Docs, or the web
- ✨ Produces clean, semantic HTML
- 🧼 Automatically removes unwanted styles and tags
- 💡 Inline editing support
- 🎯 Built with React for easy integration
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
import React from "react";
import { Editor } from "@skynoveau/editor";
import "@skynoveau/editor/editor/editor.module.css";
import "@skynoveau/editor/editor/editor.override.css";

export const Home = () => {
  function handleEditorClick() {
    console.log("Editor clicked");
  }
  function handleHtmlClick() {
    console.log("HTML clicked");
  }
  function handleEditorChange(content: string) {
    console.log("Word Editor Content:", content);
  }
  function handleHtmlChange(htmlContent: string) {
    console.log("HTML Editor Content:", htmlContent);
  }

  return (
    <Editor showHeader={true}>
      <Editor.word onChange={handleEditorChange} onClick={handleEditorClick} />
      <Editor.html onChange={handleHtmlChange} onClick={handleHtmlClick} />
      <Editor.preview />
    </Editor>
  );
};
```

---

## 🔧 Props

| Prop          | Type                     | Description                         |
| ------------- | ------------------------ | ----------------------------------- |
| `onChange`    | `(html: string) => void` | Callback with cleaned HTML output   |
| `initialHtml` | `string`                 | (Optional) Initial HTML content     |
| `className`   | `string`                 | (Optional) Custom class for styling |
| `style`       | `React.CSSProperties`    | (Optional) Inline styles            |

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

To include CSS and folders in your npm package:

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

> Use `cpx` to copy `.css` files into `dist` for npm packaging.  
> Install with:  
> `npm install --save-dev cpx`

### 2. Import Styles in Components

```jsx
import "./editor.module.css";
import "./editor.override.css";
```

---

## 📜 License

MIT — Free for personal and commercial use.

---

## 🤝 Contributing

Contributions are welcome! Open issues, suggest features, or submit pull requests.

---

## 🏷️ Tags

React, HTML Editor, Word to HTML, Rich Text, Paste Clean HTML, @skynoveau/editor
