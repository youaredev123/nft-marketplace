import styled from "styled-components";

export const ActionContainer = styled.div`
  width: 50%;
  height: 100%;
  background: var(--white);
  position: relative;
`;

export const Actions = styled.div`
  position: absolute;
  width: 66.666%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 600px){
    width: 80%;
    left: 10%;
  }
`;

export const Info = styled.div`
  position: absolute;
  width: 60%;
  left: 20%;
  top: 25%;
`;

export const InfoContainer = styled.div`
  width: 65%;
  position: relative;
  overflow: hidden;

  & > img {
    height: 100%;
    width: 100%;
    position: absolute;
  }
`;

export const InfoLogo = styled.div`
  display: flex;
  align-items: center;
  text-align: left;
  font: normal normal bold 43px/57px Roboto;
  letter-spacing: 0;
  color: #FFFFFF;

  & img {
    height: 150px;
    margin-right: 20px;
  }
  margin-bottom: 15px;

  @media (max-width: 1200px){
    font-size: 35px;

    & img {
      height: 150px;
    }
  }

   @media (max-width: 768px){
    & img {
      height: 75px;
    }
  }
`;

export const InfoText = styled.div`
  font-family: "Nunito Sans",sans-serif;
  font-size: 50px;
  font-weight: 800;
  line-height: 60px;  letter-spacing: 0;
  color: #FFFFFF;
  text-shadow: 0 3px 6px #00000038;

  @media (max-width: 1200px){
    font-size: 35px;
  }

  @media (max-width: 768px){
    font: normal normal bold 20px/30px Roboto;
  }
`;

export const FirstPostContainer = styled.div`
  @media (max-width: 482px)
  {
    text-align: center;
    padding: 0 20px;

    ol {
      width: fit-content;
      text-align: left;
      margin: 0 auto;
    }
  }

  position: relative;

  & > img {
    position: absolute;
    top: -63px;
    width: 61px;
    height: 21px;
    cursor: pointer;
  }

  .mb-4 {
    margin: 30px 0;
  }

  p {
    width: 100%;
    margin-bottom: 10px;
    position: relative;
    font-family: "Nunito Sans", sans-serif;
    font-size: 17px;
    line-height: 26px;
  }

  ol {
    li {
      img {
        margin-right: 8px;
      }

      span {
        color: var(--green);
      }
    }
  }
`;

export const WelcomeText = styled.div`
  text-align: left;
  font: normal normal bold 40px/53px Roboto;
  font-family: "Nunito Sans", sans-serif;
  letter-spacing: 0;
  color: #000000;
`;
