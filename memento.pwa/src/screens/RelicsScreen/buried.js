import React, { useCallback, useContext, useState, useEffect } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { ThemeContext } from "styled-components";
import { Link, useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";
import renderImageLoaders from "../../lib/renderImageLoaders";
import Button from "../../components/Button";
import RelicItem from "../../components/FeedItem/RelicItem";
import { HiddenResults , ListItemContainer} from "../../components/HiddenResults";
import useBuriedFeed from "../../hooks/useBuriedFeed";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import {
  BuriedSelector,
  NoPostsText,
} from "./styles";

export default () => {
  const themeContext = useContext(ThemeContext);
  const history = useHistory();
  const location = useLocation();
  const { others } = queryString.parse(location.search);
  const isMine = !others;
  const [ countryCode ] = useLocalStorage("relics_selected_country", null);
  const switchToMine = useCallback(() => {
    history.push("/relics/buried");
    infiniteNewPostsRef.current.scrollTo(0, 0);
  }, [history]);
  const switchToOthers = useCallback(() => {
    history.push("/relics/buried?others=1");
    infiniteNewPostsRef.current.scrollTo(0, 0);
  }, [history]);

  const mineFeed = useBuriedFeed(true, 42);
  const othersFeed = useBuriedFeed(false, 42, countryCode);
  const {
    posts,
    loadNewPosts,
    currentPage,
    hasNextPage,
    currentPageOther,
    hasNextPageOther,
    loading,
  } = isMine ? mineFeed : othersFeed;

  const loadMore = useCallback(() => {
    if (hasNextPage) {
      loadNewPosts(isMine ? currentPage + 1 : currentPageOther + 1);
    }
  }, [loadNewPosts, (isMine ? currentPage + 1 : currentPageOther + 1), (isMine ? hasNextPage : hasNextPageOther)]);
  useEffect(() => {
    loadNewPosts();
  }, []);

  const isHasNextPage = isMine ? hasNextPage : hasNextPageOther;

  const infiniteNewPostsRef = useInfiniteScroll({
    loading,
    isHasNextPage,
    onLoadMore: loadMore,
    scrollContainer: "body",
  });

  const renderRelics = () => {
    if (loading && (!posts || posts.length === 0)) {
      return renderImageLoaders(18, themeContext);
    }

    return (
        posts.map((relic, index) => (
            <Link
                style={{textDecoration: "none"}}
                to={{
                  pathname: isMine
                      ? `/relics/view/${relic.id}`
                      : `/relics/buried-by/${relic.userId}`,
                }}
                key={`post_${index}`}
            >
              <RelicItem key={relic.id} relic={relic} />
            </Link>
        ))
    );
  }

  return (<>
    <BuriedSelector style={{margin: "2.3rem 0", padding: "0px 1.5rem 0px 5px"}}>
      <Button
        onClick={switchToMine}
        className={`${isMine ? "primary" : ""} switch`}
        style={{width: 90, display: "inline-block", margin: "0 20px 0 0", padding: "0.7rem"}}
      >
        Mine
      </Button>
      <Button
        onClick={switchToOthers}
        className={`${isMine ? "" : "primary"} switch`}
        style={{width: 90, display: "inline-block", margin: "0 20px 0 0", padding: "0.7rem"}}
      >
        Others
      </Button>
    </BuriedSelector>
    <div ref={infiniteNewPostsRef} style={{ width: "100%", height: "100%" }}>
      {!loading && (!posts || !posts.length)
        ? <NoPostsText>{
            isMine
              ? <>You have no buried photos.</>
              : <>None in your current country.</>
          }</NoPostsText>
        : (posts.length ? <HiddenResults paddingTop="5px">
            <ListItemContainer>
              {renderRelics()}
            </ListItemContainer>
          </HiddenResults> : null)
      }
    </div>
  </>);
}
