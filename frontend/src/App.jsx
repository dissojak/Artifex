import React from "react";
import { BrowserRouter as Router, Routes, Route , Redirect , Switch, } from "react-router-dom";

import Home from "./home/Home.jsx";
import Ban from "./shared/components/Pages/Ban";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import UserPlaces from "./places/pages/UserPlaces.jsx";
import UpdatePlace from "./places/pages/UpdatePlace.jsx";
// import Auth from "./user/pages/Auth";
import MainNavigation from "./shared/components/Navigation/MainNavigation.jsx";
import { AuthContext } from "./shared/context/auth-context";
import Signup from "./user/pages/Signup.jsx";
import RegisterHackatons from "./register/Page/RegisterHackatons.jsx";
import Profile from "./profile/Pages/Profile.jsx";

import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import store from "./store";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PrivateRoute from "./components/PrivateRoute";

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

  let routes;

  if (isLoggedIn && !isAdmin && !ban) {
    routes = (
      <Switch>
        <Route path="/" exact>
          {/* <Hackatons /> */}
          <Home />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        {/* ----------ADEM IS HERE---------- */}
        <Route path="/profile" exact>
          <Profile />
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
        <Route path="/registred-hackatons" exact>
          <RegisterHackatons />
        </Route>
        <Route path="/users" exact>
          <Users />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else if (isLoggedIn && !isAdmin && ban) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Ban />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else if (isLoggedIn && isAdmin) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          {/* --------------- */}
          {/* <Hackatons /> */}
          {/* <Profile/> */}
          {/* ---------------- */}

          <Home />
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/signup">
          <Signup />
          {/* <Users /> */}
        </Route>
        {/* <Route path="/auth">
          <Auth />
        </Route> */}
{/* --------------------------- */}
        <Route path="home">
          <HomeScreen />
        </Route>
        <Route path="/login">
          <LoginScreen />
        </Route>
        <Route path="/register">
          <RegisterScreen />
        </Route>
        <Route>
          <PrivateRoute />{" "}
        </Route>
        <Route path="/profile">
          <ProfileScreen />
        </Route>
{/* ----------------------------- */}
        <Redirect to="/auth" />
      </Switch>
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
          <Header />
          <ToastContainer />
          <Container className="my-2">
            <Router>
            <MainNavigation />
            <main style={{ marginTop: 0 }}>{routes}</main>
            </Router>
          </Container>
        </Router>
      </AuthContext.Provider>
    </Provider>
  );
};

export default App;
