import React from "react";
import "./Textbox.css";

const Textbox = ({
  heart,
  transparency,
  face,
  characterColor,
  characterName,
  dialogueColor,
  dialogueSize,
  dialogue,
}) => {
  return (
    <div className={`output ${heart} ${transparency}`}>
      <div id="image" className="face">
        <img src={face} alt="no image" width="96" height="96" />
      </div>
      <div id="text" className="text-face">
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
