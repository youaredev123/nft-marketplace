import moment from "moment";
import React, {useCallback, useEffect, useState} from "react";
import { CommentContainer, Container, ImageContainer, ImageContainerContent, Info, InfoContainer } from "./styles";
import { FeedActionsContainer, FeedBottomBar, FeedHeaderContainer, FeedTimestamp, FeedTitleContainer } from "../styles";
import { DesktopInputContainer } from "../Comments/styles";
import { useComments } from "hooks/useComments";
import Comments from "./Comments/Comments";
import CommentInput from "./Comments";
import { CommentInputContainerDesktop } from "components/FeedItem/Desktop/Comments/styles";
import {ReactComponent as ThreeDots} from "../../../assets/icons/three-dots.svg";
import {PostButton} from "../../../screens/RelicsScreen/styles";
import Spinner from "../../Loader";
import RelicService from "../../../services/RelicService";
import ContentService from "../../../services/ContentService";
import useCurrentUser from "../../../hooks/useCurrentUser";

const FeedItemDesktop = (
  {
    target,
    renderAvatar,
    renderUsername,
    post,
    renderDescription,
    renderImage,
    onPostFlow,
    id,
    pay,
    renderLike,
    renderFavourites,
    renderComments,
    imageLoaded,
    height = "auto",
    commentDisplayStyle = null
  }
) => {
  const {
    comments,
    fetchComments,
    addEphemeralComment,
    setEphemeralCommentTxId,
    removeEphemeralComment,
  } = useComments();

  const updateComments = useCallback(() => {
    fetchComments(id);
  }, [id, fetchComments]);
  
  useEffect(() => {
    // Load comments by post id when click on photo - desktop
    if (window.mobileCheck() != 1)
      updateComments()
  }, []);

  const [showHidePostButton, setShowHidePostButton] = useState(false);
  const [showLoadingHidePost, setShowLoadingHidePost] = useState(false);
  const { currentUser } = useCurrentUser();
  const isMyPost = post.userId && currentUser.id && post.userId === currentUser.id;

  const onHidePostClick = useCallback(() => {
    (async () => {
      setShowLoadingHidePost(true);

      ContentService.hidePicture(id)
        .then(() => {
          window.location.reload();
        });

      setShowLoadingHidePost(false);
    })();
  }, [showLoadingHidePost]);

  const renderHidePostButton = () => {
    return showHidePostButton && isMyPost ?
      (<PostButton
        style={{ boxShadow: "rgb(0 0 0 / 30%) 0px 2px 6px" }}
        onClick={onHidePostClick}
        className="primary remove-relic-btn"
      >
        {showLoadingHidePost ? <Spinner color="white" size={20}/> : 'Hide post'}
      </PostButton>)
      : null;
  };

  const postF = text => {
    addEphemeralComment({ contentId: id, text });
    onPostFlow("started");

    pay({
      type: "COMMENT",
      data: {
        contentId: id,
        comment: text,
      },
      username: post.username,
      onPayment: txId => {
        setEphemeralCommentTxId({ contentId: id, text, txId });
        updateComments();
      },
      onError: () => {
        removeEphemeralComment({ contentId: id, text });
        onPostFlow("error");
      },
      onMoneyButtonModalHide: () => {
        removeEphemeralComment({ contentId: id, text });
        onPostFlow("error");
      },
    });
  };

  return (
    <Container ref={target} height={height} style={{position: "relative"}}>
      {isMyPost &&
      (
        <ThreeDots className="option-menu"
                   strokeWidth={1.5}
                   color="var(--grey)"
                   size={32}
                   onClick={() => setShowHidePostButton(!showHidePostButton)}
        />)}
      {renderHidePostButton()}
      <ImageContainer>
        <ImageContainerContent imageLoaded={imageLoaded}>
          {renderImage()}
          <FeedBottomBar>
            <FeedActionsContainer>
              {renderLike()}
              {renderComments()}
              {renderFavourites()}
            </FeedActionsContainer>
          </FeedBottomBar>
        </ImageContainerContent>
      </ImageContainer>
      <InfoContainer>
        <Info>
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
          <CommentContainer>
            <DesktopInputContainer>
              <Comments id={id} comments={comments} displayStyle={commentDisplayStyle}/>
            </DesktopInputContainer>
          </CommentContainer>
        </Info>
        <CommentInputContainerDesktop>
          <CommentInput post={postF}/>
        </CommentInputContainerDesktop>
      </InfoContainer>
    </Container>
  );
};

export default FeedItemDesktop;
