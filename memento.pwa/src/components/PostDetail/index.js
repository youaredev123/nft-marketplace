import useCurrentUser from "hooks/useCurrentUser";
import { Link } from "react-router-dom";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "styled-components";
import { usePayments } from "hooks/usePayments";
import useFeedItem from "hooks/useFeedItem";
import useWindowWidth from "hooks/useWindowWidth";
import Skeleton from "react-loading-skeleton";
import Avatar from "components/Avatar";
import LikeToUnlock from "components/FeedItem/LikeToUnlock";
import renderWithHashTags from "lib/renderWithHashTags";
import Like from "components/FeedItem/Like";
import Comment from "components/FeedItem/Comment";
import Favourite from "components/FeedItem/Favourite";
import FeedItemDesktop from "components/FeedItem/Desktop";
import {
  FeedDescription,
  FeedTitle,
  ImageContainer,
  ImageWrapper,
  SkeletonContainer
} from "components/PostDetail/styles";
import { withMemo } from "hoc/withMemo";

const PostDetail = withMemo(({ contentId, showComments = false, border = false }) => {
  const { currentUser } = useCurrentUser();
  const themeContext = useContext(ThemeContext);
  const { pay, isPaymentActiveOrRecent } = usePayments();

  const {
    profile,
    post,
    fetchPost,
    likeLoading,
    setHasLikedForPayment,
    setHasAddedToFavForPayment,
    updateTotalCommentsInPost
  } = useFeedItem();
  useEffect(() => {
    if (post.userId && currentUser.id && post.userId === currentUser.id) {
      setIsMyPost(true);
    }
  }, [post, currentUser]);

  const { squareLength } = useWindowWidth();
  // attach ref and check if its visible and only load once
  const target = useRef();

  const [imageLoaded, setImageLoaded] = useState(false);
  const [justLiked, setJustLiked] = useState(false);
  const [justFavourited, setJustFavourited] = useState(false);
  const [isMyPost, setIsMyPost] = useState(false);

  const likePaymentStarted = isPaymentActiveOrRecent({
    type: "LIKE",
    data: { contentId: post.id }
  });
  const favPaymentStarted = isPaymentActiveOrRecent({
    type: "FAVOURITE",
    data: { contentId: post.id }
  });

  const onLike = useCallback(
    (post, liked) => {
      if (post && post.id && !liked && !justLiked) {
        pay({
          type: "LIKE",
          data: { contentId: post.id },
          username: post.username,
          onPayment: () => {
            // since back-end doesn't respond with the proper picture afther the like:
            setTimeout(() => {
              fetchPost(contentId, true);
              setHasLikedForPayment(true);
            }, 2000);
          },
          onError: () => setJustLiked(false),
          onInvisiblePaymentStart: () => setJustLiked(true)
        });
      }
    },
    [post, currentUser, justLiked]
  );

  const onFav = useCallback(
    (post, added) => {
      if (post && post.id && !added && !justFavourited) {
        pay({
          type: "FAVOURITE",
          data: { contentId: post.id },
          username: post.username,
          onPayment: () => setHasAddedToFavForPayment(true),
          onError: () => setJustFavourited(false),
          onInvisiblePaymentStart: () => setJustFavourited(true)
        });
      }
    },
    [post, currentUser, justFavourited]
  );

  const renderUsername = () =>
    post && post.username && post.userId ? (
      <FeedTitle to={`/${post.username}`}>{post.username}</FeedTitle>
    ) : (
      <Skeleton count={1}/>
    );

  const renderAvatar = () =>
  post && post.profilePic ? (
      <Link to={`/${post.username}`}>
        <Avatar url={post.profilePic} className="mr-3"/>
      </Link>
    ) : (
      <Skeleton
        style={{
          backgroundImage: themeContext.skeleton,
          backgroundColor: themeContext.bgColorSkeletonAvatar
        }}
        circle={true}
        height={54}
        width={54}
        className="mr-3"
      />
    );
  // wait until <img> finishes loading the image from url so it adapt correct height
  const handleImageLoad = () => setImageLoaded(true);

  const onUnlock = () => onLike(post, post.hasLiked || likePaymentStarted);

  const renderLikeToUnlock = () => {
    const blurred = post.images[0].toLowerCase().includes("blur");

    if (blurred && post.blur && imageLoaded) {
      return <LikeToUnlock price={post.customLikeAmount} onUnlock={onUnlock}/>;
    }

    return null;
  };

  const renderImage = () => {
    return (
      <>
        {!imageLoaded && (
          <SkeletonContainer>
            <Skeleton
              height={squareLength}
              style={{
                backgroundImage: themeContext.skeleton,
                backgroundColor: themeContext.bgColorSkeletonAvatar
              }}
            />
          </SkeletonContainer>
        )}
        {post && post.images && post.images[0] && (
          <ImageWrapper className="image-wrapper">
            <ImageContainer
              src={post.images[0]}
              imageLoaded={imageLoaded}
              onLoad={handleImageLoad}
              cannavigate={false}
            />
            {renderLikeToUnlock()}
          </ImageWrapper>
        )}
      </>
    );
  };

  const renderDescription = () =>
    post && post.description && post.description.length ? (
      <FeedDescription
        dangerouslySetInnerHTML={renderWithHashTags(post.description, true)}
      />
    ) : null;

  const renderLike = () =>
    post && post.totalLikes >= 0 ? (
      <Like
        count={
          post.totalLikes +
          (!post.hasLiked && (justLiked || likePaymentStarted) ? 1 : 0)
        }
        liked={post.hasLiked || likePaymentStarted || justLiked}
        justLiked={justLiked}
        onClick={() =>
          !likeLoading
            ? onLike(post, post.hasLiked || likePaymentStarted)
            : () => console.info("Liking / unliking...")
        }
        className="mr-5"
      />
    ) : (
      <Skeleton
        circle={true}
        height={30}
        width={30}
        className="mr-5"
        style={{
          backgroundImage: themeContext.skeleton,
          backgroundColor: themeContext.bgColorSkeletonAvatar
        }}
      />
    );

  const renderComments = useCallback(() => {
    if (post) {
      return <Comment count={post.totalComments}/>;
    }

    return (
      <Skeleton
        circle={true}
        height={30}
        width={30}
        style={{
          backgroundImage: themeContext.skeleton,
          backgroundColor: themeContext.bgColorSkeletonAvatar
        }}
      />
    );
  }, [post, themeContext.skeleton, themeContext.bgColorSkeletonAvatar]);

  const renderFavourites = () =>
    post && post.totalFavourites >= 0 ? (
      <Favourite
        count={
          post.totalFavourites +
          (!post.hasFavourited && (justFavourited || favPaymentStarted) ? 1 : 0)
        }
        added={post.hasFavourited || favPaymentStarted || justFavourited}
        justAdded={justFavourited}
        onClick={() => onFav(post, post.hasFavourited || favPaymentStarted)}
        className="mr-5"
      />
    ) : (
      <Skeleton
        circle={true}
        height={30}
        width={30}
        className="mr-5"
        style={{
          backgroundImage: themeContext.skeleton,
          backgroundColor: themeContext.bgColorSkeletonAvatar
        }}
      />
    );

  const onPostFlow = useCallback(
    (postFlowState) => {
      switch (postFlowState) {
        case "started":
          updateTotalCommentsInPost(post.totalComments + 1);
          break;
        case "error":
          updateTotalCommentsInPost(post.totalComments - 1);
      }
    },
    [post.totalComments]
  );

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchPost(contentId);
    }
    return () => {
      isMounted = false;
    };
  }, [fetchPost, contentId]);

  return (
    <FeedItemDesktop
      id={contentId}
      renderImage={renderImage}
      target={target}
      border={border}
      renderAvatar={renderAvatar}
      onPostFlow={onPostFlow}
      renderUsername={renderUsername}
      post={post}
      renderDescription={renderDescription}
      contentId={contentId}
      showComments={showComments}
      renderLike={renderLike}
      renderFavourites={renderFavourites}
      renderComments={renderComments}
      pay={pay}
      imageLoaded={imageLoaded}
    />
  );
});

export default PostDetail;
