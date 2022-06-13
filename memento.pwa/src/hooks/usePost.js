import { useState, useEffect, useCallback } from "react";
import { getPost, updatePostLikes } from "../api";

export function usePost(id) {
  const [post, setPost] = useState(undefined);
  
  useEffect(() => {
    if (id) {
      getPost(id).then(setPost);
    }
  }, [id, setPost]);

  const updateLikes = useCallback(() => {
    if (id) {
      updatePostLikes(id).then(setPost)
    }
  });

  return { post, updateLikes};
}
