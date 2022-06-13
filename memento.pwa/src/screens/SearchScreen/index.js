import React, { useCallback, useContext, useEffect, useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { useHistory } from "react-router-dom";
import useDebounce from "hooks/useDebounce";
import queryString from "query-string";
import { useFeed } from "hooks/useFeed";
import { useMostLikedFeed } from "hooks/useMostLikedFeed";
import renderImageLoaders from "../../lib/renderImageLoaders";
import { SearchResults } from "components/SearchResults";
import FollowableUserItem from "components/FollowableUserItem";
import SearchBar from "./SearchBar";
import { DesktopDescription, PrivateUsers, PrivateUsersWrapper, SearchHeaderContainer } from "./styles";
import SearchFilter from "./SearchFilter";
import ContentService from "../../services/ContentService";
import { fetchUserById } from "api";
import styled, { ThemeContext } from "styled-components";
import PrivateUser from "./PrivateUser";
import UserItem from "../../components/UserItem";
import Loader from "../../components/Loader";
import ImageItem from "../../components/FeedItem/ImageItem";
import DesktopLayout from "layouts/Desktop/DesktopLayout";
import usePostModal from "hooks/usePostModal";

const NoResults = styled.div`
  padding: 32px;
  color: var(--blue);
  text-align: center;
`;

export default () => {
  const history = useHistory();

  // States
  const [searchFocus, setSearchFocus] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const themeContext = useContext(ThemeContext);
  const [users, setUsers] = useState([]);
  const [usersNextPage, setUsersNextPage] = useState(0);
  const [hashtagsNextPage, setHashtagsNextPage] = useState(0);
  const [loadingMoreUsers, setLoadingMoreUsers] = useState(false);
  const [loadingMoreHashtags, setLoadingMoreHashtags] = useState(false);
  const [searchedUsersTerm, setSearchedUsersTerm] = useState("");
  const [images, setImages] = useState([]);
  const [searchedImagesTerm, setSearchedImagesTerm] = useState("");

  const { renderModal, viewPost } = usePostModal();
  const params = queryString.parse(history.location.search);
  const defaultSearchType = "default";
  const defaultFilterType = "all";
  const defaultSearchTerm = "";
  const historyState = history.location.state || {};
  const searchType =
    historyState.searchType || params.searchType || defaultSearchType; // default || users || hashtags
  const searchTerm =
    historyState.searchTerm || params.searchTerm || defaultSearchTerm;
  const filterType =
    historyState.filterType || params.filterType || defaultFilterType; // all || likes || Leaderboard

  const getSearchString = (searchType, searchTerm, filterType) => {
    const searchStringForState = queryString.stringify({
      searchType: searchType === defaultSearchType ? undefined : searchType,
      searchTerm: searchTerm === defaultSearchTerm ? undefined : searchTerm,
      filterType: filterType === defaultFilterType ? undefined : filterType
    });
    return searchStringForState === "" ? "" : "?" + searchStringForState;
  };

  const setQueryParams = useCallback(
    (searchType, searchTerm, filterType) => {
      const expectedSearchString = getSearchString(
        searchType,
        searchTerm,
        filterType
      );

      if (history.location.search !== expectedSearchString) {
        const url = history.location.pathname + expectedSearchString;
        history.push(url, {
          searchType,
          searchTerm,
          filterType
        });
      }
    },
    [history]
  );


  // Feeds
  const {
    mostLikedPosts,
    loadNewMostLikedPosts,
    mostLikedHasNextPage,
    mostLikedCurrentPage,
    mostLikedLoading,
    setMostLikedPosts
  } = useMostLikedFeed(42);

  const loadMoreMostLiked = useCallback(() => {
    if (mostLikedHasNextPage) {
      loadNewMostLikedPosts(mostLikedCurrentPage + 1);
    }
  }, [loadNewMostLikedPosts, mostLikedHasNextPage, mostLikedCurrentPage]);

  const infiniteMostLikedRef = useInfiniteScroll({
    loading: mostLikedLoading,
    hasNextPage: mostLikedHasNextPage,
    onLoadMore: loadMoreMostLiked,
    scrollContainer: "body"
  });

  const { setPosts, posts, loadNewPosts, hasNextPage, currentPage, loading } =
    useFeed(42);

  const loadMoreNewPosts = useCallback(() => {
    if (hasNextPage) {
      loadNewPosts(currentPage + 1);
    }
  }, [loadNewPosts, currentPage, hasNextPage]);

  const infiniteNewPostsRef = useInfiniteScroll({
    loading: loading,
    hasNextPage: hasNextPage,
    onLoadMore: loadMoreNewPosts,
    scrollContainer: "body"
  });

  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  // Effects
  useEffect(() => {
    // TODO new fetch in new params filterType DM
    setPosts(null);
    setMostLikedPosts(null);
    const _filterType = filterType;
    const _searchType = searchType;

    if (_searchType === "default") {
      if (_filterType === "all") {
        setIsSearching(true);
        loadNewPosts().then(() => {
          setIsSearching(false);
        });
      } else if (_filterType === "likes") {
        setIsSearching(true);
        loadNewMostLikedPosts().then(() => {
          setIsSearching(false);
        });
      }
    } else if (_filterType === "leaderboard") {
      loadUsers("");
    } else if (
      _searchType === "users" &&
      debouncedSearchTerm &&
      debouncedSearchTerm.charAt(0) !== "#"
    ) {
      loadUsers(debouncedSearchTerm);
    } else if (
      _searchType === "hashtags" &&
      debouncedSearchTerm &&
      debouncedSearchTerm.charAt(0) === "#"
    ) {
      loadPosts(debouncedSearchTerm && debouncedSearchTerm);
    }
  }, [searchType, filterType, debouncedSearchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm && debouncedSearchTerm.charAt(0) === "@") {
      setQueryParams("users", searchTerm, filterType);
    } else if (debouncedSearchTerm && debouncedSearchTerm.charAt(0) === "#") {
      setQueryParams("hashtags", searchTerm, filterType);
    } else if (!searchFocus && !debouncedSearchTerm) {
      setQueryParams("default", searchTerm, filterType);
    } else {
      // when a search term does not start with # || @
      setQueryParams("users", searchTerm, filterType);
    }
  }, [debouncedSearchTerm, searchFocus]);

  // Users
  const loadUsers = useCallback((termToSearch) => {
    const _termToSearch = termToSearch.replace(/[^\w\s]/gi, "");

    if (
      _termToSearch.trim() === searchedUsersTerm.trim() &&
      _termToSearch.trim() !== ""
    ) {
      return;
    }

    setUsers([]);
    setIsSearching(true);
    if (_termToSearch === "" && filterType !== "leaderboard") {
      ContentService.exploreMostFollowedUsers(0, 10).then((response) => {
        if (
          response.data.users.length === 0 ||
          response.data.users.length < 10
        ) {
          setUsersNextPage(-1);
        } else {
          setUsersNextPage(response.data.nextPage);
        }
        resolveUsers(response, _termToSearch, false);
      });
    } else if (filterType === "leaderboard") {
      ContentService.explorePrivateUsers(0, 10).then((response) => {
        if (
          response.data.users.length === 0 ||
          response.data.users.length < 9
        ) {
          setUsersNextPage(-1);
        } else {
          setUsersNextPage(response.data.nextPage);
        }
        resolveUsers(response, _termToSearch, false);
      });
    } else {
      ContentService.exploreUsers(_termToSearch).then((response) => {
        if (
          response.data.users.length === 0 ||
          response.data.users.length < 10
        ) {
          setUsersNextPage(-1);
        } else {
          setUsersNextPage(response.data.nextPage);
        }
        resolveUsers(response, _termToSearch, false);
      });
    }
  });

  const loadMoreUsers = useCallback(() => {
    if (usersNextPage < 1) {
      return;
    }

    setLoadingMoreUsers(true);
    if (debouncedSearchTerm === "@" && filterType !== "leaderboard") {
      ContentService.exploreMostFollowedUsers(usersNextPage).then(
        (response) => {
          if (
            response.data.users.length === 0 ||
            response.data.users.length < 10
          ) {
            setUsersNextPage(-1);
          } else {
            setUsersNextPage(response.data.nextPage);
          }
          resolveUsers(response, debouncedSearchTerm, true);
        }
      );
    } else if (filterType === "leaderboard") {
      ContentService.explorePrivateUsers(usersNextPage, 10).then((response) => {
        if (
          response.data.users.length === 0 ||
          response.data.users.length < 9
        ) {
          setUsersNextPage(-1);
        } else {
          setUsersNextPage(response.data.nextPage);
        }
        resolveUsers(response, debouncedSearchTerm, true);
      });
    } else {
      ContentService.exploreUsers(debouncedSearchTerm, usersNextPage).then(
        (response) => {
          if (
            response.data.users.length === 0 ||
            response.data.users.length < 10
          ) {
            setUsersNextPage(-1);
          } else {
            setUsersNextPage(response.data.nextPage);
          }
          resolveUsers(response, debouncedSearchTerm, true);
        }
      );
    }
  });

  function unique(arr) {
    let result = [];

    for (let str of arr) {
      if (!result.find((el) => el.userId === str.userId)) {
        result.push(str);
      }
    }

    return result;
  }

  const resolveUsers = useCallback(
    (response, termSearched, addToList = false) => {
      if (!response || response.hasError) {
        setIsSearching(false);
        setLoadingMoreUsers(false);
        return;
      }

      setQueryParams("users", searchTerm, filterType);
      setSearchedUsersTerm(termSearched);

      if (response.data.users) {
        const userProfileRequests = response.data.users.map((user) =>
          fetchUserById(user.userId)
        );
        Promise.all(userProfileRequests).then(() => {
          if (addToList) {
            setUsers(unique([...users, ...response.data.users]));
          } else {
            setUsers(unique(response.data.users));
          }
          setIsSearching(false);
          setLoadingMoreUsers(false);
        });
      } else {
        setUsers([]);
        setIsSearching(false);
        setLoadingMoreUsers(false);
      }
    }
  );

  const infiniteRefUsers = useInfiniteScroll({
    loading: loadingMoreUsers || isSearching,
    hasNextPage: usersNextPage,
    onLoadMore: loadMoreUsers,
    scrollContainer: "body"
  });

  // Hashtags
  const loadPosts = useCallback((termToSearch) => {
    const _termToSearch = termToSearch.replace(/[^\w\s]/gi, "");

    if (_termToSearch.trim() === searchedImagesTerm.trim()) {
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    setImages([]);
    ContentService.exploreImages(_termToSearch, "latest").then((response) => {
      if (response.hasError) {
        setIsSearching(false);
        return;
      }
      resolveImagePosts(response);
    });
  });

  const loadMoreHashtagPosts = useCallback(() => {
    if (hashtagsNextPage < 1) {
      return;
    }

    setLoadingMoreHashtags(true);
    if (debouncedSearchTerm && debouncedSearchTerm === "#") {
      ContentService.exploreImages(
        debouncedSearchTerm.replace(/[^\w\s]/gi, ""),
        "latest",
        hashtagsNextPage
      ).then((response) => {
        if (
          response.data.contentIds.length === 0 ||
          response.data.contentIds.length < 10
        ) {
          setHashtagsNextPage(-1);
        } else {
          setHashtagsNextPage(response.data.nextPage);
        }
        resolveImagePosts(response);
      });
    }
  }, [hashtagsNextPage, loadPosts]);

  const inifiniteRefHashTags = useInfiniteScroll({
    loading: loadingMoreHashtags || isSearching,
    hasNextPage: hashtagsNextPage,
    onLoadMore: loadMoreHashtagPosts,
    scrollContainer: "body"
  });

  const resolveImagePosts = useCallback((response) => {
    if (!response.hasError) {
      const contentIds = response.data.contentIds || [];
      if (
        response.data.contentIds.length === 0 ||
        response.data.contentIds.length < 10
      ) {
        setHashtagsNextPage(-1);
      } else {
        setHashtagsNextPage(response.data.nextPage);
      }
      setImages([...images, ...contentIds]);
      setSearchedImagesTerm(debouncedSearchTerm);
      setIsSearching(false);
    }
  }, []);

  const renderContent = useCallback(() => {
    if (isSearching) {
      return (
        <Loader
          style={{
            marginTop: `${window.mobileCheck() ? "75%" : "30%"}`,
            textAlign: "center"
          }}
        />
      );
    }

    if (searchFocus && !debouncedSearchTerm) {
      return (
        <NoResults>{"Search # for hashtags. Search @ for users"}</NoResults>
      );
    }

    if (searchType === "default" && filterType === "all") {
      return (
        <>
          <div ref={infiniteNewPostsRef}>
            <SearchResults paddingTop={window.mobileCheck() ? "0.5rem" : "1.5rem"}>
              <>
                {posts && posts.length
                  ? posts.map((contentId, index) => (
                    <div onClick={() => viewPost(contentId)} key={`post_${index}`}>
                      <ImageItem key={contentId} contentId={contentId} />
                    </div>
                  ))
                  : renderImageLoaders(18, themeContext)}
              </>
            </SearchResults>
          </div>
          {hasNextPage && (
            <div className="d-flex justify-content-center align-items-center mt-2 mb-2">
              <Loader />
            </div>
          )}
        </>
      );
    }

    if (searchType === "default" && filterType === "likes") {
      return (
        <>
          <div ref={infiniteMostLikedRef}>
            <SearchResults paddingTop={window.mobileCheck() ? "0.5rem" : "1.5rem"}>
              <>
                {mostLikedPosts && mostLikedPosts.length
                  ? mostLikedPosts.map((contentId, index) => (
                    <div onClick={() => viewPost(contentId)} key={`post_${index}`}>
                      <ImageItem key={contentId} contentId={contentId} />
                    </div>
                  ))
                  : renderImageLoaders(18, themeContext)}
              </>
            </SearchResults>
          </div>
          {mostLikedHasNextPage && (
            <div className="d-flex justify-content-center align-items-center mt-2 mb-2">
              <Loader />
            </div>
          )}
        </>
      );
    }

    if (searchType === "users") {
      return (
        <div ref={infiniteRefUsers} style={{ paddingTop: window.mobileCheck() ? null : "1.5rem" }}>
          {users && users.length ? (
            <PrivateUsersWrapper>
              {filterType === "leaderboard" ? (
                <PrivateUsers>
                  {users.map(({ userId, username, profilePicUrl }) => (
                    <PrivateUser
                      key={userId}
                      userId={userId}
                      username={username}
                      picture={profilePicUrl}
                    />
                  ))}
                </PrivateUsers>
              ) : (
                users.map((user, index) => (
                  <FollowableUserItem
                    key={user.userId}
                    user={user}
                    index={index}
                    isUserListScreen
                  />
                ))
              )}
            </PrivateUsersWrapper>
          ) : (
            <NoResults>No users found</NoResults>
          )}
        </div>
      );
    }

    if (searchType === "hashtags") {
      return (
        <div ref={inifiniteRefHashTags}>
          {images && images.length ? (
            <SearchResults paddingTop="50px">
              {images.map((contentId, index) => (
                <div onClick={_ => viewPost(contentId)} key={`post_${index}`}>
                  <ImageItem key={contentId} contentId={contentId} />
                </div>
              ))}
            </SearchResults>
          ) : (
            <NoResults>{"No hashtags were found"}</NoResults>
          )}
        </div>
      );
    }

    return (
      <div>
      </div>
    );
  }, [
    loadingMoreUsers,
    users,
    images,
    searchFocus,
    debouncedSearchTerm,
    filterType,
    searchType,
    isSearching,
    posts,
    loading,
    mostLikedLoading,
    mostLikedPosts
  ]);

  return (
    <>
      <DesktopLayout hideHeaderMobile={true} withSidebar={false} hideBorder={true}>
        <SearchHeaderContainer>
          <div className="mb-4">
            <SearchBar
              onTextChange={(searchTerm) =>
                setQueryParams(searchType, searchTerm, filterType)
              }
              onFocus={setSearchFocus}
              searchTerm={searchTerm}
              clickHandler={(filterType) =>
                setQueryParams(searchType, searchTerm, filterType)
              }
            />
          </div>
        </SearchHeaderContainer>
        <DesktopDescription>Explore</DesktopDescription>
        {!searchTerm && (
          <SearchFilter
            setFilterType={(filterType) =>
              setQueryParams(searchType, searchTerm, filterType)
            }
            filterType={filterType}
            setSearchType={(searchType) =>
              setQueryParams(searchType, searchTerm, filterType)
            }
            searchType={searchType}
            setSearchAndFilterTypes={(searchType, filterType) =>
              setQueryParams(searchType, searchTerm, filterType)
            }
          />
        )}
        {renderContent()}
      </DesktopLayout>
      {renderModal()}
    </>
  );
};
