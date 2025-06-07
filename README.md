# @skynoveau-ui/editor

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
npm install @skynoveau-ui/editor
```

or

```bash
yarn add @skynoveau-ui/editor
```

---

## 🚀 Usage

```jsx
return (
  <Editor>
    <Editor.word />
    <Editor.html />
    <Editor.preview />
  </Editor>
);
```

---

## `<Editor/>` Props

| Prop         | Type      | Description                 |
| ------------ | --------- | --------------------------- |
| `showHeader` | `boolean` | Show/hide the editor header |

### `<Editor.html />` Props

| Prop       | Type                        | Description                     |
| ---------- | --------------------------- | ------------------------------- |
| `onChange` | `(content: string) => void` | Callback with editor content    |
| `onClick`  | `() => void`                | Callback when editor is clicked |

### `<Editor.word />` Props

| Prop       | Type                        | Description                     |
| ---------- | --------------------------- | ------------------------------- |
| `onChange` | `(content: string) => void` | Callback with editor content    |
| `onClick`  | `() => void`                | Callback when editor is clicked |

### `<Editor.preview />` Props

_No props required. Renders a live preview of the HTML content._

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

## 📜 License

MIT — Free for personal and commercial use.

---

## 🤝 Contributing

Contributions are welcome! Open issues, suggest features, or submit pull requests.

---

## 🏷️ Tags

React, HTML Editor, Word to HTML, Rich Text, Paste Clean HTML, @skynoveau-ui/editor
