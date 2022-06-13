import React, { useCallback, useState } from "react";
import NotFound from "components/NotFound";
import { DesktopWrapper, ProfileContainer } from "./styles";
import Header from "components/Header";
import { Title } from "components/Header/Mobile/styles";
import ProfileDetailsDesktop from "./ProfileDetails";
import { SearchResults } from "components/SearchResults";
import ImageItem from "components/FeedItem/ImageItem";
import renderImageLoaders from "lib/renderImageLoaders";
import Spinner from "components/Loader";
import styled from "styled-components";
import CoverImage from "components/CoverImage";
import usePostModal from "hooks/usePostModal";

const NoResults = styled.div`
  padding: 10px;
  color: var(--blue);
  text-align: center;
`;

const MyProfileScreenDesktop = (
  {
    loading,
    posts,
    profile,
    updateBioAndUsername,
    updateProfileImage,
    userError,
    themeContext,
    infiniteRef
  }
) => {
  const [shouldRedirectToProfile, setShouldRedirectToProfile] = useState(false);
  const { viewPost, renderModal } = usePostModal();

  const displayProfile = useCallback(() => {
    if (!profile) {
      return null;
    }

    return (
      <ProfileDetailsDesktop
        onProfileSave={updateProfileImage}
        profile={profile}
        onSave={updateBioAndUsername}
      />
    );
  }, [profile]);

  if (userError) {
    return <NotFound/>;
  }

  return (
    <div>
      <DesktopWrapper>
        <Header
          title={<Title>Settings</Title>}
          hasBack
          backAddressOverride={shouldRedirectToProfile ? ("/" + encodeURIComponent(profile.username)) : null}
        />
        <ProfileContainer>
          <CoverImage url={profile?.bannerPic}/>
          {displayProfile()}
        </ProfileContainer>
        <div ref={infiniteRef} style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <SearchResults>
            {posts && posts.length
              ? posts.map((contentId) => (
                <div onClick={_ => viewPost(contentId)} key={contentId}>
                  <ImageItem contentId={contentId} hoverInfo showOriginallyPrivate/>
                </div>
              ))
              : loading
                ? renderImageLoaders(6, themeContext)
                : null}
          </SearchResults>
          {!loading && posts && posts.length === 0 ? (
            <NoResults className="text-center">No posts</NoResults>
          ) : null}
          {loading && (
            <div className="d-flex justify-content-center align-items-center mt-2 mb-2">
              <Spinner/>
            </div>
          )}
        </div>
      </DesktopWrapper>
      {renderModal()}
    </div>
  );
};

export default MyProfileScreenDesktop;
