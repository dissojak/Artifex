import React, { useState } from "react";
// import "../Pages/style_profile.css";
import '../Pages/Profile.css';
import "./Popup_Profile.css";
import { useHttp } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

const Popup_pw = (props) => {
  const [err, setErr] = useState();
  const [formState, setFormState] = useState({
    oldPw: "",
    newPw: "",
    newPwSec: "",
  });

  const { isLoading, error, sendRequest, clearError } = useHttp();

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (formState.newPw !== formState.newPwSec) {
      setErr("NEW Passwords do not match.");
      return;
    }
    try {
      await sendRequest(
        `http://localhost:8000/api/user/settings/password/${props.userId}`,
        "PATCH",
        JSON.stringify({
          oldPw: formState.oldPw,
          newPw: formState.newPw,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      props.onPasswordChangeSuccess();
      props.showChangePwHandler();
    } catch (e) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <div className="loader">{isLoading && <LoadingSpinner />}</div>
      <div className="change">
        <div className="ch1">
          <div className="first_ch">
            <h2 className="tit_ch"> change password</h2>{" "}
            <img
              src="elements/X.svg"
              alt=""
              className="tit_ch_img"
              onClick={props.showChangePwHandler}
            />
          </div>

          <form onSubmit={submitHandler} className="form_ch">
            <label htmlFor="" className="la-ch">
              old password
            </label>
            <br />
            <input
              type="password"
              name="oldPw"
              value={formState.oldPw}
              placeholder="enter old password"
              className="inp_ch"
              onChange={inputChangeHandler}
            />
            <br />
            <label htmlFor="" className="la-ch">
              new password
            </label>
            <br />
            <input
              type="password"
              name="newPw"
              value={formState.newPw}
              placeholder="new password"
              className="inp_ch"
              onChange={inputChangeHandler}
            />
            <br />
            <label htmlFor="" className="la-ch">
              verify new password
            </label>
            <br />
            <input
              type="password"
              name="newPwSec"
              value={formState.newPwSec}
              placeholder="re-enter old password"
              className="inp_ch"
              onChange={inputChangeHandler}
            />
            <br />
            <label htmlFor="" style={{ color: "red" }}>
              {err}
            </label>
            <br />
            <button
              className="btn_ch"
              disabled={isLoading}
              style={isLoading ? { backgroundColor: "grey" } : {}}
            >
              {isLoading ? "Loading..." : "Confirm"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Popup_pw;
