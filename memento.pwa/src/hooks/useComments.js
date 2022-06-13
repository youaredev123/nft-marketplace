import { useCallback, useState, useRef } from "react";
import moment from "moment";

import { db } from "../api";
import ContentService from "../services/ContentService";
import useCurrentUser from "./useCurrentUser";

export function useComments() {
  const [ commentsData, setCommentData ] = useState([]);
  const { currentUser } = useCurrentUser();
  const ephemeralCommentsDataRef = useRef([]);
  const [ ephemeralCommentsCount, setEphemeralCommentsCount ] = useState(0);

  const decodeText = (text) => {
    try {
      return decodeURIComponent(escape(atob(text)));
    } catch (e) {
      return text;
    }
  }

  const fetchComments = useCallback(
    contentId => {
      ContentService.comments(contentId).then((commentsResponse) => {
        if (!commentsResponse.hasError) {
          let comments = [...commentsResponse.data.comments];
          // remove isDescription comment if it exists
          const commentIndex = comments.findIndex((x) => x.isDescription);
          if (commentIndex >= 0) {
            comments.splice(commentIndex, 1);
          }
          if (comments) {
            const commentsData = comments.map((c) => ({
              id: `${contentId}:${c.username}:${c.comment}`,
              text: decodeText(c.comment),
              username: c.username,
              userId: c.userId,
              postId: contentId,
              timestamp: c.createdTimestamp,
              txId: c.commentLocation,
              profilePic: c.profilePic
            }));
            const sortedCommentsData = commentsData.sort((a, b) => {
              if (a.timestamp && b.timestamp) {
                return -a.timestamp.localeCompare(b.timestamp);
              }
              return 1;
            });
            db.comments.bulkPut(sortedCommentsData);
            setCommentData(sortedCommentsData);

            let ephemeralCommentsIdxToClear = [];
            ephemeralCommentsDataRef.current.map((ephemeralData, idx) => {
              if (
                // This ephemeral comment should be removed if either:
                // this is an ephemeral comment from another photo
                // (so ephermal photos won't leak between photos)
                ephemeralData.postId !== contentId ||
                // or there's the same comment in the fresh comments data
                commentsData.findIndex(
                  comment => comment.id === ephemeralData.id
                ) !== -1
              ) {
                ephemeralCommentsIdxToClear.push(idx);
              }
            });
            for (let i = ephemeralCommentsIdxToClear.length - 1; i >= 0; --i) {
              ephemeralCommentsDataRef.current.splice(
                ephemeralCommentsIdxToClear[i],
                1
              );
            }
            if (ephemeralCommentsIdxToClear.length > 0) {
              setEphemeralCommentsCount(ephemeralCommentsDataRef.current.length);
            }
          }
        }
      });
    },
    [setCommentData, setEphemeralCommentsCount]
  );

  const fetchCommentsForDesktop = useCallback(
    (id, commentsForDesktop) => {
      if (id && commentsForDesktop && commentsForDesktop.length > 0) {
        let comments = [...commentsForDesktop];
        // remove isDescription comment if it exists
        const commentIndex = comments.findIndex((x) => x.isDescription);
  
        if (commentIndex >= 0) {
          comments.splice(commentIndex, 1);
        }
  
        if (comments) {
          const commentsData = comments.map((c) => ({
            id: `${id}:${c.username}:${c.comment}`,
            text: decodeText(c.comment),
            username: c.username,
            userId: c.userId,
            postId: id,
            timestamp: c.createdTimestamp,
            txId: c.commentLocation,
          }));
  
          const sortedCommentsData = commentsData.sort((a, b) => {
            if (a.timestamp && b.timestamp) {
              return -a.timestamp.localeCompare(b.timestamp);
            }
            return 1;
          });
          db.comments.bulkPut(sortedCommentsData);
          setCommentData(sortedCommentsData);
  
          let ephemeralCommentsIdxToClear = [];
          ephemeralCommentsDataRef.current.map((ephemeralData, idx) => {
            if (
              // This ephemeral comment should be removed if either:
              // this is an ephemeral comment from another photo
              // (so ephermal photos won't leak between photos)
              ephemeralData.postId !== commentsForDesktop.contentId ||
              // or there's the same comment in the fresh comments data
              commentsData.findIndex(
                comment => comment.id === ephemeralData.id
              ) !== -1
            ) {
              ephemeralCommentsIdxToClear.push(idx);
            }
          });
          for (let i = ephemeralCommentsIdxToClear.length - 1; i >= 0; --i) {
            ephemeralCommentsDataRef.current.splice(
              ephemeralCommentsIdxToClear[i],
              1
            );
          }
          if (ephemeralCommentsIdxToClear.length > 0) {
            setEphemeralCommentsCount(ephemeralCommentsDataRef.current.length);
          }
        }
      }
    },
    [setCommentData, setEphemeralCommentsCount]
  );

  const addEphemeralComment = useCallback(({ contentId, text }) => {
    const now = moment().format();
    const username = currentUser.username;
    const userId = currentUser.id;
    ephemeralCommentsDataRef.current = [
      ...ephemeralCommentsDataRef.current,
      {
        id: `${contentId}:${username}:${text}`,
        text: decodeURIComponent(escape(atob(text))),
        username,
        userId,
        postId: contentId,
        timestamp: now,
      },
    ];
    setEphemeralCommentsCount(ephemeralCommentsDataRef.current.length);
  }, [setEphemeralCommentsCount]);

  const findEphemeralComment = useCallback(({ contentId, text }) => {
    const username = currentUser.username;
    for (let i = 0; i < ephemeralCommentsDataRef.current.length; ++i) {
      const ephemeralComment = ephemeralCommentsDataRef.current[i];
      if (ephemeralComment.id === `${contentId}:${username}:${text}`) {
        return i;
      }
    }
    return null;
  }, [currentUser.username]);

  const setEphemeralCommentTxId = useCallback(({ contentId, text, txId }) => {
    const commentIndex = findEphemeralComment({ contentId, text });
    if (commentIndex !== null) {
      ephemeralCommentsDataRef.current[commentIndex].txId = txId;
      setEphemeralCommentsCount(-ephemeralCommentsDataRef.current.length);
    }
  }, [findEphemeralComment, setEphemeralCommentsCount]);

  const removeEphemeralComment = useCallback(({ contentId, text }) => {
    const commentIndex = findEphemeralComment({ contentId, text });
    if (commentIndex !== null) {
      ephemeralCommentsDataRef.current.splice(commentIndex, 1);
      setEphemeralCommentsCount(ephemeralCommentsDataRef.current.length);
    }
  }, [findEphemeralComment, setEphemeralCommentsCount]);

  return {
    comments: [ ...ephemeralCommentsDataRef.current, ...commentsData ],
    setCommentData,
    fetchComments,
    fetchCommentsForDesktop,
    addEphemeralComment,
    setEphemeralCommentTxId,
    removeEphemeralComment,
  };
}
