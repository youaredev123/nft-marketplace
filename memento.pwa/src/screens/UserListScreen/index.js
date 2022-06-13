import React, { useCallback, useEffect } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import FollowableUserItem from "components/FollowableUserItem";
import Spinner from "components/Loader";
import { Title } from "components/Header/styles";
import DesktopLayout from "layouts/Desktop/DesktopLayout";
import { ContentWrapper, Heading } from "screens/UserListScreen/styles";

const UserListScreen = (
  {
    title,
    id,
    fetch,
    loading,
    users,
    currentPage,
    hasNextPage,
    hideHeader = false,
    withSidebar = false,
    hideBorder = true,
    isFollowing= false,
    isLikes = false,
  }
) => {

  const loadMore = useCallback(() => {
    let isMounted = true;
    if (isMounted) {
      fetch(id, currentPage + 1);
    }
    return () => (isMounted = false);
  }, [id, fetch, hasNextPage, currentPage]);

  const infiniteRef = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    scrollContainer: "body",
  });

  useEffect(() => {
    fetch(id);
  }, []);

  return (
    <DesktopLayout withSidebar={withSidebar} headerHasBack={true} headerTitle={<Title>{title}</Title>} hideBorder={hideBorder} hasBlackBackground={true}>
      <Heading>{title}</Heading>
      <ContentWrapper>
        <div ref={infiniteRef}>
          <div>
            {users.map((user) => (
              <FollowableUserItem screenLikes={isLikes} user={user} ScreenFollowing={isFollowing} isUserListScreen={true} key={user.userId} userId={user.userId}/>
            ))}
            {loading && (
              <div className="d-flex justify-content-center align-items-center">
                <Spinner style={{ marginTop: "30px" }}/>
              </div>
            )}
          </div>
        </div>
      </ContentWrapper>
    </DesktopLayout>
  );
};

export default UserListScreen;
