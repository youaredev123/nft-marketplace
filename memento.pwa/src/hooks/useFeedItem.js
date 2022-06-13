import { useCallback, useState } from "react";
import { db, getPost } from "api";
import ContentService from "services/ContentService";
import useProfile from "./useProfile";

const useFeedItem = () => {
  const [likeLoading, setLikeLoading] = useState(false);
  const [post, setPost] = useState({});
  const { profile, fetchProfileById } = useProfile();

  const setHasLikedForPayment = useCallback(
    (liked) => {
      const updatedPost = {
        ...post,
        hasLiked: liked,
        totalLikes: liked ? post.totalLikes + 1 : post.totalLikes - 1
      };
      db.posts.put(updatedPost);
      setPost(updatedPost);
    },
    [post]
  );

  const setHasAddedToFavForPayment = useCallback(
    (added) => {
      const updatedPost = {
        ...post,
        hasFavourited: added,
        totalFavourites: added
          ? post.totalFavourites + 1
          : post.totalFavourites - 1
      };
      db.posts.put(updatedPost);
      setPost(updatedPost);
    },
    [post]
  );

  const isPostValid = (post) => {
    return (
      post &&
      post.id &&
      post.images &&
      post.images.length &&
      typeof post.totalFavourites !== "undefined"
    );
  };

  // fetch image, like, comments & user for post.
  const fetchPost = useCallback(
    async (contentId, force) => {
      const p = await db.posts.get({ id: contentId });
      if (!force && isPostValid(p)) {
        if (p.userId) {
          // fetchProfileById(p.userId);
        }
        setPost(p);
      } else {
        ContentService.picture(contentId).then(async (response) => {
          if (!response.hasError) {
            const pic = response.data;
            const postObject = {
              ...pic,
              images: [pic.picture],
              timestamp: pic.createdTimestamp,
              id: pic.contentId,
              description: decodeURIComponent(escape(atob(pic.description)))
            };
            const existingPost = await getPost(pic.contentId);
            if (existingPost) {
              await db.posts.put(postObject);
            } else {
              await db.posts.add(postObject);
            }
            setPost(postObject);
          } else {
            // post not found neither in database nor could get it from backend
            console.error("Post not found in the database", { contentId });
          }
        });
      }
    },
    [fetchProfileById]
  );

  const updateTotalCommentsInPost = useCallback(
    (commentsCount) => {
      const updatedPost = {
        ...post,
        totalComments: commentsCount
      };
      db.posts.put(updatedPost);
      setPost(updatedPost);
    },
    [post]
  );

  return {
    likeLoading,
    post,
    profile,
    fetchPost,
    setHasLikedForPayment,
    setHasAddedToFavForPayment,
    updateTotalCommentsInPost
  };
};

export default useFeedItem;
