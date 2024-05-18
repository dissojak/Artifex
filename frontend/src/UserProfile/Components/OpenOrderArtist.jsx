import React, { useEffect, useState } from "react";
import "./OpenOrderArtist.css";
import DefualImg from "../../assets/images/default_profile_img.jpg";
import { useSelector } from "react-redux";
import { useOpenOrderMutation } from "../../slices/artistsSlice";
import { toast } from "react-toastify";

const OpenOrderArtist = (props) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [openOrder] = useOpenOrderMutation();

  const [normalPrice, setNormalPrice] = useState("");
  const [rapidPrice, setRapidPrice] = useState("");

  const handleSubmit = async () => {
    const parsedNormalPrice = parseInt(normalPrice, 10);
    const parsedRapidPrice = parseInt(rapidPrice, 10);

    if (isNaN(parsedNormalPrice) || isNaN(parsedRapidPrice)) {
      toast.error("Please enter valid integer numbers for prices.");
      return;
    }

    const toastId = toast.loading("Saving Your Prices...");
    try {
      await openOrder({
        normalPrice: parsedNormalPrice,
        rapidPrice: parsedRapidPrice,
      });
      toast.update(toastId, {
        render: "Done!",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
    } catch (err) {
      toast.update(toastId, {
        render: err?.data?.message || err.error,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  useEffect(() => {
    if (props.user.normalPrice) {
      setNormalPrice(props.user.normalPrice);
    }
    if (props.user.rapidPrice) {
      setRapidPrice(props.user.rapidPrice);
    }
  }, [props.user]);

  return props.isLoading ? (
    <LoadingArtifex />
  ) : (
    <>
      <div className="price-settingOpenOrderArtist">
        <div className="header-contentOpenOrderArtist">
          <img
            src={userInfo.image || DefualImg}
            alt="Profile"
            className="profile-imageOpenOrderArtist"
          />
          <h2>Accept Orders From Clients</h2>
        </div>
        <p>What's prices are suitable for you?</p>
        <div className="prices-formOpenOrderArtist">
          <div>
            <label htmlFor="normalPrice">Normal Price:</label>
            <input
              id="normalPrice"
              type="text"
              placeholder="e.g 100 DT"
              className="input1OpenOrderArtist"
              value={normalPrice}
              onChange={(e) => setNormalPrice(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="rapidPrice">Rapid Price:</label>
            <input
              id="rapidPrice"
              type="text"
              placeholder="e.g 150 DT"
              className="input2OpenOrderArtist"
              value={rapidPrice}
              onChange={(e) => setRapidPrice(e.target.value)}
            />
          </div>
        </div>
        <button className="submit-btnOpenOrderArtist" onClick={handleSubmit}>
          Set Your Prices
        </button>
      </div>
    </>
  );
};

export default OpenOrderArtist;
