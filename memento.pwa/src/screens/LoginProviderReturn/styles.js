import styled from "styled-components";
export const FullHeight = styled.div`
  height: 100%;
  width: 100%;
`;

export const Section = styled.section`
  position: relative;
  background-color: ${(props) => props.backgroundcolor || "none"};
  ${(props) =>
  props.backgroundurl
    ? `background: url(${props.backgroundurl}) no-repeat center center`
    : ""};
  background-size: cover;
`;

export const SectionSpacing = styled.div`
  padding: 8em 0;
  padding-top: 35px;
  @media screen and (max-width: 991px) {
    padding: 6em 0;
  }
`;

export const SectionSpacingSmall = styled.div`
  padding: 0em 0;
  @media screen and (max-width: 991px) {
    padding: 2em 0;
  }
`;

export const Tile = styled.div`
  align-items: center;
  background-color: var(--blue);
  box-shadow: 0px 3px 10px #0000001a;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  padding: 1em;
  text-align: center;
  width: 100%;
`;
export const Paragraph = styled.p`
  color: ${(props) => props.color || "var(--black)"};
  font-size: ${(props) => props.size || "16"}px;
  font-weight: var(--font-weight-light);
  line-height: 1.3;
  letter-spacing: 0.5;
  font-family: var(--font-headings);
  text-align: center;
  letter-spacing: 0.5px;
  line-height: 1.6;
`;
export const Heading = styled.h1`
  font-weight: var(--font-weight-light);
  font-family: var(--font-headings);
  text-align: "center";
  color: ${(props) => props.color || "var(--black)"};
  font-size: ${(props) => props.size || "54"}px;
  font-weight: var(--font-weight-bold);
`;
export const ResponsiveButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (min-width: 768px) {
    > button {
      font-size: 1.6rem;
      max-width: 243px;
    }
  }
  @media screen and (min-width: 1024px) {
    flex-direction: row;
    justify-content: end;
    > button {
      font-size: 1.4rem;

      :first-child {
        margin-right: 2rem;
      }
    }
  }
`;
