import React from "react";

import { Content, Dot, Layout, PurchaseHeader, PurchaseInfo, Text, VideoWrapper } from "../styles";
import privateVideo from "assets/video/private-accounts-v6.mp4";
import { PurchaseButtonWrapper, SubmitButton } from "screens/ExclusivityScreen/Desktop/styles";

const PurchasePrivateDesktop = ({ onPurchaseButtonClick }) => (
  <>
    <PurchaseHeader className={"mb-5"}>Pay-to-View</PurchaseHeader>
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
      <video src={privateVideo} controls preload="auto"/>
    </VideoWrapper>
    <Layout>
      <Content>
        <PurchaseInfo>
          <Text>
            <Dot mr/> Set custom price to unlock your content
          </Text>
          <Text>
            <Dot mr/> Your photos render blurred until liked
          </Text>
          <Text>
            <Dot mr/> Users pay to follow and view your content
          </Text>
        </PurchaseInfo>
        <PurchaseButtonWrapper>
          <SubmitButton
            onClick={onPurchaseButtonClick}
            style={{
              borderRadius: "40px",
              padding: "16px",
              fontSize: "14px"
            }}
          >
            Buy now $2.99
          </SubmitButton>
        </PurchaseButtonWrapper>
      </Content>
    </Layout>
  </>
);

export default PurchasePrivateDesktop;
