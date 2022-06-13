import React from "react";
import CommentItemDesktop from "./Item";

const Comments = ({ comments = [], id, displayStyle = null}) => {
  return (
    <div>
      {
        comments.map((comment, index) => (
          <CommentItemDesktop key={index} id={id} comment={comment} showComments={true} displayStyle={displayStyle}/>
        ))
      }
    </div>
  );
};

export default Comments;
