import React, { useState } from "react";
// import "../Pages/style_profile.css";
import '../Pages/Profile.css';
import "./PopupUsername.css";
import { useHttp } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";

const PopupUsername = (props) => {
  const [newUsername, setNewUsername] = useState("");
  const { isLoading, error, sendRequest, clearError } = useHttp();

  const SubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `http://localhost:8000/api/user/settings/username/${props.userId}`,
        "PATCH",
        JSON.stringify({
          username: newUsername,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      props.changeUsername(newUsername);
      props.showChangeUsernameHandler();
    } catch (e) {}
  };

  const handleInputChange = (event) => {
    setNewUsername(event.target.value);
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <div className="loader">{isLoading && <LoadingSpinner />}</div>
      <div className="change">
        <div className="ch1user">
          <div className="first_ch">
            <h2 className="tit_ch"> change username</h2>{" "}
            <img
              src="elements/X.svg"
              alt=""
              className="tit_ch_img"
              onClick={props.showChangeUsernameHandler}
            />
          </div>

          <form onSubmit={SubmitHandler} className="form_ch">
            <label htmlFor="" className="la-ch">
              new username
            </label>
            <br />
            <input
              type="text"
              placeholder={props.username}
              className="inp_ch"
              value={newUsername}
              onChange={handleInputChange}
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
export default PopupUsername;
