import React from 'react';
import {
  ActionContainer,
  Actions,
  Info,
  InfoContainer,
  InfoLogo,
  InfoText,
  WelcomeContainer,
  WelcomeText
} from "./styles";
import bg from "assets/images/AuthBackkground.png";
import bgBig from "assets/images/AuthBackkground@2.png";
import logo from "assets/images/marketing-logo.png";
import back from "assets/images/back.svg";
import heartIcon from "../../../assets/icons/welcome-screen/heart-icon.jpg";
import followIcon from "../../../assets/icons/welcome-screen/follow-icon.jpg";
import starFilledIcon from "../../../assets/icons/welcome-screen/star-icon.jpg";
import commentIcon from "../../../assets/icons/welcome-screen/comment-icon.jpg";
import {Link} from "react-router-dom";
import {isPwa} from "../../../components/AuthLayout";

const WelcomeContainerDesktop = () => {
  return (
    <>
      <InfoContainer>
        <img src={bg}
             srcSet={bg + ' 1x,' + bgBig + ' 2x'}
             alt=""/>
        <Info>
          <InfoLogo>
            <img src={logo} alt=""/>
          </InfoLogo>
          <InfoText>
            Post photos. Make money. Maintain ownership
          </InfoText>
        </Info>
      </InfoContainer>

      <ActionContainer>
        <Actions>
          <WelcomeContainer>
            <img src={back} alt=""/>
            <WelcomeText>Welcome to Relica!</WelcomeText>

            <div className="mb-4 d-flex flex-column align-items-center flex-grow-1">
              <div>
                Relica is a photo sharing platform that allows you to generate money from your content.
              </div>

              <div>
                The money is generated when others interact with your photos.
              </div>

              <div>
                <ol>
                  <li>
                    <img src={heartIcon} alt="Likes" width={20}/>Likes: <span>$0.02</span>
                  </li>

                  <li>
                    <img src={followIcon} alt="Follows" width={20}/>Follows: <span>$0.08</span>
                  </li>

                  <li>
                    <img src={starFilledIcon} alt="Favourites" width={20}/>Favourites: <span>$0.02</span>
                  </li>

                  <li>
                    <img src={commentIcon} alt="Comments" width={20}/>Comments: <span>$0.01</span>
                  </li>
                </ol>
              </div>

              <div>
                Photos cost $0.01 to post.
              </div>

              <div>
                Top up your wallet to start earning!
              </div>
            </div>

            <Link to="/first-post" className="next-btn" style={{
              margin: `0 auto ${
                window.mobileCheck() && !isPwa() ? "75px" : "75px"
              }`
            }}>
              <span>Next</span>
            </Link>
          </WelcomeContainer>
        </Actions>
      </ActionContainer>
    </>
  );
};

export default WelcomeContainerDesktop;
