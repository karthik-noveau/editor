import React, { useContext, useRef, useEffect } from "react";
import { htmlCode } from "..";
import styles from "./preview.module.css";
import { IoInformationCircleOutline } from "react-icons/io5";
import "suneditor/dist/css/suneditor.min.css";
import { useState } from "react";
// import { MoonFilled } from "@ant-design/icons";

export const UIPreview = () => {
  const { Preview, Content } = useContext(htmlCode);
  const iframeRef = useRef(null);
  const [fill, setFill] = useState(() => {
    const savedFill = localStorage.getItem("fill");
    return savedFill ? JSON.parse(savedFill) : false;
  });
  console.log(fill);
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem("mode");
    return savedMode ? savedMode : "light";
  });

  function toggleMode() {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    setFill(!fill);
  }
  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem("fill", JSON.stringify(fill));
  }, [fill]);

  function generateContent() {
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Preview</title>
          <!-- Include necessary stylesheets -->
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/suneditor/dist/css/suneditor.min.css" />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/suneditor/dist/css/suneditor-contents.min.css" />
          <!-- Optional: Include Google Fonts -->
          <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&display=swap" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&display=swap" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&display=swap" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@100;300;400;500;700;900&display=swap" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&display=swap" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200;300;400;600;700;900&display=swap" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;600;700;800;900&display=swap" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@100;300;400;500;700;900&display=swap" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Mukta:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@200;300;400;600;700;900&display=swap" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Karla:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet">
          <style>
            body {
              margin: 0;
             padding:0;
              
            }
              .sun-editor-editable {
         font-family: 'Poppins', sans-serif;
         
         font-size: 13px;
          background-color: ${mode === "dark" ? "#242124" : "#ffffff"};
                color: ${mode === "dark" ? "#ffffff" : "#000000"};
                height:100vh;
         line-height: 1.5;
         box-sizing: border-box;
         padding: 14px;
         overflow-x: hidden;
         overflow: auto; 
          }
            .sun-editor-editable p {
              margin: 0;
            }
            .sun-editor-editable img {
              max-width: 100%;
              height: auto;
            }
          </style>
        </head>
        <body>
          <div class="sun-editor-editable">
            ${Content}
          </div>
          <script>
            document.querySelectorAll("a").forEach(a => a.setAttribute('target','_blank'));
           
          </script>
        </body>
      </html>
    `;
  }
  useEffect(() => {
    if (Preview && iframeRef) {
      const doc =
        iframeRef.current.contentDocument ||
        iframeRef.current.contentWindow.document;

      doc.open();
      doc.write(generateContent());
      doc.close();
    }
  }, [Preview, Content, mode]);

  const handlePreviewClick = () => {
    const newWindow = window.open("about:blank", "_blank");

    const doc = newWindow.document;
    doc.open();
    doc.write(generateContent());

    doc.close();
  };

  return (
    <>
      {Preview && (
        <div className={styles.previewContainer}>
          <div className={styles.Preview_header}>
            <div className={styles.preview_button_container}>
              <div
                className="sun-editor"
                style={{
                  border: "1px solid #dadada",
                  width: " 100%",
                  height: "90%",
                  borderRadius: "4px",
                }}
              >
                {/* <button type="button" class="se-btn se-tooltip" data-command="lineHeight" data-display="submenu" aria-label="Line height" tabindex="-1"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.76 13.56"><g><path d="M4.4,4.88V8.26a2,2,0,0,0,.5.39s.1,0,.18-.12a.62.62,0,0,0,.17-.28c.06-.19.13-.44.21-.74s.14-.52.19-.66a.58.58,0,0,1,.21-.3,2.41,2.41,0,0,1,.63-.21,3.83,3.83,0,0,1,.88-.12,9.15,9.15,0,0,1,1.31.06.16.16,0,0,1,.11,0,.26.26,0,0,1,.06.14,4,4,0,0,1,0,.49v2l.05,3.77c0,1.41,0,2.68-.05,3.81a1.79,1.79,0,0,1-.11.49,10.68,10.68,0,0,1-1.4.45,1.12,1.12,0,0,0-.69.43v.31l0,.22.61,0c.85-.08,1.54-.12,2.06-.12a19.76,19.76,0,0,1,2.09.08,15.08,15.08,0,0,0,1.64.08,1.4,1.4,0,0,0,.29,0,1.58,1.58,0,0,0,0-.26l-.05-.43a2.26,2.26,0,0,0-.43-.17l-.77-.22-.15,0a2.55,2.55,0,0,1-.78-.28,2.56,2.56,0,0,1-.11-.75l0-1.29,0-3.15V7.53a10.51,10.51,0,0,1,.06-1.2,3.83,3.83,0,0,1,.6,0l1.88,0a2.18,2.18,0,0,1,.38,0,.45.45,0,0,1,.23.17.9.9,0,0,1,.05.25c0,.16.06.35.1.58a3.33,3.33,0,0,0,.14.55A6.39,6.39,0,0,0,15,9a2.91,2.91,0,0,0,.6-.15,2.77,2.77,0,0,0,0-.46l0-.51,0-2.95-.25,0-.38,0L15,4.94a.71.71,0,0,1-.18.15.45.45,0,0,1-.25.07l-.29,0H8.75l-.15,0H7.45a17,17,0,0,1-1.86,0L5.36,5l-.25-.13ZM19.75,16.14h-.69v-9h.69A.4.4,0,0,0,20.13,7c.06-.11,0-.24-.1-.39L18.92,5.15a.52.52,0,0,0-.86,0L17,6.58c-.12.15-.16.28-.1.39s.18.16.38.16h.69v9h-.69a.4.4,0,0,0-.38.16c-.06.11,0,.24.1.39l1.11,1.43a.52.52,0,0,0,.86,0L20,16.69c.12-.15.16-.28.1-.39a.4.4,0,0,0-.38-.16Z" transform="translate(-4.4 -4.86)"></path></g></svg><span class="se-tooltip-inner"><span class="se-tooltip-text">Line height</span></span></button> */}
                <button
                  onClick={handlePreviewClick}
                  type="button"
                  class="se-btn se-tooltip"
                  data-command="Preview"
                  data-display="submenu"
                  aria-label="Preview"
                  tabindex="-1"
                >
                  <svg
                    fill="#000000"
                    fillRule="black"
                    width="16px"
                    height="16px"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 15.65 15.66"
                  >
                    <g>
                      <path
                        d="M16.19,14.43l2.49,2.49a.73.73,0,0,1,.21.52.67.67,0,0,1-.22.51.7.7,0,0,1-.52.22.69.69,0,0,1-.51-.21l-2.49-2.48a5.17,5.17,0,0,1-1.34.69,4.64,4.64,0,0,1-1.48.24,4.78,4.78,0,1,1,0-9.56,4.79,4.79,0,0,1,1.84.36,4.9,4.9,0,0,1,1.56,1,4.77,4.77,0,0,1,.46,6.18ZM10,14a3.3,3.3,0,0,0,2.34.93A3.37,3.37,0,0,0,14.7,14a3.3,3.3,0,0,0-1.08-5.41,3.47,3.47,0,0,0-2.56,0A3,3,0,0,0,10,9.28,3.31,3.31,0,0,0,10,14ZM16,4a3.86,3.86,0,0,1,2.77,1.14A3.9,3.9,0,0,1,20,7.85v4a.77.77,0,0,1-.22.53.7.7,0,0,1-.52.21.72.72,0,0,1-.74-.74v-4a2.46,2.46,0,0,0-.72-1.73A2.37,2.37,0,0,0,16,5.45H8.53A2.42,2.42,0,0,0,6.08,7.89v7.52a2.41,2.41,0,0,0,.71,1.73,2.46,2.46,0,0,0,1.74.72h4.08a.73.73,0,0,1,0,1.46H8.53a3.85,3.85,0,0,1-2.78-1.14A3.93,3.93,0,0,1,4.6,15.4V7.87A3.94,3.94,0,0,1,5.76,5.09,3.88,3.88,0,0,1,8.54,4H16Z"
                        transform="translate(-4.45 -3.8)"
                      ></path>
                    </g>
                  </svg>
                  <span class="se-tooltip-inner">
                    <span class="se-tooltip-text">open in new tab</span>
                  </span>
                </button>

                {fill ? (
                  <button
                    onClick={toggleMode}
                    type="button"
                    class="se-btn se-tooltip"
                    data-command="mode"
                    data-display="submenu"
                    aria-label="mode"
                    tabindex="-1"
                  >
                    <svg
                      viewBox="64 64 896 896"
                      focusable="false"
                      data-icon="moon"
                      width="16px"
                      height="16px"
                      fill="#000000"
                      aria-hidden="true"
                    >
                      <path d="M489.5 111.66c30.65-1.8 45.98 36.44 22.58 56.33A243.35 243.35 0 00426 354c0 134.76 109.24 244 244 244 72.58 0 139.9-31.83 186.01-86.08 19.87-23.38 58.07-8.1 56.34 22.53C900.4 745.82 725.15 912 512.5 912 291.31 912 112 732.69 112 511.5c0-211.39 164.29-386.02 374.2-399.65l.2-.01zm-81.15 79.75l-4.11 1.36C271.1 237.94 176 364.09 176 511.5 176 697.34 326.66 848 512.5 848c148.28 0 274.94-96.2 319.45-230.41l.63-1.93-.11.07a307.06 307.06 0 01-159.73 46.26L670 662c-170.1 0-308-137.9-308-308 0-58.6 16.48-114.54 46.27-162.47z"></path>
                    </svg>
                    <span class="se-tooltip-inner">
                      <span class="se-tooltip-text">Mode</span>
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={toggleMode}
                    type="button"
                    class="se-btn se-tooltip"
                    data-command="mode"
                    data-display="submenu"
                    aria-label="mode"
                    tabindex="-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16px"
                      height="16px"
                      viewBox="0 0 1024 1024"
                      fill="#0056b3"
                    >
                      <path d="M489.493 111.658c30.658-1.792 45.991 36.44 22.59 56.329C457.831 214.095 426 281.423 426 354c0 134.757 109.243 244 244 244c72.577 0 139.905-31.832 186.014-86.084c19.868-23.377 58.064-8.102 56.332 22.53C900.4 745.823 725.141 912 512.5 912C291.31 912 112 732.69 112 511.5c0-211.39 164.287-386.024 374.198-399.649l.206-.013z"></path>
                    </svg>
                    <span class="se-tooltip-inner">
                      <span class="se-tooltip-text">Mode</span>
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>
          <iframe
            ref={iframeRef}
            title="SunEditor Preview"
            style={{
              width: "100%",
              border: "1px solid #dadada",
              borderRadius: "0px 0px 4px 4px",
            }}
            className={styles.Preview_iframe}
          />
        </div>
      )}
    </>
  );
};
