import React, { useEffect, useState } from "react";
import MuseumImage from "../../../../assets/images/BIG.svg"; // Update path accordingly
import TraceImage from "../../../../assets/images/Tracé 10.svg"; // Update path accordingly
import EventPassImage from "../../../../assets/images/event_pass.svg"; // Update path accordingly
import ProfileImage from "../../../../assets/images/Adem.jpg";
import "../Pages/Museums.css";
import { toast } from "react-toastify";
import { useParticipantArtistsMutation } from "../../../../slices/museumsSlice";
const MuseumItemCard = (props) => {
  function formatDate(dateString) {
    const options = { day: "2-digit", month: "long" }; // Use 'long' to get the full month name
    return new Date(dateString).toLocaleDateString("en-GB", options); // Adjusted for day and full month name
  }

  const [getParticipantArtists, { isLoading }] = useParticipantArtistsMutation();
  const [artists, setArtists] = useState();
  if ( props.artistsEntered>0){
  useEffect(() => {
    const req = async () => {
      try {
        const res = await getParticipantArtists(props.id);
        console.log(res.data.participantArtists);
        setArtists(res.data.participantArtists);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };
    req();
  }, []);
  }
  const percentage = (props.clientsEntered / props.numberMaxClients) * 100;
  // console.log(percentage);
  return (
    <>
      <div
        className="event-card11"
        // style={{
        //   border: props.isExclusive ? "2px solid #FFD123" : "none",
        //   boxShadow: props.isExclusive
        //     ? "0px 2px 25px rgba(255, 209, 35, 0.16)"
        //     : "0px 2px 25px rgba(0, 0, 0, 0.16)",
        // }}
      >
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
                <div className="event-end-date11">{formatDate(props.Ends)}</div>
              </div>
              <div className="event-price11">{props.priceClient} DT</div>
            </div>
            <div className="event-overlay-bottom11">
              <button className="btn-311">
                <label className="pinButton33">
                  <input type="checkbox" />
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
        <div>
          <h1
            className="cc11"
            style={{
              color: props.isExclusive ? "#8d3dff" : "",
            }}
          ><div className="museumNameContainer">
            {props.name}
            {props.isExclusive && (
              <p className="exclusiveMuseumCard"> (Exclusive)</p>
            )}</div>
          </h1>
          <p className="ccp11">{props.Description}</p>
        </div>
        <div className="div-bottom11">
          <div className="btn-da11">{props.Categorie}</div>
          <div className="profile-container11">
            {artists ? (<>
            <li>
              <img src={ProfileImage} alt="" className="profile-image11" />
            </li>
            <li>
              <img src={ProfileImage} alt="" className="profile-image11" />
            </li>
            <li>
              <img src={ProfileImage} alt="" className="profile-image11" />
            </li>
            <li>
              <img src={ProfileImage} alt="" className="profile-image11" />
            </li>
            </>):(<li>
              <div className="profile-image11NOIMAGE" >0</div>
            </li>)}
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