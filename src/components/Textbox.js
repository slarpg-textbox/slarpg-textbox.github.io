import React from "react";
import "./Textbox.css";

const Textbox = ({
  heart,
  transparency,
  face,
  faceVisible,
  characterColor,
  characterName,
  dialogueColor,
  dialogueSize,
  dialogue,
}) => {
  return (
    <div className={`output ${heart} ${transparency}`}>
      <div id="image" className={`${faceVisible}`}>
        <img src={face} alt="no image" width="96" height="96" />
      </div>
      <div id="text" className={`${faceVisible}`}>
        {/* set font color to be characterColor */}
        <p id="subject" style={{ color: characterColor }}>
          {characterName}
        </p>
        {/* style with font-size dialoguesize */}
        <p
          id="description"
          style={{ color: dialogueColor, fontSize: dialogueSize + "px" }}
        >
          {dialogue}
        </p>
      </div>
    </div>
  );
};

export default Textbox;
