import React, { useState, useEffect } from "react";
import "./App.css";
import * as icons from "./assets/faces";
import html2canvas from "html2canvas";
import downloadjs from "downloadjs";
import Collection from "./components/Collection";
import Textbox from "./components/Textbox";

const App = () => {
  // face should useState of the melody_icon image that is imported
  const [character, setCharacter] = useState("melody");
  // use melody's expressions as the default to load the expressions
  const [expressions, setExpressions] = useState(
    Object.entries(require(`./assets/faces/melody/index.js`))
  );
  const [faceVisible, setFaceVisibile] = useState("face-visible");
  const [face, setFace] = useState(icons.melody.AA_default);
  const [characterName, setTextCharacter] = useState("Melody");
  const [characterColor, setCharacterColor] = useState("#fff178");
  const [dialogue, setTextDialogue] = useState("Hello slarpgers!");
  const [dialogueColor, setDialogueColor] = useState("#ffffff");
  const [dialogueSize, setDialogueSize] = useState("18");
  const [heart, setHeart] = useState("heart");
  const [transparency, setTransparency] = useState("no-transparent");
  const [scaleSize, setScale] = useState("2");

  const handleTextCharacter = (event) => setTextCharacter(event.target.value);
  const handleCharacterColor = (event) => setCharacterColor(event.target.value);
  const handleTransparency = (event) => setTransparency(event.target.value);
  const handleTextDialogue = (event) => setTextDialogue(event.target.value);
  const handleDialogueColor = (event) => setDialogueColor(event.target.value);
  const handleDialogueSize = (event) => setDialogueSize(event.target.value);
  const handleScale = (event) => setScale(event.target.value);
  const handleHeart = (event) => setHeart(event.target.value);
  const handleFaceVisibility = (event) => setFaceVisibile(event.target.value);
  // Loads all expressions for selected character
  const handleCharacterChange = (event) => {
    const character = event.target.value;
    setCharacter(character);
    // Load all the expressions for the selected character
    const expressions = require(`./assets/faces/${character}/index.js`);
    setTextCharacter(character.charAt(0).toUpperCase() + character.slice(1));
    setExpressions(Object.entries(expressions));
    handleFace({ target: { value: expressions.AA_default } });
  };

  const handleFace = (event) => {
    // const expression = event.target.value;
    // setSelectedExpression(expression);
    if (event.target.name === "upload-face") {
      const reader = new FileReader();
      reader.onload = function (e) {
        setFace(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      setFace(event.target.value);
    }
  };

  // collection
  const [outputs, setOutputs] = useState(
    JSON.parse(localStorage.getItem("outputs")) || []
  );
  useEffect(() => {
    localStorage.setItem("outputs", JSON.stringify(outputs));
  }, [outputs]);
  const [insertCollectionValue, setInsertCollectionValue] = useState(0);
  const [removeCollectionValue, setRemoveCollectionValue] = useState(0);
  const handleInsertCollectionValue = (event) =>
    setInsertCollectionValue(event.target.value);
  const handleRemoveCollectionValue = (event) =>
    setRemoveCollectionValue(event.target.value);

  const addToCollection = () => {
    const newOutput = {
      heart: heart,
      transparency: transparency,
      face: face,
      faceVisible,
      characterColor: characterColor,
      characterName: characterName,
      dialogueColor: dialogueColor,
      dialogueSize: dialogueSize,
      dialogue: dialogue,
    };
    setOutputs([...outputs, newOutput]);
    console.log(newOutput, newOutput.length);
  };
  const insertIntoCollection = () => {
    if (insertCollectionValue > 0) {
      const newOutput = {
        heart: heart,
        transparency: transparency,
        face: face,
        faceVisible,
        characterColor: characterColor,
        characterName: characterName,
        dialogueColor: dialogueColor,
        dialogueSize: dialogueSize,
        dialogue: dialogue,
      };
      const newOutputs = outputs.slice();
      newOutputs.splice(insertCollectionValue - 1, 0, newOutput);
      setOutputs(newOutputs);
      console.log(newOutput, newOutput.length);
    }
  };
  const removeFromCollection = () => {
    if (removeCollectionValue > 0) {
      // remove at the index
      const newOutput = outputs.slice();
      newOutput.splice(removeCollectionValue - 1, 1);
      setOutputs(newOutput);
    }
  };
  const clearCollection = () => {
    setOutputs([]);
    setInsertCollectionValue(0);
    setRemoveCollectionValue(0);
  };
  // download the image
  const handleDownload = async (selector) => {
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
  // download the current outputs as a JSON file
  const handleSaveJSON = () => {
    // ask for filename
    const filename = prompt("Enter filename", "outputs");
    if (filename) {
      // create a blob object with the JSON data
      const blob = new Blob([JSON.stringify(outputs)], {
        type: "application/json",
      });
      // download the blob object as a file
      downloadjs(blob, filename);
    }
  };
  // load a JSON file and set the outputs to the contents of the file
  const handleLoadJSON = (event) => {
    // if the json file has invalid syntax, this will throw an error
    try {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        setOutputs(JSON.parse(e.target.result));
      };
      reader.readAsText(file);
      // reset the file input so that the same file can be loaded again
      event.target.value = null;
    } catch (e) {
      alert("Invalid JSON file");
    }
  };

  return (
    <div className="parent">
      <div className="child">
        <div className="header">
          <h1>SLARPG Fake Quotes Generator</h1>
        </div>
        <div className="input">
          <div>
            <span>Face Visible 👩: </span>
            <input
              type="radio"
              value="face-hidden"
              name="face-visibility-switch"
              checked={faceVisible === "face-hidden"}
              onChange={handleFaceVisibility}
            />
            <label htmlFor="face-hidden">No</label>
            <input
              type="radio"
              value="face-visible"
              name="face-visibility-switch"
              checked={faceVisible === "face-visible"}
              onChange={handleFaceVisibility}
            />
            <label htmlFor="face-visible">Yes</label>
          </div>

          <div className="faceselect-row">
            <div>
              <b>
                <span>Face:</span>
              </b>
              <br />
              <select value={character} onChange={handleCharacterChange}>
                <optgroup label="Main Characters">
                  <option value="melody">Melody</option>
                  <option value="allison">Allison</option>
                  <option value="claire">Claire</option>
                  <option value="jodie">Jodie</option>
                </optgroup>
                <optgroup label="Enemies">
                  <option value="javis">Javis</option>
                  <option value="verena">Verena</option>
                  <option value="paula">Paula</option>
                  <option value="harmony">Harmony</option>
                  <option value="sons">Sons</option>
                </optgroup>
                <optgroup label="NPCs">
                  <option value="amelia">Amelia</option>
                  <option value="beverly">Beverly</option>
                  <option value="faith">Faith</option>
                  <option value="glyph">Glyph</option>
                  <option value="ipsy">Ipsy</option>
                  <option value="nef">Nef</option>
                  <option value="noel">Noel</option>
                  <option value="zinnia">Zinnia</option>
                </optgroup>
                <optgroup label="NPC Categories">
                  <option value="npc_desert">NPCs Desert</option>
                  <option value="npc_greenridge">NPCs Greenridge</option>
                  <option value="npc_woods">NPCs Woods</option>
                  <option value="slhrpg">SLHRPG</option>
                </optgroup>
              </select>
            </div>

            <div>
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
            </div>
          </div>

          <div>
            {/* The form should read the image and pass it to the handleFace function */}
            <small>
              <label htmlFor="upload-face">Custom Face: </label>
            </small>
            <input
              type="file"
              name="upload-face"
              accept=".jpg, .jpeg, .png, .webp, .gif, .svg"
              onChange={handleFace}
            ></input>{" "}
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
              cols="65"
            ></textarea>
            <br />
            <input
              type="color"
              value={dialogueColor}
              name="dialogue-color"
              onChange={handleDialogueColor}
            ></input>
            <div>
              <span>Font size: </span>
              {/* add range input */}
              <input
                type="range"
                min="10"
                max="50"
                value={dialogueSize}
                name="dialogue-size"
                onChange={handleDialogueSize}
              />{" "}
              {dialogueSize}px
            </div>
            <div>
              <span>Heart 💛: </span>
              <input
                type="radio"
                value="no-heart"
                name="heart-switch"
                checked={heart === "no-heart"}
                onChange={handleHeart}
              />
              <label htmlFor="no-heart">No</label>
              <input
                type="radio"
                value="heart"
                name="heart-switch"
                checked={heart === "heart"}
                onChange={handleHeart}
              />
              <label htmlFor="heart">Yes</label>
            </div>
          </div>
        </div>

        <Textbox
          faceVisible={faceVisible}
          heart={heart}
          transparency={transparency}
          face={face}
          characterColor={characterColor}
          characterName={characterName}
          dialogueColor={dialogueColor}
          dialogueSize={dialogueSize}
          dialogue={dialogue}
        />

        <div className="download">
          <div>
            <span>Transparency ⬜️:</span>
            <input
              type="radio"
              value="no-transparent"
              name="transparency-switch"
              onChange={handleTransparency}
              checked={transparency === "no-transparent"}
            />
            <label htmlFor="no-transparent">No</label>
            <input
              type="radio"
              value="transparent"
              name="transparency-switch"
              onChange={handleTransparency}
              checked={transparency === "transparent"}
            />
            <label htmlFor="transparent">Yes</label>
          </div>
          <div>
            <span>Scale 𝌣:</span>
            <input
              type="radio"
              value="1"
              name="scale-switch"
              checked={scaleSize === "1"}
              onChange={handleScale}
            />
            <label htmlFor="1">x1 (in-game)</label>
            <input
              type="radio"
              value="2"
              name="scale-switch"
              checked={scaleSize === "2"}
              onChange={handleScale}
            />
            <label htmlFor="2">x2 (high res)</label>
          </div>
          <button onClick={() => handleDownload(".output")}>
            Download Image
          </button>
        </div>

        <footer>
          <p>
            Code here:{" "}
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
            game with permission to use/host from{" "}
            <a href="https://ponett.tumblr.com/" target="_blank">
              ponett
            </a>
          </small>
        </footer>
      </div>

      <div className="child">
        <h1>Multiple Textbox</h1>
        <p>
          Index is <b>1-{outputs.length}</b>
        </p>
        <button onClick={addToCollection}>Add</button>
        <button onClick={insertIntoCollection} className="collection-btn">
          Insert
        </button>
        <input
          value={insertCollectionValue}
          onChange={handleInsertCollectionValue}
        ></input>
        <button onClick={removeFromCollection} className="collection-btn">
          Remove
        </button>
        <input
          value={removeCollectionValue}
          onChange={handleRemoveCollectionValue}
        ></input>
        <button onClick={clearCollection} className="collection-btn">
          Clear
        </button>
        <div className="collection">
          <Collection transparency={transparency} outputs={outputs} />
        </div>
        <button onClick={() => handleDownload(".collection")}>
          Download Image
        </button>
        <button onClick={handleSaveJSON} className="collection-btn">
          Save JSON
        </button>
        <small>
          <label htmlFor="load-json" className="collection-btn">
            Load JSON:{" "}
          </label>
        </small>
        <input
          type="file"
          name="load-json"
          accept=".json"
          onChange={handleLoadJSON}
        ></input>
        {/* do the same as above input but with a button */}
      </div>
    </div>
  );
};

export default App;
