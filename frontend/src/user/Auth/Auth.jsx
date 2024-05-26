import React, { useEffect, useState, useContext, useCallback } from "react";
import "./Auth_new.css";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";
import LogoArtifex from "../../assets/images/Logo_Artifex.png";
import { useDispatch, useSelector } from "react-redux";
import {
  useCheckUsernameMutation,
  useLoginMutation,
  useRegisterMutation,
} from "../../slices/usersApiSlice";
import Logo from "../../assets/images/logo.svg";

function Auth(props) {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [userType, setUserType] = useState("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRedirectToHome = () => {
    navigate('/');}
  const [isLoading, setIsLoading] = useState(false);
  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const [checkUsername] = useCheckUsernameMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      if (userInfo.userType === "client") {
        navigate("/home");
      } else {
        navigate("/museums");
      }
    }
  }, [navigate, userInfo]);

  useEffect(() => {
    console.log("isLoading:", isLoading);
  }, [isLoading]);

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const checkUsernameExists = async (username) => {
    try {
      const res = await checkUsername({ username }).unwrap();
      console.log(res);
      setIsUsernameValid(!res.exists);
    } catch (err) {
      setIsUsernameValid(false);
      toast.error("Error checking username");
    }
  };

  const debouncedCheckUsername = useCallback(
    debounce((username) => {
      checkUsernameExists(username);
    }, 250),
    []
  );

  const handleUsernameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    debouncedCheckUsername(newName);
  };

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
        navigate("/home");
      } else {
        navigate("/museums");
      }
    } catch (err) {
      console.log(err);
      if (err?.data?.message || err.error) {
        setIsLoading(false);
        toast.error(err?.data?.message || err.error);
      } else {
        toast.error("Couldn't login, an error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const submitRegisterHandler = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    setIsLoading(true);

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
      const userDataString = JSON.stringify(userData);
      localStorage.setItem("userData", userDataString);
      setIsLoading(false);
      navigate("/addArtwork");
    }
  };

  useEffect(() => {
    console.log("isLoginMode :", isLoginMode);
    if (props.signup) {
      handleRegisterClick();
    }
  }, []);

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
      > </div>
      <div onClick={handleRedirectToHome} ><img src={LogoArtifex}  alt="Artifex Logo" className="logoNavArt" style={{position:'fixed',left:'2vw',bottom:'91vh'}} /></div>
      <div className="container" id="container">
        <div className="form-container sign-up">
          <form onSubmit={submitRegisterHandler}>
            {isLoading && <LoadingSpinner asOverlay />}
            <img
              src={Logo}
              alt="Artifex-Mini-Logo"
              className="Artifex-Mini-Logo-Signup"
            />
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
              onChange={handleUsernameChange}
            />
            {isUsernameValid === false && (
              <div className="username-validation">
                Username is already taken.
              </div>
            )}
            {isUsernameValid === true && (
              <div className="username-validation">
                Username is available.
              </div>
            )}
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
            <img
              src={Logo}
              alt="Artifex-Mini-Logo"
              className="Artifex-Mini-Logo-Login"
            />
            <h1 className="login-text-H1">Login</h1>
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
              <h1 className="welcomeLogin">Greetings,</h1>
              <h1 className="guestLogin">Esteemed Patron!</h1>
              <p>
                Embark on your journey by sharing your distinguished credentials
                to access all site amenities.
              </p>
              <button className="hidden" onClick={handleLoginClick}>
                Login
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1 className="welcomeLogin">Welcome,</h1>
              <h1 className="guestLogin">Esteemed Guest!</h1>
              <p>
                Unlock the full suite of site features by registering with your
                prestigious details.
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
