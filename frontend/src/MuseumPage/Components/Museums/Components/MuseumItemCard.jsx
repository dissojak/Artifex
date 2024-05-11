import React, { useEffect, useState } from "react";
import MuseumImage from "../../../../assets/images/BIG.svg"; // Update path accordingly
import TraceImage from "../../../../assets/images/Tracé 10.svg"; // Update path accordingly
import EventPassImage from "../../../../assets/images/event_pass.svg"; // Update path accordingly
import ProfileImage from "../../../../assets/images/Adem.jpg";
import "../Pages/Museums.css";
import { toast } from "react-toastify";
import {
  useIsPinnedMutation,
  useParticipantArtistsMutation,
  usePinMutation,
  useUnpinMutation,
} from "../../../../slices/museumsSlice";
import { Link } from "react-router-dom";
const MuseumItemCard = (props) => {
  function formatDate(dateString) {
    const options = { day: "2-digit", month: "long" }; // Use 'long' to get the full month name
    return new Date(dateString).toLocaleDateString("en-GB", options); // Adjusted for day and full month name
  }

  const [getParticipantArtists] = useParticipantArtistsMutation();
  const [artists, setArtists] = useState();
  useEffect(() => {
    if (props.artistsEntered > 0) {
      const req = async () => {
        try {
          const res = await getParticipantArtists(props.id);
          //   console.log(res.data.participantArtists);
          setArtists(res.data.participantArtists);
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      };
      req();
    }
  }, [props.id, props.artistsEntered, getParticipantArtists]);

  let add9;
  let is3 = false;
  if (artists && artists.length > 3) {
    is3 = true;
    if (artists.length - 2 < 9) {
      add9 = artists.length - 2;
    } else {
      add9 = 9;
    }
  }
  const [isLoading, setIsLoading] = useState();
  const [isPinned, setIsPinned] = useState();
  const [checkisPinned] = useIsPinnedMutation();
  useEffect(() => {
    const req = async () => {
      setIsLoading(true);
      try {
        const res = await checkisPinned({
          museumId: props.id,
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

  const [pin, { isLoadinPin }] = usePinMutation();
  const PinMuseums = async () => {
    setIsLoading(true);
    try {
      const res = await pin({
        museumId: props.id,
      }).unwrap();
      setIsPinned(true);
      //   console.log(res);
      setIsLoading(false);
    } catch (err) {
      setIsPinned(false);
      setIsLoading(false);
      toast.error(err?.data?.message || err.error);
    }
  };

  const [unpin] = useUnpinMutation();
  const unPinMuseums = async () => {
    setIsLoading(true);
    try {
      const res = await unpin({
        museumId: props.id,
      }).unwrap();
      setIsPinned(false);
      //   console.log(res);
      setIsLoading(false);
    } catch (err) {
      setIsPinned(true);
      setIsLoading(false);
      toast.error(err?.data?.message || err.error);
    }
  };

  const handlePinChange = (event) => {
    event.stopPropagation();
    if (event.target.checked) {
      PinMuseums();
    } else {
      unPinMuseums();
    }
  };

  const [description,setDescription]=useState(props.Description)
  useEffect(() => {
    function truncateDescription() {
      console.log(props.Description);
      if (props.Description.length > 120) {
        let str = props.Description.substring(0, 120);
        if (str.endsWith(" ")) {
          str = str.slice(0, -1); // Remove the last character if it's a space
          return setDescription(str + "..");
        } else return setDescription(str + "...");
      }
      return props.Description;
    }
    truncateDescription();
  }, [props.Description]);

  const percentage = (props.clientsEntered / props.numberMaxClients) * 100;
  // console.log(percentage);
  return (
    <>
      <div
        key={props.id}
        className="event-card11"
        // style={{
        //   border: props.isExclusive ? "2px solid #FFD123" : "none",
        //   boxShadow: props.isExclusive
        //     ? "0px 2px 25px rgba(255, 209, 35, 0.16)"
        //     : "0px 2px 25px rgba(0, 0, 0, 0.16)",
        // }}
      >
        <Link to="/museumDetails" style={{ cursor: "pointer" }}>
          <div className="event-image11">
            <img
              src={props.Image}
              alt="Event Image11"
              className="event-image11"
            />
            <div className="event-overlay11">
              <div className="event-overlay-top11">
                <div className="event-date11">
                  <div className="event-debut-date11">
                    {formatDate(props.Start)}
                  </div>
                  <div className="event-end-date11">
                    {formatDate(props.Ends)}
                  </div>
                </div>
                <div className="event-price11">{props.priceClient} DT</div>
              </div>
              <div className="event-overlay-bottom11">
                <button
                  className="btn-311"
                  onClick={(e) => e.stopPropagation()}
                >
                  {isLoading ? (
                    <div className="loaderPinContainer">
                      <div className="custom-loader"></div>
                    </div>
                  ) : (
                    <label className="pinButton33">
                      <input
                        type="checkbox"
                        checked={isPinned}
                        onChange={handlePinChange}
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 75 100"
                        className="pin33"
                      >
                        <line
                          strokeWidth="12"
                          stroke="white"
                          y2="100"
                          x2="37"
                          y1="64"
                          x1="37"
                        ></line>
                        <path
                          strokeWidth="10"
                          stroke="white"
                          d="M16.5 36V4.5H58.5V36V53.75V54.9752L59.1862 55.9903L66.9674 67.5H8.03256L15.8138 55.9903L16.5 54.9752V53.75V36Z"
                        ></path>
                      </svg>
                    </label>
                  )}
                </button>
                <button className="btn-pass11">
                  <span className="btn-text-one11">
                    Get Your Pass <img src={TraceImage} alt="" />
                  </span>
                  <span className="btn-text-two11">
                    <img
                      src={
                        props.isExclusive
                          ? "./elements/exclusive_event_pass.svg"
                          : EventPassImage
                      }
                      alt=""
                    />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </Link>

        <div>
          <h1
            className="cc11"
            style={{
              color: props.isExclusive ? "#8d3dff" : "",
            }}
          >
            <div className="museumNameContainer">
              {props.name}
              {props.isExclusive && (
                <img
                  src="./elements/exclusiveButton.svg"
                  className="exclusiveMuseumCardImg"
                  alt="exclusive"
                />
                // <p className="exclusiveMuseumCard"> (Exclusive)</p>
              )}
            </div>
          </h1>
          <p className="ccp11">{description}</p>
        </div>
        <div className="div-bottom11">
          <div className="btn-da11">{props.Categorie}</div>
          <div
            className="profile-container11"
            // style={{
            //   width: is2 ? "96px" : "50px",
            // }}
          >
            {artists && (
              <>
                {artists.slice(0, is3 ? 2 : 3).map((artist) => (
                  <li key={artist.participantId._id}>
                    <img
                      src={artist.participantId.profileImage}
                      alt={artist.participantId.username || "Artist"} // It's good practice to provide meaningful alt text
                      className="profile-image11"
                    />
                  </li>
                ))}
                {is3 && (
                  <li key="extra-artists">
                    <div className="profile-image11NOIMAGE">
                      <p className="container9">+{add9}</p>
                    </div>
                  </li>
                )}
              </>
            )}
          </div>
        </div>
        <div className="range-container11">
          <div className="range-content11">
            <div
              className="slider-range11"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <div className="range-nmr11">
            {props.clientsEntered}/{props.numberMaxClients}
          </div>
        </div>
      </div>
    </>
  );
};

export default MuseumItemCard;
