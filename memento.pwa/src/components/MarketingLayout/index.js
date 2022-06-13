import React from "react";
import { useHistory } from "react-router-dom";

import { fetchToken } from "lib/tokenizer";

import { MarketingContainer } from "./styles";

export default ({ children }) => {
  const history = useHistory();

  React.useEffect(() => {
    const data = fetchToken();
    if (data && data.token && data.token.length) {
      history.replace("/");
    }
  }, []);

  return (
    <MarketingContainer>
      {children}
    </MarketingContainer>
  );
};
