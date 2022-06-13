import React, { useCallback, useMemo } from "react";
import { Container, FilterElem, FilterElemActive, Line } from "./styles";

const SearchFilter = React.memo(
  ({
    setSearchAndFilterTypes,
    filterType,
    debouncedSearchTerm,
    searchType
  }) => {
    const Latest = useMemo(() => {
      return (
        <FilterElem>
          {filterType === "all" ? (
            <FilterElemActive>Discover</FilterElemActive>
          ) : (
            <div onClick={() => setSearchAndFilterTypes("default", "all")}>
              Discover
            </div>
          )}
        </FilterElem>
      );
    }, [filterType]);

    const LikeIcon = useMemo(() => {
      return (
        <FilterElem>
          {filterType === "likes" && searchType === "default" ? (
            <FilterElemActive>Most Liked</FilterElemActive>
          ) : (
            <div
              onClick={() => {
                setSearchAndFilterTypes("default", "likes");
              }}
            >
              Most Liked
            </div>
          )}
        </FilterElem>
      );
    }, [filterType, filterType, debouncedSearchTerm, searchType]);

    const Leaderboard = useMemo(() => {
      return (
        <FilterElem>
          {filterType === "leaderboard" && searchType === "users" ? (
            <FilterElemActive>Pay-to-View</FilterElemActive>
          ) : (
            <div
              onClick={() => {
                setSearchAndFilterTypes("users", "leaderboard");
              }}
            >
              Pay-to-View
            </div>
          )}
        </FilterElem>
      );
    }, [setSearchAndFilterTypes, filterType, debouncedSearchTerm, searchType]);

    const place =
      filterType === "all"
        ? 0
        : filterType === "likes"
        ? 1
        : filterType === "leaderboard"
        ? 2
        : 0;

    return (
      <>
        <Container place={place}>
          {Latest}
          {LikeIcon}
          {Leaderboard}
        </Container>
        <Line />
      </>
    );
  }
);

export default SearchFilter;
