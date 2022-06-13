import { useCallback } from "react";

import { db, getPost } from "../api";

const useLatestPosts = () => {
  const syncPosts = useCallback(async (pictures) => {
    const promises = [];
    for (let index = 0; index < pictures.length; index++) {
      const pic = pictures[index];
      let description = "";
      try {
        description = decodeURIComponent(escape(atob(pic.description)));
      } catch (e) {
        console.error("Relica: unable to parse description of content " +
          "with ID = " + pic.contentId);
      }
      const postObject = {
        ...pic,
        images: [pic.picture],
        timestamp: pic.createdTimestamp,
        id: pic.contentId,
        description,
      };
      const existingPost = await getPost(pic.id);
      if (existingPost) {
        promises.push(db.posts.put(postObject));
      } else {
        promises.push(db.posts.add(postObject));
      }
    }
    
    return Promise.all(promises)
      .then(() => console.debug("Finished syncing posts"))
      .catch((err) => console.error("Errors while syning posts", { err }));
  });

  return {
    syncPosts,
  };
};

export default useLatestPosts;
