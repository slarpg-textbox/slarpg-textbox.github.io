import { useState } from "react";
import "./App.css";
import placeholder from "./assets/placeholder.png";

const App = () => {
  const [character, setTextCharacter] = useState("Melody");
  const [dialogue, setTextDialogue] = useState("Hello World!");
  const [dialogueSize, setDialogueSize] = useState("12px");
  const [dialogueColor, setDialogueColor] = useState("white");
  const [face, setFace] = useState("melody");

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
          <textarea
            value={dialogue}
            maxLength="120"
            onChange={handleTextDialogue}
          ></textarea>
        </div>
        <div class="dialogue-style">
          <span>Dialogue size:</span>
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
          <span>Dialogue color:</span>
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
        <div>
          <span>Face:</span>
          <br />
          <select value={face} onChange={handleFace}>
            <option value="melody">Melody</option>
            <option value="allison">Allison</option>
            <option value="claire">Claire</option>
            <option value="jodie">Jodie</option>
          </select>
        </div>
      </div>

      <div class="container">
        <div id="image">
          <img src={placeholder} alt="placeholder" width="100" height="100" />
        </div>
        <div id="text">
          <p id="subject">{character}</p>
          <p id="description">{dialogue}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const Footer = () => {
  return (
    <div class="footer">
      <p>
        View the code/contribute here{" "}
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

export default App;
