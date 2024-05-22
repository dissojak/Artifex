import React from "react";
import "./CompletedPopup.css";
import DefaultImage from "../../assets/images/default_profile_img.jpg";
import completeArt from "../../assets/images/completeArt.png";

const CompletedPopup = (props) => {
  const order = props.order;
  return (
    <div className="modal-backdropcmpt">
      <div className="modal-contentcmpt">
        <div className="completeStatu-list">
          <h1 className="OrderId">Order ID : <p>{order.orderId}</p></h1>
          <div className="artist-profile-containercmpt">
            <div className="profile-sectioncmpt">
              <div className="photo-name-cmpt">
                <img
                  src={order.artistImage||DefaultImage}
                  alt="Artist Image"
                  className="artist-photocmpt"
                />
                <div className="follower-infocmpt">
                  <h1>{order.artist}</h1>
                  <p className="subtitlecmpt">Artist</p>
                </div>
              </div>
              <div className="detailscmpt">
                <div className="service-type-cmplt">Service Type : {order.orderType}</div>
                <p>
                  <span
                    style={{ color: "black", fontFamily: "Raleway-ExtraBold" }}
                  >
                    Order Date:
                  </span>{" "}
                  {order.dateCommende}
                </p>
                <p>
                  <span
                    style={{ color: "black", fontFamily: "Raleway-ExtraBold" }}
                  >
                    Delivery Date:
                  </span>{" "}
                  {order.dateLivrison}
                </p>
              </div>
            </div>
            <div className="description-sectioncmpt">
              <h2>Description:</h2>
              <p>
                {order.description}
              </p>
            </div>
            <img
              src="elements/X.svg"
              alt="Close"
              className="close-iconcmpt"
              onClick={props.onClose}
            />
          </div>
          <img
            src={order.orderImage}
            alt="Placeholder"
            className="CompletedStatue-containertest"
          />
        </div>
      </div>
    </div>
  );
};

export default CompletedPopup;
