import React, { useCallback, useEffect, useRef, useState, } from "react";
import { useHistory, useLocation } from "react-router-dom";
import _ from "lodash";
import confetti from "canvas-confetti";
import queryString from "query-string";
import RelicService from "../../services/RelicService";
import UserService from "services/UserService";
import { useLocalStorage } from "hooks/useLocalStorage";
import getMapbox, { getAllCountries } from "../../hooks/useMapbox";
import Button from "../../components/Button";
import Spinner from "../../components/Loader";
import SelectCountryModal from "../../components/SelectCountryModal";
import CurrentCountryLabel from "screens/RelicsScreen/CurrentCountryLabel";
import FoundWoodenRelicClosed from "assets/images/found_wooden_relic_closed.png";
import FoundWoodenRelicOpened from "assets/images/found_wooden_relic_opened.png";
import InfoIcon from "assets/icons/info.png";
import DiscoveredIcon from "assets/icons/discover-icon.jpg";
import PlaceHolderAvatar from "assets/images/avatar-placeholder.png";
import lock from "assets/icons/lock.svg";

import {
  DiscoveredPopupMessage,
  Hidden,
  MapContainer,
  Popup,
  PopupBigHeader,
  PopupContainer,
  SlideHeaderContainer,
  PurchaseMapButton,
  LockIcon,
  CenterText
} from "./styles";
import SelectCountryContent from "components/SelectCountryModal/SelectCountryContent";
import MapFAQInformation from "screens/RelicsScreen/Information/MapFAQInformation";
import RelicDetailModal from "screens/RelicsScreen/Modal/RelicDetailModal";
import CreateRelicPhotoModal from "screens/RelicsScreen/Modal/CreateRelicPhotoModal";
import useWindowDimensions from "hooks/useWindowWidth";
import MobileMapInformationModal from "screens/RelicsScreen/Information/MobileMapInformationModal";
import useToast from "hooks/useToast";
import GenericMessage from "components/Toasts/GenericMessage";
import {usePayments} from "../../hooks/usePayments";
import {Menu} from "react-feather";
import {useAccount} from "../../hooks/useAccount";
import useCurrentUser from "hooks/useCurrentUser";
import { useMoneyButton } from "hooks/useMoneyButton";

const BACKEND_QUERY_DELAY = 5500; // 5.5 seconds

const mapState = {
  foundRelicId: null,
  foundRelic: null,
  foundRelicAmount: null,
  foundRelicPic: null,
  isFoundRelicLoading: false,
  relicUnlockError: null,
  setShouldShowUnlockMessage: null,
  interval: null,
};

const Map = () => {
  const history = useHistory();
  const location = useLocation();
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const mapBoxGlLibraryRef = useRef(null);
  const popupRef = useRef(null);
  const relicPosXRef = useRef();
  const relicPosYRef = useRef();
  const { windowWidth } = useWindowDimensions();
  const { showToast } = useToast();
  const [showDesktopMapSlide, setShowDesktopMapSlide] = useState(null);
  const [isDesktopSlideShowCountries, setDesktopSlideShowCountries] = useState(false);
  const [showingSelectCountryPopup, setShowingSelectCountryPopup] = useState(false);
  const [desktopRelicDetail, setDesktopRelicDetail] = useState(null);
  const [showDesktopRelicModal, setShowDesktopRelicModal] = useState(true);
  const [showDesktopCreateRelicPhotoModal, setShowDesktopCreateRelicPhotoModal] = useState(false);
  const [desktopCreateRelicPhotoData, setDesktopCreateRelicPhotoData] = useState({});
  const [showMobileMapInformationModal, setShowMobileMapInformationModal] = useState(false);
  const {
    success: hasReturnedFromRelicsCreation,
  } = queryString.parse(location.search);
  const [showingSuccessPopup, setShowingSuccessPopup] = useState(hasReturnedFromRelicsCreation);
  const [lastCameraPos, setLastCameraPos] = useLocalStorage("relics_camera_pos", [-0.09, 51.505]);
  const [lastCameraZoom, setLastCameraZoom] = useLocalStorage("relics_camera_zoom", 8);
  const [city, setCity, hydrateCity] = useLocalStorage("relics_selected_city", null);
  const [mapStateReactableVersion, setMapStateReactableVersion] = useState(0);
  const [viewedRelics, setViewedRelics] = useState({});
  const [countries, setCountries] = useState([]);
  const relicIconRef = useRef();
  const isDesktopMode = typeof window !== "undefined" && window.innerWidth >= 481;
  const { pay } = usePayments();
  const { account, setAccount } = useAccount();
  const { fetchCurrentUser } = useCurrentUser()
  const { requestAuthorization } = useMoneyButton();
  const purchasedMap = (account && account.purchases && account.purchases.maps);

  const handleUnlockMap = () => {
    const onPayment = () => {
      const myCanvas = document.createElement('canvas');
      document.getElementById('root').appendChild(myCanvas);
      setMapPurchased(true);

      myCanvas.setAttribute('style', `
          position: fixed;
          width: 100vw;
          top: 0px;
          height: 100vh;
          left: 0;
          z-index: 15;
          min-width: 480px;
        `);
      const myConfetti = confetti.create(myCanvas, {
        resize: true,
        useWorker: true
      });

      myConfetti({
        particleCount: 250,
        spread: 400,
      });

      setTimeout(() => {
        myCanvas.remove();
      }, 3800);
    };

    pay({
      type: "MAPS",
      data: {
      },
      onPayment,
      onError: console.error,
    });
  };

  const setMapPurchased = useCallback(async () => {
    const purchases = { ...account.purchases };
    purchases.maps = true;

    setAccount({ ...account, purchases });
  }, [purchasedMap, account, setAccount]);

  useEffect(() => {
    const countries = getAllCountries();
    setCountries(countries);
  }, [getAllCountries]);

  useEffect(() => {
    fetchCurrentUser();
  }, [])

  if (hasReturnedFromRelicsCreation && showingSuccessPopup) {
    history.replace("/relics");
  }

  const onMapStateUpdate = useCallback(() =>
      setMapStateReactableVersion(version => version + 1),
    [setMapStateReactableVersion]);

  const relicIconClickHandler = (relic) => {
    if (isDesktopMode) {
      setDesktopRelicDetail(relic);
      setShowDesktopRelicModal(true);
    } else {
      history.push(`/relics/view/${relic.id}`);
    }
  };

  const prevCountry = useRef(null);

  const discoverRelics = useRef(_.throttle(async ({ country, lat, lon, forceReload = false }) => {
    if (country === prevCountry.current && !forceReload) {
      return;
    }
    
    prevCountry.current = country;

    const response = await RelicService.discover({
      countryCode: country,
    });

    if (response.status !== 200 || !Array.isArray(response.data)) {
      console.error("Backend error: ", response);
      if (prevCountry.current === country) {
        prevCountry.current = null;
      }
      return;
    }

    setViewedRelics(viewedRelics => {
      const newViewedRelics = {};
      response.data.reverse().forEach(receivedRelics => {
        const newMarkerNode = relicIconRef.current.cloneNode(true);
        // newMarkerNode.style.backgroundImage = "url(" + (receivedRelics.partner && receivedRelics.partner.partnerPic ? receivedRelics.partner.partnerPic : FoundWoodenRelicClosed) + "), url("+ PlaceHolderAvatar +")";
        
        const isRelicaUser = process.env.REACT_APP_RELICA_USERS.includes(receivedRelics.userId);
        if (isRelicaUser) {
          newMarkerNode.style.backgroundImage = "url(" + FoundWoodenRelicClosed + ")";
          newMarkerNode.style.width = "35px";
          newMarkerNode.style.height = "35px";
        } else {
          newMarkerNode.style.backgroundImage = "url("+ receivedRelics.pictureUrl +"), url("+ PlaceHolderAvatar +")";
          newMarkerNode.style.backgroundColor = "var(--white)";
          newMarkerNode.style.boxShadow = "rgb(0 0 0 / 20%) 0px 5px 2px -2px";
          newMarkerNode.style.borderRadius = "50%";
          newMarkerNode.style.border = "2px solid var(--white)";
          newMarkerNode.style.width = "45px";
          newMarkerNode.style.height = "45px";
        }
        
        newMarkerNode.style.zIndex = 2;
        newMarkerNode.addEventListener("click", () => relicIconClickHandler(receivedRelics));
        const marker = new mapBoxGlLibraryRef.current.Marker({
          element: newMarkerNode
        });
        marker.setLngLat([receivedRelics.lon, receivedRelics.lat]);
        marker.addTo(mapRef.current);
        newViewedRelics[receivedRelics.id] = marker;
      });
      Object.entries(viewedRelics).forEach(([key, marker]) => {
        if (typeof newViewedRelics[key] === "undefined") {
          marker.remove();
        }
      });
      return newViewedRelics;
    });
  }, BACKEND_QUERY_DELAY));

  const updateUserPos = useRef(_.throttle(async ({ lat, lon }) => {
    if (purchasedMap !== true || mapState.foundRelic !== null || mapState.isFoundRelicLoading) {
      return;
    }

    const countryCode = account.currentCountry
    const transactionResultResponse = await RelicService.unlockRelicAndCreateTransaction({
      lat, lon, countryCode
    });

    if (transactionResultResponse.status === 422 && mapState.setShouldShowUnlockMessage === null) {
      mapState.setShouldShowUnlockMessage = true;
      onMapStateUpdate();

      return;
    }

    if (transactionResultResponse.status !== 200 || !transactionResultResponse.data) {
      return;
    }

    mapState.isFoundRelicLoading = true;
    mapState.setShouldShowUnlockMessage = null;
    mapState.foundRelicAmount = transactionResultResponse.data.amount;
    mapState.foundRelicPic = transactionResultResponse.data.partner && transactionResultResponse.data.partner.partnerPic ? transactionResultResponse.data.partner.partnerPic : null;

    mapState.foundRelicId = mapState.foundRelic = transactionResultResponse.data.id;
    mapState.isFoundRelicLoading = false;
    onMapStateUpdate();

    const myCanvas = document.createElement("canvas");
    document.getElementById("root").appendChild(myCanvas);

    myCanvas.setAttribute(
      "style",
      `
          position: fixed;
          width: 100vw;
          top: 0px;
          height: 100vh;
          left: 0;
          min-width: 480px;
        `
    );

    const myConfetti = confetti.create(myCanvas, {
      resize: true,
      useWorker: true
    });

    myConfetti({
      particleCount: 250,
      spread: 400
    });

    setTimeout(() => {
      myCanvas.remove();
    }, 3800);
  }, BACKEND_QUERY_DELAY));

  const onGeoLocate = (pos) => {
    if (!mapState.interval) {
      updateUserPos.current({
        countries,
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      });

      mapState.interval = window.setInterval(async () => {
        updateUserPos.current({
          countries,
          lat: pos.coords.latitude,
          lon: pos.coords.longitude
        });
      }, 5000);
    }
  };

  useEffect( () => {
    const { container, map, mapboxgl } = getMapbox({
      pos: lastCameraPos,
      zoom: lastCameraZoom,
    });
    containerRef.current.appendChild(container);
    map.resize();
    mapRef.current = map;
    mapBoxGlLibraryRef.current = mapboxgl;

    let relicMarker = null;

    const onMapClick = e => {
      if (purchasedMap !== true) return;
      if (relicMarker === null) {
        relicMarker = new mapboxgl.Marker({ "color": "red" }).setLngLat(e.lngLat);
        relicMarker.addTo(mapRef.current);

        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
        });
        relicMarker.setPopup(popup.setDOMContent(popupRef.current));
        relicMarker.togglePopup();
        
        // if (isUserCanDropPhoto) {
        //   relicMarker.togglePopup();
        // }
      } else {
        relicMarker.setLngLat(e.lngLat);
      }
      relicPosXRef.current = e.lngLat.lng;
      relicPosYRef.current = e.lngLat.lat;
    };

    mapRef.current.on("click", onMapClick);

    const onMapMoveEnd = () => {
      const center = mapRef.current.transform.center;
      const currentCountry = JSON.parse(localStorage.getItem('relica_user')).currentCountry;
      discoverRelics.current({
        country: currentCountry,
        lat: center.lat,
        lon: center.lng
      });

      setLastCameraPos([center.lng, center.lat]);
      setLastCameraZoom(mapRef.current.getZoom());
    };
    mapRef.current.on("moveend", onMapMoveEnd);

    if (typeof mapRef.current._controls[2] === 'undefined' || !(mapRef.current._controls[2] instanceof mapboxgl.GeolocateControl)) {
      const mapContainerGeoControl = new mapboxgl.GeolocateControl({
        fitBoundsOptions: {
          linear: true,
          minZoom: 8,
        },
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      });

      mapContainerGeoControl.on('trackuserlocationend', function () {
        if (mapState.interval) {
          window.clearInterval(mapState.interval);
          mapState.interval = null;
        }
      });

      mapRef.current.addControl(mapContainerGeoControl, "top-right");

      // disable map rotation using right click + drag
      mapRef.current.dragRotate.disable();
      // disable map rotation using touch rotation gesture
      mapRef.current.touchZoomRotate.disableRotation();
    }

    if (mapRef.current._controls[2] instanceof mapboxgl.GeolocateControl) {
      mapRef.current._controls[2].on("geolocate", onGeoLocate);
    }

    onMapMoveEnd();

    return () => {
      if (relicMarker !== null) {
        relicMarker.remove();
      }

      Object.entries(viewedRelics).forEach(([key, value]) => {
        value.remove();
      });

      mapRef.current.off("click", onMapClick);
      mapRef.current.off("moveend", onMapMoveEnd);
      closeAllPopups();
      if (mapState.interval) {
        window.clearInterval(mapState.interval);
        mapState.interval = null;
      }
      mapRef.current._controls[2].off("geolocate", onGeoLocate);
      mapState.setShouldShowUnlockMessage = null;
    };
  }, [viewedRelics, setViewedRelics, getAllCountries]);

  const closeAllPopups = useCallback(() => {
    setShowingSuccessPopup(false);

    Object.entries(viewedRelics).forEach(([key, value]) => {
      if (key === mapState.foundRelicId) {
        value.remove();
      }
    });
    mapState.foundRelic = null;
    mapState.relicUnlockError = null;

    if (mapState.setShouldShowUnlockMessage) {
      mapState.setShouldShowUnlockMessage = null;
    }
    onMapStateUpdate();
  }, [setShowingSuccessPopup, onMapStateUpdate, viewedRelics]);

  const shouldShowRelicFoundPopup =
    mapState.foundRelic ||
    mapState.isFoundRelicLoading ||
    mapState.relicUnlockError;

  const setShouldShowUnlockMessage = mapState.setShouldShowUnlockMessage;

  const selectCountrySlideClasses = useCallback(() => {
    if (showDesktopMapSlide === null) {
      return '';
    }

    return showDesktopMapSlide ? 'slide-in' : 'slide-out';
  }, [showDesktopMapSlide]);

  const displayDesktopSlideContent = useCallback(() => {
    return !isDesktopSlideShowCountries ? <MapFAQInformation /> :
      <SelectCountryContent
        gmapRef={mapRef}
        countries={countries}
        onCountryClick={(countryCode) => handleOnCountryClick(countryCode)}
      />;
  }, [isDesktopSlideShowCountries, getAllCountries]);

  const selectCountryHandler = useCallback(() => {
    if (windowWidth <= 480) {
      setShowingSelectCountryPopup(true);
    } else {
      setShowDesktopMapSlide(!showDesktopMapSlide);
      setDesktopSlideShowCountries(true);
    }
  }, [windowWidth, showDesktopMapSlide]);

  const onViewMapInformationHandler = useCallback(() => {
    if (windowWidth <= 480) {
      setShowMobileMapInformationModal(true);
    } else {
      setShowDesktopMapSlide(!showDesktopMapSlide);
      setDesktopSlideShowCountries(false);
    }
  }, [windowWidth, showDesktopMapSlide]);

  const createPhotoModalHandler = () => {
    if (isDesktopMode) {
      setShowDesktopCreateRelicPhotoModal(true);
      setDesktopCreateRelicPhotoData({ x: relicPosXRef.current, y: relicPosYRef.current });
    } else {
      // history.push(`/create-photo?x=${relicPosXRef.current}&y=${relicPosYRef.current}`);
      history.push(`/relics/create?x=${relicPosXRef.current}&y=${relicPosYRef.current}`);
    }
  };

  const createRelicModalSuccessHandler = useCallback((msg) => {
    if (!mapRef) {
      return;
    }

    const center = mapRef.current.transform.center;
    const currentCountry = JSON.parse(localStorage.getItem('relica_user')).currentCountry;

    discoverRelics.current({
      country: currentCountry,
      lat: center.lat,
      lon: center.lng,
      forceReload: true
    });

    showToast(<GenericMessage text={msg} />);
  }, [mapRef]);

  const createRelicModalBeforePayProcess = useCallback(() => {
    setShowDesktopCreateRelicPhotoModal(false);
  }, []);

  const handleOnCountryClick = useCallback((countryCode) => {
    UserService.saveCurrentCountry(countryCode).then(result => {
      if (!result.hasError) {
        discoverRelics.current({
          country: countryCode,
          forceReload: true
        });

        const newData = {
          ...account,
          currentCountry: countryCode
        };
        setAccount(newData);
      }
    });
    setShowDesktopMapSlide(false);
    setShowingSelectCountryPopup(false);
  });

  const getCountryNameByCode = useCallback(() => {
    const country = countries.filter(x => x.countryCode === account.currentCountry)[0];
    return country?.name;
  });

  const openCountryPicker = useCallback(() => {
    setDesktopSlideShowCountries(true);
    isDesktopMode ? setShowDesktopMapSlide(true) : setShowingSelectCountryPopup(true)
  })

  return (<>
    <MapContainer
      ref={containerRef}
      className={`map-container confirmed`}
    >
      <div className={`desktop-select-countries ${selectCountrySlideClasses()}`}>
        <SlideHeaderContainer onClick={() => setShowDesktopMapSlide(false)}>Exit</SlideHeaderContainer>
        <div className={"desktop-select-countries-scrollable"}>
          {displayDesktopSlideContent()}
        </div>
      </div>
      <CurrentCountryLabel
        countryName={getCountryNameByCode}
      />

      <div className={"desktop-buttons-wrapper"}>
        <div>
          <div className={`icon ${showDesktopMapSlide && isDesktopSlideShowCountries ? "active" : ""}`}
            onClick={selectCountryHandler}>
            <Menu color={showDesktopMapSlide && isDesktopSlideShowCountries ? "var(--blue)" : "var(--grey)"} size={32} />
          </div>
        </div>
        <div>
          <div className={`icon ${showDesktopMapSlide && !isDesktopSlideShowCountries ? "active" : ""}`}
               onClick={onViewMapInformationHandler}>
            <img src={InfoIcon} width={32} height={32} alt={"Info icon"}/>
          </div>
        </div>

        <div>
          <div className={`icon discovered-icon ${showDesktopMapSlide && !isDesktopSlideShowCountries ? "active" : ""}`}
               onClick={() => history.push('relics/discovered')}>
            <img src={DiscoveredIcon} width={32} height={32} alt={"Discovered icon"}/>
          </div>
        </div>
      </div>
    </MapContainer>
    <SelectCountryModal
      show={showingSelectCountryPopup}
      setShowingSelectCountryPopup={setShowingSelectCountryPopup}
      gmapRef={mapRef}
      countries={countries}
      onCountryClick={(countryCode) => handleOnCountryClick(countryCode)}
    />

    <Hidden>
        {/* 25-Nov-2021 only Moneybutton is compatible */}
        {account && account?.wallets?.moneybutton && account?.wallets?.moneybutton?.active ?
        <Popup ref={popupRef}>
          {account.currentCountry ?
            <Button style={{ border: "2px solid #FFFFF", boxShadow: "rgb(0 0 0 / 10%) 0px 2px 6px" }}
              onClick={createPhotoModalHandler}
            >
              Create Relic
            </Button> :
            <Button style={{ border: "2px solid #FFFFF" }}
              onClick={openCountryPicker}
            >
              Select Country
            </Button>
          }
        </Popup> :
        <Popup ref={popupRef}>
            <Button className="transparent"
              onClick={requestAuthorization}>
              Switch to Money Button to create Relics
            </Button>
        </Popup>}

      <div
        ref={relicIconRef}
        style={{
          width: "40px",
          height: "40px",
          borderRadius: 0,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          cursor: "pointer",
          zIndex: "1",
        }}
        width={50}
        height={50}
      >
      </div>
    </Hidden>
    {
      (showingSuccessPopup || shouldShowRelicFoundPopup) &&
      <PopupContainer onClick={closeAllPopups} style={{ top: "50px" }}>
        {shouldShowRelicFoundPopup &&
        <DiscoveredPopupMessage onClick={e => e.stopPropagation()}>
          <PopupBigHeader>
            <strong>Congratulations!</strong><br/>
            You collected <span className="currency">${parseFloat(mapState.foundRelicAmount).toFixed(2)}</span>
            <br/>and discovered a Relic!
          </PopupBigHeader>
          <img src={mapState.foundRelicPic ? mapState.foundRelicPic : FoundWoodenRelicOpened}
               style={{ margin: "20px 0", maxWidth: "200px" }} alt={""}/>
          {mapState.isFoundRelicLoading
            ? <Button className="primary"><Spinner color="var(--white)"/></Button>
            : <Button
              onClick={() => mapState.foundRelic && history.push(`/relics/view/${mapState.foundRelic}`)}
              className="primary"
            >
              {mapState.relicUnlockError ? "Error: " + mapState.relicUnlockError : "View"}
            </Button>}
        </DiscoveredPopupMessage>}
      </PopupContainer>
    }
    {
      (purchasedMap !== true) &&
      <PurchaseMapButton onClick={closeAllPopups}>
        <Button
          onClick={() => {
            handleUnlockMap();
            mapState.setShouldShowUnlockMessage = null;
          }}
          className="primary"
        >
          <LockIcon src={lock} alt="lock-icon" title="Lock Icon" />
          <CenterText>Unlock to create and collect Relics: $9.99</CenterText>
        </Button>
      </PurchaseMapButton>
    }
    <MobileMapInformationModal
      show={showMobileMapInformationModal}
      onHide={() => setShowMobileMapInformationModal(false)}
    />
    <RelicDetailModal
      show={showDesktopRelicModal}
      onHide={() => setShowDesktopRelicModal(false)}
      relic={desktopRelicDetail}
    />
    <CreateRelicPhotoModal
      show={showDesktopCreateRelicPhotoModal}
      onHide={() => setShowDesktopCreateRelicPhotoModal(false)}
      x={desktopCreateRelicPhotoData.x}
      y={desktopCreateRelicPhotoData.y}
      onPaySuccessCallback={createRelicModalSuccessHandler}
      onBeforePayCallback={createRelicModalBeforePayProcess}
    />
  </>);
};

export default Map;
