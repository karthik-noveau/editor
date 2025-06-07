import React, { useState } from "react";
import { Button, ColorPicker } from "antd";
// import { createRoot } from 'react-dom/client';

const FontColorButton = ({ core }) => {
  const [color, setColor] = useState("#000000");

  const [savedRange, setSavedRange] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const openColorPicker = () => {
    const selection = window.getSelection();

    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      setSavedRange(range.cloneRange());
    } else {
      setSavedRange(null);
    }
    setShowPicker(!showPicker);
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
      document.execCommand("foreColor", false, colorCode);
    } else {
      const span = document.createElement("span");
      span.style["color"] = colorCode;
      span.appendChild(document.createTextNode("\u200B")); // invisible space
      const range = window.getSelection().getRangeAt(0);
      range.insertNode(span);
      range.setStart(span.firstChild, 1);
      range.setEnd(span.firstChild, 1);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    setColor(colorCode);
  };

  return (
    <ColorPicker
      panelRender={(panel) => (
        <div>
          {panel}
          <div style={{ textAlign: "right", marginTop: "10px" }}>
            <Button
              size="medium"
              onClick={(e) => {
                handleApplyColor(color);
                setShowPicker(false);
              }}
            >
              Apply
            </Button>
          </div>
        </div>
      )}
      open={showPicker}
      onOpenChange={(open) => {
        setShowPicker(open);
      }}
      value={color}
      onChange={(color) => {
        setColor(color.toHexString());
      }}
      style={{ marginTop: "50px" }}
      trigger="click"
    >
      <Button
        onClick={openColorPicker}
        style={{
          backgroundColor: "transparent",
          boxShadow: "none",
          color: "black",
          width: "25px",
          height: "25px",
        }}
      >
        <svg
          class="w-8 h-8"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1024 1024"
          fill="currentColor"
        >
          <path d="M904 816H120c-4.4 0-8 3.6-8 8v80c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-80c0-4.4-3.6-8-8-8zm-650.3-80h85c4.2 0 8-2.7 9.3-6.8l53.7-166h219.2l53.2 166c1.3 4 5 6.8 9.3 6.8h89.1c1.1 0 2.2-.2 3.2-.5a9.7 9.7 0 0 0 6-12.4L573.6 118.6a9.9 9.9 0 0 0-9.2-6.6H462.1c-4.2 0-7.9 2.6-9.2 6.6L244.5 723.1c-.4 1-.5 2.1-.5 3.2-.1 5.3 4.3 9.7 9.7 9.7zm255.9-516.1h4.1l83.8 263.8H424.9l84.7-263.8z"></path>
        </svg>
      </Button>
    </ColorPicker>
  );
};

export default FontColorButton;
