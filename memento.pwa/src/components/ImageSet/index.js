import React, { useRef } from "react";
import styled from "styled-components";
import { useIntersection } from "use-intersection";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const spacer =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

function Item({ gridArea, children }) {
  if (children) {
    return (
      <div
        style={{
          gridArea,
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        {children}
      </div>
    );
  }
  return null;
}

function OneGroup({ children }) {
  const items = React.Children.toArray(children);

  return <Item gridArea="a">{items[0]}</Item>;
}

function TwoGroup({ children }) {
  const items = React.Children.toArray(children);

  return (
    <div
      style={{
        display: "grid",
        gridGap: "4px",

        gridTemplateRows: "1fr",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateAreas: '"a b"',
      }}
    >
      <Item gridArea="a">{items[0]}</Item>
      <Item gridArea="b">{items[1]}</Item>
    </div>
  );
}

function ThreeGroup({ children }) {
  const items = React.Children.toArray(children);

  return (
    <div
      style={{
        display: "grid",
        gridGap: "4px",

        gridTemplateRows: "1fr 1fr",
        gridTemplateColumns: "1fr 1fr 1fr",
        gridTemplateAreas: '"a a b" "a a c"',
      }}
    >
      <Item gridArea="a">{items[0]}</Item>
      <Item gridArea="b">{items[1]}</Item>
      <Item gridArea="c">{items[2]}</Item>
    </div>
  );
}

function FourGroup({ children }) {
  const items = React.Children.toArray(children);

  return (
    <div
      style={{
        display: "grid",
        gridGap: "4px",

        gridTemplateRows: "1fr 1fr",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateAreas: '"a b" "c d"',
      }}
    >
      <Item gridArea="a">{items[0]}</Item>
      <Item gridArea="b">{items[1]}</Item>
      <Item gridArea="c">{items[2]}</Item>
      <Item gridArea="d">{items[3]}</Item>
    </div>
  );
}

function FiveGroup({ children, numberOfImages }) {
  const items = React.Children.toArray(children);

  return (
    <div
      style={{
        display: "grid",
        gridGap: "4px",

        gridTemplateRows: "1fr 1fr",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gridTemplateAreas: '"a a b c" "a a d e"',
      }}
    >
      <Item gridArea="a">{items[0]}</Item>
      <Item gridArea="b">{items[1]}</Item>
      <Item gridArea="c">{items[2]}</Item>
      <Item gridArea="d">{items[3]}</Item>
      <Item gridArea="e">
        <span
          style={{
            color: "white",
            backgroundColor: "rgba(0,0,0,0.5)",
            position: "absolute",
            zIndex: 2,
            width: "100%",
            height: "100%",
            paddingTop: "33%",
            paddingLeft: "40%",
            borderRadius: "1rem",
          }}
        >
          +{numberOfImages - 5}
        </span>
        {items[4]}
      </Item>
    </div>
  );
}

export function ImageSet({ images, onClickIndex }) {
  const child = images.map((img, index) => (
    <Container className="position-relative" key={index}>
      <Image img={img} onClick={() => onClickIndex(index)} />
    </Container>
  ));
  return <OneGroup>{child}</OneGroup>;
  // if (child.length === 1) {
  //   return <OneGroup>{child}</OneGroup>;
  // } else if (child.length === 2) {
  //   return <TwoGroup>{child}</TwoGroup>;
  // } else if (child.length === 3) {
  //   return <ThreeGroup>{child}</ThreeGroup>;
  // } else if (child.length === 4) {
  //   return <FourGroup>{child}</FourGroup>;
  // } else if (child.length === 5) {
  //   return <FiveGroup>{child}</FiveGroup>;
  // } else if (child.length > 6) {
  //   return <FiveGroup numberOfImages={child.length}>{child}</FiveGroup>;
  // }
}

export function Image({ img, onClick }) {
  const target = useRef();
  const visible = useIntersection(target, {
    once: true,
  });

  return (
    <div
      ref={target}
      style={{
        display: "block",
        opacity: visible ? 1 : 0,
        width: "100%",
        backgroundRepeat: "no-repeat",
        paddingBottom: "100%",
        borderRadius: "1rem",
        backgroundImage: `url(${URL.createObjectURL(img)})`,
        backgroundPosition: "center center",
        backgroundSize: "contain",
      }}
      onClick={onClick}
    />
  );
}
