import Editor from "../editor";
import { Footer } from "./footer";
import { Header } from "./header";

import styles from "./home.module.css";
import "./global.css";

export const Home = () => {
  function handleEditorClick() {
    console.log("Editor is clicked");
  }
  function handleHtmlClick() {
    console.log("Html is clicked");
  }
  function handleEditorChange(content) {
    console.log(content);
  }
  function handleHtmlChange(Htmlcontent) {
    console.log(Htmlcontent);
  }

  return (
    <>
      <Header />

      <div className={styles.editorWrapper}>
        <div className={styles.editorContainer}>
          <Editor showHeader={true}>
            <Editor.word
              onChange={handleEditorChange}
              onClick={handleEditorClick}
            />
            <Editor.html
              onChange={handleHtmlChange}
              onClick={handleHtmlClick}
            />
            <Editor.preview />
          </Editor>
        </div>
      </div>

      <Footer />
    </>
  );
};
