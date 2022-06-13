import React from "react";

import {
  Content,
  VideoWrapper,
  PurchaseHeader,
  PurchaseInfo,
  Text,
  Dot,
  Layout
} from "screens/ExclusivityScreen/styles";
import Button from "components/Button";
import privateVideo from "assets/video/private-accounts-v6.mp4";

const PurchasePrivateMobile = ({ onPurchaseButtonClick }) => (
  <>
    <VideoWrapper>
      {/* YouTube */}
      {/* <iframe
        src="https://www.youtube.com/embed/TyJrIYJhB30"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Pay to View"
        title="Relica Intro"
        width="100%"
        height="100%"
      /> */}
      <video src={privateVideo} controls preload="auto" />
    </VideoWrapper>
    <Layout>
      <Content>
        <PurchaseHeader>Pay-to-View</PurchaseHeader>
        <PurchaseInfo>
          <Text>
            <Dot mr /> Set custom price to unlock your content
          </Text>
          <Text>
            <Dot mr /> Your photos render blurred until liked
          </Text>
          <Text>
            <Dot mr /> Users pay to follow and view your content
          </Text>
        </PurchaseInfo>
        <Button
          onClick={onPurchaseButtonClick}
          className="primary"
          style={{
            borderRadius: "40px",
            padding: "16px",
            fontSize: "14px"
          }}
        >
          Buy now $2.99
        </Button>
      </Content>
    </Layout>
  </>
);

export default PurchasePrivateMobile;
