import React, { createRef, useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import Header from "../../../components/Header";
import {
  NFTSelectContainer,
  FileInput
} from "./styles";
import {
  CheckImage,
  CheckWrapper,
  ImageWrapper,
  Text,
  Toggle,
} from "../../ExclusivityScreen/styles";
import checkedCircle from "../../../assets/icons/circle-selected.svg";
import nonCheckedCircle from "../../../assets/icons/circle-non-selected.svg";
import {Plus} from "react-feather";
import Input from "../../../components/Form/Input";
import { PostButton, SidesMarginContainer, SidesMarginSplitter } from "../../RelicsScreen/styles";
import NftService from '../../../services/NftService';
import useToast from '../../../hooks/useToast';
import WideToast from "components/Toasts/WideToast";
import ErrorToast from "components/Toasts/ErrorToast";
import { hasAnyEmptyField } from "lib/utils";

const NFTSelectScreen = () => {
  let fileInput = createRef();
  const history = useHistory();
  const [ loading, setLoading ] = useState(false);
  const [ walletInfo, setWalletInfo ] = useState();
  const [ name, setName ] = useState('');
  const [ supply, setSupply ] = useState(0);
  const { showToast } = useToast();
  const [ supportedStaticImageTypes ] = useState(['png']);
  const [ supported3DImageTypes ] = useState(['glb']);
  const [ staticImage, setStaticImage] = useState();
  const [ animatedImage, setAnimatedImage] = useState();

  useEffect(() => {
    (async () => {
      const walletInfo = JSON.parse(localStorage.getItem('relica_wallets'));
      if (!walletInfo) return history.push('/wallet/login');
      setWalletInfo(walletInfo);
    })();
  }, []);

  const onNameChange = (value) => {
    setName(value);
  }

  const onSupplyChange = (value) => {
    setSupply(value);
  }

  const validateFileType = (fileExtension, isStaticImage) => {
    const supportedTypes = isStaticImage ? supportedStaticImageTypes : supported3DImageTypes;
    return supportedTypes.includes(fileExtension);
  }
  
  const uploadImage = useCallback(async (file, isStaticImage) => {
    if (!file) return;
    
    const fileExtension = file.name.split('.')[1];
    const isValid = validateFileType(fileExtension, isStaticImage);

    if (isValid) {
      return isStaticImage ? setStaticImage(file) : setAnimatedImage(file);
    } else {
      isStaticImage ? setStaticImage(null) : setAnimatedImage(null);
      return showToast(<ErrorToast text="Unsupported file type." />);
    }
  });

  const createNFTCollection = useCallback(async () => {
    const hasEmptyField = hasAnyEmptyField({animatedImage, staticImage, name, supply});
    if (hasEmptyField) return showToast(<ErrorToast text="Please full-fill the form." />);
    
    let formData = new FormData();
    formData.append("image", animatedImage);
    formData.append("image", staticImage);
    formData.append("name", name);
    formData.append("supply", +supply);
    
    const res = await NftService.bulkCreateNFT(formData, walletInfo.password);
    if (res && !res.hasError) {
      showToast(<WideToast text="NFTs are creating in background, it might take some time." />);
      return history.push('/nft/collection');
    } else {
      showToast(<ErrorToast text="Something went wrong." />);
    }
  })

  return (
    <>
      <Header title="NFT" hasBack />
      <NFTSelectContainer>
        <Toggle className='toggle-item'>
          <ImageWrapper className='select-item'>
            {/* <Plus
              color="var(--grey2)"
              style={{ height: 54, width: 54, strokeWidth: 1 }}
            /> */}
            <FileInput
              type="file"
              name="file"
              id="file"
              accept=".glb"
              ref={node => (fileInput = node)}
              className="mt-5"
              onChange={(e) => uploadImage(e.target.files[0], false)}
            />
          </ImageWrapper>
          <Text className='text'>GLB</Text>
        </Toggle>

        <Toggle className='toggle-item'>
          <ImageWrapper className='select-item'>
            {/* <Plus
              color="var(--grey2)"
              style={{ height: 54, width: 54, strokeWidth: 1 }}
            /> */}
            <FileInput
              type="file"
              name="file"
              id="file"
              accept=".png"
              ref={node => (fileInput = node)}
              className="mt-5"
              onChange={(e) => uploadImage(e.target.files[0], true)}
            />
          </ImageWrapper>
          <Text className='text'>PNG</Text>
        </Toggle>

        <Toggle className='toggle-item'>
          <Input
            name="relic-name"
            placeholder="Collection name"
            style={{ width: "180px" }}
            onChange={(val) => onNameChange(val)}
          >
          </Input>

          <Input
            name="relic-value"
            type="number"
            placeholder="Total number"
            style={{ width: "180px" }}
            onChange={(val) => onSupplyChange(val)}
          >
          </Input>
        </Toggle>

        {/* <Toggle className='toggle-item'>
          <ImageWrapper className='select-item'>
            <Plus
              color="var(--grey2)"
              style={{ height: 54, width: 54, strokeWidth: 1 }}
            />
          </ImageWrapper>
          <CheckWrapper className='check-mark'>
            <CheckImage src={nonCheckedCircle} />
            <Text className='text'>Chest</Text>
          </CheckWrapper>
        </Toggle> */}
      </NFTSelectContainer>

      <SidesMarginSplitter style={{margin: "3rem 0"}}/>

      <SidesMarginContainer
        style={{
          position: "relative",
          top: "20px",
          width: "calc(100% - 40px)"
        }}
      >
        <PostButton
          className="primary"
          style={{ marginBottom: "30px", boxShadow: "none" }}
          onClick={() => createNFTCollection()}
        >
          Create
        </PostButton>
      </SidesMarginContainer>
    </>
  );
};

export default NFTSelectScreen;
