import React, {useContext} from "react";

import TextArea from "../../../components/Form/TextArea";
import { TextAreaContainer, TextAreaLabel } from "./styles";
import {DarkModeContext} from "../../../hooks/useDarkMode";

const NewPostText = ({ text, setText, error }) => {
  const DM = useContext(DarkModeContext)

  function handleChange(value) {
    if (value.length < 201) {
      setText(value);
    }
  }

  return (
    <TextAreaContainer>
      <TextArea
        style={{background: DM.darkMode ? `var(--dark-theme-bgc)` : 'white', marginBottom: "10px"}}
        placeholder="Say something about this post"
        value={text}
        onChange={handleChange}
      />
      {error && error === "postIsTooLong" && (
        <TextAreaLabel>Too many characters</TextAreaLabel>
      )}
    </TextAreaContainer>
  );
};

export default NewPostText;
