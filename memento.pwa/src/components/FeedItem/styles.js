import styled, { keyframes, css } from "styled-components/macro";
import { Link } from "react-router-dom";

export const FeedItemContainer = styled.div`
  padding: 2rem 0;
  width: 100%;
  margin: 0 auto;
  background: ${({ theme }) => theme.bgc};

  @media (min-width: 481px){
    margin: 0;
    padding: 2rem 0rem;
    border-radius: 6px;
    background: ${({ theme }) => theme.backgroundBoxColor};
    border: 1px solid ${({theme}) => theme.borderLineColor};
  }

  @media (min-width: 769px){
    margin: 0 auto;
    width: 100%;
    background: ${({ theme }) => theme.backgroundBoxColor};

    .unlock-wrapper {
      > p {
        font-size: 3rem !important;
      }
    }
  }
`;

export const FeedHeaderWrapper = styled.div`
  padding: 0 2rem;
  margin: 0;

  @media (max-width: 480px) {
    margin-bottom: 1rem;
    padding: 0 1.5rem;
  }
`

export const FeedHeaderContainer = styled.div`
  display: flex;
  margin-top: -20px;
  justify-content: flex-start;
  align-items: center;
  height: 80px;

  @media (max-width: 481px){
    height: 100px;
  }

  @media (min-width: 481px){
    margin-top: 0;
    flex-direction: row;
    margin-bottom: 0;

    > a {
      display: flex;
      height: 100%;
      flex: 1 auto;
    }

    img {
      width: 56px;
      height: 56px;
    }
  }
`;

export const FeedTitleContainer = styled.div`
  display: flex;
  padding-top: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  @media (min-width: 481px){
    padding-top: 5px;
    flex: 1 100%;
    height: 100%;
    justify-content: flex-start;
  }
`;

export const FeedTitle = styled(Link)`
  font-size: 2.3rem;
  padding-left: 4px;
  padding-bottom: 4px;
  line-height: 24px;
  text-decoration: none;
  font-family: var(--font-headings);
  font-weight: var(--font-weight-bold);
  color: ${({ theme }) => theme.text};

   @media (min-width: 481px){
    font-size: 25px;
  }
`;

export const FeedTimestamp = styled.p`
  padding-bottom: 20px;
  a {
    letter-spacing: 0;
    padding-left: 5px;
    line-height: 16px;
    color: var(--blue);
    font-size: 1.2rem;
    margin: 0;
    text-decoration: none;
    &:hover,
    &:focus {
      outline: none;
      cursor: pointer;
    }
  }

  @media (min-width: 481px){
    padding-top: 0;
    padding-bottom: 0;

    a {
      display: flex;
      margin-top: 0.5rem;
      font-size: 14px;
    }
  }
`;

export const FeedDescription = styled.p`
  letter-spacing: 0;
  line-height: 20px;
  color: var(--black);
  font-size: 1.5rem;
  margin: 0 0 20px;
  word-break: break-word;

  .tag-description {
    word-break: break-word;
    color: ${({ theme }) => theme.text};

  }
  a {
    text-decoration: none;
    color: var(--blue);
    &:hover {
      cursor: pointer;
    }
  }

   @media (min-width: 481px){
    .tag-description {
      font-size: 14px;
    }
  }
`;

export const FeedBottomBar = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;

  @media (min-width: 481px){
    padding: 0 2rem;
  }
`;

export const FeedActionsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  & > *:last-child {
    margin-left: auto;
    margin-right: 0 !important;
  }
`;

export const IconContainer = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 0;
  outline: none;
  background-color: transparent;
  padding: 0;

  &:hover,
  &:focus {
    cursor: pointer;
  }
`;

const circles = [
  [
    { start: "#8CE8C3", end: "#10A5F5" },
    { start: "#8BE7C2", end: "#10A5F5" }
  ],
  [
    { start: "#90D2FA", end: "#99E9C8" },
    { start: "#91D1F9", end: "#10A5F5" }
  ],
  [
    { start: "#CC8EF5", end: "#D3F491" },
    { start: "#CB8DF4", end: "#DCE483" }
  ],
  [
    { start: "#8CE8C3", end: "#59C392" },
    { start: "#8CE8C3", end: "#67CD9F" }
  ],
  [
    { start: "#F58EA7", end: "#CAADC7" },
    { start: "#F48DA6", end: "#959FF3" }
  ],
  [
    { start: "#91D2FA", end: "#CA5ED8" },
    { start: "#91D2FA", end: "#A975D1" }
  ],
  [
    { start: "#92D3FC", end: "#C35DD1" },
    { start: "#CB8DF4", end: "#90E0BE" }
  ]
];
const angleBetweenCircles = 2 * Math.PI / circles.length;
const shiftAngleBeginning = -Math.PI / 4 * 3;
const sizeEms = 1.5;
const circleSizeEms = sizeEms / 6.;

const animDuration = '0.8s';
const animStep = 1. / 27;
function getStep(i) {
  return ((i - 1) * animStep) * 100 + "%";
}

const likeAnimation = keyframes`
${getStep(1)},
${getStep(6)} {
  transform: scale(0);
}
${getStep(13)} {
  transform: scale(1.25);
}
${getStep(18)}{
  transform: scale(1.);
}
${getStep(23)} {
  transform: scale(1.025);
}
${getStep(28)} {
  transform: scale(1.);
}
`;

export const IconWrapper = styled.div`
  position: relative;
  height: 24px;
  width: 24px;
  & > svg {
    ${(props) => (props.animate ?
      css`animation-name: ${likeAnimation};
      animation-duration: ${animDuration};
      animation-timing-function: ease-in;
      animation-iteration-count: 1;` : "")}
  }
`;

const mixColors = function(color1, color2, weight) {
  const d2h = d => { return d.toString(16); }
  const h2d = h => { return parseInt(h, 16); }

  var color = "#";
  if (color1[0] === "#") {
    color1 = color1.substr(1);
  }
  if (color2[0] === "#") {
    color2 = color2.substr(1);
  }

  // for red, green and blue
  for (var i = 0; i <= 5; i += 2) {
    const v1 = h2d(color1.substr(i, 2));
    const v2 = h2d(color2.substr(i, 2));
    const val = Math.floor(v2 + (v1 - v2) * weight);

    color += d2h(val).padStart(2, "0");
  }

  return color;
};

const ringAnimation = keyframes`
${getStep(1)} {
  height: 0;
  width: 0;
  border-width: 0;
  margin-top: 0;
  margin-left: 0;
}
${getStep(2)} {
  height: 0;
  width: 0;
  border-width: ${sizeEms * 0.1}em;
  margin-top: ${-sizeEms * 0.1}em;
  margin-left: ${-sizeEms * 0.1}em;
  border-color: #10A5F5;
}
${getStep(3)} {
  height: 0;
  width: 0;
  border-width: ${sizeEms * 0.7}em;
  margin-top: ${-sizeEms * 0.7}em;
  margin-left: ${-sizeEms * 0.7}em;
}
${getStep(4)} {
  height: 0;
  width: 0;
  border-width: ${sizeEms * 0.8}em;
  margin-top: ${-sizeEms * 0.8}em;
  margin-left: ${-sizeEms * 0.8}em;
}
${getStep(5)} {
  height: 0;
  width: 0;
  border-width: ${sizeEms * 0.85}em;
  margin-top: ${-sizeEms * 0.85}em;
  margin-left: ${-sizeEms * 0.85}em;
}
${getStep(6)} {
  width: ${sizeEms * 1.2}em;
  height: ${sizeEms * 1.2}em;
  border-width: ${sizeEms * 0.25}em;
  border-color: #10A5F5;
}
${getStep(7)} {
  width: ${sizeEms * 1.6}em;
  height: ${sizeEms * 1.6}em;
  border-width: ${sizeEms * 0.05}em;
}
${getStep(8)} {
  width: ${sizeEms * 1.7}em;
  height: ${sizeEms * 1.7}em;
  border-width: 0;
  margin-top: ${-sizeEms * 0.85}em;
  margin-left: ${-sizeEms * 0.85}em;
}
`;

export const IconRing = styled.div`
  display: block;
  position: absolute;
  border-width: 0;
  border-style: solid;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  box-sizing: content-box;

  animation-name: ${ringAnimation};
  animation-duration: ${animDuration};
  animation-timing-function: linear;
  transition-timing-function: linear;
  animation-iteration-count: 1;
`;

function createBoxShadow({ distance1, distance2, size1, size2, shiftAngle, colorRatio }) {
  var boxS = [];
  circles.forEach((circle, i) => {
    const angle1 = (i * angleBetweenCircles) + shiftAngleBeginning;
    const angle2 = angle1 + shiftAngle;
    const distanceRatio1 = sizeEms * distance1;
    const distanceRatio2 = sizeEms * distance2;
    const firstCircleStart = circle[0].start;
    const firstCircleEnd = circle[0].end;
    const secondCircleStart = circle[1].start;
    const secondCircleEnd = circle[1].end;

    boxS.push(`${Math.cos(angle1) * distanceRatio1}em ${Math.sin(angle1) * distanceRatio1}em 0
      ${circleSizeEms * size1}em ${mixColors(firstCircleStart, firstCircleEnd, colorRatio)}`);

    boxS.push(`${Math.cos(angle2) * distanceRatio2}em ${Math.sin(angle2) * distanceRatio2}em 0
      ${circleSizeEms * size2}em ${mixColors(secondCircleStart, secondCircleEnd, colorRatio)}`);
  });
  return boxS.join(",");
}

const circlesAnimation = keyframes`
  ${getStep(1)},
  ${getStep(6)} {
    box-shadow: ${createBoxShadow({ distance1: 0.75, distance2: 0.75, size1: -0.500, size2: -0.500, colorRatio:    4.97, shiftAngle: -Math.PI / 36})};
  }
  ${getStep(7)} {
    box-shadow: ${createBoxShadow({ distance1: 0.80, distance2: 0.85, size1: -0.200, size2: -0.200, colorRatio:    1, shiftAngle: -Math.PI / 36 })};
  }
  ${getStep(15)} {
    box-shadow: ${createBoxShadow({ distance1: 1.20, distance2: 1.00, size1: -0.100, size2: -0.350, colorRatio: 0.25, shiftAngle: -Math.PI / 15 })};
  }
  ${getStep(23)},
  ${getStep(28)} {
    box-shadow: ${createBoxShadow({ distance1: 1.20, distance2: 1.00, size1: -0.500, size2: -0.500, colorRatio:    0, shiftAngle: -Math.PI / 15 })};
  }
`;

export const IconCircles = styled.div`
  display: block;
  position: absolute;
  height: ${circleSizeEms}em;
  width: ${circleSizeEms}em;
  top: 50%;
  left: 50%;
  margin-top: ${-circleSizeEms / 2}em;
  margin-left: ${-circleSizeEms / 2}em;
  z-index: 2;
  border-radius: 50%;

  animation-name: ${circlesAnimation};
  animation-duration: ${animDuration};
  animation-timing-function: ease-in;
  animation-iteration-count: 1;
`;

export const IconLabel = styled.span`
  color: var(--grey);
  font-size: 1.5rem;
  letter-spacing: 0;

  @media (min-width: 481px){
    font-size: 17px;
  }
`;

export const Spacer = styled.div`
  background-color: #f4f4f4;
  height: 15px;
  width: 100%;
`;

export const ImageContainer = styled.img`
  box-shadow: 0 5px 6px -4px rgb(0 0 0 / 40%);
  width: 100%;
  display: ${(props) => props.imageLoaded ? "flex" : "none"};
  &:hover {
    ${(props) => (props.cannavigate ? "cursor: pointer;" : "")}
  }

  // Fix for maximum height of image include in 1 screen
  width: 100%;

  @media (min-width: 481px){
    border-radius: ${(props) => props.isBig ? "6px 0 0 6px" : "0"};
  }
`;
export const PostContainer = styled.div`
  border-bottom: ${({ theme }) => theme.borderBottom};
  background: ${({ theme }) => theme.bgc};
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 481px){
    margin-left: 1px;
    margin-bottom: 15px;
    border-bottom: none;
    display: ${({inPostScreen}) => inPostScreen ? 'none' : 'flex'};
  }
`;
export const ImgBox = styled.div`
  margin-bottom: 20px;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;
export const SkeletonContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
  > * {
    width: 100%;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
`;
