import React, { useEffect, useState, useContext } from "react";
import "./Auth_new.css";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials } from "../../slices/authSlice";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../slices/usersApiSlice";

function Auth() {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      console.log(err);
      if (err?.data?.message || err.error) {
        toast.error(err?.data?.message || err.error);
      } else {
        toast.error("Couldn't login error happened");
      }
    }
  };

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
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="container" id="container">
        <div className="form-container sign-up">
          <form>
            <h1 className="login-signup">Create Account</h1>
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
            <span className="login-signup">
              or use your email for registration
            </span>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in">
          <form onSubmit={submitHandler}>
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
            <span className="login-signup">or use your email password</span>
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
