import React, { useState } from "react";
// import "../Pages/style_profile.css";
import '../Pages/Profile.css';
import "./PopupUsername.css";
import { useHttp } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

const PopupEmail = (props) => {
  const [newEmail, setNewEmail] = useState("");
  const { isLoading, error, sendRequest, clearError } = useHttp();

  const SubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:8000/api/user/settings/email/${props.userId}`,
        "PATCH",
        JSON.stringify({
          email: newEmail,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      props.showChangeEmailHandler();
    } catch (e) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <div className="loader">{isLoading && <LoadingSpinner />}</div>
      <div className="change">
        <div className="ch1user">
          <div className="first_ch">
            <h2 className="tit_ch"> change E-mail</h2>{" "}
            <img
              src="elements/X.svg"
              alt=""
              className="tit_ch_img"
              onClick={props.showChangeEmailHandler}
            />
          </div>

          <form onSubmit={SubmitHandler} className="form_ch">
            <label htmlFor="" className="la-ch">
              new Email
            </label>
            <br />
            <input
              type="text"
              placeholder={props.username + "@gmail.com"}
              className="inp_ch"
              value={newEmail}
              onChange={(event) => setNewEmail(event.target.value)}
            />
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
export default PopupEmail;
