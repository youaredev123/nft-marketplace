import React, { useCallback, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import { ThemeContext } from "styled-components";
import useProfile from "../../../../hooks/useProfile";
import {
  CommentAvatar,
  CommentContentContainer,
  CommentContentHeader,
  CommentContentText,
  Text,
  TimeLabel
} from "../../../CommentItem/styles";
import Avatar from "../../../Avatar";
import renderWithHashTags from "../../../../lib/renderWithHashTags";
import {
  CommentContainerDesktop,
  CommentHeaderDateDesktop,
  UsernameLinkDesktop
} from "components/FeedItem/Desktop/Comments/styles";

const CommentItemDesktop = ({ comment, showComments, displayStyle = 'horizontal' }) => {
  const { profile, fetchProfileById } = useProfile();
  const themeContext = useContext(ThemeContext);

  const renderAvatar = () =>
    profile && profile.profilePic ? (
      <Link to={`/${profile.username}`}>
        <Avatar url={profile.profilePic} className="mr-3" width={38} height={38}/>
      </Link>
    ) : (
      <Skeleton
        circle
        height={38}
        width={38}
        className="mr-3"
        style={{
          backgroundImage: themeContext.skeleton,
          backgroundColor: themeContext.bgColorSkeletonAvatar
        }}/>
    );

  const renderUsername = () =>
    profile ? (
      <UsernameLinkDesktop to={`/${profile.username}`}>
        {profile.username}
      </UsernameLinkDesktop>
    ) : (
      <p>
        <Skeleton count={1}/>
      </p>
    );

  useEffect(() => {
    fetchProfileById(comment.userId);
  }, [comment]);

  const displayCommentTextHorizontal = useCallback(() => {
    if (displayStyle !== 'vertical') {
      return null;
    }

    return (
      <CommentContentText>
        <Text style={{fontSize: "1.4rem"}}
              dangerouslySetInnerHTML={renderWithHashTags(comment.text, true)}
        />
      </CommentContentText>
    )
  }, [displayStyle, comment]);

  const displayCommentTextVertical = useCallback(() => {
    if (displayStyle === 'vertical') {
      return null;
    }

    return (
      <CommentContentText>
        <Text style={{fontSize: "1.4rem"}}
              dangerouslySetInnerHTML={renderWithHashTags(comment.text, true)}
        />
      </CommentContentText>
    )
  }, [displayStyle, comment]);

  return (
    <CommentContainerDesktop className={"d-flex flex-row"}>
      <div>
        {showComments && (
          <CommentAvatar style={{ display: 'block' }}>{renderAvatar()}</CommentAvatar>
        )}
      </div>
      <div className={"d-flex flex-column justify-content-start"} style={{width: "100%"}}>
        <div className={"d-flex flex-row"} style={{width: "100%"}}>
          <CommentContentContainer>
            <CommentContentHeader>
              {renderUsername()}
            </CommentContentHeader>
            {displayCommentTextHorizontal()}
          </CommentContentContainer>
          <CommentHeaderDateDesktop>
            {comment.txId ?
              <a href={`https://whatsonchain.com/tx/${comment.txId}`}>
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
          </CommentHeaderDateDesktop>
        </div>
        <div>
          {displayCommentTextVertical()}
        </div>
      </div>
    </CommentContainerDesktop>
  );
};

export default CommentItemDesktop;
