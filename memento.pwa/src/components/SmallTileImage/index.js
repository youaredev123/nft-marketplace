import React, { useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { useIntersection } from "use-intersection";

const Image = styled.div`
  width: 100%;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  background-repeat: no-repeat;
  padding-bottom: 100%;
  border-radius: 1rem;
  background-image: url(${(props) => props.image});
  background-position: center center;
  background-size: contain;
  box-shadow: var(--shadow);
  transition: opacity 0.3s ease-out;
`;

export default ({ image, postId }) => {
  const target = useRef();
  const visible = useIntersection(target);
  return (
    <Link to={{ pathname: `/post/${postId}`, state: { modal: true } }}>
      <Image ref={target} visible={visible} image={image} />
    </Link>
  );
};
