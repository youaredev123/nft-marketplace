import React  from "react";
import Header from "../../components/Header";
import { CreateContainer } from "./styles";
import { Link } from "react-router-dom";
import CreatePhotoIcon from "../../assets/images/create_photo.svg";
import CreateNFTIcon from "../../assets/images/create_nft.svg";
import {ImageWrapper, Text, ToggleImage} from "../ExclusivityScreen/styles";

const CreateScreen = () => {
  return (
    <>
      <Header title="Create Photo" hasBack />
      <CreateContainer>
        <Link
          className="photo-item"
          style={{textDecoration: "none"}}
          to={`/post`}
        >
          <ImageWrapper>
            <ToggleImage
              src={CreatePhotoIcon}
              alt="Create Photo"
            />
          </ImageWrapper>
          <Text className="text">Photo</Text>
        </Link>

        <Link
          className="photo-item"
          style={{textDecoration: "none"}}
          to={`/post?isNFT=true`}
        >
          <ImageWrapper>
            <ToggleImage
              src={CreateNFTIcon}
              alt="Create NFT"
            />
          </ImageWrapper>
          <Text className="text">NFT</Text>
        </Link>
      </CreateContainer>
    </>
  );
};

export default CreateScreen;
