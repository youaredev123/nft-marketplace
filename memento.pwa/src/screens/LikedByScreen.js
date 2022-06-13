import { useParams } from "react-router-dom";

import useLikedBy from "../hooks/useLikedBy";
import UserListScreen from "./UserListScreen";

export default () => {
  const { id } = useParams();
  const isLikes = true;
  const {
    fetch,
    loading,
    users,
    currentPage,
    hasNextPage,
  } = useLikedBy();

  return UserListScreen({
    title: "Likes",
    id,
    fetch,
    loading,
    users,
    currentPage,
    hasNextPage,
    isLikes,
  });
};