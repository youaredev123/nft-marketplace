import React, { useCallback, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import {
  UsernameLink,
  CommentAvatar,
  CommentContentHeader,
  CommentHeaderDate,
  CommentContentText,
} from "./styles";

import Avatar from "../Avatar";
import useProfile from "../../hooks/useProfile";
import renderWithHashTags from "../../lib/renderWithHashTags";

import {
  CommentContainer,
  CommentContentContainer,
  TimeLabel,
  Text,
} from "./styles";
import {ThemeContext} from "styled-components";

const CommentItem =  ({ comment }) => {
  const { profile, fetchProfileById } = useProfile();
  const themeContext = useContext(ThemeContext);

  useEffect(() => {
    // HERE
    // fetchProfileById(comment.userId);
  }, [comment]);

  const renderAvatar = () =>
    comment && comment.profilePic ? (
      <Link to={`/${comment.username}`}>
        <Avatar url={comment.profilePic} className="mr-3" width={38} height={38} />
      </Link>
    ) : (
      <Skeleton circle={true}
                height={38}
                width={38}
                className="mr-3"
                style={{backgroundImage: themeContext.skeleton, backgroundColor: themeContext.bgColorSkeletonAvatar}}/>
    );
    
  const renderUsername = () =>
    comment ? (
      <UsernameLink to={`/${comment.username}`}>
        {comment.username}
      </UsernameLink>
    ) : (
      <p>
        <Skeleton count={1} />
      </p>
    );

  const displayCommentText = useCallback(() => {
    if (comment && comment.comment) {
      comment.text = atob(unescape(encodeURIComponent(comment.comment)));
    }

    if (!comment.text) {
      return null;
    }

    return (
      <CommentContentText>
        <Text
          dangerouslySetInnerHTML={renderWithHashTags(comment.text, true)}
        />
      </CommentContentText>
    );
  }, [comment?.text]);

  return (
    <CommentContainer>
      <CommentAvatar>{renderAvatar()}</CommentAvatar>
      <CommentContentContainer>
        <CommentContentHeader>
          {renderUsername()}
          <CommentHeaderDate>
            {comment.txId ?
              <a href={`https://whatsonchain.com/tx/${comment.txId}`} target="_blank">
                <TimeLabel>
                  {comment &&
                    comment.timestamp &&
                    moment(comment.timestamp).fromNow()}
                </TimeLabel>
              </a> :
              <TimeLabel>
              {comment &&
                comment.timestamp &&
                moment(comment.timestamp).fromNow()}
            </TimeLabel>}
          </CommentHeaderDate>
        </CommentContentHeader>
        {displayCommentText()}
      </CommentContentContainer>
    </CommentContainer>
  );
};

export default CommentItem;
