import React, { useContext, useEffect, useRef, useState } from "react";

import SunEditor from "suneditor-react";
import plugins from "suneditor/src/plugins";
import "suneditor/dist/css/suneditor.min.css";
import { htmlCode } from "..";
import FontColorButton from "./colorPicker";
import { createRoot } from "react-dom/client";

import BackgroundColorButton from "./bgPicker";

export const WordEditor = () => {
  const { Editor, editorRef, onEditorChange, Content , setShowPreview} = useContext(htmlCode);
console.log(editorRef.current?.core?.preview)
  const selectedImageRef = useRef(null);


  const backgroundColorPlugin = {
    name: "backgroundColor",
    display: "command",
    title: "Background Color",
    innerHTML: '<div id="background-color-container"></div>',
    add: function (core, targetElement) {
      const container = document.createElement("div");
      container.id = "background-color-container";
      targetElement.appendChild(container);

      const root = createRoot(container);
      root.render(<BackgroundColorButton />);
    },
    action: function () {},
  };
  const fontColorPlugin = {
    name: "Color",
    display: "command",
    title: "fore color",
    innerHTML: '<div id="font-color-container"></div>',
    add: function (core, targetElement) {
      const container = document.createElement("div");
      container.id = "font-color-container";
      targetElement.appendChild(container);

      const root = createRoot(container);
      root.render(<FontColorButton />);
    },
    action: function () {},
  };

  function addBorderRadiusInput() {
    const editorContent = editorRef.current?.core?.context?.element?.wysiwyg;
    if (!editorContent) return;

    const handleClick = (event) => {
      const figure = event.target;

      if (figure.tagName === "FIGURE") {
        const img = figure.querySelector("img");
        if (img) {
          selectedImageRef.current = img;
        }
      }
    };

    editorContent.addEventListener("click", handleClick);

    const dialogBox = editorRef.current?.core?.context?.image?.modal;
    if (!dialogBox) return;

    const imageDialogBody = dialogBox.querySelector(".se-dialog-body");
    if (imageDialogBody.querySelector(".border-radius-input")) return;

    // Create and add label for border radius input
    const label = document.createElement("label");
    label.innerText = "Border Radius";
    label.style.marginRight = "8px";

    // Create border radius input field
    const input = document.createElement("input");
    input.className = "se-input-form border-radius-input";
    input.type = "text";
    input.style.width = "100%";

    // Retrieve and set last used border radius from local storage
    const savedRadius = localStorage.getItem("lastUsedBorderRadius") || "0px";
    input.value = savedRadius;

    // Create div container for the label and input
    const div = document.createElement("div");
    div.className = "se-dialog-form";
    div.style.marginTop = "10px";
    div.appendChild(label);
    div.appendChild(input);

    imageDialogBody.appendChild(div);

    // Apply border radius to selected image on submit
    const insertButton = dialogBox.querySelector(".se-btn-primary");
    insertButton?.addEventListener("click", () => {
      const borderRadius = input.value;
      localStorage.setItem("lastUsedBorderRadius", borderRadius); // Store in local storage

      // Apply border radius to selected image using the ref
      if (selectedImageRef.current) {
        selectedImageRef.current.style.borderRadius = borderRadius;
        selectedImageRef.current.style.transition = "border-radius 0.3s"; // Apply transition
        editorRef.current?.core.context.element.wysiwyg.dispatchEvent(
          new Event("input") // Trigger input event for editor update
        );
      }
    });
  }

  useEffect(() => {
    if (Editor) {
      const checkDialog = setInterval(() => {
        const imageDialog = document.querySelector(".se-dialog-image");
        if (imageDialog) {
          addBorderRadiusInput();
          clearInterval(checkDialog);
        }
      }, 300);

      return () => clearInterval(checkDialog);
    }
  }, [Editor]);
  //-- border radius

  //-- editor instance
  const getSunEditorInstance = (sunEditor) => {
    editorRef.current = sunEditor;
    setShowPreview(editorRef.current.core)
  }; //---

  //-- fontweight plugin
  const fontWeightPlugin = {
    name: "fontWeight",
    display: "submenu",
    title: "Font Weight",

    innerHTML: '<span style="font-weight:500;font-size:16px"> W </span>',
    add: function (core, targetElement) {
      const listDiv = this.setSubmenu(core);

      core.initMenuTarget(this.name, targetElement, listDiv);
    },
    setSubmenu: function (core) {
      const listDiv = core.util.createElement("div");
      listDiv.className = "se-submenu se-list-layer";

      const weights = ["Default", "100", "300", "400", "500", "700", "900"];
      let list = '<div class="se-list-inner">';
      weights.forEach((weight) => {
        list += `<button type="button" class="se-btn-list" data-value="${weight}" style="font-weight: ${weight};">${weight}</button>`;
      });
      list += "</div>";
      listDiv.innerHTML = list;

      listDiv.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", () => {
          if (button.innerHTML === "Default") {
            core.nodeChange(null, ["font-weight"], ["span"], true);
          } else {
            const newNode = core.util.createElement("span");
            newNode.style.fontWeight = button.getAttribute("data-value");
            core.nodeChange(newNode, ["font-weight"], null, null);
          }
          core.submenuOff();
        });
      });

      return listDiv;
    },
  }; //-- fontweight plugin

  const allPlugins = [
    ...Object.values(plugins),
    fontWeightPlugin,
    fontColorPlugin,
    backgroundColorPlugin,
  ];

  return (
    <>
      {Editor && (
        <div
          style={{
            height: "100%",
            borderBottom: "none",
            transform: "translateX(0)",
          }}
        >
          <div style={{ height: "100%" }}>
            <SunEditor
              getSunEditorInstance={getSunEditorInstance}
              defaultValue={Content}
              height="100%"
              setOptions={{
                plugins: allPlugins,
                buttonList: [
                  ["undo", "redo", "italic", "underline", "strike"],
                  [
                    "fontSize",
                    "font",
                    "formatBlock",
                    "fontWeight",
                    "Color",
                    "backgroundColor",
                    "lineHeight",
                    "link",
                    "image",
                    "video",
                    
                  ],
                  ["removeFormat", "horizontalRule", "align", "list"],
                  ["subscript", "superscript", "blockquote"],
                ],
                fontSize: [
                  8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 24, 26, 28,
                  36, 48, 72,
                ],
                font: [
                  "Roboto",
                  "Open Sans",
                  "Lato",
                  "Montserrat",
                  "Oswald",
                  "Poppins",
                  "Raleway",
                  "Noto Sans",
                  "Roboto Condensed",
                  "PT Sans",
                  "Source Sans Pro",
                  "Nunito",
                  "Work Sans",
                  "Ubuntu",
                  "Fira Sans",
                  "Inter",
                  "Mukta",
                  "Titillium Web",
                  "Quicksand",
                  "Karla",
                ],

                resizeEnable: true,

                attributesWhitelist: {
                  span: "style",

                  //if we want to add styles to an element we can write it using span tag
                },
                TagsWhitelist: "span",

                //used for controlling which tags should be seen HTML PAGE while pasting the content in the editor
                pasteTagsWhitelist:
                  "p|div|b|strong|i|u|em|u|s|strike|del|sub|sup|img|a|h1|h2|h3|h4|ul|ol|li|table|tr|td|th|thead|tbody|figcaption|figure|iframe|video",
              }}
              onChange={onEditorChange}
            />
          </div>
        </div>
      )}
    </>
  );
};
