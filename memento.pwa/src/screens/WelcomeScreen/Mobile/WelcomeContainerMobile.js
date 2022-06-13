import React from "react";
import WelcomeBackground from "../../../assets/images/welcome_bg.jpg";

import {isPwa} from "../../../components/AuthLayout";
import {
  FormContainer,
  ImgContainer
} from "../styles";
import heartIcon from "../../../assets/icons/welcome-screen/heart-icon.jpg";
import followIcon from "../../../assets/icons/welcome-screen/follow-icon.jpg";
import starFilledIcon from "../../../assets/icons/welcome-screen/star-icon.jpg";
import commentIcon from "../../../assets/icons/welcome-screen/comment-icon.jpg";
import {Link} from "react-router-dom";
import {WelcomeContainer} from "../Desktop/styles";

export default () => {
  return (
    <FormContainer>
      <ImgContainer>
        <img src={WelcomeBackground} alt="Welcome"/>
        <div>
          Welcome to Relica
        </div>
      </ImgContainer>

      <WelcomeContainer>
        <div className="mb-4 d-flex flex-column align-items-center flex-grow-1">
          <div>
            Relica is a photo sharing platform that allows you to generate money from your content.
          </div>

          <div>
            Money is paid to you when others interact with your photos.
          </div>

          <div>
            <ol>
              <li>
                <img src={heartIcon} alt="Likes" width={20}/>Likes: <span>$0.03</span>
              </li>

              <li>
                <img src={followIcon} alt="Follows" width={20}/>Follows: <span>$0.10</span>
              </li>

              <li>
                <img src={starFilledIcon} alt="Favourites" width={20}/>Favourites: <span>$0.03</span>
              </li>

              <li>
                <img src={commentIcon} alt="Comments" width={20}/>Comments: <span>$0.02</span>
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
      </WelcomeContainer>

      <Link to="/first-post" className="next-btn" style={{
        margin: `0 auto ${
          window.mobileCheck() && !isPwa() ? "75px" : "75px"
        }`
      }}>
        <span>Next</span>
      </Link>
    </FormContainer>
  );
};
