import { ProfileContainer } from "screens/OthersProfileScreen/styles";
import CoverImage from "components/CoverImage";
import { SearchResults } from "components/SearchResults";
import ImageItem from "components/FeedItem/ImageItem";
import renderImageLoaders from "lib/renderImageLoaders";
import Spinner from "components/Loader";
import React from "react";
import NoResults from "components/NoResults";
import { DesktopWrapper } from "screens/OthersProfileScreen/Desktop/styles";
import Header from "components/Header";
import ProfileDetails from "screens/OthersProfileScreen/Desktop/ProfileDetails";
import PrivateProfile from "screens/OthersProfileScreen/Desktop/PrivateProfile";
import PrivateFollow from "screens/OthersProfileScreen/Desktop/PrivateFollow";
import usePostModal from "hooks/usePostModal";

const OthersProfileScreenDesktop = (
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
  const { renderModal, viewPost } = usePostModal();

  return (
    <>
      <DesktopWrapper>
        <Header hideMobile={true}/>
        <ProfileContainer className="mb-5">
          <CoverImage url={profile ? profile.bannerPic : null}/>
          <ProfileDetails
            posts={posts.length}
            profile={profile}
            currentUser={currentUser}
            toggleFollow={toggleFollow}
          />
        </ProfileContainer>
        <div ref={infiniteRef} style={{ maxWidth: "1000px", margin: "0 auto" }}>
          {/*{TODO params in private profile}*/}
          {false ? (
            <PrivateProfile/>
          ) : (
            <>
              <SearchResults>
                {posts && posts.length
                  ? posts.map((contentId) => (
                    <div onClick={_ => viewPost(contentId)} key={contentId}>
                      <ImageItem contentId={contentId}/>
                    </div>
                  ))
                  : loading
                    ? renderImageLoaders(6, themeContext)
                    : null}
              </SearchResults>
              {!loading && posts && posts.length === 0 ? (
                profile && !profile.following ? (
                  <PrivateFollow/>
                ) : (
                  <NoResults className="text-center">No posts</NoResults>
                )
              ) : null}
              {loading && (
                <div className="d-flex justify-content-center align-items-center mt-2 mb-2">
                  <Spinner/>
                </div>
              )}
            </>
          )}
        </div>
      </DesktopWrapper>
      {renderModal()}
    </>
  );
};

export default OthersProfileScreenDesktop;
