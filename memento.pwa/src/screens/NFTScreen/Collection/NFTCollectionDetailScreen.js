import React, { useCallback, useContext, useEffect, useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { ThemeContext } from "styled-components";
import { Link, useParams, useLocation } from "react-router-dom";
import queryString from "query-string";
import renderImageLoaders from "../../../lib/renderImageLoaders";
import { HiddenResults } from "../../../components/HiddenResults";
import { NoPostsText, LoaderWrapper } from "../styles";
import {
  FullHeight
} from "../Market/styles";
import Header from "../../../components/Header";
import { CoinListItemContainer } from "./styles";
import CollectionCoinItem from "../../../components/FeedItem/CollectionCoinItem";
import useNftCollection from "hooks/nft/useNftCollection";
import Loader from "components/Loader"

const NFTCollectionDetailScreen = () => {
  const themeContext = useContext(ThemeContext);
  const { id } = useParams();
  const location = useLocation();
  const {
    x: xProvided,
    y: yProvided,
  } = queryString.parse(location.search);

  const {
    collectionDetails,
    collectionInfo,
    loadNftsByCollection,
    currentPage,
    hasNextPage,
    loading,
  } = useNftCollection(42);

  const loadMore = useCallback(() => {
    if (hasNextPage) {
      loadNftsByCollection(id, currentPage + 1);
    }
  }, [loadNftsByCollection, currentPage, hasNextPage]);

  useEffect(() => {
    loadNftsByCollection(id);
  }, []);

  const infiniteNewPostsRef = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    scrollContainer: "body",
  });

  const renderItems = () => {
    if (loading && (!collectionDetails || collectionDetails.nfts.length === 0)) {
      return renderImageLoaders(18, themeContext);
    }

    return (
      collectionDetails.nfts.map((relic, index) => (
        <Link
          style={{textDecoration: "none"}}
          to={{
            pathname: `/nft/collection/drop/${relic.nftId}?x=${xProvided}&y=${yProvided}`,
          }}
          key={`post_${index}`}
        >
          <CollectionCoinItem key={relic.nftId} relic={relic} collection={collectionInfo}/>
        </Link>
      ))
    );
  }

  return (<>
    <FullHeight>
      <Header hasBack title="NFT" />
      <div ref={infiniteNewPostsRef} style={{ width: "100%", height: "100%" }}>
        {loading
          ? <Loader style={{position: "absolute", left: "50%", top: "50%"}}/>
          : ((collectionDetails && collectionDetails.nfts) ? <HiddenResults paddingTop="0">
            <CoinListItemContainer>
              {renderItems()}
            </CoinListItemContainer>
          </HiddenResults>
            : <NoPostsText>
              No more NFT to drop
            </NoPostsText>)
        }
      </div>
    </FullHeight>
  </>);
}

export default NFTCollectionDetailScreen;
