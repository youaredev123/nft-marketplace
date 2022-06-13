import styled from "styled-components";
import Button from "../../components/Button";

export const OuterContainer = styled.div`
  height: 100%;
  position: relative;

  @media (min-width: 481px) {
    height: auto;
  }
`;

export const InnerContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 481px) {
    height: auto;
  }
`;

export const AgreeTermInnerContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 481px) {
    height: 93vh;
    border-radius: 6px;
  }
`;

export const PopupContainer = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 3;
`;

export const MapContainer = styled.div`
  position: relative;
  width: 100%;
  flex-grow: 1;
  .mapboxgl-ctrl-top-right {
    .mapboxgl-ctrl {
      margin: 115px 10px 0 0;
      border-radius: 10px;
      box-shadow: rgb(0 0 0 / 10%) 0px 2px 6px;

      @media (min-width: 481px) {
        display: none;
      }
    }
  }
  .mapboxgl-ctrl button.mapboxgl-ctrl-geolocate .mapboxgl-ctrl-icon {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='grey'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 005.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 009 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 003.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0011 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 110 7 3.5 3.5 0 110-7z'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3C/svg%3E")
  }
  .mapboxgl-ctrl button.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-active .mapboxgl-ctrl-icon {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%2333b5e5'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 005.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 009 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 003.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0011 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 110 7 3.5 3.5 0 110-7z'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3C/svg%3E");
  }
  .mapboxgl-ctrl button.mapboxgl-ctrl-geolocate.mapboxgl-ctrl-geolocate-background .mapboxgl-ctrl-icon {
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='%2333b5e5'%3E%3Cpath d='M10 4C9 4 9 5 9 5v.1A5 5 0 005.1 9H5s-1 0-1 1 1 1 1 1h.1A5 5 0 009 14.9v.1s0 1 1 1 1-1 1-1v-.1a5 5 0 003.9-3.9h.1s1 0 1-1-1-1-1-1h-.1A5 5 0 0011 5.1V5s0-1-1-1zm0 2.5a3.5 3.5 0 110 7 3.5 3.5 0 110-7z'/%3E%3C/svg%3E");
  }
  .mapboxgl-ctrl-group {
    button {
      width: 42px;
      height: 42px;
    }
  }
  .mapboxgl-ctrl-attrib {
    display: none;
  }
  .mapboxgl-ctrl-logo {
    display: none;
  }
  .mapboxgl-marker {
    z-index: 1;
  }
  & .mapboxgl-popup-content {
    background: transparent !important;
    border-radius: 100px;
    height: 50px;
    padding: 15px 10px 15px;
    box-shadow: none;
  }
  & .mapboxgl-popup-tip{
    display: none;
  }
  & .mapboxgl-popup {
    z-index: 2;
    position: absolute;
    top: 70vh;
    left: 50%;
    display: flex;
    will-change: transform;
    pointer-events: none;
    bottom: 10;
    transform: translate(-50%, 0px) !important;

    @media (min-width: 481px) {
      top: 70vh;
    }
  }
  & .mapboxgl-popup-content button {
    font-size: 17px;
    color: var(--blue);
    padding: 15px 15px;
    border: none;
    position: absolute;
    top: 0;
    
  }
  &.confirmed .mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip {
    border-top-color: #08bffa;
  }
  &.confirmed .mapboxgl-popup-anchor-top .mapboxgl-popup-tip {
    border-bottom-color: #08bffa;
  }
  &.confirmed .mapboxgl-popup-anchor-right .mapboxgl-popup-tip {
    border-left-color: #25adf5;
    position: relative;
    right: 3px;
  }
  &.confirmed .mapboxgl-popup-anchor-left .mapboxgl-popup-tip {
    border-right-color: #06dafe;
    position: relative;
    left: 3px;
  }

  .desktop-select-countries-scrollable {
    background-color: ${({ theme }) => theme?.bgc || '#ffffff'};
    z-index: 4; 
  }
`;

export const TopBar = styled.div`
  width: 100%;
  height: 60px;
  border-bottom: 1px solid ${({ theme }) => theme.notificationBorderBottom};

  @media (min-width: 481px){
    display: none;
  }
`;

export const SelectBar = styled.div`
  display: flex;
  position: relative;

  &:after {
    content: "";
    display: block;
    border-bottom: 3px solid var(--blue);
    width: 50%;
    position: absolute;
    bottom: -25px;
    -webkit-transition: 0.5s ease;
    transition: 0.5s ease;
    left: ${({ place }) => place * 100 / 2}%;
  }
`;

export const FilterElem = styled.div`
  width: 50%;
  height: 35px;
  font-size: 14px;
  color: #939393;

  & div {
    padding: 35px 0 7px 0;
    width: 100%;
    text-align: center;
    cursor: pointer;
  }
`;

export const FilterElemActive = styled.div`
  color: #10A5F5;
`;

export const Hidden = styled.div`
  & * {
    display: none;
  }
`;

export const Popup = styled.div`
  width: 198px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const PostButton = styled(Button)`
  padding: 17px;
  font-size: 18px;
`;

export const AddressBlockCentered = styled.div`
  text-align: center;
  width: 100%;
  padding: 10px 0;
`;

export const AddressBlock = styled.div`
  width: 100%;
  padding: 5px 0;
`;

export const Address = styled.span`
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

export const Coordinates = styled.span`
  color: var(--blue);
`;

export const PageContainer = styled.div`
  position: relative;
  height: calc(100% - 40px);
`;

export const SidesMarginSplitter = styled.hr`
  border: 8px solid ${({ theme }) => theme.notificationBorderBottom};
  margin-top: 6rem;
`;

export const SidesMarginContainer = styled.div`
  margin: 0 20px;
`;

export const SliderContainerWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export const ImageContainer = styled.img`
  width: 100%;
  height: 100%;
`;

export const ImageContainerWrapper = styled.div`
  position: relative;
  width: 180px;
  height: 180px;
  margin: 20px 20px 20px 0;
`;

export const ImageContainerInnerWrapper = styled.div`
  //box-shadow: 0 5px 6px -4px rgb(0 0 0 / 40%);
  border-radius: 20px;
  //overflow: hidden;
  position: absolute;
`;

export const MoneyContainer = styled.div`
  width: 180px;
  padding-top: 10px;
`;

export const SelectValue = styled.select`
  float: right;
  appearance: none;
  border: none;
  cursor: pointer;
`;

export const PopupMessage = styled.div`
  width: 250px;
  height: 180px;
  background-color: ${({ theme }) => theme.bgc};
  border-radius: 10px;
  box-shadow: var(--grey) 0px 2px 6px;
  text-align: center;
  padding: 15px;
`;

export const TermsAndConditionPopupMessage = styled.div`
  width: 270px;
  border-radius: 10px;
  padding: 15px;
  line-height: 25px;

  button {
    width: 100%;
    border: none;
    background: white;
    padding: 15px;
    border-radius: 35px;
    margin-bottom: 15px;
    font-size: 17px;
    color: var(--blue);
    box-shadow: var(--grey) 0px 2px 6px;
    cursor: pointer;
  }

  .terms-and-condition-container {
      padding: 20px;
      background-color: white;
      border-radius: 10px;
      box-shadow: var(--grey) 0px 2px 6px;
  }

  a {
    text-decoration: none;
    font-weight: bold;
  }

  /* The container */
  .container {
    display: block;
    position: relative;
    padding: 0 0 0 40px;
    cursor: pointer;
    color: black;
    font-weight: normal;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /* Hide the browser's default checkbox */
  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  /* Create a custom checkbox */
  .checkmark {
    position: absolute;
    top: 10px;
    left: 0;
    height: 25px;
    width: 25px;
    border: 2px solid var(--blue);
    border-radius: 4px;
  }

  /* On mouse-over, add a grey background color */
  .container:hover input ~ .checkmark {
    background-color: white;
  }

  /* When the checkbox is checked, add a blue background */
  .container input:checked ~ .checkmark {
    background-color: var(--blue);
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  /* Show the checkmark when checked */
  .container input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the checkmark/indicator */
  .container .checkmark:after {
    left: 8px;
    top: 2px;
    width: 7px;
    height: 13px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;

export const DiscoveredPopupMessage = styled.div`
  width: 300px;
  line-height: 30px;
  background-color: white;
  border-radius: 10px;
  box-shadow: var(--grey) 0px 2px 6px;
  text-align: center;
  padding: 30px;
`;

export const PopupHeader = styled.span`
  color: var(--blue);
  display: block;
  padding-bottom: 20px;
`;

export const PopupBigHeader = styled.span`
  display: block;
  font-size: 2rem;
  color: var(--black);

  strong {
    font-weight: 600;
  }

  .currency {
    color: #0DAF00;
  }
`;

export const PopupButton = styled.button`
  width: 80px;
  height: 30px;
  background-color: ${({ theme }) => theme.bgc};
  border-radius: 10px;
  border: none;
  box-shadow: var(--grey) 0px 2px 6px;
  margin-top: 30px;
  cursor: pointer;
`;

export const BuriedSelector = styled.div`
  width: 100%;
  margin: 10px 0;
`;

export const NoPostsText = styled.div`
  align-items: center;
  color: var(--blue);
  display: flex;
  font-size: 1.6rem;
  height: 90%;
  justify-content: center;
  text-align: center;
  width: 100%;
`;

export const ProfileContainer = styled.div`
  width: 100%;
`;

export const FullHeight = styled.div`
  min-height: calc(100% - 58px);
  background: ${({ theme }) => theme.bgc};
  padding-bottom: 60px;
`;

export const RelicItemContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RelicItemContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 15px 0px;
`;

export const RelicItemProfileData = styled.div`
  flex-grow: 1;
  margin: auto;
  padding-right: 18px;
  color: ${({ theme }) => theme.text};

  a {
    padding-right: 20px;
    font-weight: bold;
    font-size: 2.3rem;
    font-family: var(--font-headings);
    color: ${({ theme }) => theme.text};
    text-decoration: none;
  }

  .reward {
    color: #10D310;
    font-weight: bold;
  }
`;

export const RelicItemProfileText = styled.div`
  margin: 0px 15px;
`;

export const RelicItemProfileReward = styled.div`
  display: none;
`;

export const TextItem = styled.div`
  align-items: center;
  color: var(--blue);
  display: flex;
  font-weight: var(--font-weight-regular);
  font-size: 1.6rem;
  height: 90%;
  justify-content: center;
  text-align: center;
  width: 100%;
`;

export const Heading = styled.div`
  font-size: 2.5rem;
  font-weight: var(--font-weight-bold);
  padding-top: 3.5rem;
  padding-bottom: 2.3rem;
  width: 100%;
  color: ${({ theme }) => theme.text};
  text-align: center;

  @media (max-width: 480px) {
    display: none;
  }
`;

export const ContentWrapper = styled.div`
  height: 100%;

  @media (min-width: 481px) {
    // margin: 0 2rem;
    height: auto;
  }
`

export const SlideHeaderContainer = styled.div`
  display: flex;
  padding: 6px 14px;
  font-weight: var(--font-weight-medium);
  font-size: 1.6rem;
  height: 56px;
  background-color: ${({ theme }) => theme?.popUpHeaderColor || "var(--lightGrey)"};
  color: ${({ theme }) => theme?.text || "var(--black)"};
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--grey2);
  cursor: pointer;
`;

export const CurrentCountryWrapper = styled.div`
  padding: 15px !important;
  color: grey;
  font-family: "Nunito Sans", sans-serif;
  font-weight: 500;
  justify-content: space-between;
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 10%) 0px 2px 6px;
  background-color: white;
  position: absolute;
  left: 10px;
  top: 10px;
  width: fit-content;
  z-index: 3;
`

export const NoteText = styled.div`
  margin-top: 2%;
  
  p {
    margin-bottom: 5px;
    color: lightgray;
    font-family: "Nunito Sans", sans-serif;
    justify-content: space-between;
    text-align: center;
    line-height: 20px;
  }
`
export const PurchaseMapButton = styled.div`
  & Button {
    display: flex;
  }
  height: 100%;
  top: 80%;
  position: absolute;
  align-items: center;
  justify-content: center;
  z-index: 3;

  @media (max-width: 480px) {
    width: 80%;
  }
`;

export const LockIcon = styled.img`
  height: 30px;
  margin: auto;

  @media (min-width: 480px) {
    margin-right: 15px;
  }
`

export const CenterText = styled.div`
  margin: auto;
`
