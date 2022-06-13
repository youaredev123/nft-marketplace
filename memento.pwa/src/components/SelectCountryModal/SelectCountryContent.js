import { CityName, TextItem, UnlockMessage, UnlockMessageContainer, SelectedCountry } from "components/SelectCountryModal/styles";
import twitter from "assets/images/twitter.png";
import { SearchHeaderContainer } from "screens/SearchScreen/styles";
import SearchBar from "screens/SearchScreen/SearchBar";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Loader } from "components/Loader/styles";
import { UserItemContainer } from "components/FollowableUserItem/styles";
import countryIcon from "assets/images/blue-dot-icon.png";
import NoResults from "components/NoResults";
import useDebounce from "hooks/useDebounce";
import { useLocalStorage } from "hooks/useLocalStorage";
import queryString from "query-string";
import { useHistory } from "react-router-dom";
import {useAccount} from "hooks/useAccount";

const SelectCountryContent = ({ gmapRef = null, countries = [], onCountryClick = null }) => {
  const inviteLink = window.location.origin;
  const history = useHistory();
  const params = queryString.parse(history.location.search);
  const historyState = history.location.state || {};
  const searchTerm = historyState.searchTerm || params.searchTerm;
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const [searchFocus, setSearchFocus] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchedCityTerm, setSearchedCityTerm] = useState("");
  const [searchResultCountries, setSearchResultCities] = useState([]);

  const { account } = useAccount();

  const twitterText = encodeURIComponent(
    "Drop Relics in 👉(INSERT CITY HERE)👈@Relicaworld we can we start collecting #Bitcoin and #NFTs on Relica's world map.\n\n" +
    "📸🌎🌸🧭\n"
  );

  useEffect(() => {
    loadCountries(debouncedSearchTerm);
  }, [debouncedSearchTerm, countries]);

  const loadCountries = useCallback((termToSearch) => {
    const _termToSearch = termToSearch ? termToSearch.replace(/[^\w\s]/gi, "") : "";

    if (_termToSearch.trim() === searchedCityTerm.trim() && _termToSearch.trim() !== "") {
      return;
    }

    setQueryParams(searchTerm);
    setSearchedCityTerm(_termToSearch);
    const searchResult = countries.filter(city => _termToSearch.toLowerCase() === "" || city.name.toLowerCase().includes(_termToSearch.toLowerCase()));
    setSearchResultCities(searchResult);
  }, [searchedCityTerm, searchTerm, countries]);

  const countryNameClickHandler = useCallback((country) => {
    if (gmapRef !== null) {
      gmapRef.current.setCenter({lng: country.lon, lat: country.lat});
    }

    if (typeof onCountryClick === 'function') {
      onCountryClick(country.countryCode);
    }
  }, [gmapRef, onCountryClick]);

  const renderSearchResult = useCallback(() => {
    if (isSearching) {
      return (
        <Loader
          style={{
            alignItems: "center",
            display: "flex",
            height: "calc(100% - 90px)",
            flexDirection: "column",
            justifyContent: "center"
          }}
        />
      );
    }

    return (
      <div>
        {searchResultCountries && searchResultCountries.length ? (
          <div className={"select-country-list"} style={{ overflowY: "scroll", height: "calc(100vh - 300px)" }}>
            <>
              {
                searchResultCountries.map((country) => (
                  <UserItemContainer key={country.countryCode} className="d-flex align-items-center flex-grow-1 country-list-item"
                    style={{ borderBottom: "1px solid var(--light-theme-bgc)" }}>
                    <CityName onClick={() => countryNameClickHandler(country)}
                      className="d-flex flex-column justify-content-between align-items-left flex-grow-1 country-name"
                      style={{ color: account.currentCountry == country.countryCode ? 'var(--blue)' : 'null' }}>
                      {country.name}
                    </CityName>
                  </UserItemContainer>
                ))
              }
            </>
          </div>
        ) : (
          <NoResults>No countries found</NoResults>
        )}
      </div>
    );
  }, [
    searchResultCountries,
    searchFocus,
    debouncedSearchTerm,
    isSearching,
  ]);

  const getSearchString = (searchTerm) => {
    const searchStringForState = queryString.stringify({
      searchTerm: searchTerm,
    });
    return searchStringForState === "" ? "" : "?" + searchStringForState;
  };

  const setQueryParams = useCallback(
    (searchTerm) => {
      const expectedSearchString = getSearchString(
        searchTerm,
      );

      if (history.location.search !== expectedSearchString) {
        const url = history.location.pathname + expectedSearchString;
        history.push(url, {
          searchTerm,
        });
      }
    },
    [history]
  );

  return (
    <>
      <UnlockMessageContainer className={"unlock-message-container"}>
        <TextItem className={"unlock-message-text-item"}
                  style={{ lineHeight: "2.6rem", display: "block", padding: "20px 20px 0 20px" }}>
          <UnlockMessage>
          Visit Relica on Twitter and let us know where we should drop NFTs and Bitcoin!
          </UnlockMessage>

          <a target="_blank" style={{ paddingTop: "1px", display: "block" }}
             href={`https://twitter.com/intent/tweet?text=${twitterText}&url=${encodeURIComponent(
               inviteLink
             )}`}
          >
            <img src={twitter} width={50} height={50}/>
          </a>
        </TextItem>
      </UnlockMessageContainer>

      <div>
        <SearchHeaderContainer className={"select-country-search-header"}>
          <SearchBar
            onTextChange={(searchTerm) =>
              setQueryParams(searchTerm)
            }
            onFocus={setSearchFocus}
            searchTerm={searchTerm}
          />
        </SearchHeaderContainer>

        {renderSearchResult()}
      </div>
    </>
  );
};

export default SelectCountryContent;
