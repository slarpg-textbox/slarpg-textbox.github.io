import React from "react";
import Textbox from "./Textbox";

const Collection = ({ outputs, transparency }) => {
  if (outputs.length === 0) {
    return <div>Click "Add" to add the current textbox to collection!</div>;
  }
  return (
    <div className={`${transparency}`}>
      {outputs.map((output, index) => (
        <Textbox key={index} {...output} />
      ))}
    </div>
  );
};

export default Collection;
