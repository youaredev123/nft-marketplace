import React, { memo } from "react";
import BottomScrollListener from "react-bottom-scroll-listener";
import FeedItem from "../../../components/FeedItem";
import Spinner from "../../../components/Loader";
import { TextItem, Wrapper } from "./styles";

const FeedListMobile = memo(
  (
    {
      posts,
      loading,
      error,
      noPostsAvailable,
      loadMore
    }
  ) => {
    const renderFeed = () => {
      if (noPostsAvailable) {
        return (
          <TextItem> Personalize your home screen by following friends!</TextItem>
        );
      } else {
        let newFeedPosts = posts
        if (typeof(posts[0]) == 'object')
          newFeedPosts = newFeedPosts.map(x => x.contentId);

        return newFeedPosts.map((contentId) => (
          <FeedItem
            canNavigate={true}
            key={contentId}
            contentId={contentId}
            onShowInfoClick={() => console.log("Show Info")}
            showComments={false}
            border
          />
        ));
      }
    };

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
  }
);

export default FeedListMobile;
