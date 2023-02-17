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

const handleCaptureClick = async () => {
  // canvas should html2canvas of the container div
  const canvas = await html2canvas(document.querySelector(".container"));
  const dataURL = canvas.toDataURL("image/png");
  downloadjs(dataURL, "download.png", "image/png");
};

const App = () => {
  useEffect(() => {
    document.title = "SLARPG Textbox Generator";
  }, []);

  const [character, setTextCharacter] = useState("Melody");
  const [dialogue, setTextDialogue] = useState("Hello slarpgers!");
  const [dialogueSize, setDialogueSize] = useState("12px");
  const [dialogueColor, setDialogueColor] = useState("white");
  // face should useState of the melody_icon image that is imported
  const [face, setFace] = useState(melody_icon);

  const handleTextCharacter = (event) => {
    setTextCharacter(event.target.value);
  };
  const handleTextDialogue = (event) => {
    setTextDialogue(event.target.value);
  };
  const handleDialogueSize = (event) => {
    setDialogueSize(event.target.value);
  };
  const handleDialogueColor = (event) => {
    setDialogueColor(event.target.value);
  };
  const handleFace = (event) => {
    console.log(event.target.value);
    setFace(event.target.value);
    // set the text character to the name of the face that's stored between the <option></option> tags
    // setTextCharacter(event.target.value);
  };

  return (
    <div>
      <div class="header">
        <h1>SLARPG Textbox Generator</h1>
      </div>
      <div class="input">
        <div>
          <span>Face:</span>
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
          <span>Character:</span>
          <br />
          <input type="text" value={character} onChange={handleTextCharacter} />
        </div>
        <div>
          <span>Dialogue:</span>
          <br />
          <textarea value={dialogue} onChange={handleTextDialogue}></textarea>
        </div>
        <div class="dialogue-style">
          <span>Dialogue size: (🚧)</span>
          <br />
          <form onChange={handleDialogueSize}>
            <input
              type="radio"
              value="12px"
              name="dialogue-size"
              checked={dialogueSize === "12px"}
            />
            <label for="12px">12px</label>
            <input
              type="radio"
              value="22px"
              name="dialogue-size"
              checked={dialogueSize === "22px"}
            />
            <label for="22px">22px</label>
          </form>
        </div>
        <div class="dialogue-style">
          <span>Dialogue color: (🚧)</span>
          <form onChange={handleDialogueColor}>
            <input
              type="radio"
              value="white"
              name="dialogue-color"
              checked={dialogueColor === "white"}
            />
            <label for="white">White</label>
            <input
              type="radio"
              value="rainbow"
              name="dialogue-color"
              checked={dialogueColor === "rainbow"}
            />
            <label for="rainbow">Rainbow</label>
          </form>
        </div>
      </div>

      <div class="container">
        <div id="image">
          <img src={face} alt="placeholder" width="85" height="85" />
        </div>
        <div id="text">
          <p id="subject">{character}</p>
          <p id="description">{dialogue}</p>
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
