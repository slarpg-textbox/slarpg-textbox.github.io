import React, { useState } from "react";
import downloadjs from "downloadjs";
import html2canvas from "html2canvas";

function CaptureButton({ scaleSize, selector }) {
  const [divSelector, setDivSelector] = useState(".output");

  const handleCaptureClick = async () => {
    const canvas = await html2canvas(document.querySelector(selector), {
      backgroundColor: null,
      scale: scaleSize,
      allowTaint: true,
      useCORS: true,
    });

    downloadjs(canvas.toDataURL(), "textbox.png", "image/png");
  };

  return (
    <>
      <input
        type="text"
        value={selector}
        onChange={(e) => setDivSelector(e.target.value)}
      />
      <button onClick={handleCaptureClick}>Capture Div</button>
    </>
  );
}

export default CaptureButton;
