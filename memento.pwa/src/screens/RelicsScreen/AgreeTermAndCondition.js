import React, {useCallback, useState} from "react";

import AgreeTermsAndConditionsIcon from "assets/images/agree_terms_and_conditions.jpg";

import {
  AgreeTermInnerContainer,
  PopupContainer,
  TermsAndConditionPopupMessage,
} from "./styles";
import {Link} from "react-router-dom";
import UserService from "../../services/UserService";
import {useLocalStorage} from "hooks/useLocalStorage";
import useWindowDimensions from "hooks/useWindowWidth";


const AgreeTermAndCondition = () => {
  const [isAccepted, setIsAccepted] = useState(false);
  const [image, setImage] = useState(AgreeTermsAndConditionsIcon);
  const [account, setAccount] = useLocalStorage("relica_user", null);
  const { windowWidth } = useWindowDimensions();
  const isDesktopMode = windowWidth >= 481;

  (() => {
    if (isDesktopMode) {
      import("../../../src/assets/images/agree_terms_and_conditions_desktop.png").then(image => {
        setImage(image.default);
      });
    }
  })();

  const onAcceptClick = useCallback(() => {
    (async () => {
      if (isAccepted) {
        const response = await UserService.relicTcs();

        if (response.status !== 200) {
          console.log("Failed to accept terms and conditions" + " " + JSON.stringify(response.data));
        } else {
          setAccount({
            ...account,
            purchases: {
              relicTcs: true,
            }
          });

          window.location.href = "/relics";
        }
      }
    })();
  }, [isAccepted]);

  return (
    <AgreeTermInnerContainer style={{
      width: "100%",
      backgroundImage: "url(" + image + ")",
      backgroundSize: "cover",
      backgroundPosition: "center 0"
    }}>
      <PopupContainer>
        <TermsAndConditionPopupMessage onClick={e => e.stopPropagation()}>
          <button onClick={onAcceptClick}>
            Enter
          </button>

          <div className="terms-and-condition-container">
            <label className="container">
              I agree to the updated<br/>
              <Link target="_blank" to={"terms.html"}>Terms and Conditions</Link>
              <input type="checkbox" checked={isAccepted} onChange={() => setIsAccepted(!isAccepted)}/>
              <span className="checkmark"></span>
            </label>
          </div>
        </TermsAndConditionPopupMessage>
      </PopupContainer>
    </AgreeTermInnerContainer>
  );
};

export default AgreeTermAndCondition;
