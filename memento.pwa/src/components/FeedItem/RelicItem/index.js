import React, { useContext } from "react";
import { DiscoverRelicContainer, HiddenImageAward, HiddenImageContainer, ImageOverlay } from "./styles";
import chest from "../../../assets/icons/chest.svg";
import { Icon } from "../LikeToUnlock/styles";
import { ImageContainer, ImageWrapper, SkeletonContainer } from "../styles";
import Skeleton from "react-loading-skeleton";
import useWindowWidth from "../../../hooks/useWindowWidth";
import { ThemeContext } from "styled-components";

const ImageItem = ({ relic, isBig = false }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  const { squareLength } = useWindowWidth();
  const themeContext = useContext(ThemeContext);
  const chestIcon = relic.partner ? relic.partner.partnerPic : chest;

  const renderImageLoad = () => {
    return (<>
      {!imageLoaded && (
        <SkeletonContainer>
          <Skeleton
            height={squareLength}
            style={{
              backgroundImage: themeContext.skeleton,
              backgroundColor: themeContext.bgColorSkeletonAvatar
            }}
          />
        </SkeletonContainer>
      )}
      <ImageWrapper>
        <ImageContainer
          src={relic.pictureUrl}
          imageLoaded={imageLoaded}
          onLoad={handleImageLoad}
          cannavigate={false}
          isBig={isBig}
        />
      </ImageWrapper>
    </>);
  };

  const renderImage = () => {
    return (<>
      {isBig ?
        renderImageLoad()
        :
        <HiddenImageContainer url={relic.pictureUrl}/>}
        {(relic.blur) && <ImageOverlay isBig={isBig}>
        <div style={{ fontWeight: "bold" }}>
              <Icon src={chestIcon} width={"100px"} alt="Private" title="Private" />
          <br/><br/>
          <DiscoverRelicContainer className={"discover-relic-wrapper"}>
            Discover this Relic
            <div>
              Reward: {`$${parseFloat(relic.amount).toFixed(2)}`}
            </div>
          </DiscoverRelicContainer>
        </div>
      </ImageOverlay>}
      {/* {!isBig ? <HiddenImageAward>${parseFloat(relic.amount).toFixed(2)}</HiddenImageAward> : null} */}
    </>);
  };

  return <div className={"relic-item"} style={{ position: "relative" }}>{renderImage()}</div>;
};

export default ImageItem;
