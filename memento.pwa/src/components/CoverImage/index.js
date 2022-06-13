import React, { useCallback, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu } from "react-feather";
import Resizer from "react-image-file-resizer";
import { toBase64 } from "lib/imageHelpers";
import { CameraIcon, CoverImageBase, EditCover, FileInput, SettingsMenu } from "./styles";
import useWindowDimensions from "hooks/useWindowWidth";
import { useImageCrop } from "hooks/useImageCrop";
import { useAccount } from "hooks/useAccount";
import { withMemo } from "hoc/withMemo";
import Loader from "components/Loader";

const CoverImage = withMemo(({ url, canEdit = false, onSave = undefined, Icon = null }) => {

  const { windowWidth } = useWindowDimensions();
  const [photo, setPhoto] = useState(url);

  const {
    uploadOriginalPicture,
    urlPhoto,
    pictureData,
    fileInput,
    loading
  } = useImageCrop();
  const { setAccount } = useAccount();
  
  useEffect(() => {
    if (pictureData && pictureData.picture) {
      setPhoto(urlPhoto);
      onUpdate(pictureData.picture);
      return;
    }
  }, [pictureData])

  const onUpdate = useCallback(
    async (image) => {
      if (typeof onSave !== "undefined") {
        onSave(image).then((result) => {
          setAccount(result);
        });
      }
    },
    [onSave]
  );

  const handleSubmit = async () => {
    let file = fileInput.current.files[0];
    if (file && file.type.startsWith("image")) {
      const initialSize = file.size;
      let quality = 100;

      if (initialSize > 100000) {
        quality = 99;
      }

      Resizer.imageFileResizer(
        file,
        600,
        600,
        "JPEG",
        quality,
        0,
        async (blob) => {
          const base64Image = await toBase64(blob);
          console.info(blob);
          await onUpdate(base64Image);
          setPhoto(`data:image/gif;base64,${base64Image}`);
        },
        "blob"
      );
    }
  };

  useEffect(() => {
    if (pictureData) return;

    if (url) {
      setPhoto(url);
    }
  }, [url]);

  const displayEdit = useCallback(() => {
    if (!canEdit) {
      return null;
    }

    const editIconDisplay = () => Icon ? <Icon strokeWidth={1.5}/> : <CameraIcon strokeWidth={1.5}/>;

    return (
      <>
        <EditCover>
          <FileInput
            type="file"
            name="coverImage"
            id="coverImage"
            ref={fileInput}
            className="mt-5"
            onChange={uploadOriginalPicture}
            accept="image/*"
          />
          <label htmlFor="coverImage">
            {editIconDisplay()}
          </label>
        </EditCover>
        {windowWidth <= 480 && (
          <SettingsMenu>
            <Link to="/settings">
              <Menu color="#ffffff" size={22}/>
            </Link>
          </SettingsMenu>
        )}
      </>
    );
  }, [fileInput, canEdit, windowWidth, Icon]);

  return (
    <CoverImageBase url={photo}>
      {loading ?
          <Loader
            style={{
              alignItems: "center",
              display: "flex",
              height: "100%",
              flexDirection: "column",
              justifyContent: "center",
            }}
          /> : displayEdit()}
      
    </CoverImageBase>
  );
});

export default CoverImage;
