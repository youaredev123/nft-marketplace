import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import renderImageLoaders from "../../../lib/renderImageLoaders";
import ProfileDetails from "./ProfileDetails";
import { SearchResults } from "../../../components/SearchResults";
import CoverImage from "../../../components/CoverImage";
import Spinner from "../../../components/Loader";
import ImageItem from "../../../components/FeedItem/ImageItem";
import NotFound from "../../../components/NotFound";

import { ProfileContainer, Wrapper } from "./styles";

const NoResults = styled.div`
  padding: 10px;
  color: var(--blue);
  text-align: center;
`;

const MyProfileScreenMobile = (
  {
    loading,
    posts,
    profile,
    updateBioAndUsername,
    updateBannerImage,
    updateProfileImage,
    userError,
    themeContext,
    infiniteRef
  }
) => {

  if (userError) {
    return <NotFound/>;
  }

  return (
    <Wrapper>
      <ProfileContainer>
        <CoverImage
          url={profile ? profile.bannerPic : null}
          canEdit
          onSave={updateBannerImage}
        />
        <ProfileDetails
          onProfileSave={updateProfileImage}
          profile={profile}
          onSave={updateBioAndUsername}
        />
      </ProfileContainer>
      <div ref={infiniteRef}>
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
                <ImageItem contentId={contentId} showOriginallyPrivate/>
              </Link>
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
    </Wrapper>
  );
};

export default MyProfileScreenMobile;
