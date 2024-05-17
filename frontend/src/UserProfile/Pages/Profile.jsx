import React, { useState } from "react";
import "./Profile.css";
import SaveIcon from "../../assets/images/saveblack.svg";
import SaveIconActive from "../../assets/images/savepurple.svg";
import PinIcon from "../../assets/images/Pinblack.svg";
import PinIconActive from "../../assets/images/Pinpurple.svg";
import OrderIcon from "../../assets/images/orderblack.svg";
import OrderIconActive from "../../assets/images/orderpurple.svg";
import Orders from "../Components/Orders/Pages/Orders.jsx";
import SavedArtwork from "../Components/SavedArtwork.jsx";
import PinnedMuseums from "../Components/PinnedMuseums.jsx";
import DefaultImg from "../../assets/images/default_profile_img.jpg";
import Popup_pw from "../Components/PopupPw.jsx";
import PopupUsername from "../Components/PopupUsername.jsx";
import PopupEmail from "../Components/PopupEmail.jsx";
import { useSelector } from "react-redux";
import PopupFollowers from "../Components/PopupFollowers.jsx";
import NewArtworkArtist from "../../shared/components/FormElements/NewArtwork.jsx";

const Profile = () => {
  const [isSettings, setIsSettings] = useState(false);

  const [showChangePw, setShowChangePw] = useState(false);
  const [showChangeUsername, setShowChangeUsername] = useState(false);
  const [showChangeEmail, setShowChangeEmail] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);

  const showChangePwHandler = () => {
    setShowChangePw((prevMode) => !prevMode);
  };
  const showChangeUsernameHandler = () => {
    setShowChangeUsername((prevMode) => !prevMode);
  };
  const showChangeEmailHandler = () => {
    setShowChangeEmail((prevMode) => !prevMode);
  };

  const [activeTab, setActiveTab] = useState("orders");
  const getIcon = (tabName) => {
    if (tabName === "orders") {
      return activeTab === "orders" ? OrderIconActive : OrderIcon;
    } else if (tabName === "artworks") {
      return activeTab === "artworks" ? SaveIconActive : SaveIcon;
    } else if (tabName === "museums") {
      return activeTab === "museums" ? PinIconActive : PinIcon;
    }
  };

  const activeSettingsMode = () => {
    setIsSettings(!isSettings);
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="RightBacgroundProfileSvg">
        <img
          src="./elements/rightBackgroundProfile.svg"
          className="rightImage"
          alt=""
        />
      </div>
      <div className="LeftBacgroundProfileSvg">
        <img
          src="./elements/leftBackgroundProfile.svg"
          className="leftImage"
          alt=""
        />
      </div>
      <div id="Profile-section">
        <div className="Profile-section2">
          <div
            className={` ${
              isSettings ? "settingsClinetProfile" : "profile-cover"
            }`}
          >
            <div
              className={` ${
                isSettings
                  ? "profileInfoContainerSettings"
                  : "profileInfoContainer"
              }`}
            >
              <div className="profile-image-container">
                <img
                  src={userInfo.image || DefaultImg}
                  alt="Img-Profile"
                  className="profile-image"
                />
              </div>
              <div className="profile-info">
                <div className="profile-name">{userInfo.username}</div>
                <div className="profile-email">{userInfo.email}</div>
              </div>
              {/*button section start */}
              <div className="cover-buttons-container">
                <button
                  className="button-profile-following"
                  onClick={toggleModal}
                >
                  <p
                    className="label-profile"
                    style={{ color: "#7E3FFF", fontWeight: "bold" }}
                  >
                    Following 700
                  </p>
                </button>
                {isOpen && (
                  <div className="modal-backdrop">
                    <PopupFollowers onClose={toggleModal} />
                  </div>
                )}
                <button className="button-profile" onClick={activeSettingsMode}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    viewBox="0 0 20 20"
                    height="20"
                    fill="none"
                    className="svg-icon-profile"
                  >
                    <g strokeWidth="1.5" strokeLinecap="round" stroke="#5d41de">
                      <circle r="2.5" cy="10" cx="10"></circle>
                      <path
                        fillRule="evenodd"
                        d="m8.39079 2.80235c.53842-1.51424 2.67991-1.51424 3.21831-.00001.3392.95358 1.4284 1.40477 2.3425.97027 1.4514-.68995 2.9657.82427 2.2758 2.27575-.4345.91407.0166 2.00334.9702 2.34248 1.5143.53842 1.5143 2.67996 0 3.21836-.9536.3391-1.4047 1.4284-.9702 2.3425.6899 1.4514-.8244 2.9656-2.2758 2.2757-.9141-.4345-2.0033.0167-2.3425.9703-.5384 1.5142-2.67989 1.5142-3.21831 0-.33914-.9536-1.4284-1.4048-2.34247-.9703-1.45148.6899-2.96571-.8243-2.27575-2.2757.43449-.9141-.01669-2.0034-.97028-2.3425-1.51422-.5384-1.51422-2.67994.00001-3.21836.95358-.33914 1.40476-1.42841.97027-2.34248-.68996-1.45148.82427-2.9657 2.27575-2.27575.91407.4345 2.00333-.01669 2.34247-.97026z"
                        clipRule="evenodd"
                      ></path>
                    </g>
                  </svg>
                  <p
                    className="label-profile"
                    style={{ color: "#7E3FFF", fontWeight: "bold" }}
                  >
                    Settings
                  </p>
                </button>
              </div>
            </div>
            {isSettings && (
              <div id="SettingsContainerCard">
                <button className="btn2" onClick={showChangePwHandler}>
                  <div className="l">
                    <img src="elements/password.svg" alt="" />
                  </div>
                  <h2 className="ch">Change Password</h2>
                </button>
                {showChangePw && (
                  <Popup_pw
                    showChangePwHandler={showChangePwHandler}
                    // onPasswordChangeSuccess={handlePasswordChangeSuccess}
                  />
                )}
                <button className="btn2" onClick={showChangeUsernameHandler}>
                  <div className="l">
                    <img src="elements/username_shape.svg" alt="" />
                  </div>
                  <h2 className="ch">Change Username</h2>
                </button>
                {showChangeUsername && (
                  <PopupUsername
                    showChangeUsernameHandler={showChangeUsernameHandler}
                    // changeUsername={changeUsernameHandler}
                  />
                )}
                <button className="btn23" onClick={showChangeEmailHandler}>
                  <div className="l">
                    <img src="elements/email.svg" alt="" />
                  </div>
                  <h2 className="ch">Change Email</h2>
                </button>
                {showChangeEmail && (
                  <PopupEmail showChangeEmailHandler={showChangeEmailHandler} />
                )}
              </div>
            )}
          </div>
          {!isSettings && !isOpen && userInfo.userType === "client" && (
            <>
              <div className="Buttons-section3">
                <div className="tab-container">
                  <input
                    type="radio"
                    name="tab"
                    id="tab1"
                    className="tab tab--1"
                    checked={activeTab === "orders"}
                    onChange={() => setActiveTab("orders")}
                  />
                  <label
                    className={`tab_label ${
                      activeTab === "orders" ? "active" : ""
                    }`}
                    htmlFor="tab1"
                  >
                    <img
                      src={getIcon("orders")}
                      style={{ width: "1.2em", height: "1.2em" }}
                      alt="Order Icon"
                    />
                    Booking Orders
                  </label>

                  <input
                    type="radio"
                    name="tab"
                    id="tab2"
                    className="tab tab--2"
                    checked={activeTab === "artworks"}
                    onChange={() => setActiveTab("artworks")}
                  />
                  <label
                    className={`tab_label ${
                      activeTab === "artworks" ? "active" : ""
                    }`}
                    htmlFor="tab2"
                  >
                    <img
                      src={getIcon("artworks")}
                      style={{ width: "1.2em", height: "1.2em" }}
                      alt="Save Icon"
                    />
                    Saved Artworks
                  </label>

                  <input
                    type="radio"
                    name="tab"
                    id="tab3"
                    className="tab tab--3"
                    checked={activeTab === "museums"}
                    onChange={() => setActiveTab("museums")}
                  />
                  <label
                    className={`tab_label ${
                      activeTab === "museums" ? "active" : ""
                    }`}
                    htmlFor="tab3"
                  >
                    <img
                      src={getIcon("museums")}
                      style={{ width: "1.2em", height: "1.2em" }}
                      alt="Pin Icon"
                    />
                    Pinned Museums
                  </label>

                  <div className="indicator"></div>
                </div>
              </div>
              {/* Conditional rendering based on the selected tab */}
              {activeTab === "orders" && <Orders />}
              {activeTab === "artworks" && <SavedArtwork />}
              {activeTab === "museums" && <PinnedMuseums />}
            </>
          )}
          {!isSettings && !isOpen && (
            userInfo.userType === "artist" &&
            <>
              <div className="Buttons-section3">
                <div className="tab-container">
                  <input
                    type="radio"
                    name="tab"
                    id="tab1"
                    className="tab tab--1"
                    checked={activeTab === "orders"}
                    onChange={() => setActiveTab("orders")}
                  />
                  <label
                    className={`tab_label ${
                      activeTab === "orders" ? "active" : ""
                    }`}
                    htmlFor="tab1"
                  >
                    <img
                      src={getIcon("orders")}
                      style={{ width: "1.2em", height: "1.2em" }}
                      alt="Order Icon"
                    />
                    Booking Orders
                  </label>

                  <input
                    type="radio"
                    name="tab"
                    id="tab2"
                    className="tab tab--2"
                    checked={activeTab === "artworks"}
                    onChange={() => setActiveTab("artworks")}
                  />
                  <label
                    className={`tab_label ${
                      activeTab === "artworks" ? "active" : ""
                    }`}
                    htmlFor="tab2"
                  >
                    <img
                      src={getIcon("artworks")}
                      style={{ width: "1.2em", height: "1.2em" }}
                      alt="Save Icon"
                    />
                    Artworks
                  </label>

                  <input
                    type="radio"
                    name="tab"
                    id="tab3"
                    className="tab tab--3"
                    checked={activeTab === "museums"}
                    onChange={() => setActiveTab("museums")}
                  />
                  <label
                    className={`tab_label ${
                      activeTab === "museums" ? "active" : ""
                    }`}
                    htmlFor="tab3"
                  >
                    <img
                      src={getIcon("museums")}
                      style={{ width: "1.2em", height: "1.2em" }}
                      alt="Pin Icon"
                    />
                    Open Order
                  </label>

                  <div className="indicator"></div>
                </div>
              </div>
              {/* Conditional rendering based on the selected tab */}
              {activeTab === "orders" && <Orders />}
              <div className="newArtworkFormContainer">
                {activeTab === "artworks" && <NewArtworkArtist />}
              </div>
              {activeTab === "museums" && <PinnedMuseums />}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
