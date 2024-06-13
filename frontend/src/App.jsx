import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // useLocation,
  // Redirect,
  //  Switch,
} from "react-router-dom";

import { Provider, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./store";
import RegisterScreen from "./screens/RegisterScreen";
import PrivateRoute from "./BuildKite/PrivateRoute.jsx";

import Auth from "./user/Auth/Auth.jsx";
import Home from "./home/Page/HomePage.jsx";
import Ban from "./shared/components/Pages/Ban";
import UserPlaces from "./places/pages/UserPlaces.jsx";

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
import ManageArtworks from "./UserProfile/interface/Admin/ManageArtworks/ManageArtworks.jsx";

// Helper component to handle protected routes by userType
const ProtectedRoute = ({ children, userType, allowedTypes }) => {
  const { userInfo } = useSelector((state) => state.auth);
  return allowedTypes.includes(userInfo.userType) ? (
    children
  ) : (
    <Navigate to="/" />
  );
};

const App = () => {
  let routes = (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="" element={<PrivateRoute />}>
        <Route
          path="/home"
          element={
            <ProtectedRoute allowedTypes={["client"]}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/artist"
          element={
            <ProtectedRoute allowedTypes={["client"]}>
              <Artists />
            </ProtectedRoute>
          }
        />
        <Route path="/museums" element={<Museums />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/artwork/:artworkId" element={<ArtworkDetails />} />
        <Route
          path="/artist/:username"
          element={
            <ProtectedRoute allowedTypes={["client"]}>
              <ArtistProfileForUser />
            </ProtectedRoute>
          }
        />
        <Route path="/museumshowcase" element={<MuseumShowcase />} />
        <Route
          path="/MuseumShowcaseArtist"
          element={<MuseumShowcaseArtist />}
        />
        <Route
          path="/Plans"
          element={
            <ProtectedRoute allowedTypes={["artist"]}>
              <PricingOptions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/PlansHistory"
          element={
            <ProtectedRoute allowedTypes={["artist"]}>
              <PlansHistory />
            </ProtectedRoute>
          }
        />
        <Route path="/museums/:museumId" element={<MuseumDetails />} />
        <Route
          path="/collection"
          element={
            <ProtectedRoute allowedTypes={["client"]}>
              <Collection />
            </ProtectedRoute>
          }
        />
        <Route path="/artwork/success" element={<Success />} />
        <Route path="/artwork/fail" element={<Fail />} />
        <Route path="/museum/success" element={<SuccessPaymentMuseum />} />
        <Route path="/museum/fail" element={<FailPaymentMuseum />} />
        <Route
          path="/Card"
          element={
            <ProtectedRoute allowedTypes={["client"]}>
              <Card />
            </ProtectedRoute>
          }
        />
        <Route
          path="/events"
          element={
            <ProtectedRoute allowedTypes={["client", "artist"]}>
              <Events />
            </ProtectedRoute>
          }
        />
        <Route
          path="/artworks/liked"
          element={
            <ProtectedRoute allowedTypes={["client"]}>
              <LikedArtworks />
            </ProtectedRoute>
          }
        />
        <Route path="/ManageArtworks" element={<ManageArtworks />} />
        <Route path="/order/success" element={<SuccessOrderPayment />} />
        <Route path="/order/fail" element={<FailOrderPayment />} />
      </Route>
      <Route path="/login" element={<Auth />} />
      <Route path="/:userId/places" element={<UserPlaces />} />
      <Route path="/signup" element={<Auth signup={true} />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/AddArtwork" element={<NewArtwork />} />
      <Route path="/socialMedia" element={<SocialMedia />} />
    </Routes>
  );

  return (
    <Provider store={store}>
      <Router>
        <ToastContainer style={{ marginTop: "80px" }} />
        <NavigationWrapper>
          {/*this is sent as a children to navigation 
            warpper that will handel rundering it */}
          {routes}
        </NavigationWrapper>
      </Router>
    </Provider>
  );
};

export default App;
