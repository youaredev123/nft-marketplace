import styled from "styled-components";
import { ReactComponent as LogoIcon } from "../../assets/images/logo.svg";
import { ReactComponent as Logo } from "../../assets/images/relica-word-white.svg";

export const SplashContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 2.5em 0 4em;
`;

export const LogoName = styled(Logo)`
  min-width: 300px;
  width: 300px;
  height: 110px;
  min-height: 110px;
  
  @media (max-width: 375px) {
    width: 200px;
    max-height: 70px;
  }
`;

export const LogoShadow = styled(LogoIcon)`
  min-width: 225px;
  width: 250px;
`;

export const SplashHeader = styled.p`
  font-size: 25px;
  text-align: center;
  font-family: var(--font-headings);
  font-weight: var(--font-weight-bold);
  letter-spacing: 0;
  color: white;
`;

export const SplashParagraph = styled.p`
  text-align: center;
  padding: 0 3em;
  line-height: 20px;
  letter-spacing: 0;
  font-size: 1.5rem;
  color: white;
`;

export const SplashPrompt = styled.div`
  width: 100%;
`;

export const ReferredOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  background-color: #fff;
  opacity: 0.8;
`;

export const ReferredWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ReferredBlock = styled.div`
  width: 270px;
  max-width: calc(100% - 50px);
  max-height: 100%;
  background-color: var(--blue);
  border-radius: 20px;
  padding: 30px 10px 10px 10px;
`;

export const ReferredHeader = styled.p`
  font-size: 25px;
  text-align: center;
  letter-spacing: 0;
  color: white;
`;

export const ReferredParagraph = styled.p`
  text-align: center;
  line-height: 25px;
  letter-spacing: 0;
  font-size: 1.8rem;
  color: white;
`;

export const ReferredImg = styled.img`
  object-fit: contain;
  width: 250px;
  height: 130px;
  margin: 10px 0;
`;
