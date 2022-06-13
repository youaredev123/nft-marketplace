import React, { useState, useEffect, useCallback } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import {
  NoItems,
  Content,
  LoaderWrapper,
  DesktopWrapper,
  ContentWrapper,
} from "./styles";
import Loader from "../../components/Loader";
import FollowableUserItem from "components/FollowableUserItem";
import ContentService from "../../services/ContentService";
import { unique } from "./utils.js";
import DesktopLayout from "../../layouts/Desktop/DesktopLayout";
import {Heading} from "../UserListScreen/styles";
import {Title} from "components/Header/styles";

const Leaderboard = () => {
  // reused the code from the Discover feed. It used content service and such code style
  const [users, setUsers] = useState(null);
  const [loadingMoreUsers, setLoadingMoreUsers] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [usersNextPage, setUsersNextPage] = useState(0);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = useCallback(() => {
    setUsers(null);
    setIsSearching(true);
    ContentService.exploreUsersLeaderboard(0, 10).then((response) => {
      if (response.data.users.length === 0 || response.data.users.length < 10) {
        setUsersNextPage(-1);
      } else {
        setUsersNextPage(response.data.nextPage);
      }
      if (!response || response.hasError) {
          setIsSearching(false);
          setLoadingMoreUsers(false);
          return;
      }
      setUsers(unique([...response?.data?.users]) || null)
      setIsSearching(false);
      setLoadingMoreUsers(false);
    });
  });

  const loadMoreUsers = useCallback(() => {
    if (usersNextPage < 1) {
      return;
    }

    setLoadingMoreUsers(true);

    ContentService.exploreUsersLeaderboard(usersNextPage).then((response) => {
      if (response.data.users.length === 0 || response.data.users.length < 10) {
        setUsersNextPage(-1);
      } else {
        setUsersNextPage(response.data.nextPage);
      }
      if (!response || response.hasError) {
        setIsSearching(false);
        setLoadingMoreUsers(false);
        return;
      }
      setUsers(unique([...users, ...response?.data?.users]) || null)
      setIsSearching(false);
      setLoadingMoreUsers(false);
    });
  });

  const infiniteRefUsers = useInfiniteScroll({
    loading: loadingMoreUsers || isSearching,
    hasNextPage: usersNextPage,
    onLoadMore: loadMoreUsers,
    scrollContainer: "body"
  });

  const renderContent = () => {
    if (isSearching) {
      return (
        <Content>
          <LoaderWrapper>
            <Loader
              style={{
                alignItems: "center",
                display: "flex",
                height: "calc(100% - 90px)",
                flexDirection: "column",
                justifyContent: "center",
                marginTop: "50%"
              }}
            />
          </LoaderWrapper>
        </Content>
      );
    } else {
      return users && users.length ? (
        <div ref={infiniteRefUsers} style={{height: "100%"}}>
          {users.map((user, index) => (
            <FollowableUserItem
              key={user.userId}
              user={user}
              unreadMessages={false}
              leaderboard
              index={index}
              isUserListScreen
            />
          ))}
          {loadingMoreUsers && <Loader style={{ marginLeft: "38.5%" }} />}
        </div>
      ) : (
        <Content>
          <NoItems>No users found</NoItems>
        </Content>
      );
    }
  };

  return (
    <DesktopLayout headerHasBack={true} headerTitle={<Title>Leaderboard</Title>} hideHeaderMobile={false} withSidebar={true} hideBorder={false} hasBlackBackground={true}>
      <DesktopWrapper>
        <Heading>Leaderboard</Heading>
      </DesktopWrapper>

      <ContentWrapper>
        {renderContent()}
      </ContentWrapper>
    </DesktopLayout>
  );
};

export default Leaderboard;
