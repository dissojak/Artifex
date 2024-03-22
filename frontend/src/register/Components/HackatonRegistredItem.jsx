import React, { useContext } from "react";
import { Link } from "react-router-dom";
// import "../../shared/components/UI/Buttons/SignupButton.css";
// import SaveButton from '../../shared/components/UI/Buttons/SaveButton'
import { useHttp } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import "./RegisterItems.css";


// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    undefined,
    options
  );
  return formattedDate;
};

const HackatonRegistredItem = (props) => {

  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttp();



  const unregisterInHackatonHandeler = async () => {
    try {
        await sendRequest(
          "http://localhost:8000/api/hackaton/removeTeamIscriptionFromHackaton",
          "DELETE",
          JSON.stringify({
            hackatonId: props.id,
            userId: auth.userId,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        props.onDelete(props.id);
      } catch (e) {
      }
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <div id="hackaton">
        {/* <img src={props.image} alt="" className="img_hackaton_index"/> */}
        <img
          src="elements/for test/Capture_HAckathon_wordpress.jpg"
          alt="affiche"
          className="img_hackaton_index"
        />
        <div id="hackaton_info">
          <h3 className="cfc">{props.title}</h3>
          <h5 className="inder_cfc">{props.theme}</h5>
          <div className="date_hackaton">
            start at: {formatDate(props.StartingDate)}
          </div>
          <div className="date_hackaton">
            {" "}
            end at : {formatDate(props.EndingDate)}
          </div>
          <div id="name_logo_club">
            <img
              src="elements/clubs/cropped-IT-CLUB-FINAL.png"
              alt="organisateur"
              className="image_club_name"
            />
            {/* <img src={props.imgOrganisateur} alt="" className="image_club_name"/> */}
            <em className="club_name"> {props.organisateur}</em>
          </div>
          <Link to={`/hackatons/${props.id}`} id="Details_botton">
            Details
          </Link>
          <div id="mail_flag">
            <a href={`mailto:${props.email}`}>
              <img
                src="elements/Groupe 5.svg"
                alt="mail"
                style={{ width: "150px", height: "28px", marginLeft: "-5px" }}
              />
            </a>
            <div id="flame_flag">
              <img src="elements/flame.svg" alt="flame" />
              <em id="flags_nb">{props.participantsCount}</em>
              <button className="btnSave" onClick={unregisterInHackatonHandeler}>
                <svg
                  aria-label="Unregister"
                  className="x1lliihq x1n2onr6 x5n08af"
                  fill="currentColor"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <title>Unregister</title>
                  <path d="M20 22a.999.999 0 0 1-.687-.273L12 14.815l-7.313 6.912A1 1 0 0 1 3 21V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1Z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HackatonRegistredItem;
