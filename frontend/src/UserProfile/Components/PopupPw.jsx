import React, { useState } from "react";
// import "../Pages/style_profile.css";
import "./Popup_Profile.css";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";

const Popup_pw = (props) => {
  const [formState, setFormState] = useState({
    oldPw: "",
    newPw: "",
    newPwSec: "",
  });

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading }] = useUpdateUserMutation();

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
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          oldPw: formState.oldPw,
          newPw: formState.newPw,
        }).unwrap();
        console.log(res);
        dispatch(setCredentials(res));
        console.log("Updated");
        toast.success("Password updated successfully");
        props.showChangePwHandler();
      } catch (e) {
        toast.error(e?.data?.message || e.error);
      }
    }
  };

  return (
    <>
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
              placeholder="Confirm password"
              className="inp_ch"
              onChange={inputChangeHandler}
            />
            {/* <br />
            <label htmlFor="" style={{ color: "red" }}>
              {err}
            </label>
            <br /> */}
            <button
              className="btn_ch_pw"
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
