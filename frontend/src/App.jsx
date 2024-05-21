import React, { useCallback, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  // Redirect,
  //  Switch,
} from "react-router-dom";

import Home from "./home/Page/HomePage.jsx";
import Ban from "./shared/components/Pages/Ban";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import UserPlaces from "./places/pages/UserPlaces.jsx";
import UpdatePlace from "./places/pages/UpdatePlace.jsx";
import Auth from "./user/Auth/Auth.jsx";
import MainNavigation from "./shared/components/Navigation/MainNavigation.jsx";
import { AuthContext } from "./shared/context/auth-context";
import Signup from "./user/pages/Signup.jsx";
import RegisterHackatons from "./register/Page/RegisterHackatons.jsx";
import Profile from "./profile/Pages/Profile.jsx";

import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./store";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PrivateRoute from "./BuildKite/PrivateRoute.jsx";

import Landing from "./landing/pages/Landing.jsx";
import NewArtwork from "./shared/components/FormElements/NewArtworkSignup.jsx";
import Artists from "./ArtistsPage/Pages/ArtistPage.jsx";
import Museums from "./MuseumPage/Pages/MuseumPage.jsx";
import UserProfile from "./UserProfile/Pages/UserProfile.jsx";
import SocialMedia from "./user/pages/SocialMedia.jsx";
import ArtworkDetails from "./ArtworkDetails/Pages/ArtworkDetails.jsx";
import ArtistProfileForUser from "./ArtistProfileForUser/Pages/ArtistProfileForUser.jsx";
import MuseumShowcase from "./MuseumShowcase-Client/Pages/MuseumShowcase-Client.jsx";
import MuseumShowcaseArtist from "./MuseumShowcase-Artist/Pages/MuseumShowcase-Artist.jsx";
import MuseumDetails from "./MuseumDetails/Pages/MuseumDetails.jsx";
import PricingOptions from "./PricingOptions/Pages/PricingOptions.jsx";
import PlansHistory from "./PlansHistory/Pages/PlansHistory.jsx";
import NavigationWrapper from "./shared/components/Navigation/NavigationWrapper.jsx";
import ArtistProfileClient from "./ArtistProfile-Client/ArtistProfileClinet.jsx";
import Collection from "./Collection/Pages/Collection.jsx";
import Success from "./shared/components/Pages/successPayments/Success.jsx";
import Fail from "./shared/components/Pages/failPayments/Fail.jsx";
import Card from "./Card/Pages/Card.jsx";
import SuccessPaymentMuseum from "./shared/components/Pages/successPayments/SuccessMuseum.jsx";
import FailPaymentMuseum from "./shared/components/Pages/failPayments/FailMuseum.jsx";
import Events from "./Events/Pages/Events.jsx";
import LikedArtworks from "./LikedArtworks/pages/LikedArtworks.jsx";
import SuccessOrderPayment from "./shared/components/Pages/successPayments/SuccessOrderPayment.jsx";
import FailOrderPayment from "./shared/components/Pages/failPayments/FailOrderPayment.jsx";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState();
  const [userName, setUserName] = useState();
  const [ban, setBan] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [teamId, setTeamId] = useState();
  const [profileImage, setProfileImage] = useState();

  const login = useCallback(
    (userId, userName, teamId, isAdmin = false, ban = false) => {
      setIsLoggedIn(true);
      setUserId(userId);
      setUserName(userName);
      setIsAdmin(isAdmin);
      setTeamId(teamId);
      setBan(ban);
    },
    []
  );

  const updateUsername = useCallback((userName) => {
    setUserName(userName);
  }, []);

  const updateProfilePicture = useCallback((URLimage) => {
    setProfileImage(URLimage);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
    setUserName(null);
    setIsAdmin(false);
    setTeamId(null);
    setBan(null);
  }, []);

  // const location = useLocation();
  // const publicPaths = ["/login", ];

  // // Check if the current path is one of the protected paths
  // const showMainNavigation = publicPaths.includes(location.pathname);

  let routes;

  if (isLoggedIn && !isAdmin && !ban) {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/places/new" element={<NewPlace />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/places/:placeId" element={<UpdatePlace />} />
        <Route path="/registred-hackatons" element={<RegisterHackatons />} />
        <Route path="/users" element={<Users />} />
        {/* Add more routes as needed */}
      </Routes>
    );
  } else if (isLoggedIn && !isAdmin && ban) {
    routes = (
      <Routes>
        <Route path="/" element={<Ban />} />
      </Routes>
    );
  } else if (isLoggedIn && isAdmin) {
    routes = (
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add more routes as needed */}
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/artist" element={<Artists />} />
          <Route path="/museums" element={<Museums />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/artwork/:artworkId" element={<ArtworkDetails />} />
          <Route path="/ArtistProfileAdem" element={<ArtistProfileClient />} />
          <Route path="/artist/:username" element={<ArtistProfileForUser />} />
          <Route path="/museumshowcase" element={<MuseumShowcase />} />
          <Route
            path="/MuseumShowcaseArtist"
            element={<MuseumShowcaseArtist />}
          />
          <Route path="/Plans" element={<PricingOptions />} />
          <Route path="/PlansHistory" element={<PlansHistory />} />
          <Route path="/museums/:museumId" element={<MuseumDetails />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/artwork/success" element={<Success />} />
          <Route path="/artwork/fail" element={<Fail />} />
          <Route path="/museum/success" element={<SuccessPaymentMuseum />} />
          <Route path="/museum/fail" element={<FailPaymentMuseum />} />
          <Route path="/Card" element={<Card />} />
          <Route path="/events" element={<Events />} />
          <Route path="/artworks/liked" element={<LikedArtworks />} />
          <Route path="/order/success" element={<SuccessOrderPayment />} />
          <Route path="/order/fail" element={<FailOrderPayment />} />
        </Route>
        <Route path="/login" element={<Auth />} />
        {/* <Route path="/auth" element={<Auth />} /> */}
        <Route path="/:userId/places" element={<UserPlaces />} />
        <Route path="/signup" element={<Auth signup={true} />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/AddArtwork" element={<NewArtwork />} />
        <Route path="/socialMedia" element={<SocialMedia />} />
      </Routes>
    );
  }

  return (
    <Provider store={store}>
      <AuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          userId: userId,
          userName: userName,
          ban: ban,
          teamId: teamId,
          isAdmin: isAdmin,
          profileImage: profileImage,
          login: login,
          logout: logout,
          updateUsername: updateUsername,
          updateProfilePicture: updateProfilePicture,
        }}
      >
        <Router>
          {/* <Header /> */}
          <ToastContainer style={{ marginTop: "80px" }} />
          <NavigationWrapper>
            {/*this is sent as a children to navigation 
            warpper that will handel rundering it */}
            {routes}
          </NavigationWrapper>
        </Router>
      </AuthContext.Provider>
    </Provider>
  );
};

export default App;
