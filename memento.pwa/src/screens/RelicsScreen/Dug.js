import React, { useCallback, useContext, useEffect, useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { ThemeContext } from "styled-components";
import { Link, useHistory } from "react-router-dom";
import renderImageLoaders from "../../lib/renderImageLoaders";
import RelicItem from "../../components/FeedItem/RelicItem";
import { HiddenResults, ListItemContainer } from "components/HiddenResults";
import useDugFeed from "../../hooks/useDugFeed";
import { PostButton, TextItem } from "./styles";
import unlockMapIcon from "../../assets/images/unlock_map.png";
import SelectCountryModal from "../../components/SelectCountryModal";
import { DarkModeContext } from "hooks/useDarkMode";
import RelicDetailModal from "./Modal/RelicDetailModal";
import { getAllCountries } from "hooks/useMapbox";
import UserService from "services/UserService";
import {useAccount} from "hooks/useAccount";

const Dug = () => {
  const history = useHistory();
  const themeContext = useContext(ThemeContext);
  const [showingSelectCountryPopup, setShowingSelectCountryPopup] = useState(false);
  const theme = useContext(DarkModeContext);
  const [showDesktopRelicModal, setShowDesktopRelicModal] = useState(true);
  const [desktopRelicDetail, setDesktopRelicDetail] = useState(null);
  const [countries, setCountries] = useState([]);
  const { account, setAccount } = useAccount();

  const {
    posts,
    loadNewPosts,
    currentPage,
    hasNextPage,
    loading,
  } = useDugFeed(42);

  const loadMore = useCallback(() => {
    if (hasNextPage) {
      loadNewPosts(currentPage + 1);
    }
  }, [loadNewPosts, currentPage, hasNextPage]);

  useEffect(() => {
    loadNewPosts();
  }, []);

  useEffect(() => {
    const countries = getAllCountries();
    setCountries(countries);
  }, [getAllCountries]);

  const infiniteNewPostsRef = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    scrollContainer: "body",
  });

  const relicIconClickHandler = (relic) => {
    const isDesktopMode = typeof window !== "undefined" && window.innerWidth >= 481;
    if (isDesktopMode) {
      setDesktopRelicDetail(relic);
      setShowDesktopRelicModal(true);
    } else {
      history.push(`/relics/view/${relic.id}`);
    }
  };

  const renderRelics = () => {
    if (loading && (!posts || posts.length === 0)) {
      return renderImageLoaders(18, themeContext);
    }

    return (
      posts.map((relic, index) => (
        <Link
          style={{ textDecoration: "none" }}
          onClick={() => relicIconClickHandler(relic)}
          key={`post_${index}`}
        >
          <RelicItem key={relic.id} relic={relic}/>
        </Link>
      ))
    );
  };

  const getSum = () => {
    let sum = 0;
    for (let i = 0; i < posts.length; i++) {
      sum += parseFloat(posts[i].amount);
    }
    return sum.toFixed(2);
  };

  const handleOnCountryClick = useCallback((countryCode) => {
    UserService.saveCurrentCountry(countryCode).then(result => {
      if (!result.hasError) {
        const newData = {
          ...account,
          currentCountry: countryCode
        };
        setAccount(newData);
        history.push('/relics');
      }
    });
    setShowingSelectCountryPopup(false);
  });

  const renderTopHeader = () => {
    return (
      <div className={'relic-discover-header'}
           style={{
             backgroundColor: theme.darkMode ? 'transparent' : "white",
             borderBottom: theme.darkMode ? '15px solid #2023244D' : '15px solid rgb(234, 234, 234)',
           }}
      >
        <div className="relic-discover-header-dollar">$</div>
        <div className="relic-discover-header-wrapper">
          <div className={'relic-discover-header-text'} style={{ width: "210px", color: "#10a5f5", textAlign: "left" }}>
            Total Discovered (USD)
          </div>
          <div>
          </div>
          <div className={'relic-discover-header-total'}
               style={{ width: "80px", textAlign: "right", color: "#10a5f5", paddingRight: "10px" }}>
            ${getSum()}
          </div>
        </div>
      </div>
    );
  };

  return (
      <div ref={infiniteNewPostsRef} style={{ width: "100%", height: "80vh" }}>
        {!loading && (!posts || !posts.length)
          ? (
            <TextItem style={{ flexFlow: "column" }}>
              {/* TODO: Comment out for release on 20-Nov-2021 */}

              {/* {<img src={unlockMapIcon} width={350} style={{ margin: "20px 0" }} alt={"Unlock map"}/>}
              <div style={{ marginBottom: "30px" }}>
                Your discovered Relics will appear here!
              </div>
              <PostButton
                className="primary"
                onClick={() => setShowingSelectCountryPopup(true)}
                style={{ marginBottom: "30px", width: "200px", boxShadow: "none" }}
              >
                Select Country
              </PostButton> */}

              <div >
                Your discovered Relics will appear here!
              </div>
            </TextItem>
          )
          : (posts.length ? <HiddenResults paddingTop="0">
              {renderTopHeader()}
              <ListItemContainer>
                {renderRelics()}
              </ListItemContainer>
            </HiddenResults>
            : null)
        }
        <SelectCountryModal
          show={showingSelectCountryPopup}
          setShowingSelectCountryPopup={setShowingSelectCountryPopup}
          onCountryClick={(countryCode) => handleOnCountryClick(countryCode)}
          countries={countries}
        />
        <RelicDetailModal
          show={showDesktopRelicModal}
          onHide={() => setShowDesktopRelicModal(false)}
          relic={desktopRelicDetail}
        />
      </div>
  );
};

export default Dug;
