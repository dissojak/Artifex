import React, { useEffect, useState } from "react";
import "./Profile.css";
// import "./style_profile.css";
import SaveIcon from "../../assets/images/saveblack.svg";
import SaveIconActive from "../../assets/images/savepurple.svg";
import PinIcon from "../../assets/images/Pinblack.svg";
import PinIconActive from "../../assets/images/Pinpurple.svg";
import OrderIcon from "../../assets/images/orderblack.svg";
import OrderIconActive from "../../assets/images/orderpurple.svg";
import Orders from "../Components/Orders/Pages/Orders.jsx";
import OpenOrderArtist from "../Components/OpenOrderArtist.jsx";
import AddMuseumAdmin from "../Components/AddMuseumAdmin.jsx";
import SavedArtwork from "../Components/SavedArtwork.jsx";
import PinnedMuseums from "../Components/PinnedMuseums.jsx";
import DefaultImg from "../../assets/images/default_profile_img.jpg";
import Popup_pw from "../Components/PopupPw.jsx";
import PopupUsername from "../Components/PopupUsername.jsx";
import PopupEmail from "../Components/PopupEmail.jsx";
import { useSelector } from "react-redux";
import PopupFollowers from "../Components/PopupFollowers.jsx";
// import NewArtworkArtist from "../../shared/components/FormElements/NewArtwork.jsx";

// import ImageUpload from "../../shared/components/FormElements/ImageUpload.jsx";
import PopupFollowing from "../Components/PopupFollowing.jsx";
import { toast } from "react-toastify";
import {
  useFollowedArtistsMutation,
  useGetFollowersMutation,
} from "../../slices/followSlice.js";
import ArtistArtworks from "../Components/ArtistArtworks.jsx";
import { useGetArtworksOfArtistMutation } from "../../slices/artworksSlice.js";
import CreateCategory from "../Components/CreateCategory.jsx";
import { Link } from "react-router-dom";

const Profile = (props) => {
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

  const [activeTab, setActiveTab] = useState("artworks");
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
  const [followers, setFollowers] = useState();
  const [getFollowers] = useGetFollowersMutation();
  const [getFollowing] = useFollowedArtistsMutation();
  const [artworks, setArtworks] = useState();
  const [getArtworks, { isLoading }] = useGetArtworksOfArtistMutation();

  useEffect(() => {
    window.addEventListener("beforeunload", clearSessionStorage);
    return () => {
      window.removeEventListener("beforeunload", clearSessionStorage);
    };
  }, []);

  const clearSessionStorage = () => {
    sessionStorage.removeItem("clientFollowingCache");
    sessionStorage.removeItem("artistFollowersCache");
    sessionStorage.removeItem("artistArtworksCache");
  };

  useEffect(() => {
    const fetchFollowersOrFollowing = async () => {
      const cacheKey =
        userInfo.userType === "client"
          ? "clientFollowingCache"
          : "artistFollowersCache";
      const cache = JSON.parse(sessionStorage.getItem(cacheKey));
      const now = new Date().getTime();

      if (cache && now - cache.timestamp < 300000) {
        console.log("cache followers/following");
        setFollowers(cache.data);
      } else {
        console.log("request followers/following");
        try {
          let res;
          if (userInfo.userType === "client") {
            res = await getFollowing().unwrap();
            setFollowers(res.followed);
            sessionStorage.setItem(
              cacheKey,
              JSON.stringify({ data: res.followed, timestamp: now })
            );
          } else if (userInfo.userType === "artist") {
            res = await getFollowers(userInfo._id).unwrap();
            setFollowers(res.followers);
            sessionStorage.setItem(
              cacheKey,
              JSON.stringify({ data: res.followers, timestamp: now })
            );
          }
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
    };
    fetchFollowersOrFollowing();
  }, [userInfo, getFollowers, getFollowing]);

  useEffect(() => {
    if (userInfo.userType === "artist") {
      const fetchArtworks = async () => {
        const cacheKey = "artistArtworksCache";
        const cache = JSON.parse(sessionStorage.getItem(cacheKey));
        const now = new Date().getTime();

        if (cache && now - cache.timestamp < 900000) {
          console.log("cache artworks");
          // Use cached data if it's less than 15 minutes old
          const reversedArtworks = cache.data;
          setArtworks(reversedArtworks);
        } else {
          try {
            const response = await getArtworks({
              artistId: userInfo._id,
            }).unwrap();
            console.log("request artworks");
            // Reverse the order of the artworks array
            if (response.artworks.length !== 0) {
              const reversedArtworks = response.artworks.slice().reverse();
              setArtworks(reversedArtworks);
              sessionStorage.setItem(
                cacheKey,
                JSON.stringify({ data: reversedArtworks, timestamp: now })
              );
            } else {
              setArtworks([]);
            }
          } catch (err) {
            toast.error(err?.data?.message || err.error);
          }
        }
      };
      fetchArtworks();
    }
  }, [userInfo, getArtworks]);

  const ajoutArtworkHandler = (newArtwork) => {
    const now = new Date().getTime();
    setArtworks((prevArtworks) => {
      const updatedArtworks = [newArtwork, ...prevArtworks];
      const cacheKey = "artistArtworksCache";
      sessionStorage.setItem(
        cacheKey,
        JSON.stringify({ data: updatedArtworks, timestamp: now })
      );
      return updatedArtworks;
    });
  };

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
              {/* <div className="profile-image-container">
                <img
                  src={userInfo.image || DefaultImg}
                  alt="Img-Profile"
                  className="profile-image"
                />
              </div> 
              <ImageUpload />*/}
              <div className="profile-info">
                <div className="profile-name">{userInfo.username}</div>
                <div className="profile-email">{userInfo.email}</div>
              </div>
              {/*button section start */}
              <div
                className={
                  userInfo.userType === "admin"
                    ? "cover-buttons-container-admin"
                    : "cover-buttons-container"
                }
              >
                {userInfo.userType === "client" && (
                  <>
                    <button
                      className="button-profile-following"
                      onClick={toggleModal}
                    >
                      <p
                        className="label-profile"
                        style={{ color: "#7E3FFF", fontWeight: "bold" }}
                      >
                        Following {followers && <>{followers.length}</>}
                      </p>
                    </button>
                    {isOpen && (
                      <div className="modal-backdrop">
                        <PopupFollowing
                          onClose={toggleModal}
                          followers={followers}
                        />
                      </div>
                    )}
                  </>
                )}
                {userInfo.userType === "artist" && (
                  <>
                    <button
                      className="button-profile-following"
                      onClick={toggleModal}
                    >
                      <p
                        className="label-profile"
                        style={{ color: "#7E3FFF", fontWeight: "bold" }}
                      >
                        {followers && <>{followers.length}</>} Followers
                      </p>
                    </button>
                    {isOpen && (
                      <div className="modal-backdrop">
                        <PopupFollowers
                          onClose={toggleModal}
                          followers={followers}
                        />
                      </div>
                    )}
                  </>
                )}
                {userInfo.userType === "admin" && (
                  <Link to="/ManageArtworks" className="text-decoration-link">
                    <button className="button-profile-manageArtworks">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="40"
                        height="40"
                        x="0"
                        y="0"
                        viewBox="0 0 512 512"
                        xmlSpace="preserve"
                      >
                        <g>
                          <path
                            fill="#333333"
                            d="m67.84 274.157 21.675-29.853 29.234 22.588s63.136-117.65 155.586-159.627c0 0-84.673 79.211-134.291 189.484-4.644 10.32-17.495 13.939-26.907 7.654zM489.749 321.234c-22.565-38.778-51.394-72.662-79.027-100.138 37.203-46.502 73.474-86.545 73.474-86.545-35.457 18.84-66.959 44.033-92.598 68.317-40.965-37.471-74.982-58.975-74.982-58.975l-34.867 28.478c24.641 11.981 55.719 32.309 86.287 54.154-29.585 31.444-46.881 56.607-46.881 56.607l22.062 33.842c11.345-20.992 29.602-46.935 49.266-72.604 52.304 38.924 97.266 76.864 97.266 76.864z"
                            opacity="1"
                            dataoriginal="#333333"
                          ></path>
                          <path
                            fill="#8700ff"
                            d="M208.055 200.335c10.266 15.059 16.277 33.241 16.277 52.801 0 51.817-42.156 93.973-93.972 93.973s-93.972-42.156-93.972-93.973c0-51.816 42.156-93.972 93.972-93.972 16.461 0 31.943 4.259 45.412 11.726a406.662 406.662 0 0 1 19.14-19.73c-18.669-11.842-40.808-18.704-64.552-18.704-66.65 0-120.68 54.03-120.68 120.68s54.031 120.681 120.68 120.681 120.68-54.031 120.68-120.681c0-28.396-9.813-54.498-26.226-75.11a703.198 703.198 0 0 0-16.759 22.309z"
                            opacity="1"
                            dataoriginal="#70b400"
                          ></path>
                          <g fill="#e33100">
                            <path
                              d="M449.899 189.231c15.591 16.781 25.142 39.247 25.142 63.905a93.8 93.8 0 0 1-2.93 23.318c6.662 9.001 12.879 18.047 18.614 27.124 7.072-15.349 11.024-32.433 11.024-50.442 0-32.828-13.114-62.589-34.381-84.345a2233.586 2233.586 0 0 0-17.469 20.44zM457.543 307.689c-17.06 23.847-44.982 39.42-76.474 39.42-51.817 0-93.972-42.156-93.972-93.973 0-21.018 6.937-40.447 18.641-56.117-8.53-5.151-16.353-9.549-23.462-13.197-13.787 19.615-21.886 43.517-21.886 69.314 0 66.65 54.031 120.681 120.68 120.681 39.871 0 75.221-19.34 97.195-49.146-4.43-3.679-11.59-9.587-20.722-16.982zM358.639 161.876a93.83 93.83 0 0 1 22.429-2.712c13.063 0 25.51 2.682 36.824 7.519a446.5 446.5 0 0 1 23.911-17.845c-17.84-10.411-38.589-16.382-60.735-16.382-17.24 0-33.631 3.623-48.465 10.136 6.401 4.457 15.365 10.936 26.036 19.284z"
                              fill="#00c4ff"
                              opacity="1"
                              dataoriginal="#e33100"
                            ></path>
                          </g>
                        </g>
                      </svg>
                      <p
                        className="label-profile"
                        style={{ color: "#7E3FFF", fontWeight: "bold" }}
                      >
                        {/* <h3>♻</h3> */}
                        Manage Artworks
                      </p>
                    </button>
                  </Link>
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
                  <h2 className="ch" style={{ color: "white" }}>
                    Change Password
                  </h2>
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
                  <h2 className="ch" style={{ color: "white" }}>
                    Change Username
                  </h2>
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
                  <h2 className="ch" style={{ color: "white" }}>
                    Change Email
                  </h2>
                </button>
                {showChangeEmail && (
                  <PopupEmail showChangeEmailHandler={showChangeEmailHandler} />
                )}
              </div>
            )}
          </div>
          {!isSettings && userInfo.userType === "client" && (
            <>
              {!isOpen && (
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
                </>
              )}
              {/* Conditional rendering based on the selected tab */}
              {activeTab === "orders" && <Orders />}
              {activeTab === "artworks" && <SavedArtwork />}
              {activeTab === "museums" && <PinnedMuseums />}
            </>
          )}
          {!isSettings && userInfo.userType === "artist" && (
            <>
              {!isOpen && (
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
                </>
              )}
              {/* Conditional rendering based on the selected tab */}
              {activeTab === "orders" && <Orders />}
              <div className="newArtworkFormContainer">
                {activeTab === "artworks" && artworks && (
                  <div className="gallery-container-artworksArtist">
                    <ArtistArtworks
                      artworks={artworks}
                      onAjoutArtwork={ajoutArtworkHandler}
                    />
                  </div>
                )}
              </div>
              {activeTab === "museums" && (
                <OpenOrderArtist
                  isLoading={props.isLoading}
                  user={props.user}
                />
              )}
            </>
          )}
          {!isSettings && userInfo.userType === "admin" && (
            <>
              {!isOpen && (
                <>
                  <div className="Buttons-section_admin">
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
                        Add Museum
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
                        Add Category{" "}
                      </label>
                      <div className="indicator"></div>
                    </div>
                  </div>
                </>
              )}
              {activeTab === "orders" && <AddMuseumAdmin />}
              {activeTab === "artworks" && <CreateCategory />}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
