import React, { useState } from "react";
import { FileInput, UploadImageTile } from "./styles";
import UploadImageButton from "assets/images/upload-button.png";

const FileUploader = ({ fileInput, onChange, fullSize = false }) => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        paddingTop: "100%",
      }}
    >
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ width: "35%" }}
      >
        <FileInput
          type="file"
          name="file"
          id="file"
          ref={fileInput}
          className="mt-5"
          onChange={onChange}
          accept="image/*"
        />
        <label
          htmlFor="file"
          style={{
            position: "absolute",
            inset: fullSize ? "0%" : "20% 35% 50%",
          }}
        >
          <UploadImageTile>
            <img src={UploadImageButton} alt={"Upload image"} style={{padding: "0 35px"}}/>
          </UploadImageTile>
        </label>
      </div>
    </div>
  );
};

export default FileUploader;
