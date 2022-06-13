import { withRouter } from "react-router-dom";

const ScrollToTop = ({ children, location: { pathname } }) => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "auto",
  });

  return children || null;
};

export default withRouter(ScrollToTop);
