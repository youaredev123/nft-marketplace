import { ProfileContainer } from "screens/OthersProfileScreen/styles";
import CoverImage from "components/CoverImage";
import ProfileDetails from "screens/OthersProfileScreen/Mobile/ProfileDetails";
import PrivateProfile from "screens/OthersProfileScreen/Mobile/PrivateProfile";
import { SearchResults } from "components/SearchResults";
import { Link } from "react-router-dom";
import ImageItem from "components/FeedItem/ImageItem";
import renderImageLoaders from "lib/renderImageLoaders";
import PrivateFollow from "screens/OthersProfileScreen/Mobile/PrivateFollow";
import Spinner from "components/Loader";
import React from "react";
import NoResults from "components/NoResults";
import { Wrapper } from "screens/MyProfileScreen/Mobile/styles";

const OthersProfileScreenMobile = (
  {
    profile,
    posts,
    currentUser,
    toggleFollow,
    infiniteRef,
    themeContext,
    loading
  }
) => {
  return (
    <Wrapper>
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
        {false ? ( // TODO params in private profile
          <PrivateProfile />
        ) : (
          <>
            <SearchResults>
              {posts && posts.length
                ? posts.map((contentId) => (
                  <Link
                    to={{
                      pathname: `/post/${contentId}`,
                      state: { modal: true }
                    }}
                    key={contentId}
                  >
                    <ImageItem contentId={contentId} />
                  </Link>
                ))
                : loading
                  ? renderImageLoaders(6, themeContext)
                  : null}
            </SearchResults>
            {!loading && posts && posts.length === 0 ? (
              profile && profile.privateAccount ? (
                <PrivateFollow />
              ) : (
                <NoResults className="text-center">No posts</NoResults>
              )
            ) : null}
            {loading && (
              <div className="d-flex justify-content-center align-items-center mt-2 mb-2">
                <Spinner />
              </div>
            )}
          </>
        )}
      </div>
    </Wrapper>
  )
}

export default OthersProfileScreenMobile;
