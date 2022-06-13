import React from "react";
import {
  Info,
  Check,
  Dot,
  NudityWrapper,
  MainLine,
  AgeVerification,
  Age,
  NudityContent,
  NudityToggles,
  NudityToggle,
  ToggleLabel,
  Warning
} from "../styles";

const Nudity = ({ nudity, onClick }) => (
  <NudityWrapper>
    <MainLine>
      <AgeVerification>
        <Age>18+</Age>
      </AgeVerification>
      <NudityContent>
        <Info>Does my work contain real or illustrated nudity:</Info>
        <NudityToggles>
          <NudityToggle onClick={onClick(true)}>
            <ToggleLabel>Yes</ToggleLabel>
            <Check checked={nudity}>{nudity && <Dot />}</Check>
          </NudityToggle>
          <NudityToggle onClick={onClick(false)}>
            <ToggleLabel>No</ToggleLabel>
            <Check checked={!nudity}>{!nudity && <Dot />}</Check>
          </NudityToggle>
        </NudityToggles>
      </NudityContent>
    </MainLine>
    {/* using nudity visibility so our content not jumping */}
    <Warning nudity={nudity}>
      Your content and profile will only be discoverable via the search bar in
      the explore screen to ensure the browsing experience stays sensitive to
      different age groups
    </Warning>
  </NudityWrapper>
);

export default Nudity;
