import React from "react";
import "./CompletedPopup.css";
import DefaultImage from "../../assets/images/default_profile_img.jpg";
import completeArt from "../../assets/images/completeArt.png";

const CompletedPopup = (props) => {
  const order = props.order;
  const handleDownloadBtn = async () => {
    try {
      const response = await fetch(order.orderImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Artifex_${order.orderId}.png`; // Customize the file name here
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      toast.error("Failed to download image");
    }
  };
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
              <button className="download-btn-InCompletedPopup" onClick={handleDownloadBtn}>
              <svg
                id="download"
                viewBox="0 0 24 24"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M14.29,17.29,13,18.59V13a1,1,0,0,0-2,0v5.59l-1.29-1.3a1,1,0,0,0-1.42,1.42l3,3a1,1,0,0,0,.33.21.94.94,0,0,0,.76,0,1,1,0,0,0,.33-.21l3-3a1,1,0,0,0-1.42-1.42ZM18.42,6.22A7,7,0,0,0,5.06,8.11,4,4,0,0,0,6,16a1,1,0,0,0,0-2,2,2,0,0,1,0-4A1,1,0,0,0,7,9a5,5,0,0,1,9.73-1.61,1,1,0,0,0,.78.67,3,3,0,0,1,.24,5.84,1,1,0,1,0,.5,1.94,5,5,0,0,0,.17-9.62Z"></path>
              </svg>
            </button>
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
