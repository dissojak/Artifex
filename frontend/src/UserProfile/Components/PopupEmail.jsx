import React, { useEffect, useState } from "react";
// import "../Pages/style_profile.css";
import "./Popup_Profile.css";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";

const PopupEmail = (props) => {
  const [newEmail, setNewEmail] = useState("");

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setNewEmail(userInfo.email);
  }, [userInfo.email]);

  const SubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await updateProfile({
        _id: userInfo._id,
        email: newEmail,
      }).unwrap();
      console.log(res);
      dispatch(setCredentials(res));
      toast.success("Email updated successfully");
      props.showChangeEmailHandler();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
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
              placeholder={setNewEmail}
              className="inp_ch"
              name="emailProfile"
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
