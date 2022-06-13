import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useLocation
} from "react-router-dom";
import AuthLayout from "./components/AuthLayout";
import MainLayout from "./components/MainLayout";
import MarketingLayout from "./components/MarketingLayout";
import PostModalContainer from "./components/PostModalContainer";
import { AccountProvider } from "hooks/useAccount";
import useAuthentication from "./hooks/useAuthentication";
import useCurrentUser from "./hooks/useCurrentUser";
import { MoneyButton } from "hooks/useMoneyButton";
import { NotificationProvider } from "hooks/useNotification";
import { ToastProvider } from "hooks/useToast";
import AnimationProvider from "./hooks/useAnimation";
import { HandCashProvider } from "hooks/useHandCash";
import { PaymentsProvider } from "hooks/usePayments";
import Leaderboard from "./screens/Leaderboard";
/* MAIN APP SCREENS */
import FavouritedByScreen from "./screens/FavouritedByScreen";
import FavouritesScreen from "./screens/FavouritesScreen";
import FollowersScreen from "screens/FollowersScreen";
import FollowingScreen from "./screens/FollowingScreen";
import LandingPage from "./screens/LandingPage";
import LikedByScreen from "./screens/LikedByScreen";
import LoginProviderReturn from "./screens/LoginProviderReturn";
import MyProfileScreen from "./screens/MyProfileScreen";
import NewPostScreen from "./screens/NewPostScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import OthersProfileScreen from "./screens/OthersProfileScreen";
import PostScreen from "./screens/PostScreen";
import RelicsScreen from "screens/RelicsScreen";
import RelicCreatePhotoScreen from "screens/RelicsScreen/RelicCreatePhotoScreen";
import NFTCreateScreen from "./screens/NFTScreen/Create";
import RelicScreen from "screens/RelicsScreen/RelicScreen";
import BurierScreen from "./screens/RelicsScreen/profile";
import SearchScreen from "./screens/SearchScreen";
import SettingsScreen from "./screens/SettingsScreen";
import { SignupScreen } from "screens/SignupScreen";
import CreateWalletScreen from "./screens/CreateWalletScreen";
import NFTScreen from "./screens/NFTScreen";
import WalletLoginScreen from "./screens/WalletLoginScreen";
import SendBSVScreen from "./screens/SendBSVScreen";
import ReceiveBSVScreen from "./screens/ReceiveBSVScreen";
import WalletRecoveryScreen from "./screens/WalletRecoveryScreen";
/* AUTH & PUBLIC SCREENS */
import SplashScreen from "./screens/SplashScreen";
import GlobalStyles from "./styles";
import ScrollToTop from "../src/hooks/useScrollToTop";
import { DarkModeProvider } from "hooks/useDarkMode";
import HomeScreen from "./screens/HomeScreen";
import MarketDetailScreen from "./screens/NFTScreen/Market/MarketDetailScreen";
import SatchelDetailScreen from "./screens/NFTScreen/Satchel/SatchelDetailScreen";
import {PageContainer} from "screens/RelicsScreen/styles";
import NFTCollectionScreen from "./screens/NFTScreen/Collection/NFTCollectionScreen";
import CreateScreen from "./screens/CreateScreen";
import NFTSelectScreen from "./screens/NFTScreen/Select";
import NFTCollectionDetailScreen from "./screens/NFTScreen/Collection/NFTCollectionDetailScreen";
import DropNFTScreen from "./screens/NFTScreen/Collection/DropNFTScreen";
import BecomeInfluencer from "screens/BecomeInfluencer";
import WelcomeScreen from "./screens/WelcomeScreen";
import FirstPostScreen from "./screens/FirstPostScreen";
require("dotenv").config({ path: "../.env." + process.env.NODE_ENV });

function App() {
  return (
    <>
      <NotificationProvider>
        <AccountProvider>
          <MoneyButton>
            <HandCashProvider>
              <ToastProvider>
                <PaymentsProvider>
                  <Router>
                    <Routes />
                  </Router>
                </PaymentsProvider>
              </ToastProvider>
            </HandCashProvider>
          </MoneyButton>
        </AccountProvider>
        <GlobalStyles />
      </NotificationProvider>
    </>
  );
}

function Routes() {
  const location = useLocation();
  const previousLocationRef = React.useRef(location);

  React.useEffect(() => {
    previousLocationRef.current = location;
  }, []);

  React.useEffect(() => {
    if (!(location.state && location.state.modal)) {
      previousLocationRef.current = location;
    }
  }, [location]);

  const isModal =
    location.state &&
    location.state.modal &&
    previousLocationRef.current !== location;

  const isAuthenticating =
    [
      "/app/moneybutton/return",
      "/auth/api/handcash/success",
      "/auth/api/handcash/decline"
    ].indexOf(location.pathname) !== -1;
  const { userAllowedToBrowseInnerRoutes } = useAuthentication(
    isAuthenticating
  );
  const { currentUser } = useCurrentUser();

  const renderInnerRoutes = () => (
    <AnimationProvider>
      <DarkModeProvider>
        <MainLayout>
          <Switch location={isModal ? previousLocationRef.current : location}>
            <Route path="/" exact>
              <HomeScreen />
            </Route>
            <Route path="/become-influencer" exact>
              <ScrollToTop />
              <BecomeInfluencer />
            </Route>
            <Route path="/leaderboard" exact>
              <Leaderboard />
            </Route>
            <Route path="/favourites" exact>
              <ScrollToTop />
              <FavouritesScreen />
            </Route>
            <Route path="/search" exact>
              <SearchScreen />
            </Route>
            <Route path="/post" exact>
              <NewPostScreen />
            </Route>
            <Route path="/post/:id" exact>
              <PostModalContainer>
                <PostScreen />
              </PostModalContainer>
            </Route>
            <Route path="/post/:id/likes" exact>
              <PostModalContainer>
                <LikedByScreen />
              </PostModalContainer>
            </Route>
            <Route path="/post/:id/favourites" exact>
              <PostModalContainer>
                <FavouritedByScreen />
              </PostModalContainer>
            </Route>
            <Route
              path={["/relics", "/relics/discovered", "/relics/buried"]}
              exact
            >
              <RelicsScreen />
            </Route>
            <Route path="/relics/create" exact>
              <RelicCreatePhotoScreen />
            </Route>
            <Route path="/relics/view/:id" exact>
              <PostModalContainer>
                <RelicScreen />
              </PostModalContainer>
            </Route>
            <Route path="/relics/buried-by/:id" exact>
              <BurierScreen />
            </Route>
            <Route path="/notifications">
              <NotificationsScreen />
            </Route>
            <Route path="/profile/followers/:id" exact>
              <FollowersScreen />
            </Route>
            <Route path="/profile/following/:id" exact>
              <FollowingScreen />
            </Route>
            <Route path="/create" exact>
              <PageContainer>
                <CreateScreen/>
              </PageContainer>
            </Route>
            <Route path="/settings">
              <SettingsScreen />
            </Route>
            {currentUser && currentUser.username && (
              <Route
                path={"/" + encodeURIComponent(currentUser.username)}
                exact
              >
                <MyProfileScreen />
              </Route>
            )}
            <Route path="/:username" exact>
              <OthersProfileScreen />
            </Route>
            <Route path="/wallet/create" exact>
              <CreateWalletScreen />
            </Route>
            <Route path="/nft/select" exact>
              <NFTSelectScreen />
            </Route>
            <Route path="/nft/create" exact>
              <NFTCreateScreen />
            </Route>
            <Route path="/nft/collection" exact>
              <PageContainer>
                <NFTCollectionScreen/>
              </PageContainer>
            </Route>
            <Route path="/nft/collection/detail/:id" exact>
              <PageContainer>
                <NFTCollectionDetailScreen/>
              </PageContainer>
            </Route>
            <Route path="/nft/collection/drop/:id" exact>
              <PageContainer>
                <DropNFTScreen/>
              </PageContainer>
            </Route>
            <Route path="/nft/:section/:action?" exact>
              <NFTScreen />
            </Route>
            <Route path="/nft/market/view/:id" exact>
              <PageContainer>
                <MarketDetailScreen/>
              </PageContainer>
            </Route>
            <Route path="/nft/satchel/view/:id" exact>
              <PageContainer>
                <SatchelDetailScreen/>
              </PageContainer>
            </Route>
            <Route path="/wallet/login/:action?" exact>
              <WalletLoginScreen navigate="/nft/wallet" showRegister={true} label="Login"  />
            </Route>
            <Route path="/wallet/recovery" exact>
              <WalletRecoveryScreen />
            </Route>
            <Route path="/wallet/send" exact>
              <SendBSVScreen />
            </Route>
            <Route path="/wallet/receive" exact>
              <ReceiveBSVScreen />
            </Route> 
          </Switch>
          {isModal ? (
            <>
              <Route path="/post/:id" exact>
                <PostModalContainer>
                  <PostScreen />
                </PostModalContainer>
              </Route>
              <Route path="/relics/view/:id" exact>
                <PostModalContainer>
                  <RelicScreen />
                </PostModalContainer>
              </Route>
            </>
          ) : null}
        </MainLayout>
      </DarkModeProvider>
    </AnimationProvider>
  );

  return (
    <Switch>
      <Route path="/welcome" exact>
        <MainLayout displayFooter={false}>
          <ScrollToTop />
          <WelcomeScreen />
        </MainLayout>
      </Route>

      <Route path="/first-post" exact>
        <MainLayout displayFooter={false}>
          <ScrollToTop />
          <FirstPostScreen />
        </MainLayout>
      </Route>

      <Route path="/app/moneybutton/return" exact>
        <DarkModeProvider>
          <MainLayout>
            <LoginProviderReturn provider="moneybutton" />
          </MainLayout>
        </DarkModeProvider>
      </Route>
      <Route path="/auth/api/handcash/success" exact>
        <MainLayout>
          <LoginProviderReturn provider="handcash" />
        </MainLayout>
      </Route>
      <Route path="/auth/api/handcash/decline" exact>
        <MainLayout>
          <LoginProviderReturn provider="handcash" rejected={false} />
        </MainLayout>
      </Route>
      <Route path={["/auth", "/join/:refId"]}>
        <AuthLayout>
          <Switch location={location} key={location.pathname}>
            <Route path={["/auth", "/join/:refId"]} exact>
              <SplashScreen />
            </Route>
            <Route path="/auth/signup" exact>
              <SignupScreen />
            </Route>
            <Route path="/">
              <Redirect to="/auth" />
            </Route>
          </Switch>
        </AuthLayout>
      </Route>
      {userAllowedToBrowseInnerRoutes ? (
        renderInnerRoutes()
      ) : (
        <Route path="/">
          <MarketingLayout>
            <Switch location={location} key={location.pathname}>
              <Route path="/" exact>
                <ScrollToTop />
                <LandingPage />
              </Route>
              <Route path="/become-influencer" exact>
                <ScrollToTop />
                <BecomeInfluencer />
              </Route>
              <Route path="/">
                <Redirect to="/" />
              </Route>
            </Switch>
          </MarketingLayout>
        </Route>
      )}
    </Switch>
  );
}

export default App;
