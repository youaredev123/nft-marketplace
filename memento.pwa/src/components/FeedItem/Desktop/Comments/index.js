import { CommentInputContainer, PostCommentLink } from "../../Comments/styles";
import React, { useCallback, useState } from "react";
import { ErrorNotification } from "../../../../screens/NewPostScreen/styles";
import TextArea from "../../../Form/TextArea";

const CommentInput = ({ post }) => {
  const [text, setText] = useState();
  const [textDisabled, setDisabled] = useState(false);
  const [error, setError] = useState(null);

  const onPost = useCallback(text => {
    setText("");
    post(text);
  }, [setText, post]);

  const setCommentText = (value) => {
    // this is to calculate the bytes , the size cannot exceed 512 on the backend
    const encodedTextLength = new TextEncoder().encode(value).length;

    const isTooLong = encodedTextLength > 200 || value.length > 150;
    if (isTooLong) {
      setError("Too many characters");
      setDisabled(true);
    }
    if (!isTooLong && value.length < 151) {
      if (error) {
        setDisabled(false);
        setError(null);
      }
      setText(value);
    }
  };

  return (
    <div className="p-4">
      {error && <ErrorNotification>{error}</ErrorNotification>}
      <CommentInputContainer>
        <TextArea
          placeholder="Add comment..."
          value={text}
          onChange={value => setCommentText(value)}
          style={{ background: 'transparent' }}
        />
        <PostCommentLink
          onClick={() => {
            if (!textDisabled && text && text.length > 0) {
              onPost(btoa(unescape(encodeURIComponent(text))));
            }
          }}
        >
          Post
        </PostCommentLink>
      </CommentInputContainer>
    </div>
  );
};

export default CommentInput;
