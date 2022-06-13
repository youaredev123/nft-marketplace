import React, {useCallback, useContext, useState, useEffect} from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import {ThemeContext} from "styled-components";
import {Link} from "react-router-dom";
import renderImageLoaders from "../../../lib/renderImageLoaders";
import {HiddenResults} from "../../../components/HiddenResults";
import {NoPostsText, LoaderWrapper} from "../styles";
import {MarketListItemContainer, MarketListItemHeader, MarketListItemTab, MarketSorter} from "./styles";
import MarketItem from "../../../components/FeedItem/MarketItem";
import SorterModal from "./SorterModal"
import useOrderFeed from "../../../hooks/nft/useOrderFeed";
import Spinner from "components/Loader"

const MarketScreen = () => {
  const themeContext = useContext(ThemeContext);
  const [ shouldShowModal, setShouldShowModal ] = useState(false);
  const [ sorter, setSorter ] = useState('Most Recent');

  const orderTypeOpen = 'open';
  const orderTypeFilled = 'filled';

  const showModal = useCallback(() => {
    setShouldShowModal(true);
  }, []);

  const hideModal = useCallback(() => {
    setShouldShowModal(false);
  }, []);

  const {
    posts,
    loadNewPosts,
    orderType,
    setOrderType,
    currentPage,
    hasNextPage,
    loading,
  } = useOrderFeed(42);

  const loadMore = useCallback(() => {
    if (hasNextPage) {
      loadNewPosts(currentPage + 1);
    }
  }, [loadNewPosts, currentPage, hasNextPage]);

  useEffect(() => {
    loadNewPosts(orderType, sorter);
  }, []);

  const isActive = useCallback((tab) => {
    return (tab === orderType) ? 'active' : '';
  }, [orderType]);

  const handleSwitchTab = useCallback((orderType) => {
    setOrderType(orderType);
    loadNewPosts(orderType, sorter);
  }, [orderType, sorter]);

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
      posts.map((order, index) => (
        <Link
          style={{textDecoration: "none"}}
          to={{
            pathname: `/nft/market/view/${order.orderId}`,
          }}
          key={`post_${index}`}
        >
          <MarketItem key={order.orderId} order={order}/>
        </Link>
      ))
    );
  }

  return (<>
    <div ref={infiniteNewPostsRef} style={{width: "100%", height: "100%"}}>
      <MarketListItemHeader>
        <MarketListItemTab>
          <a target="_blank"
            className={isActive(orderTypeOpen)}
            onClick={() => handleSwitchTab(orderTypeOpen)}>For Sale</a>

          <a target="_blank" className={isActive(orderTypeFilled)}
            onClick={() => handleSwitchTab(orderTypeFilled)}>Sold</a>
        </MarketListItemTab>

        {!loading && (posts && (posts.length)) ?
          <MarketSorter onClick={showModal}>
            {sorter}
          </MarketSorter> : null}
        
      </MarketListItemHeader>
      {loading
        ?
        <LoaderWrapper>
          <Spinner></Spinner>
        </LoaderWrapper>
        : (posts && posts.length ? <HiddenResults paddingTop="0">

            <MarketListItemContainer>
              {renderItems()}
            </MarketListItemContainer>

            <SorterModal
              show={shouldShowModal}
              sorter={sorter}
              setSorter={sorter => {
                setSorter(sorter);
                loadNewPosts(orderType, sorter);
                hideModal();
              }}
            />
          </HiddenResults>
          : <NoPostsText>
          You have discovered no Relics
        </NoPostsText>)
      }
    </div>
  </>);
}

export default MarketScreen;
