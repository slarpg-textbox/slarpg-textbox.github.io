import { useState, useEffect } from "react";
import "./App.css";
import allison_icon from "./assets/faces/allison/tile001.png";
import claire_icon from "./assets/faces/claire/tile001.png";
import jodie_icon from "./assets/faces/jodie/tile001.png";
import melody_icon from "./assets/faces/melody/tile001.png";
import javis_icon from "./assets/faces/javis/tile001.png";
import downloadjs from "downloadjs";
import html2canvas from "html2canvas";

const handleCaptureClick = async () => {
  // canvas should html2canvas of the container div
  const canvas = await html2canvas(document.querySelector(".container"));
  const dataURL = canvas.toDataURL("image/png");
  downloadjs(dataURL, "download.png", "image/png");
};

const Footer = () => {
  return (
    <div class="footer">
      <p>
        View the code/contribute here:{" "}
        <a
          href="https://github.com/slarpg-textbox/slarpg-textbox.github.io"
          target="_blank"
        >
          https://github.com/slarpg-textbox/slarpg-textbox.github.io
        </a>
      </p>
    </div>
  );
};

const App = () => {
  useEffect(() => {
    document.title = "SLARPG Textbox Generator";
  }, []);

  const [character, setTextCharacter] = useState("Melody");
  const [dialogue, setTextDialogue] = useState("Hello World!");
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
  };

  return (
    <div>
      <div class="header">
        <h1>SLARPG Textbox Generator</h1>
      </div>
      <div class="input">
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
        <div>
          <span>Face:</span>
          <br />
          <select value={face} onChange={handleFace}>
            <option value={melody_icon}>Melody</option>
            <option value={allison_icon}>Allison</option>
            <option value={claire_icon}>Claire</option>
            <option value={jodie_icon}>Jodie</option>
            <option value={javis_icon}>Javis</option>
          </select>
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
          <img src={face} alt="placeholder" width="95" height="95" />
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

      <Footer />
    </div>
  );
};

export default App;
