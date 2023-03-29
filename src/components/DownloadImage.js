import React, { useState } from "react";
import html2canvas from "html2canvas";
import downloadjs from "downloadjs";

const DownloadImage = ({ scaleSize, selector }) => {
  const handleCaptureClick = async (selector) => {
    const canvas = await html2canvas(document.querySelector(selector), {
      backgroundColor: null,
      scale: scaleSize,
      allowTaint: true,
      useCORS: true,
    }).then((canvas) => {
      return canvas;
    });

    downloadjs(canvas.toDataURL(), "textbox.png", "image/png");
  };

  return (
    <div className="download-image">
      <button onClick={() => handleCaptureClick(selector)}>
        Download Image
      </button>
    </div>
  );
};

export default DownloadImage;
