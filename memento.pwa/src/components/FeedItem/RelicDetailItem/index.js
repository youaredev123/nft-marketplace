import React from "react";
import { Lock } from "react-feather";
import { HiddenImageContainer, ImageOverlay, HiddenImageNote, HiddenImageAward } from "./styles";

const ImageItem = ({ relic, isBig = false }) => {
  const renderImage = () => {
    return (<>
      <HiddenImageContainer url={relic.pictureUrl} />
      {relic.blur && <ImageOverlay isBig={isBig}>
          <div>
            <Lock width={60} height={60} />
            <br /><br />
            Discover to unlock<br />and claim Relic
          </div>
        </ImageOverlay>}
        <HiddenImageNote>{decodeURIComponent(escape(atob(relic.note ?? '')))}</HiddenImageNote>
        <HiddenImageAward>${parseFloat(relic.satoshis).toFixed(2)}</HiddenImageAward>
    </>);
  }

  return <div style={{position: "relative", display: "flex"}}>{renderImage()}</div>;
};

export default ImageItem;
