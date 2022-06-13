import React, { useContext } from "react";
import { useIntersection } from "use-intersection";
import Skeleton from "react-loading-skeleton";

import { ReactComponent as FirstPostIcon } from "../../../assets/icons/1st.svg";
import { ImageContainer, OriginallyPrivate, Lock } from "./styles";

import useFeedItem from "../../../hooks/useFeedItem";
import { ThemeContext } from "styled-components";
import LikeToUnlock from "../../FeedItem/LikeToUnlock";
import lock from "../../../assets/icons/lock.svg";

const ImageItem = ({ contentId, showOriginallyPrivate }) => {
  const themeContext = useContext(ThemeContext);
  const { post, fetchPost } = useFeedItem();

  // attach ref and check if its visible and only load once
  const target = React.useRef();
  const visible = useIntersection(target, {
    once: true
  });

  const renderImage = () => {
    let _height = 250;
    if (window.innerWidth < 480) {
      _height = (window.innerWidth - 16) / 3;
    }

    return post && post.images && post.images[0] ? (
      <ImageContainer url={post.images[0]}>
        {post && post.blur && (
          <LikeToUnlock price={post.customLikeAmount} smaller />
        )}
        {post.firstPost && (
          <FirstPostIcon
            style={{
              position: "absolute",
              bottom: "0.5rem",
              right: "0.5rem",
              width: "25px",
              height: "25px"
            }}
          />
        )}
        {showOriginallyPrivate && post.originallyPrivate && (
          <OriginallyPrivate>
            <Lock src={lock} alt="Private" title="Private" />
          </OriginallyPrivate>
        )}
      </ImageContainer>
    ) : (
      <Skeleton
        height={_height}
        width="100%"
        style={{
          backgroundImage: themeContext.skeleton,
          backgroundColor: themeContext.bgColorSkeleton
        }}
      />
    );
  };

  React.useEffect(() => {
    let isMounted = true;
    if (visible) {
      if (isMounted) {
        fetchPost(contentId);
      }
    }
    return () => {
      isMounted = false;
    };
  }, [visible]);

  return <div ref={target}>{renderImage()}</div>;
};

export default ImageItem;
