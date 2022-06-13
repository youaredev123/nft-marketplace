import React, {useState} from "react";
import { useParams } from "react-router-dom";
import { withRouter } from "react-router-dom";

import Header from "../../components/Header";
import FeedItem from "../../components/FeedItem";
import { FullHeight } from "./styles";

const PostScreenComponent = () => {
  const { id } = useParams();
  const [isMyPost, setIsMyPost] = useState(false)

  if (!id) return null;

  return (
    <FullHeight>
      <Header inPostScreen={true} hasBack isMyPost={isMyPost}/>
      <FeedItem
        key={id}
        contentId={id}
        showComments
        border={false}
        canNavigate={false}
        setIsMyPost={setIsMyPost}
        inPostScreen={true}
      />
    </FullHeight>
  );
};

const PostScreen = withRouter(PostScreenComponent);

export default PostScreen;
