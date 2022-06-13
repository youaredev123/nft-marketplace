import React, { useEffect, useState } from "react";

import { getNumberOfComments } from "../../../api";
import Button from "../../Button";
import ModalContainer from "../../ModalContainer";
import { FilterOption, ModalContent, ModalHeaderContainer, ModalTitle, } from "../../ModalContainer/styles";

import { PostDetailLabel, PostDetailValue } from "./styles";

export default ({ post, show, onHide }) => {
  const [numberOfComments, setNumberOfComments] = useState(0);

  const myAsyncEffect = async () => {
    if (post && post.id) {
      const count = await getNumberOfComments(post.id);
      setNumberOfComments(count);
    }
  };

  useEffect(() => {
    myAsyncEffect();
  }, [post]);

  if (!post) return null;
  return (
    <ModalContainer show={show} onClose={onHide}>
      <ModalContent>
        <ModalHeaderContainer>
          <ModalTitle>Post detail</ModalTitle>
        </ModalHeaderContainer>
        <div className="py-3">
          <FilterOption justify="space-between">
            <PostDetailLabel>Liked</PostDetailLabel>
            <PostDetailValue>3</PostDetailValue>
          </FilterOption>
          <FilterOption justify="space-between">
            <PostDetailLabel>Comments</PostDetailLabel>
            <PostDetailValue>{numberOfComments}</PostDetailValue>
          </FilterOption>
          <FilterOption justify="space-between">
            <PostDetailLabel>Total earned </PostDetailLabel>
            <PostDetailValue color="var(--green)">$3</PostDetailValue>
          </FilterOption>
          <div className="py-3 px-4">
            <Button className="mb-5" onClick={() => onHide()}>
              Close
            </Button>
          </div>
        </div>
      </ModalContent>
    </ModalContainer>
  );
};
