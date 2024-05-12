import React, { useEffect, useState, useContext } from "react";
import "./Auth_new.css";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setCredentials } from "../../slices/authSlice";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  useLoginMutation,
  useRegisterMutation,
} from "../../slices/usersApiSlice";

function Auth() {
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const signup = queryParams.get('signup') === 'true';
  // console.log(signup||"there is no signup");
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  // const [isLoading, setIsLoading] = useState(true);

  const [userType, setUserType] = useState("customer");
  // console.log("user: ",userType);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      if (userInfo.userType==='client'){
      navigate("/home");}else{navigate("/museums");}
    }
  }, [navigate, userInfo]);

  useEffect(() => {
    console.log("isLoading:", isLoading);
  }, [isLoading]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await login({
        login: email,
        pw: password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      if (res.userType === "client") {
        history.go(0);
        navigate("/home");
      } else {
        history.go(0);
        navigate("/museums");
      }
    } catch (err) {
      console.log(err);
      if (err?.data?.message || err.error) {
        setIsLoading(false);
        toast.error(err?.data?.message || err.error);
      } else {
        toast.error("Couldn't login error happened");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const submitRegisterHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // if (password !== confirmPassword) {
    //   setIsLoading(false);
    //   toast.error("Passwords do not match");
    // } else {
    if (userType === "customer") {
      try {
        const res = await register({
          username: name,
          email,
          pw: password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/home");
      } catch (err) {
        setIsLoading(false);
        toast.error(err?.data?.message || err.error);
      } finally {
        setIsLoading(false);
      }
    } else {
      const userData = {
        username: name,
        email: email,
        userType: userType,
        pw: password,
      };
      // Convert the userData object into a string
      const userDataString = JSON.stringify(userData);
      // Save the stringified user data to localStorage
      localStorage.setItem("userData", userDataString);
      setIsLoading(false);
      navigate("/addArtwork");
    }
  };
  // };

  useEffect(() => {
    console.log("isLoginMode :", isLoginMode);
  }, [isLoginMode]);

  const handleRegisterClick = () => {
    const container = document.getElementById("container");
    container.classList.add("active");
    setIsLoginMode((prevMode) => !prevMode);
  };

  const handleLoginClick = () => {
    const container = document.getElementById("container");
    container.classList.remove("active");
    setIsLoginMode((prevMode) => !prevMode);
  };

  return (
    <>
      <div
        className="auth-background"
        style={{
          backgroundImage: `url(${"./elements/background_shape_Auth.svg"})`,
        }}
      ></div>
      <div className="container" id="container">
        <div className="form-container sign-up">
          <form onSubmit={submitRegisterHandler}>
            {isLoading && <LoadingSpinner asOverlay />}
            <h1 className="login-signup">Create Account</h1>
            <div className="radio-button-container">
              <div className="radio-button">
                <input
                  type="radio"
                  className="radio-button__input"
                  id="customer"
                  checked={userType === "customer"}
                  name="userType"
                  onChange={() => setUserType("customer")}
                />
                <label className="radio-button__label" htmlFor="customer">
                  <span className="radio-button__custom"></span>
                  Customer
                </label>
              </div>
              <div className="radio-button">
                <input
                  type="radio"
                  className="radio-button__input"
                  id="artist"
                  name="userType"
                  onChange={() => setUserType("artist")}
                />
                <label className="radio-button__label" htmlFor="artist">
                  <span className="radio-button__custom"></span>
                  Artist
                </label>
              </div>
            </div>

            <span className="use-your-email-for-registration">
              or use your email for registration
            </span>
            <input
              type="name"
              placeholder="Name"
              value={name}
              className="input_login"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in">
          <form onSubmit={submitHandler}>
            {isLoading && <LoadingSpinner asOverlay />}
            <h1 className="login-signup">Login</h1>
            <div className="social-icons">
              <Link to="#" className="icon">
                <i className="fab fa-google-plus-g">G</i>
              </Link>
              <Link to="#" className="icon">
                <i className="fab fa-facebook-f">F</i>
              </Link>
              <Link to="#" className="icon">
                <i className="fab fa-github">Git</i>
              </Link>
              <Link to="#" className="icon">
                <i className="fab fa-linkedin-in">LIn</i>
              </Link>
            </div>
            <span className="use-your-email-for-registration">
              or use your email password
            </span>
            <input
              type="username-email"
              placeholder="Email or Username"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link to="#">Forget Your Password?</Link>
            <button>{isLoading ? "Loading..." : "Login"}</button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all site features</p>
              <button className="hidden" onClick={handleLoginClick}>
                Login
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>
                Register with your personal details to use all site features
              </p>
              <button className="hidden" onClick={handleRegisterClick}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth;
