import {
  FeedActionsContainer,
  FeedBottomBar,
  FeedHeaderContainer, FeedHeaderWrapper,
  FeedItemContainer,
  FeedTimestamp,
  FeedTitleContainer,
  ImgBox,
  PostContainer
} from "../styles";
import moment from "moment";
import Comments from "../Comments";
import React from "react";

const FeedItemMobile = (
  {
    target,
    border,
    renderAvatar,
    renderUsername,
    post,
    renderDescription,
    renderImage,
    contentId,
    onPostFlow,
    renderLike,
    renderComments,
    renderFavourites,
    showComments,
    inPostScreen = false,
    commentsForDesktopMode
  }
) => {
  return (
    <PostContainer ref={target} inPostScreen={inPostScreen}>
      <FeedItemContainer border={border}>
        <FeedHeaderWrapper>
          <FeedHeaderContainer>
            {renderAvatar()}
            <FeedTitleContainer>
              {renderUsername()}
              <FeedTimestamp>
                <a
                  href={`${post.transaction ? post.transaction : "#"}`}
                  target="_blank"
                >
                  {post && post.timestamp && moment(post.timestamp).fromNow()}
                </a>
              </FeedTimestamp>
            </FeedTitleContainer>
          </FeedHeaderContainer>

          {renderDescription()}
        </FeedHeaderWrapper>
        <ImgBox className="d-flex flex-column justify-content-center align-items-center">
          {renderImage()}
        </ImgBox>
        <FeedBottomBar>
          <FeedActionsContainer>
            {renderLike()}
            {renderComments()}
            {renderFavourites()}
          </FeedActionsContainer>
        </FeedBottomBar>
        {showComments && (
          <Comments
            id={contentId}
            onPostFlow={onPostFlow}
            username={post.username}
            numberOfComments={3}
            commentsForDesktop={commentsForDesktopMode}
          />
        )}
      </FeedItemContainer>
    </PostContainer>
  );
};

export default FeedItemMobile;
