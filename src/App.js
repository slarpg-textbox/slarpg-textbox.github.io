import React, { useState, useEffect } from "react";
import "./App.css";
import * as icons from "./assets/faces";
import downloadjs from "downloadjs";
import html2canvas from "html2canvas";

const handleCaptureClick = async () => {
  // canvas should html2canvas of the container div
  // Limitation: it can't capture border-image: https://github.com/niklasvh/html2canvas/issues/1287
  // To overcome this, I'll just combine the textbox and border into one image
  const canvas = await html2canvas(document.querySelector(".output"), {
    backgroundColor: null,
    scale: 2,
    allowTaint: true,
    useCORS: true,
    // download as 320x60 x2 due to scale
    // width: 640,
    // height: 120,
  }).then((canvas) => {
    return canvas;
  });

  // downloadjs should download the canvas as a png
  downloadjs(canvas.toDataURL(), "textbox.png", "image/png");
};

const App = () => {
  // face should useState of the melody_icon image that is imported
  const [character, setCharacter] = useState("melody");
  // use melody's expressions as the default to load the expressions
  const [expressions, setExpressions] = useState(
    Object.entries(require(`./assets/faces/melody/index.js`))
  );
  // const [selectedExpression, setSelectedExpression] = useState();
  const [face, setFace] = useState(icons.melody._default);

  const [characterName, setTextCharacter] = useState("Melody");
  const [characterColor, setCharacterColor] = useState("#fef08a");
  const [transparency, setTransparency] = useState("transparent");
  const [dialogue, setTextDialogue] = useState("Hello slarpgers!");
  const [dialogueColor, setDialogueColor] = useState("#ffffff");
  const [dialogueSize, setDialogueSize] = useState("16");
  const [heart, setHeart] = useState("heart");

  const handleTextCharacter = (event) => setTextCharacter(event.target.value);
  const handleCharacterColor = (event) => setCharacterColor(event.target.value);
  const handleTransparency = (event) => setTransparency(event.target.value);
  const handleTextDialogue = (event) => setTextDialogue(event.target.value);
  const handleDialogueColor = (event) => setDialogueColor(event.target.value);
  const handleDialogueSize = (event) => setDialogueSize(event.target.value);
  // Event handler for when a character is selected
  const handleCharacterChange = (event) => {
    const character = event.target.value;
    setCharacter(character);

    // Load all the expressions for the selected character
    const expressions = require(`./assets/faces/${character}/index.js`);
    console.log(expressions);
    setExpressions(Object.entries(expressions));
    handleFace({ target: { value: expressions._default } });
    // setSelectedExpression("");
    // setFace(expressions[Object.entries(expressions)[0][0]]);
  };

  const handleFace = (event) => {
    // const expression = event.target.value;
    // setSelectedExpression(expression);

    if (event.target.name === "upload") {
      const reader = new FileReader();
      reader.onload = function (e) {
        setFace(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      setFace(event.target.value);
    }
  };

  const handleHeart = (event) => {
    setHeart(event.target.value);
  };

  return (
    <div className="outer">
      <div className="header">
        <h1>SLARPG Fake Quotes Generator</h1>
      </div>
      <div className="input">
        <div>
          <b>
            <span>Face:</span>
          </b>
          <br />
          {/* <select value={face} onChange={handleFace}> */}
          <select value={character} onChange={handleCharacterChange}>
            <optgroup label="Main Characters">
              <option value="melody">Melody</option>
              <option value="allison">Allison</option>
              <option value="claire">Claire</option>
              <option value="jodie">Jodie</option>
            </optgroup>
            <optgroup label="Enemies">
              <option value="javis">Javis</option>
              <option value="sons">Sons</option>
              <option value="verena">Verena</option>
              <option value="paula">Paula</option>
              <option value="harmony">Harmony</option>
            </optgroup>
            <optgroup label="NPCs">
              <option value="amelia">Amelia</option>
              <option value="beverly">Beverly</option>
              <option value="faith">Faith</option>
              <option value="glyph">Glyph</option>
              <option value="ipsy">Ipsy</option>
              <option value="nef">Nef</option>
              <option value="noel">Noel</option>
              <option value="npc_desert">NPCs Desert</option>
              <option value="npc_greenridge">NPCs Greenridge</option>
              <option value="npc_woods">NPCs Woods</option>
              <option value="slhrpg">SLHRPG</option>
              <option value="zinnia">Zinnia</option>
            </optgroup>
          </select>

          <br />
          <b>
            <span>Expression:</span>
          </b>
          <br />
          {/* Load all options into the select based on icons.character.emotion */}
          <select value={face} onChange={handleFace} disabled={!character}>
            {/* <option value="">Select an expression</option> */}
            {expressions.map(([expression, imageUrl]) => (
              <option key={expression} value={imageUrl}>
                {expression}
              </option>
            ))}
          </select>

          <br />
          {/* THe form should read the image and pass it to the handleFace function */}
          <form onChange={handleFace}>
            <span>Custom face:{"  "}</span>
            <input
              type="file"
              name="upload"
              accept=".jpg, .jpeg, .png, .webp, .gif, .svg"
            ></input>{" "}
          </form>
        </div>

        <div>
          <b>
            <span>Character:</span>
          </b>
          <br />
          <input
            type="text"
            value={characterName}
            onChange={handleTextCharacter}
          />
          <br />
          <input
            type="color"
            value={characterColor}
            name="character-color"
            onChange={handleCharacterColor}
          ></input>
        </div>
        <div>
          <b>
            <span>Dialogue:</span>
          </b>
          <br />
          <textarea
            value={dialogue}
            onChange={handleTextDialogue}
            rows="3"
            cols="50"
          ></textarea>
          <br />
          <input
            type="color"
            value={dialogueColor}
            name="dialogue-color"
            onChange={handleDialogueColor}
          ></input>
          <form onChange={handleTransparency}>
            <span>Transparency ⬜️:</span>
            <input
              type="radio"
              value="no-transparent"
              name="transparency-switch"
              checked={transparency === "no-transparent"}
            />
            <label htmlFor="no-heart">No</label>
            <input
              type="radio"
              value="transparent"
              name="transparency-switch"
              checked={transparency === "transparent"}
            />
            <label htmlFor="transparency-switch">Yes</label>
          </form>
          <form onChange={handleDialogueSize}>
            <span>Font size: </span>
            {/* add range input */}
            <input
              type="range"
              min="16"
              max="45"
              value={dialogueSize}
              name="dialogue-size"
              onChange={handleDialogueSize}
            />{" "}
            {dialogueSize}px
          </form>
          <form onChange={handleHeart}>
            <span>Heart ❤️: </span>
            <input
              type="radio"
              value="no-heart"
              name="heart-switch"
              checked={heart === "no-heart"}
            />
            <label htmlFor="no-heart">No</label>
            <input
              type="radio"
              value="heart"
              name="heart-switch"
              checked={heart === "heart"}
            />
            <label htmlFor="heart">Yes</label>
          </form>
        </div>
      </div>

      <div className={`output ${heart} ${transparency}`}>
        <div id="image">
          <img src={face} alt="no image" width="85" height="85" />
        </div>
        <div id="text">
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

      <div className="download">
        <a href="#" onClick={handleCaptureClick}>
          <button>Download</button>
        </a>
      </div>

      <footer>
        <p>
          View the code/contribute here:{" "}
          <a
            href="https://github.com/slarpg-textbox/slarpg-textbox.github.io"
            target="_blank"
          >
            https://github.com/slarpg-textbox/slarpg-textbox.github.io
          </a>
        </p>
        <small>
          Sprites belong to the{" "}
          <a href="https://slarpg.com/" target="_blank">
            Super Lesbian Animal RPG
          </a>{" "}
          game and received permission to use and host from{" "}
          <a href="https://ponett.tumblr.com/" target="_blank">
            ponett
          </a>
        </small>
      </footer>
    </div>
  );
};

export default App;
