import React from "react";
import Skeleton from "react-loading-skeleton";

const renderImageLoaders = (num = 9, themeContext) => {
  const arr = [];

  for (let i = 0; i < num; i++) {
    arr.push(<Skeleton
      key={`loader_${i}`}
      height="100%"
      width="100%"
      style={{ backgroundImage: themeContext.skeleton, backgroundColor: themeContext.bgColorSkeleton }}/>);
  }
  return <>{arr}</>;
};

export default renderImageLoaders;
