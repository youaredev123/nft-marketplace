import React, { memo } from "react";
import BottomScrollListener from "react-bottom-scroll-listener";
import FeedItem from "../../../components/FeedItem";
import Spinner from "../../../components/Loader";
import { TextItem, Wrapper } from "./styles";

const FeedListDesktop = memo(
  (
    {
      posts,
      loading,
      error,
      noPostsAvailable,
      loadMore
    }
  ) => {
    function renderFeed() {
      if (noPostsAvailable) {
        return (
          <TextItem> Personalize your home screen by following friends!</TextItem>
        );
      } else {
        return posts.map((post) => (
          <FeedItem
            canNavigate={true}
            key={post.contentId}
            contentId={post.contentId}
            onShowInfoClick={() => console.log("Show Info")}
            showComments={true}
            border={true}
            comments={post.comments}
          />
        ));
      }
    }

    return (
      <Wrapper>
        {error && <p>{error}</p>}
        {renderFeed()}
        <BottomScrollListener onBottom={loadMore} offset={300}/>
        <div className="pb-5"/>
        {loading && (
          <div className="d-flex justify-content-center align-items-center">
            <Spinner/>
          </div>
        )}
      </Wrapper>
    );
  });

export default FeedListDesktop;
