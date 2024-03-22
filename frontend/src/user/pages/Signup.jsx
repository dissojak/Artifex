import React, { useState, useContext, useEffect } from "react";

// import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
// import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttp } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./Auth.css";
import "./SignUp.css";
import "./LogIn.css";
import { Link } from "react-router-dom";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(false);
  // const [isLoginMode, setIsLoginMode] = useState(props.Mode);
  const { isLoading, error, sendRequest, clearError } = useHttp();
  // const [showImage, setShowImage] = useState(false);
  const [isAdminForm, setIsAdminForm] = useState(false);

  useEffect(() => {
    if (isLoginMode) {
      document.body.classList.add("login-body");
    } else if (!isLoginMode) {
      document.body.classList.add("signup-body");
    }
    // Clean up the effect
    return () => {
      document.body.classList.remove("login-body");
      document.body.classList.remove("signup-body");
    };
  }, [isLoginMode]);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
          imageUpload: undefined,
          age: undefined,
          adminCode: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
          image: {
            value: "",
            isValid: false,
          },
          age: {
            value: "",
            isValid: false,
          },
          adminCode: {
            value: "",
            isValid: false,
          },
          imageUpload: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  // const showImageHandler = () => {
  //   setShowImage((prevMode) => !prevMode);
  // };

  const showAdminFormHandler = () => {
    setIsAdminForm((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const res = await sendRequest(
          "http://localhost:8000/api/user/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            pw: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        // try {
        //   const responseData = await sendRequest(
        //     `http://localhost:8000/api/user/getTeamJoinedByUserId/${res.user.id}`
        //   );

        // const teamId = responseData.teamId;
        // console.log("this in res : ", responseData.teamId);
        // console.log("this in update with useState : ", teamId);
        // console.log("is it banned ? response : ", res.ban);
        auth.login(
          res.user.id,
          res.user.username,
          // responseData.teamId,
          res.user.joined_team,
          res.user.isAdmin,
          res.ban
        );
        // } catch (e) {}

        console.log(res.user.username);
      } catch (e) {}
    } else {
      try {
        const res = await sendRequest(
          "http://localhost:8000/api/user/signup",
          "POST",
          JSON.stringify({
            username: formState.inputs.name.value,
            email: formState.inputs.email.value,
            image: formState.inputs.image.value,
            pw: formState.inputs.password.value,
            age: formState.inputs.age.value,
            adminCode: formState.inputs.adminCode.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(res.user.id, res.user.username);
      } catch (err) {}
    }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}

      {!isLoginMode && (
        <Link to="/">
          <img src="elements/logo_Bleu.svg" alt="" className="LogoBleu" />
        </Link>
      )}

      {/* 
                          THIS IS LOGIN RENDERING
      */}

      {isLoginMode && (
        <div id="page_signup">
          <div id="login_content">
            <div id="login_form">
              <div>
                {" "}
                <img
                  src="elements/icon_logo.png"
                  alt=""
                  style={{ marginBottom: -5 }}
                />
                <h1 className="font" style={{ marginBottom: -4 }}>
                  Login
                </h1>
                <h4 className="inder_form font">
                  welcome back please enter your details.
                </h4>
              </div>
              {/* <hr /> */}
              <form onSubmit={authSubmitHandler}>
                <>
                  <div id="signup-login_form_content">
                    <Input
                      element="input"
                      id="email"
                      type="email"
                      label="E-Mail"
                      validators={[VALIDATOR_EMAIL()]}
                      errorText="Please enter a valid email address."
                      onInput={inputHandler}
                    />
                    <Input
                      element="input"
                      id="password"
                      type="password"
                      label="Password"
                      validators={[VALIDATOR_MINLENGTH(4)]}
                      errorText="Please enter a valid password, at least 3 characters."
                      onInput={inputHandler}
                    />
                    {/* <Button type="submit" disabled={!formState.isValid}>
              {isLoginMode ? "LOGIN" : "SIGNUP"}
              </Button> */}
                    <input
                      type="submit"
                      className={`button_ca_su${isLoginMode ? "___login" : ""}`}
                      value={isLoginMode ? "LOGIN" : "Create account"}
                    />
                    <input
                      type="button"
                      onClick={switchModeHandler}
                      className={`button-login_su${
                        isLoginMode ? "___login" : ""
                      }`}
                      value={isLoginMode ? "SIGNUP" : "LOGIN"}
                    />
                  </div>
                  <h4 className="inder_form font">
                    Need and account ?{" "}
                    <em className="login_from_here" onClick={switchModeHandler}>
                      Create one
                    </em>
                  </h4>
                </>
              </form>
            </div>
            <div id="login_left_slide">
              <img src="elements/logo_white.png" alt="" className="logo" />
              <div id="login_pharagraphe">
                <img src="elements/login_photo.png" alt="" className="locker" />
                <p>
                  "Every problem is a gift - without problems, we would not
                  grow."
                </p>
                <div id="tony_robbins">
                  <figcaption>Tony Robbins</figcaption>
                  <img src="elements/Tony Robbins.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* 

                    HERE WE HAVE SIGNUP RENDERING
      
      */}
      {!isLoginMode && (
        <div id="page_signup">
          <div id="signup_content">
            <div id="signup_form">
              <div>
                {" "}
                <img
                  src="elements/icon_logo_blue.png"
                  alt=""
                  style={{ marginBottom: -5 }}
                />
                <h1 className="font" style={{ marginBottom: -4 }}>
                  Sign Up
                </h1>
                <h4 className="inder_form font">
                  welcome back please enter your details.
                </h4>
              </div>
              {/* <hr /> */}
              <form onSubmit={authSubmitHandler}>
                <>
                  <div id="signup_form_content">
                    {/* <ImageUpload
                      center
                      id="imageUpload"
                      onInput={inputHandler}
                    /> */}
                    <Input
                      element="input"
                      id="name"
                      type="text"
                      label="Your Name"
                      validators={[VALIDATOR_REQUIRE()]}
                      errorText="Please enter a name."
                      onInput={inputHandler}
                    />
                    {/* <Input
                      element="input"
                      id="age"
                      type="text"
                      label="Your Age"
                      validators={[VALIDATOR_REQUIRE()]}
                      errorText="Please enter your ."
                      onInput={inputHandler}
                    /> */}
                    <Input
                      element="input"
                      id="email"
                      type="email"
                      label="E-Mail"
                      validators={[VALIDATOR_EMAIL()]}
                      errorText="Please enter a valid email address."
                      onInput={inputHandler}
                    />
                    <Input
                      element="input"
                      id="password"
                      type="password"
                      label="Password"
                      validators={[VALIDATOR_MINLENGTH(3)]}
                      errorText="Please enter a valid password, at least 3 characters."
                      onInput={inputHandler}
                    />
                    {/* <Button type="submit" disabled={!formState.isValid}>
                    {isLoginMode ? "LOGIN" : "SIGNUP"}
                    </Button> */}
                  </div>
                  <div className="signup-login_Buttons">
                    <input
                      type="submit"
                      className={`button_ca_su${isLoginMode ? "___login" : ""}`}
                      value={isLoginMode ? "LOGIN" : "Create account"}
                    />
                    {/* <input
                      type="button"
                      onClick={showImageHandler}
                      className={`button-login_su${
                        !showImage ? "" : "___Image"
                      }`}
                      value={!showImage ? "ADD AN IMAGE" : "CANCEL"}
                    /> */}
                    <input
                      type="button"
                      onClick={switchModeHandler}
                      className={`button-login_su${
                        isLoginMode ? "___login" : ""
                      }`}
                      value={isLoginMode ? "SIGNUP" : "LOGIN"}
                    />
                    <h4 className="inder_form font">
                      Connect to you account ?
                      <em
                        className="login_from_here"
                        onClick={switchModeHandler}
                      >
                        {" "}
                        Login from here
                      </em>
                    </h4>
                  </div>
                </>
              </form>
            </div>
            <div id="sign_up_paragraphe">
              <img
                src="elements/logo_white.png"
                alt=""
                className="AdminButton-mg"
                onClick={showAdminFormHandler}
              />

              {/* {showImage ? (
                <div className="image-container">
                  <ImageUpload center id="imageUpload" onInput={inputHandler} /> */}
              {isAdminForm && (
                // <input type="password" id="AdminCode" name="AdminCode" placeholder="Enter Admin Code" className="Admin-code-input" />
                <div className="Admin-code-input">
                  <Input
                    element="input"
                    id="adminCode"
                    type="password"
                    label="Admin Code"
                    validators={[VALIDATOR_REQUIRE()]}
                    onInput={inputHandler}
                  />
                </div>
              )}
              {/* </div>
              ) : ( */}
              <>
                <img src="elements/person-working-from-home.svg" alt="" />
                <figcaption>
                  "Unlock Your Creativity, Join Us Today!"
                </figcaption>
                <p>
                  At SaharaBytes , we prioritize your privacy. Your data is
                  safe, secure, and never shared without your consent. We're
                  committed to providing you with a trusted and protected
                  experience
                </p>
              </>
              {/* )} */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Auth;
