import React, { useContext, useEffect, useRef, useState } from "react";
import SunEditor from "suneditor-react";
import plugins from "suneditor/src/plugins";
import "suneditor/dist/css/suneditor.min.css";
import { htmlCode } from "..";
import { ColorPicker, Button } from "antd";

// import 'antd/dist/antd.css';

export const WordEditor = () => {
  const { Editor, onEditorChange, Content } = useContext(htmlCode);
  const editorRef = useRef(null);
  const selectedImageRef = useRef(null);
  // Ref to store selected image

  // //--- color plugins
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState("color");

  const [savedRange, setSavedRange] = useState(null);
  // console.log(savedRange)
  const [fontPickedColor, setFontPickedColor] = useState("#000000");

  const [backgroundPickedColor, setBackgroundPickedColor] = useState("#ffffff");

  window.addEventListener("click", () => {
    setShowPicker(false);
  });
  const openColorPicker = (mode) => {
    const selection = window.getSelection();

    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      setSavedRange(range.cloneRange());
    } else {
      setSavedRange(null);
    }

    if (showPicker) {
      if (pickerMode === mode) {
        setShowPicker(false);
      } else {
        setPickerMode(mode);
      }
    } else {
      setPickerMode(mode);
      setShowPicker(true);
    }
  };

  const handleApplyColor = (colorCode) => {
    const selection = window.getSelection();

    if (savedRange) {
      selection.removeAllRanges();
      selection.addRange(savedRange);
    }

    if (!selection || selection.rangeCount === 0) return;

    document.execCommand("styleWithCSS", false, true);

    if (!selection.isCollapsed) {
      document.execCommand(
        pickerMode === "color" ? "foreColor" : "hiliteColor",
        false,
        colorCode
      );
    } else {
      const span = document.createElement("span");
      span.style[pickerMode === "color" ? "color" : "backgroundColor"] =
        colorCode;
      span.appendChild(document.createTextNode("\u200B")); // invisible space
      const range = window.getSelection().getRangeAt(0);
      range.insertNode(span);
      range.setStart(span.firstChild, 1);
      range.setEnd(span.firstChild, 1);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    if (pickerMode === "color") {
      setFontPickedColor(colorCode);
      localStorage.setItem("lastFontPickedColor", colorCode);
    } else if (pickerMode === "background") {
      setBackgroundPickedColor(colorCode);
      localStorage.setItem("lastBackgroundPickedColor", colorCode);
    }
  };

  const fontColorPlugin = {
    name: "fontColor",
    display: "command",
    title: "Font-color",
    innerHTML: '<button style="position:relative">A</button>',
    add: function (core, targetElement) {
      targetElement.addEventListener("click", (e) => {
        e.stopPropagation(); //  Important to prevent SunEditor popup closing
        e.preventDefault();
        openColorPicker("color");
      });
    },
    action: function () {
      // You can open your picker here too if you want
      openColorPicker("color");
    },
  };
  const backgroundColorPlugin = {
    name: "backgroundColor",
    display: "command",
    title: "background color",
    innerHTML:
      '<button style="background-color:black;color:white;padding:0px 5px;position:relative">A</button>',
    add: function (core, targetElement) {
      targetElement.addEventListener("click", (e) => {
        e.stopPropagation(); //  Important to prevent SunEditor popup closing
        e.preventDefault();
        openColorPicker("backgroundColor");
      });
    },
    action: function () {
      // You can open your picker here too if you want
      openColorPicker("backgroundColor");
    },
  };

  //---- color plugins

  //--border radius
  useEffect(() => {
    const editorContent = editorRef.current?.core?.context?.element?.wysiwyg;
    if (!editorContent) return;

    const handleClick = (event) => {
      const figure = event.target;

      if (figure.tagName === "FIGURE") {
        const img = figure.querySelector("img");
        if (img) {
          selectedImageRef.current = img;
          // const range = document.createRange();
          // const selection = window.getSelection();
          // range.selectNode(img); // Select the image
          // selection.removeAllRanges(); // Clear any previous selections
          // selection.addRange(range);
        }
      }
    };

    editorContent.addEventListener("click", handleClick);

    return () => {
      editorContent.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    const addBorderRadiusInput = () => {
      const dialogBox = editorRef.current?.core?.context?.image?.modal;
      if (!dialogBox) return;

      const imageDialogBody = dialogBox.querySelector(".se-dialog-body");

      if (imageDialogBody.querySelector(".border-radius-input")) return;

      // Create and add label for border radius input
      const label = document.createElement("label");
      label.innerText = "Border Radius";
      label.style.marginRight = "8px";

      // Create  border radius input field
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
    };

    // Wait for image dialog to render
    const checkDialog = setInterval(() => {
      const imageDialog = document.querySelector(".se-dialog-image");
      if (imageDialog) {
        addBorderRadiusInput();
        clearInterval(checkDialog);
      }
    }, 300);

    return () => clearInterval(checkDialog);
  }, []);
  //-- border radius

  //-- editor instance
  const getSunEditorInstance = (sunEditor) => {
    editorRef.current = sunEditor;
  }; //---

  //-- fontweight plugin
  const fontWeightPlugin = {
    name: "fontWeight",
    display: "submenu",
    title: "Font Weight",

    innerHTML: '<span style="font-weight:bold;font-size:18px"> W </span>',
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
            // overflowX:"-moz-hidden-unscrollable"
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
                    "fontColor",
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

                attributesBlacklist: {
                  //used to prevent unwanted style addition in the html code which is rendered by the content pasted in the editor
                  strong: "style",

                  h1: "style",
                  h2: "style",
                  h3: "style",
                  h4: "style",
                  h5: "style",
                  h6: "style",

                  ul: "style",
                  ol: "style",
                  li: "style",
                },

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
      {showPicker && (
        <div
          className="color_picker"
          onClick={(e) => e.stopPropagation()} // Prevent SunEditor from closing on click inside
        >
          <ColorPicker
            value={
              pickerMode === "color" ? fontPickedColor : backgroundPickedColor
            }
            panelRender={(panel) => (
              <div>
                {panel}
                <div style={{ textAlign: "right" }}>
                  <Button
                    size="medium"
                    onClick={() => {
                      const colorToApply =
                        pickerMode === "color"
                          ? fontPickedColor
                          : backgroundPickedColor;
                      handleApplyColor(colorToApply);

                      setShowPicker(false);
                    }}
                  >
                    Apply
                  </Button>
                </div>
              </div>
            )}
            presets={[]}
            open={true}
            // Keep the picker open
            showText={false} // Hide the text
            onChange={(color) => {
              if (pickerMode === "color") {
                setFontPickedColor(color.toHexString());
              } else {
                setBackgroundPickedColor(color.toHexString());
              }
            }}
            onChangeComplete={(color) => {
              if (pickerMode === "color") {
                setFontPickedColor(color.toHexString()); // Update color
              } else {
                setBackgroundPickedColor(color.toHexString());
              }
            }}
          />
        </div>
      )}
    </>
  );
};
