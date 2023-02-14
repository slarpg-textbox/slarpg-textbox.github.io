import { useState } from "react";
import "./App.css";
import placeholder from "./assets/placeholder.png";

const App = () => {
  const [character, setTextCharacter] = useState("");
  const [dialogue, setTextDialogue] = useState("");

  const handleTextCharacter = (event) => {
    setTextCharacter(event.target.value);
  };
  const handleTextDialogue = (event) => {
    setTextDialogue(event.target.value);
  };

  return (
    <div>
      <div class="input">
        Character:
        <input type="text" value={character} onChange={handleTextCharacter} />
        <br />
        <br />
        Dialogue:
        <input type="text" value={dialogue} onChange={handleTextDialogue} />
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

  // return (
  //   <div>
  //     <p>Hello World</p>
  //   </div>
  // );
};

const Footer = () => {
  return (
    <div>
      <p>
        View the code here{" "}
        <a href="https://github.com/slarpg-textbox/slarpg-textbox.github.io">
          https://github.com/slarpg-textbox/slarpg-textbox.github.io
        </a>
      </p>
    </div>
  );
};

export default App;
