import { useParams } from "react-router-dom";

import useFavouritedBy from "../hooks/useFavouritedBy";
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
  } = useFavouritedBy();

  return UserListScreen({
    title: "Saved",
    id,
    fetch,
    loading,
    users,
    currentPage,
    hasNextPage,
    isLikes
  });
};