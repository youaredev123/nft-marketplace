import React from "react";
import {
  CollectionAvatar,
  CollectionImageContainer,
  CollectionItemContainer,
  CollectionItemProfileContainer,
  CollectionItemProfileTitle
} from "./styles";

const CollectionItem = ({item}) => {
  const renderImage = () => {
    if (item.staticImageLocation) {
      item.pictureUrl = `https://media.bitcoinfiles.org/${item.staticImageLocation}`;
    } else {
      item.pictureUrl = `https://media.bitcoinfiles.org/3d67a74f86567017c913c63d659b2212a08b413af2d70f1ed4f9ded201155c5e`;
    }

    return (
      <CollectionAvatar width={100} height={100} url={item.pictureUrl}/>
    );
  }

  return (
    <div style={{position: "relative"}}>
      <CollectionItemContainer>
        <CollectionImageContainer>
          {renderImage()}
        </CollectionImageContainer>

        <CollectionItemProfileContainer>
          <div>
            {item &&
              <CollectionItemProfileTitle>
                {item.title}
              </CollectionItemProfileTitle>
            }

            <div style={{ color: "DarkGrey" }}>
              {item.total}/{item.total}
            </div>
          </div>
        </CollectionItemProfileContainer>
      </CollectionItemContainer>
    </div>
  );
};

export default CollectionItem;
