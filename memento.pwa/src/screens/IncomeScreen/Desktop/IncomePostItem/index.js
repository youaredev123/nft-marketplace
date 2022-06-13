import React, { useCallback, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import useFeedItem from "hooks/useFeedItem";
import { ThemeContext } from "styled-components";
import { BoxSkeleton, IncomeItem, IncomeValue, InfoBox, InfoBoxRow, Text } from "./styles";
import ImageItem from "components/FeedItem/ImageItem";
import LikeIcon from "components/LikeIcon";
import CommentIcon from "components/CommentIcon";
import FavouriteIconEmpty from "components/FavouriteIconEmpty";
import { withMemo } from "hoc/withMemo";
import useIsMounted from "hooks/useIsMounted";

const IncomePostItem = withMemo(({ income, viewPost }) => {
  const { post, fetchPost } = useFeedItem();
  const themeContext = useContext(ThemeContext);
  const isMounted = useIsMounted();

  useEffect(() => {
    if (income && income.contentId && isMounted) {
      fetchPost(income.contentId);
    }
  }, [income]);

  const renderAvatar = useCallback(() => {
    if (!post || !post.id || !post.images || !post.images.length) {
      return (
        <BoxSkeleton>
          <Skeleton
            style={{ backgroundColor: themeContext.bgColorSkeletonAvatar, backgroundImage: themeContext.skeleton }}
            circle={true}
            height={80}
            width={80}
          />
        </BoxSkeleton>

      );
    }

    return (
      <div onClick={_ => viewPost(post.contentId)}>
        <ImageItem contentId={post.contentId}/>
      </div>
    );
  }, [post, themeContext]);

  return (
    <IncomeItem>
      {renderAvatar()}
      <InfoBox className={"d-flex flex-column"}>
        <InfoBoxRow>
          <div className={"d-flex align-items-center"}>
            <LikeIcon strokeWidth={1.3} stroke="var(--grey)" fill="none"/>
            <Text>{income.likeTotal} likes</Text>
          </div>
          <div className={"d-flex align-items-center"}>
            <IncomeValue>${parseFloat(income.likeTotalAmount).toFixed(2)}</IncomeValue>
          </div>
        </InfoBoxRow>
        <InfoBoxRow>
          <div className={"d-flex align-items-center"}>
            <CommentIcon strokeWidth={1.3} stroke="var(--grey)" fill="none"/>
            <Text style={{ fontSize: "1.4rem" }}>{income.commentTotal} comments</Text>
          </div>
          <div className={"d-flex align-items-center"}>
            <IncomeValue>${parseFloat(income.commentTotalAmount).toFixed(2)}</IncomeValue>
          </div>
        </InfoBoxRow>
        <InfoBoxRow>
          <div className={"d-flex align-items-center"}>
            <FavouriteIconEmpty/>
            <Text>{income.favouriteTotal} favourites</Text>
          </div>
          <div className={"d-flex align-items-center"}>
            <IncomeValue>${parseFloat(income.favouriteTotalAmount).toFixed(2)}</IncomeValue>
          </div>
        </InfoBoxRow>
      </InfoBox>
    </IncomeItem>
  );
});

export default IncomePostItem;
