import React from "react";
import Skeleton from "react-loading-skeleton";

const renderNotificationLoaders = (num = 9, themeContext) => {
  const arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(
      <Skeleton key={`loader_${i}`}
                height={93}
                width="100%"
                className="mb-2"
                style={{backgroundImage: themeContext.skeleton, backgroundColor: themeContext.bgColorSkeleton}}/>
    );
  }
  return <>{arr}</>;
};

export default renderNotificationLoaders;
