import React, { useState } from "react";
import "./SubmitPopupArtist.css";
import DefaultImage from "../../assets/images/default_profile_img.jpg";
import DamagedImage from "../../assets/images/DamagedImage.jpg";
import UploadWidget from "../../shared/components/FormElements/UploadWidget";
import { useSubmitOrderMutation } from "../../slices/ordersSlice";
import { toast } from "react-toastify";

const SubmitPopupArtist = (props) => {
  const order = props.order;
  const [img, setImg] = useState("");

  const saveDataImg = (url) => {
    setImg(url);
  };

  const [submit]=useSubmitOrderMutation();
  const uploadHandler = async()=>{
    try {
      const res = await submit({
        orderId: order.orderId,
        image_liv:img,
      }).unwrap();
      toast.success("order accepted");
      props.UpdateStatus();
      props.onClose();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="modal-backdropcmpt">
      <div className="modal-contentcmpt">
        <div className="completeStatu-list">
          <h1 className="OrderId">
            Order ID : <p>{order.orderId}</p>
          </h1>
          <div className="artist-profile-containercmpt">
            <div className="profile-sectioncmpt">
              <div className="photo-name-cmpt">
                <img
                  src={order.clientImage || DefaultImage}
                  alt="Artist Image"
                  className="artist-photocmpt"
                />
                <div className="follower-infocmpt">
                  <h1>{order.client}</h1>
                  <p className="subtitlecmpt">Client</p>
                </div>
              </div>
              <div className="detailscmpt">
                <div className="service-type-cmplt">
                  Service Type : {order.orderType}
                </div>
                <p>
                  <span
                    style={{ color: "black", fontFamily: "Raleway-ExtraBold" }}
                  >
                    Order Date:
                  </span>{" "}
                  {order.dateCommende}
                </p>
              </div>
            </div>
            <div className="description-sectioncmpt">
              <h2>Description:</h2>
              <p>{order.description}</p>
            </div>
            <img
              src="elements/X.svg"
              alt="Close"
              className="close-iconcmpt"
              onClick={props.onClose}
            />
          </div>

          <div className="modalImageUpload">
            <div className="modal-body">
              <label className="upload-area">
                <UploadWidget onUploadSuccess={saveDataImg} />
                {img === "" ? (
                  <>
                    <span className="upload-area-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="35"
                        height="35"
                        viewBox="0 0 340.531 419.116"
                      >
                        <g id="files-new" clipPath="url(#clip-files-new)">
                          <path
                            id="Union_2"
                            // dataName="Union 2"
                            d="M-2904.708-8.885A39.292,39.292,0,0,1-2944-48.177V-388.708A39.292,39.292,0,0,1-2904.708-428h209.558a13.1,13.1,0,0,1,9.3,3.8l78.584,78.584a13.1,13.1,0,0,1,3.8,9.3V-48.177a39.292,39.292,0,0,1-39.292,39.292Zm-13.1-379.823V-48.177a13.1,13.1,0,0,0,13.1,13.1h261.947a13.1,13.1,0,0,0,13.1-13.1V-323.221h-52.39a26.2,26.2,0,0,1-26.194-26.195v-52.39h-196.46A13.1,13.1,0,0,0-2917.805-388.708Zm146.5,241.621a14.269,14.269,0,0,1-7.883-12.758v-19.113h-68.841c-7.869,0-7.87-47.619,0-47.619h68.842v-18.8a14.271,14.271,0,0,1,7.882-12.758,14.239,14.239,0,0,1,14.925,1.354l57.019,42.764c.242.185.328.485.555.671a13.9,13.9,0,0,1,2.751,3.292,14.57,14.57,0,0,1,.984,1.454,14.114,14.114,0,0,1,1.411,5.987,14.006,14.006,0,0,1-1.411,5.973,14.653,14.653,0,0,1-.984,1.468,13.9,13.9,0,0,1-2.751,3.293c-.228.2-.313.485-.555.671l-57.019,42.764a14.26,14.26,0,0,1-8.558,2.847A14.326,14.326,0,0,1-2771.3-147.087Z"
                            transform="translate(2944 428)"
                            fill="var(--c-action-primary)"
                          ></path>
                        </g>
                      </svg>
                    </span>
                    <span className="upload-area-description">
                      <strong>Welecome Artist !</strong>
                    </span>
                    <span className="upload-area-title">
                      Click here to upload Artwork .
                    </span>{" "}
                  </>
                ) : (
                  <img
                    src={img}
                    alt=""
                    className="imageUploadArtworkSumittion"
                  />
                  // <img
                  //   className="image-uploader"
                  // />
                )}
              </label>
            </div>
            <div className="modal-footer">
              <button className="bttn-secondary" onClick={()=>{setImg(""); props.onClose()}}>Cancel</button>
              <button className="bttn-primary" onClick={uploadHandler}>Upload File</button>
            </div>
          </div>

          {/* <img
            src={order.orderImage || DamagedImage}
            alt="Placeholder"
            className="CompletedStatue-containertest"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default SubmitPopupArtist;
