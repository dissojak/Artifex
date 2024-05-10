import React, { useEffect, useState } from "react";
import "../Pages/Profile.css";
import "./Popup_Profile.css";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";

const PopupUsername = (props) => {
  const [newUsername, setNewUsername] = useState();

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setNewUsername(userInfo.username);
  }, [userInfo.username]);

  const SubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await updateProfile({
        _id: userInfo._id,
        username: newUsername,
      }).unwrap();
      console.log(res);
      dispatch(setCredentials(res));
      toast.success("Username updated successfully");
      props.showChangeUsernameHandler();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleInputChange = (event) => {
    setNewUsername(event.target.value);
  };

  return (
    <>
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
              placeholder={newUsername || "Please enter username"}
              className="inp_ch"
              name="usernameProfile"
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
