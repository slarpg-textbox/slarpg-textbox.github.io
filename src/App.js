import React, { useState, useEffect } from "react";
import "./App.css";
import * as icons from "./assets/faces";
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
  const [face, setFace] = useState(icons.melody);

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
    // add option to see if the input with the name="upload" has a value
    // if it does, then setFace to the value of the input using filereader
    // else, setFace to the value of the select
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
              <option value={icons.melody}>Melody</option>
              <option value={icons.allison}>Allison</option>
              <option value={icons.claire}>Claire</option>
              <option value={icons.jodie}>Jodie</option>
            </optgroup>
            <optgroup label="Enemies">
              <option value={icons.javis}>Javis</option>
              <option value={icons.clintson}>Clintson</option>
              <option value={icons.bigby}>Bigby</option>
              <option value={icons.killer_ray}>Killer Ray</option>
              <option value={icons.roy}>Roy</option>
              <option value={icons.verena}>Verena</option>
              <option value={icons.paula}>Paula</option>
              <option value={icons.harmony}>Harmony</option>
            </optgroup>
            <optgroup label="NPCs">
              <option value={icons.amelia}>Amelia</option>
              <option value={icons.bartholomew}>Bartholomew</option>
              <option value={icons.bill}>Bill</option>
              <option value={icons.catherine}>Catherine</option>
              <option value={icons.faith}>Faith</option>
              <option value={icons.fortune_teller}>Fortune Teller</option>
              <option value={icons.glyph}>Glyph</option>
              <option value={icons.holly}>Holly</option>
              <option value={icons.ipsy}>Ipsy</option>
              <option value={icons.mona}>Mona</option>
              <option value={icons.nef}>Nef</option>
              <option value={icons.pepper}>Pepper</option>
              <option value={icons.shadow}>Shadow</option>
              <option value={icons.zinnia}>Zinnia</option>
            </optgroup>
          </select>
          <br />
          {/* THe form should read the image and pass it to the handleFace function */}
          <form onChange={handleFace}>
            <span>Or choose your own:{"  "}</span>
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
        <small>
          Sprites belong to the{" "}
          <a href="https://slarpg.com/" target="_blank">
            Super Lesbian Animal RPG
          </a>{" "}
          game and received permission to use from{" "}
          <a href="https://ponett.tumblr.com/" target="_blank">
            ponett
          </a>
        </small>
      </footer>
    </div>
  );
};

export default App;
