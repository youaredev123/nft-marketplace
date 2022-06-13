import React, { useCallback } from "react";
import Button from "components/Button";
import { Amount, Icon, Text, Wrapper } from "./styles";
import lock from "assets/icons/lock.svg";

const roundToTwo = (num) => {
  // $3.00 = $3
  // $3.1 = $3.10
  if (parseFloat(num) === parseInt(num)) {
    return parseInt(num);
  } else {
    return parseFloat(num).toFixed(2);
  }
};

const LikeToUnlock = ({ price, smaller, onUnlock, viewPost = null }) => {
  const wrapperClickHandler = useCallback((e) => {
    if (viewPost && e.target.className.indexOf("unlock-wrapper") !== -1) {
      viewPost();
    }
  }, [viewPost]);

  return (
    <Wrapper className={"unlock-wrapper"} smaller={smaller} onClick={wrapperClickHandler}>
      <Icon src={lock} width={smaller ? "18px" : "40px"} />
      <Button className="primary" onClick={onUnlock}
              style={{
                display: smaller ? 'none' : 'block',
                width: smaller ? 70 : 168,
                fontSize: smaller ? "0.75rem" : "1.5rem",
                fontWeight: "medium",
                padding: "1em 1.3em",
                position: 'absolute',
                bottom: 20
              }}
      > <span style={{ display: smaller ? 'none' : 'inline' }}>Unlock for</span>
        {price && <Amount style={{ color: "white", display: "inline" }}> ${roundToTwo(price)}</Amount>}
      </Button>
      <Text smaller={smaller} style={{ display: smaller ? 'inline' : 'none' }}>Pay-to-View</Text>
      {price && <Amount style={{ display: smaller ? 'block' : 'none' }}>${roundToTwo(price)}</Amount>}
    </Wrapper>
  );
};


export default LikeToUnlock;
