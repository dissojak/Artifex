import React, { useEffect, useState } from "react";
import "./ArtSection.css";
import Art from "../../assets/images/image 2.png";
import Ticket from "../../assets/images/Tracé 10.svg";
import Pass from "../../assets/images/event_pass.svg";
import Pin from "../../assets/images/Pinblack.svg";
import { useSelector } from "react-redux";
import {
  useIsPinnedMutation,
  useMuseumPaymentMutation,
  usePinMutation,
  useUnpinMutation,
} from "../../slices/museumsSlice";
import { toast } from "react-toastify";
const ArtSection = (props) => {
  const { userInfo } = useSelector((state) => state.auth);
  const museum = props.museum;
  const isArtist = userInfo.userType === "artist";
  const isClient = userInfo.userType === "client";

  const [isLoading, setIsLoading] = useState();
  const [isPinned, setIsPinned] = useState(false);
  const [checkisPinned] = useIsPinnedMutation();
  useEffect(() => {
    const req = async () => {
      setIsLoading(true);
      try {
        const res = await checkisPinned({
          museumId: museum._id,
        }).unwrap();
        setIsPinned(res.isPinned);
        // console.log(res);
        setIsLoading(false);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
        setIsLoading(false);
      }
    };
    req();
  }, []);

  const [pin] = usePinMutation();
  const PinMuseums = async () => {
    const toastId = toast.loading("Pinning Museum...");
    setIsLoading(true);
    try {
      const res = await pin({
        museumId: museum._id,
      }).unwrap();
      toast.update(toastId, {
        render: "Done !",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      setIsPinned(true);
      setIsLoading(false);
    } catch (err) {
      setIsPinned(false);
      setIsLoading(false);
      toast.update(toastId, {
        render: err?.data?.message || err.error,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  const [unpin] = useUnpinMutation();
  const unPinMuseums = async () => {
    const toastId = toast.loading("UnPinning Museum...");
    setIsLoading(true);
    try {
      const res = await unpin({
        museumId: museum._id,
      }).unwrap();
      setIsPinned(false);
      toast.update(toastId, {
        render: "Unpinned Successfully!",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      setIsLoading(false);
    } catch (err) {
      setIsPinned(true);
      setIsLoading(false);
      toast.update(toastId, {
        render: err?.data?.message || err.error,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  const handlePinChange = (event) => {
    if (event.target.checked) {
      PinMuseums();
    } else {
      unPinMuseums();
    }
  };

  let percentage;
  if (isArtist) {
    percentage = (museum.artistsEntered / museum.numberMaxArtists) * 100;
  } else if (isClient) {
    percentage = (museum.clientsEntered / museum.numberMaxClients) * 100;
  }

  function formatDate(dateString) {
    const options = { day: "2-digit", month: "long" }; // Use 'long' to get the full month name
    return new Date(dateString).toLocaleDateString("en-GB", options); // Adjusted for day and full month name
  }

  let price;
  if (isClient) {
    price = museum.priceClient;
  } else if (isArtist) {
    price = museum.priceArtist;
  }

  const [payment] = useMuseumPaymentMutation();
  const handleBuyPass = async () => {
    try {
      const res = await payment({
        amount: price * 1000,
        museumId: museum._id,
      }).unwrap();
      localStorage.setItem("museumId", museum._id);
      const paymentLink = res.paymentInfo.result.link;
      window.location.href = paymentLink;
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div id="ArtSection-Section">
      <div className="Artsandbar-container">
        <img
          src={museum.museumImage}
          alt="Placeholder"
          className="ArtSection-containertest"
        />
        <div className="range_container">
          <div className="range-content">
            <div
              className="slider-range"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <div className="range-nmr">
            {(isClient && (
              <>
                {museum.clientsEntered}/{museum.numberMaxClients}
              </>
            )) ||
              (isArtist && (
                <>
                  {museum.artistsEntered}/{museum.numberMaxArtists}
                </>
              ))}
          </div>
        </div>
      </div>

      {/*get pass*/}
      <div className="getyourpass-container">
        <div className="getyourpass-details">
          <div className="titleAndPin">
            <h1>{museum.title}</h1>
            {/* <img src={Pin} alt="Pin" /> */}
            <label className="pinButton">
              <input
                type="checkbox"
                checked={!isLoading && isPinned}
                onChange={handlePinChange}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 75 100"
                className="pin"
              >
                <line
                  strokeWidth="12"
                  stroke="black"
                  y2="100"
                  x2="37"
                  y1="64"
                  x1="37"
                ></line>
                <path
                  strokeWidth="10"
                  stroke="black"
                  d="M16.5 36V4.5H58.5V36V53.75V54.9752L59.1862 55.9903L66.9674 67.5H8.03256L15.8138 55.9903L16.5 54.9752V53.75V36Z"
                ></path>
              </svg>
            </label>
          </div>
          <p className="getyourpass-price">{price} DT</p>
          <div className="getyourpass-ratingArtworkDetailsContainer">
            <p className="getyourpass-date"> DATE :</p>
            <div className="dateLabel-Start">
              {formatDate(museum.dateStart)}
            </div>
            <div className="dateLabel-End">{formatDate(museum.dateEnd)}</div>
          </div>
          <p className="getyourpass-description">{museum.description}</p>
          <div className="getyourpass-ratingArtworkDetailsContainer">
            <p
              className="getyourpass-category"
              style={{ color: "#9866FF", fontWeight: "bold" }}
            >
              Category:{" "}
            </p>
            <p className="getyourpass-category">{museum.idCategory.name}</p>
          </div>{" "}
          <div className="getyourpass-ratingArtworkDetailsContainer">
            <p
              className="getyourpass-category"
              style={{ color: "#9866FF", fontWeight: "bold" }}
            >
              Exclusive:{" "}
            </p>
            <p className="getyourpass-category">
              {museum.isExclusive ? (
                <img
                  src="../elements/right.svg"
                  alt=""
                  className="rightContainerMuseum"
                />
              ) : (
                <img
                  src="../elements/wrong.svg"
                  alt=""
                  className="wrongContainerMuseum"
                />
              )}
            </p>
          </div>
          {/*button section */}
          <div
            className="buttonsartsection8"
            style={{ paddingTop: "35px" }}
            onClick={handleBuyPass}
          >
            <div className="buttoncart8">
              <div className="button-wrappercart8">
                <div className="textcart8">
                  Get Your Pass <img src={Ticket} alt="Ticket" />
                </div>
                <span className="iconcart8">
                  <img src={Pass} alt="Ticket" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*end*/}
    </div>
  );
};

export default ArtSection;
