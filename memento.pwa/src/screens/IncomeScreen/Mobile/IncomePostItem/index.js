import React, { useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import useFeedItem from "hooks/useFeedItem";
import Avatar from "components/Avatar";
import LikeIcon from "components/LikeIcon";
import CommentIcon from "components/CommentIcon";
import FavouriteIconEmpty from "components/FavouriteIconEmpty";
import { IncomeCount, IncomeRow, IncomeValue, IncomeVerticalGroup, Text, } from "./styles";
import { ThemeContext } from "styled-components";
import { withMemo } from "hoc/withMemo";
import useIsMounted from "hooks/useIsMounted";

const IncomePostItemComponent = ({ income }) => {
  const { post, fetchPost } = useFeedItem();
  const themeContext = useContext(ThemeContext);
  const isMounted = useIsMounted();

  React.useEffect(() => {
    if (income && income.contentId && isMounted) {
      fetchPost(income.contentId);
    }
  }, [income]);

  const renderAvatar = useCallback(() => {
    if (!post || !post.id || !post.images || !post.images.length) {
      return (
        <Skeleton
          style={{ backgroundColor: themeContext.bgColorSkeletonAvatar, backgroundImage: themeContext.skeleton }}
          circle={true}
          height={80}
          width={80}
          className="mr-3"
        />
      );
    }

    return (
      <Link to={{ pathname: `/post/${post.id}`, state: { modal: true } }}>
        <Avatar
          url={post.images[0]}
          width={80}
          height={80}
        />
      </Link>
    );
  }, [post, themeContext]);

  return (
    <IncomeRow hasborder>
      {renderAvatar()}
      <IncomeVerticalGroup className="d-flex flex-column justify-content-between align-items-between">
        <Link to={`/post/${post.id}/likes`}>
          <LikeIcon strokeWidth={1.3} stroke="var(--grey)" fill="none"/>
          <Text>{income.likeTotal} likes</Text>
        </Link>
        <IncomeCount>
          <CommentIcon strokeWidth={1.3} stroke="var(--grey)" fill="none"/>
          <Text>{income.commentTotal} comments</Text>
        </IncomeCount>
        <Link to={`/post/${post.id}/favourites`}>
          <FavouriteIconEmpty/>
          <Text>{income.favouriteTotal} favourites</Text>
        </Link>
      </IncomeVerticalGroup>
      <IncomeVerticalGroup>
        <IncomeCount>
          <IncomeValue>${parseFloat(income.likeTotalAmount).toFixed(2)}</IncomeValue>
        </IncomeCount>
        <IncomeCount>
          <IncomeValue>${parseFloat(income.commentTotalAmount).toFixed(2)}</IncomeValue>
        </IncomeCount>
        <IncomeCount>
          <IncomeValue>${parseFloat(income.favouriteTotalAmount).toFixed(2)}</IncomeValue>
        </IncomeCount>
      </IncomeVerticalGroup>
    </IncomeRow>
  );
};

const IncomePostItem = withMemo(IncomePostItemComponent);

export default IncomePostItem;
