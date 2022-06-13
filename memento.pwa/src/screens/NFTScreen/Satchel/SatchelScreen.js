import React, {useCallback, useContext, useEffect} from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import {ThemeContext} from "styled-components";
import {Link, NavLink} from "react-router-dom";
import renderImageLoaders from "../../../lib/renderImageLoaders";
import SatchelItem from "../../../components/FeedItem/SatchelItem";
import {HiddenResults} from "../../../components/HiddenResults";
import {NoPostsText, LoaderWrapper} from "../styles";
import {SatchelListItemContainer} from "./styles";
import useMyNftFeed from "../../../hooks/nft/useMyNftFeed";
import Loader from "components/Loader"

const SatchelScreen = () => {
  const themeContext = useContext(ThemeContext);
  const {
    posts,
    loadNewPosts,
    currentPage,
    hasNextPage,
    loading,
  } = useMyNftFeed(42);

  const loadMore = useCallback(() => {
    if (hasNextPage) {
      loadNewPosts(currentPage + 1);
    }
  }, [loadNewPosts, currentPage, hasNextPage]);
  
  useEffect(() => {
    loadNewPosts();
  }, []);

  const infiniteNewPostsRef = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    scrollContainer: "body",
  });

  const renderItems = () => {
    if (loading && (!posts || posts.length === 0)) {
      return renderImageLoaders(18, themeContext);
    }

    return (
      posts.map((nft, index) => (
        <Link
          style={{textDecoration: "none"}}
          to={{
            pathname: `/nft/satchel/view/${nft.nftId}`,
          }}
          key={`post_${index}`}
        >
          <SatchelItem key={nft.id} nft={nft} collection={nft}/>
        </Link>
      ))
    );
  }

  return (<>
    <div style={{ width: "100%", height: "100%" }}>
      {loading
        ? <Loader style={{ position: "absolute", left: "50%", top: "50%" }} />
        : (posts && posts.length) ? <div ref={infiniteNewPostsRef}> <HiddenResults paddingTop="0">
          <SatchelListItemContainer>
            {renderItems()}
          </SatchelListItemContainer>
        </HiddenResults>
        </div> : <NoPostsText>
          Click 
          <NavLink style={{fontWeight: "bold", margin: "5px"}} to={'/post?isNFT=true'}>Here</NavLink> 
          to mint your first NFT
        </NoPostsText>
      }
    </div>
  </>);
}

export default SatchelScreen;
