import React, { Fragment, useContext } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html as beautifyHtml } from "js-beautify";
import { htmlCode } from "..";
import { html } from "@codemirror/lang-html";

import { noctisLilac } from "@uiw/codemirror-theme-noctis-lilac";

import { EditorView } from "@codemirror/view";

export const HtmlEditor = () => {
  const { Html, Content, onHtmlChange } = useContext(htmlCode);

  const formattedContent = beautifyHtml(Content, {
    indent_size: 2,
    preserve_newlines: true,
    end_with_newline: true,
  });

  return (
    <Fragment>
      {Html && (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CodeMirror
            value={formattedContent}
            extensions={[html(), EditorView.lineWrapping]}
            theme={noctisLilac}
            onChange={(htmlVal) => {
              onHtmlChange(htmlVal);
            }}
            basicSetup={{
              lineNumbers: true,
              highlightActiveLine: true,
              autocompletion: true,
            }}
            style={{
              flex: 1,
              fontFamily: "Poppins, sans-serif",
              border: "1px solid #d4d4d4 ",
              overflow: "auto",
              borderRadius: "10px",
              padding: "14px 0px",
            }}
          />
        </div>
      )}
    </Fragment>
  );
};
