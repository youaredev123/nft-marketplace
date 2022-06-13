import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: ${({ height }) => `${height}`};
  margin: 0;

  .option-menu {
    padding: 5px;
    cursor: pointer;
    position: absolute;
    width: 35px;
    right: 5px;
    fill: darkgrey;
  }

  .remove-relic-btn {
    margin-bottom: 30px;
    width: 120px;
    border-radius: 6px 0 0 6px;
    background: #E40016;
    position: absolute;
    right: 0px;
    top: 35px;
    padding: 10px;
    font-size: 1.6rem;
  }

  @media (max-width: 480px) {
    display: none;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  flex: 1 1 40%;
  padding: 0 0 2rem 0;

  @media (min-width: 769px){
    .unlock-wrapper {
      > p {
        font-size: 3rem !important;
      }
    }
  }
`;

export const ImageContainerContent = styled.div`
  margin: 0 auto;
  width: ${({ imageLoaded }) => imageLoaded ? 'fit-content' : '100%'};
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  div.image-wrapper {
    margin: 0 auto 1.5rem auto;
    width: fit-content;

    img {
      width: 100%;
      height: 100%;

      @media (min-width: 481px) {
        border-top-left-radius: 6px;
      }
  }
`;

export const InfoContainer = styled.div`
  padding-top: 2rem;
  display: flex;
  flex: 1 1 30%;
  border-left: 1px solid ${({ theme }) => theme.copyLinkIconBgc};
  display: flex;
  flex-direction: column;

  & > div {
    ::-webkit-scrollbar {
      width: 0;
    }
  }
`;
export const Info = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 70%;
  height: 70%;
  width: 100%;
  padding: 0 2rem;
  overflow: hidden;
`;

export const CommentContainer = styled.div`
  overflow: auto;
  max-height: 300px;
  margin-bottom: 2rem;
`;
