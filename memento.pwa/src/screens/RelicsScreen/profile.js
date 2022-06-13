import React, {useState, useEffect, useCallback, useContext} from "react";
import styled, {ThemeContext} from "styled-components";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useInfiniteScroll from "react-infinite-scroll-hook";

import renderImageLoaders from "../../lib/renderImageLoaders";
import { SearchResults } from "../../components/SearchResults";
import CoverImage from "../../components/CoverImage";
import Header from "../../components/Header";
import Spinner from "../../components/Loader";
import NotFound from "../../components/NotFound";
import RelicItem from "../../components/FeedItem/RelicItem";

import useFollowAndUnfollow from "../../hooks/useFollowAndUnfollow";
import useUsersRelics from "../../hooks/useUsersRelics";
import { usePayments } from "../../hooks/usePayments";

import ProfileDetails from "../OthersProfileScreen/Mobile/ProfileDetails";
import { ProfileContainer } from "./styles";

const NoResults = styled.div`
  padding: 10px;
  color: var(--blue);
  text-align: center;
`;

export default () => {
  const { id } = useParams();
  const {
    posts,
    fetchPosts,
    loading,
    hasNextPage,
    currentPage,
  } = useUsersRelics();

  const {
    onFollowStart,
    onFollowFail,
    onUnfollowStart,
    onUnfollowFail,
    currentUser,
    profile,
    fetchProfileById,
    userError,
  } = useFollowAndUnfollow();

  const { pay } = usePayments();
  const [ inFollow, setInFollow ] = useState(false);
  const [ inUnfollow, setInUnfollow ] = useState(false);
  const themeContext = useContext(ThemeContext);

  const toggleFollow = useCallback(async () => {
    if (inFollow || inUnfollow) {
      return;
    }
    const shouldFollow = !profile.following;
    if (shouldFollow) {
      setInFollow(true);
      await onFollowStart();
    } else {
      setInUnfollow(true);
      await onUnfollowStart();
    }
    const onEnd = () => {
      if (shouldFollow) {
        setInFollow(false);
      } else {
        setInUnfollow(false);
      }
    }

    pay({
      type: "FOLLOW",
      data: {
        userId: profile.id,
        follow: shouldFollow,
      },
      username: profile.username,
      onPayment: onEnd,
      onError: () => {
        onEnd();
        if (shouldFollow) {
          onFollowFail();
        } else {
          onUnfollowFail();
        }
      },
      onMoneyButtonModalHide: rollbackFollowAndUnfollow,
    });
  }, [profile, pay, inFollow, inUnfollow]);

  const rollbackFollowAndUnfollow = useCallback(() => {
    if (inFollow && inUnfollow) {
      console.error("Relica: cannot be both in follow and unfollow states");
      setInFollow(false);
      setInUnfollow(false);
      return;
    }
    if (inFollow) {
      onFollowFail();
      setInFollow(false);
    } else if (inUnfollow) {
      onUnfollowFail();
      setInUnfollow(false);
    }
  }, [inFollow, inUnfollow]);

  const loadMore = useCallback(() => {
    fetchPosts(id, currentPage + 1);
  }, [fetchPosts, currentPage]);

  const infiniteRef = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    scrollContainer: "body",
  });

  useEffect(() => {
    if (id) {
      fetchPosts(id);
      fetchProfileById(id);
    }
  }, [fetchPosts, fetchProfileById, id]);

  if (userError) {
    return <NotFound />;
  }

  return (
    <>
      <Header hasBack backAddressDefault="/relics/buried?others=1" />
      <ProfileContainer className="mb-5">
        <CoverImage url={profile ? profile.bannerPic : null} />
        <ProfileDetails
          posts={posts.length}
          profile={profile}
          currentUser={currentUser}
          toggleFollow={toggleFollow}
        />
      </ProfileContainer>
      <div ref={infiniteRef}>
        <SearchResults>
          {posts && posts.length
            ? posts.map((relic) => (<>
              <Link
                to={{
                  pathname: `/relics/view/${relic.id}`,
                  state: { modal: true },
                }}
                key={`${relic.id}_link`}
              >
                <RelicItem key={relic.id} relic={relic} />
              </Link>
            </>))
            : loading
              ? renderImageLoaders(6, themeContext)
              : null}
        </SearchResults>
        {!loading && posts && posts.length === 0 ? (
            <NoResults className="text-center">No relics</NoResults>
        ) : null}
        {loading && (
            <div className="d-flex justify-content-center align-items-center mt-2 mb-2">
              <Spinner />
            </div>
        )}
      </div>
    </>
  );
};
