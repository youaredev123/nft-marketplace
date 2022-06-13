import FeedList from "components/FeedList";
import React from "react";
import DesktopLayout from "layouts/Desktop/DesktopLayout";

const HomeScreen = () => {
  return (
    <DesktopLayout hideBorder={true}>
      <FeedList/>
    </DesktopLayout>
  );
};

export default HomeScreen;
