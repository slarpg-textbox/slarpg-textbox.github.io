import { useState, useEffect } from "react";
import "./App.css";
import allison_icon from "./assets/faces/allison/tile000.png";
import beverly_icon from "./assets/faces/beverly/tile000.png";
import claire_icon from "./assets/faces/claire/tile000.png";
import faith_icon from "./assets/faces/faith/tile000.png";
import harmony_icon from "./assets/faces/harmony/tile003.png";
import javis_icon from "./assets/faces/javis/tile000.png";
import jodie_icon from "./assets/faces/jodie/tile000.png";
import melody_icon from "./assets/faces/melody/tile000.png";
import paula_icon from "./assets/faces/paula/tile000.png";
import verena_icon from "./assets/faces/verena/tile000.png";
import zinnia_icon from "./assets/faces/zinnia/tile000.png";
import downloadjs from "downloadjs";
import html2canvas from "html2canvas";
import domtoimage from "dom-to-image";

const handleCaptureClick = async () => {
  // canvas should html2canvas of the container div
  // Limitation: it can't capture border-image: https://github.com/niklasvh/html2canvas/issues/1287
  // To overcome this, I'll just combine the textbox and border into one image
  const canvas = await html2canvas(document.querySelector(".output"), {
    allowTaint: true,
    useCORS: true,
  }).then((canvas) => {
    return canvas;
  });
  // downloadjs should download the canvas as a png
  downloadjs(canvas.toDataURL(), "textbox.png", "image/png");
};

const handleDownloadClick = () => {
  // backup in case I decide to use border-image again
  domtoimage
    .toPng(document.querySelector(".output"), {
      // manually increase the bottom size to account for the border-image
    })
    .then(function (dataUrl) {
      downloadjs(dataUrl, "textbox.png", "image/png");
    });
};

const App = () => {
  const [character, setTextCharacter] = useState("Melody");
  const [characterColor, setCharacterColor] = useState("#fef08a");
  const [dialogue, setTextDialogue] = useState("Hello slarpgers!");
  const [dialogueColor, setDialogueColor] = useState("#ffffff");
  const [dialogueSize, setDialogueSize] = useState("16px");
  // face should useState of the melody_icon image that is imported
  const [face, setFace] = useState(melody_icon);

  const handleTextCharacter = (event) => {
    setTextCharacter(event.target.value);
  };
  const handleCharacterColor = (event) => {
    setCharacterColor(event.target.value);
  };
  const handleTextDialogue = (event) => {
    setTextDialogue(event.target.value);
  };
  const handleDialogueColor = (event) => {
    setDialogueColor(event.target.value);
  };
  const handleDialogueSize = (event) => {
    setDialogueSize(event.target.value);
  };
  const handleFace = (event) => {
    setFace(event.target.value);
  };

  return (
    <div>
      <div class="header">
        <h1>SLARPG Textbox Generator</h1>
      </div>
      <div class="input">
        <div>
          <b>
            <span>Face:</span>
          </b>
          <br />
          <select value={face} onChange={handleFace}>
            <optgroup label="Main Characters">
              <option value={melody_icon}>Melody</option>
              <option value={allison_icon}>Allison</option>
              <option value={claire_icon}>Claire</option>
              <option value={jodie_icon}>Jodie</option>
            </optgroup>
            <optgroup label="Enemies">
              <option value={javis_icon}>Javis</option>
              <option value={verena_icon}>Verena</option>
              <option value={paula_icon}>Paula</option>
              <option value={harmony_icon}>Harmony</option>
            </optgroup>
            <optgroup label="NPCs">
              <option value={zinnia_icon}>Zinnia</option>
              <option value={faith_icon}>Faith</option>
              <option value={beverly_icon}>Beverly</option>
              <option value={paula_icon}>Paula</option>
            </optgroup>
          </select>
        </div>

        <div>
          <b>
            <span>Character:</span>
          </b>
          <br />
          <input type="text" value={character} onChange={handleTextCharacter} />
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
          <textarea value={dialogue} onChange={handleTextDialogue}></textarea>
          <br />
          <input
            type="color"
            value={dialogueColor}
            name="dialogue-color"
            onChange={handleDialogueColor}
          ></input>
          <form onChange={handleDialogueSize}>
            <input
              type="radio"
              value="16px"
              name="dialogue-size"
              checked={dialogueSize === "16px"}
            />
            <label for="16px">16px</label>
            <input
              type="radio"
              value="22px"
              name="dialogue-size"
              checked={dialogueSize === "22px"}
            />
            <label for="22px">22px</label>
          </form>
        </div>
      </div>
      <div class="output">
        <div id="image">
          <img src={face} alt="placeholder" width="85" height="85" />
        </div>
        <div id="text">
          {/* set font color to be characterColor */}
          <p id="subject" style={{ color: characterColor }}>
            {character}
          </p>
          {/* style with font-size dialoguesize */}
          <p
            id="description"
            style={{ color: dialogueColor, fontSize: dialogueSize }}
          >
            {dialogue}
          </p>
        </div>
      </div>

      <div class="download">
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
      </footer>
    </div>
  );
};

export default App;
