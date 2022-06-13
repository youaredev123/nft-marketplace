import React, {useCallback, useContext, useEffect} from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import {ThemeContext} from "styled-components";
import {Link, useLocation} from "react-router-dom";
import renderImageLoaders from "../../../lib/renderImageLoaders";
import {HiddenResults} from "../../../components/HiddenResults";
import {NoPostsText, LoaderWrapper} from "../styles";
import {NFTCollectionDescription, NFTListItemContainer} from "./styles";
import useNftCollection from "../../../hooks/nft/useNftCollection";
import Header from "../../../components/Header";
import {FullHeight} from "../Market/styles";
import CollectionItem from "../../../components/FeedItem/CollectionItem";
import queryString from "query-string";
import Loader from "components/Loader"

const NFTCollectionScreen = () => {
  const themeContext = useContext(ThemeContext);
  const {
    posts,
    loadNewPosts,
    currentPage,
    hasNextPage,
    loading,
  } = useNftCollection(42);

  const location = useLocation();
  const {
    x: xProvided,
    y: yProvided,
  } = queryString.parse(location.search);

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
      posts.map((item, index) => (
        <Link
          style={{textDecoration: "none"}}
          to={`/nft/collection/detail/${item.collectionId}?x=${xProvided}&y=${yProvided}`}
          key={`post_${index}`}
        >
          <CollectionItem key={item.id} item={item}/>
        </Link>
      ))
    );
  }

  return (<>
    <FullHeight>
      <Header hasCreateCollectionButton hasBack title="NFT"/>
      <div ref={infiniteNewPostsRef} style={{width: "100%", height: "100%"}}>
        {loading
          ? <Loader style={{position: "absolute", left: "50%", top: "50%"}}/>
          : ((posts && posts.length) ? <HiddenResults paddingTop="0">
              <NFTListItemContainer>
                {renderItems()}
              </NFTListItemContainer>
            </HiddenResults>
            : <NoPostsText>
            You have no NFTs
          </NoPostsText>)
        }
      </div>
    </FullHeight>
  </>);
}

export default NFTCollectionScreen;
