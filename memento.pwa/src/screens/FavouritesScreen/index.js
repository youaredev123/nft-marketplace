import React, { useCallback, useContext, useEffect } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { Link, withRouter } from "react-router-dom";

import { useFavouritesFeed } from "hooks/useFavouritesFeed";
import renderImageLoaders from "../../lib/renderImageLoaders";
import Loader from "components/Loader";
import { Title } from "components/Header/styles";
import { SearchResults } from "components/SearchResults";
import ImageItem from "components/FeedItem/ImageItem";
import { DesktopWrapper, TextItem } from "./styles";
import { ThemeContext } from "styled-components";
import DesktopLayout from "layouts/Desktop/DesktopLayout";
import usePostModal from "hooks/usePostModal";

const FavouritesScreenComponent = () => {
  const themeContext = useContext(ThemeContext);
  const { posts, loadNewPosts, noPostsAvailable, hasNextPage, currentPage, isLoading } = useFavouritesFeed();
  const { viewPost, renderModal } = usePostModal();

  const loadMore = useCallback(() => {
    if (hasNextPage) {
      loadNewPosts(currentPage + 1);
    }
  }, [loadNewPosts, currentPage, hasNextPage]);

  const infiniteNewPostsRef = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasNextPage,
    onLoadMore: loadMore,
    scrollContainer: "body",
  });

  useEffect(() => {
    if (!posts || !posts.length) {
      loadNewPosts();
    }
  }, []);

  return (
    <>
      <DesktopLayout headerHasBack headerTitle={<Title>Favourites</Title>} withSidebar={false} hideBorder={true}>
        <DesktopWrapper>
          <h3>Favourites</h3>
        </DesktopWrapper>
        {isLoading && !(posts && posts.length) ?
          <Loader
            style={{
              marginTop: `${window.mobileCheck() ? "60%" : "15%"}`,
              alignItems: "center",
              display: "flex",
              height: "100%",
              flexDirection: "column",
              justifyContent: "center",
            }}
          /> :
          noPostsAvailable ? (
            <TextItem>A place for your favourite pictures</TextItem>
          ) : <>
            <div ref={infiniteNewPostsRef}>
              <SearchResults paddingTop="8px">
                <>
                  {posts && posts.length
                    ? posts.map((contentId, index) => (
                      <div onClick={_ => viewPost(contentId)} key={`post_${index}`}>
                        <ImageItem key={contentId} contentId={contentId}/>
                      </div>
                    ))
                    : renderImageLoaders(18, themeContext)}
                </>
              </SearchResults>
            </div>
            {hasNextPage && (
              <div className="d-flex justify-content-center align-items-center mt-2 mb-2">
                <Loader/>
              </div>
            )}
          </>
        }
      </DesktopLayout>
      {renderModal()}
    </>
  );
};

export default withRouter(FavouritesScreenComponent);
