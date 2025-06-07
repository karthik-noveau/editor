import React from "react";
import { useEffect, useState ,useRef} from "react";
import { createContext } from "react";

import Header from "./header";
import { UIPreview } from "./ui-preview";
import { HtmlEditor } from "./html-editor";
import { WordEditor } from "./word-editor";
 import "suneditor/dist/css/suneditor.min.css"; // For editor, not needed in preview iframe
 import "./editor.override.css";
import styles from "./editor.module.css";

//Context api for global state management
export const htmlCode = createContext();

const Editor = ({ children, showHeader }) => {
  const [Editor, setEditor] = useState(true);
  const [Html, setHtml] = useState(false);
  const [Preview, setPreview] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);
  const [showPreview, setShowPreview]=useState("")
    const editorRef = useRef(null);
  const [Content, setContent] = useState(() => {
    return localStorage.getItem("items") || ""; //get the content stored in local storage
  });

  useEffect(() => {
    localStorage.setItem("items", Content); // stores the content which changes during onchange event in the local storage
  }, [Content]);

  function onEditorChange(content) {
    function cleanFloatClasses(html) {
      // Handle divs with existing style attributes
      html = html
        .replace(
          /<div([^>]*)class="([^"]*\b__se__float-right\b[^"]*)"([^>]*)style="([^"]*)"([^>]*)>/g,
          (match, p1, p2, p3, style, p5) =>
            `<div${p1}${p3}style="${style}; float: right; margin-left: 1em;"${p5}>`
        )
        .replace(
          /<div([^>]*)class="([^"]*\b__se__float-left\b[^"]*)"([^>]*)style="([^"]*)"([^>]*)>/g,
          (match, p1, p2, p3, style, p5) =>
            `<div${p1}${p3}style="${style}; float: left; margin-right: 1em;"${p5}>`
        );

      // Handle divs WITHOUT style attributes
      html = html
        .replace(
          /<div([^>]*)class="([^"]*\b__se__float-right\b[^"]*)"([^>]*)>/g,
          (match, p1, p2, p3) =>
            `<div${p1}style="float: right; margin-left: 1em;"${p3}>`
        )
        .replace(
          /<div([^>]*)class="([^"]*\b__se__float-left\b[^"]*)"([^>]*)>/g,
          (match, p1, p2, p3) =>
            `<div${p1}style="float: left; margin-right: 1em;"${p3}>`
        );

      // Add margin: 0 auto to <figure> inside float-center divs
      html = html.replace(
        /(<div[^>]*class="[^"]*\b__se__float-center\b[^"]*"[^>]*>[\s\S]*?)(<figure[^>]*style=")([^"]*)(")/g,
        (match, before, figureStart, style, quote) => {
          if (style.includes("margin: 0 auto")) return match;
          return `${before}${figureStart}${style}; margin: 0 auto${quote}`;
        }
      );
      html = html.replace(/\b__se__float-(left|right|center)\b\s*/g, "");
      return html;
    }

    const htmlContent = cleanFloatClasses(content);
    setContent(htmlContent);
  }

  function onHtmlChange(value) {
    setContent(value);
  }

  return (
    <>
      <htmlCode.Provider
        value={{
          Content,
          setContent,
          Editor,
          setEditor,
          Html,
          setHtml,
          Preview,
          setPreview,
          onEditorChange,
          onHtmlChange,
          selectedImg,
          setSelectedImg,
          editorRef,showPreview, setShowPreview
        }}
      >
        {showHeader && <Header />}
        <div className={styles.EditorColumns}>
          {React.Children.map(children, (child) => {
            if (
              React.isValidElement(child) &&
              (child.type === WordEditor ||
                child.type === HtmlEditor ||
                child.type === UIPreview)
            ) {
              return React.cloneElement(child, { Content, setContent });
            }
            return null;
          })}
        </div>
      </htmlCode.Provider>
    </>
  );
};

Editor.word = WordEditor;
Editor.html = HtmlEditor;
Editor.preview = UIPreview;

export default Editor;
