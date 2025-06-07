import React, { useContext } from "react";

import { htmlCode } from "../index.jsx";
import styles from "./header.module.css";

function Header() {
  const { Editor, Html, Preview, setEditor, setHtml, setPreview } =
    useContext(htmlCode);
  function showEditor() {
    setEditor(true);
    setHtml(false);
    setPreview(false);
  }
  function showHtml() {
    setEditor(false);
    setHtml(true);
    setPreview(false);
  }
  function showPreview() {
    setEditor(false);
    setHtml(false);
    setPreview(true);
  }
  return (
    <ul className={styles.headerContainer}>
      <li onClick={showEditor} className={Editor && styles.active}>
        WORD
      </li>
      <li onClick={showHtml} className={Html && styles.active}>
        HTML
      </li>
      <li onClick={showPreview} className={Preview && styles.active}>
        PREVIEW
      </li>
    </ul>
  );
}

export default Header;
