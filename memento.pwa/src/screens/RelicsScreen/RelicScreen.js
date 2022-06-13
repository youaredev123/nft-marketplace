import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { ThemeContext } from "styled-components/macro";
import Skeleton from "react-loading-skeleton";
import moment from "moment";

import Avatar from "../../components/Avatar";
import Header from "../../components/Header";
import RelicItem from "../../components/FeedItem/RelicItem";
import NotFound from "../../components/NotFound";
import RelicService from "../../services/RelicService";
import { TimeLabel } from "components/CommentItem/styles";

import {
  FullHeight, PostButton,
  RelicItemContent,
  RelicItemContentWrapper,
  RelicItemProfileData, RelicItemProfileReward,
  RelicItemProfileText
} from "./styles";
import Loader from "../../components/Loader";
import useProfile from "../../hooks/useProfile";
import useCurrentUser from "hooks/useCurrentUser";
import { truncate } from "lib/utils";
import { useLocalStorage } from "hooks/useLocalStorage";
import {ReactComponent as ThreeDots} from "../../assets/icons/three-dots.svg";
import Spinner from "../../components/Loader";

const RelicScreen = (
  {
    relicId = null,
    showHeader = true
  }
) => {
  const themeContext = useContext(ThemeContext);
  const { id } = useParams();
  const [relic, setRelic] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const { profile, fetchProfileById } = useProfile();
  const { fetchCurrentUser } = useCurrentUser()
  const [account, setAccount] = useLocalStorage("relica_user", null);
  const urlParams = new URLSearchParams(window.location.search);
  const isDiscovered = urlParams.get('isDiscovered');
  const [showRemoveButton, setShowRemoveButton] = useState(false);
  const [showLoadingRemove, setShowLoadingRemove] = useState(false);

  useEffect(() => {
    (async () => {
      let response = await RelicService.getRelic({ id: relicId || id });
      if (response.hasError) {
        setNotFound(true);
      } else {
        setRelic(response.data);
        await fetchCurrentUser();
      }
    })();
  }, []);

  const onRemoveClick = useCallback(() => {
    (async () => {
      setShowLoadingRemove(true);

      const transactionResultResponse = await RelicService.unlockMyRelicAndCreateTransaction({
        relicId: relicId || id,
      });

      if (transactionResultResponse.status === 200) {
        window.location.href = "/relics";
      } else {
        alert("Failed to remove relic: " + transactionResultResponse.status + " " + JSON.stringify(transactionResultResponse.data));
      }

      setShowLoadingRemove(false);
    })();
  }, [showLoadingRemove]);

  const renderRemoveButton = () => {
    return showRemoveButton ?
      (<PostButton
        style={{ boxShadow: "rgb(0 0 0 / 30%) 0px 2px 6px" }}
        onClick={onRemoveClick}
        className="primary remove-relic-btn"
      >
        {showLoadingRemove ? <Spinner color="white" size={20}/> : 'Remove'}
      </PostButton>)
      : null;
  };

  const displayHeader = useCallback(() => {
    if (!showHeader) {
      return null;
    }

    return (
      <Header
        hasBack
        hasRemoveRelicOption={relic && !relic.discovered && account.username === relic.username}
        title="Back"
      />
    );
  }, [showHeader, relic, account, isDiscovered]);

  if (notFound) {
    return <NotFound/>;
  }

  return (
    <FullHeight className={"relic-screen-full-height"}>
      {displayHeader()}
      {relic
        ? <>
          {(!showHeader && !relic.discovered && account.username === relic.username) ? (
            <>
              <ThreeDots className="option-menu"
                         strokeWidth={1.5}
                         color="var(--grey)"
                         size={32}
                         onClick={() => setShowRemoveButton(!showRemoveButton)}
              />
              {renderRemoveButton()}
            </>
          ) : null}
          <RelicItem
            key={id}
            relic={relic}
            border={false}
            canNavigate={false}
            isBig={true}
          />
          <RelicItemContent className={"relic-item-content"}>
            <RelicItemContentWrapper className={"relic-item-content-wrapper"}>
              <div className={"relic-item-content__avatar"} style={{ margin: "0 15px" }}>
                {account
                  ? <a href={`/${relic.username}`}>
                    <Avatar
                      url={relic.profilePic}
                      height={54}
                      width={54}
                    />
                  </a>
                  : <Skeleton
                    style={{
                      backgroundImage: themeContext.skeleton,
                      backgroundColor: themeContext.bgColorSkeletonAvatar
                    }}
                    circle={true}
                    height={54}
                    width={54}
                    className="mr-3"
                  />}
              </div>
              <RelicItemProfileData className={"relic-item-content__profile-data"}>
                <div>
                  {account ? <a href={`/${relic.username}`}>{truncate(relic.username, 150)}</a> : null}
                  {(!relic.blur) &&
                    <span className={`reward`}>
                      Reward: {`$${parseFloat(relic.amount).toFixed(2)}`}
                    </span>
                  }
                </div>
                <div className={"relic-timestamp"}>
                  {relic && relic.txId ?
                    <a href={`https://whatsonchain.com/tx/${relic.txId}`} target="_blank">
                      <TimeLabel>
                        {relic &&
                          relic.createdTimestamp &&
                          moment(relic.createdTimestamp).fromNow()}
                      </TimeLabel>
                    </a> :
                    <TimeLabel>
                      {relic &&
                        relic.createdTimestamp &&
                        moment(relic.createdTimestamp).fromNow()}
                    </TimeLabel>}
                </div>
              </RelicItemProfileData>
            </RelicItemContentWrapper>
            <RelicItemProfileText className={"relic-item-content__text"} style={{color: themeContext.text}}>
              {truncate(decodeURIComponent(escape(atob(relic.note ?? ''))), 510)}
            </RelicItemProfileText>
            <RelicItemProfileReward className={"relic-item-content__rewards"}>
              <div className={"relic-item-content__rewards-dollar"}>
                $
              </div>
              <div className={"relic-item-content__rewards-info"}>
                <div className={"relic-item-content__rewards-info-text"}>Reward</div>
                <div className={"relic-item-content__rewards-info-amount"}>{`$${parseFloat(relic.amount).toFixed(2)}`}</div>
              </div>
            </RelicItemProfileReward>
          </RelicItemContent>
        </>
        : <Loader style={{ position: "absolute", left: "50%", top: "50%" }}/>
      }
    </FullHeight>
  );
};

export default RelicScreen;
