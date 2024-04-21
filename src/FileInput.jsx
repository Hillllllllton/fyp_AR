import React from "react";
import "./index.css";

function FileInput({ onFileSelect }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <>
      <input
        type="file"
        id="file"
        className="file-input"
        onChange={handleFileChange}
        accept=".glb"
        style={{ display: "none" }} // hides the input
      />
      <label htmlFor="file" className="file-input-label">
        Choose a .glb file
      </label>
    </>
  );
}

export default FileInput;
