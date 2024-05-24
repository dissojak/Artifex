import React, { useEffect, useState } from "react";
import "../Pages/OrdersArtist.css";
import CompletedPopup from "../../CompletedPopup.jsx";
import { toast } from "react-toastify";
import CompletedPopupArtist from "../../CompletedPopupArtist.jsx";
import {
  useAcceptOrderMutation,
  useRejectOrderMutation,
} from "../../../../slices/ordersSlice.js";
import SubmitPopupArtist from "../../SubmitPopupArtist.jsx";

const OrdersItemArtist = (props) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control the popup visibility
  const [isSubmitPopupOpen, setIsSubmitPopupOpen] = useState(false); // State to control the popup visibility

  function formatDate(dateString) {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options); // Using British locale to get DD/MM/YYYY
  }

  const [status, setStatus] = useState(props.status);
  const [accept] = useAcceptOrderMutation();
  const [reject] = useRejectOrderMutation();

  const acceptHandeler = async () => {
    try {
      const res = await accept({
        orderId: props.orderId,
      }).unwrap();
      setStatus("accepted");
      toast.success("order accepted");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const rejectHandeler = async () => {
    try {
      const res = await reject({
        orderId: props.orderId,
      }).unwrap();
      setStatus("rejected");
      toast.warn("order rejected");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleStatusClick = async (status) => {
    if (status === "completed") {
      setIsPopupOpen(!isPopupOpen);
    } else if (status === "accepted") {
      toast.info("Wait for the client until he Pay the order !");
    } else if (status === "payed") {
      setIsSubmitPopupOpen(!isSubmitPopupOpen);
    } else if (status === "rejected") {
      toast.info("You have Reject this order");
    }
  };

  return (
    <>
      <tr key={props.id}>
        <td>{props.orderId}</td>
        <td>{props.client}</td>
        <td>{props.description}</td>
        {/* <td>{props.price}</td> */}
        <td>{formatDate(props.dateCommende)}</td>
        <td>{props.orderType}</td>
        <td className={`statusArtist ${status.toLowerCase()}`}>
          {status != "pending" && (
            <button
              className="status-button "
              onClick={() => handleStatusClick(status)}
            >
              {status === "accepted" && "Payment..."}
              {status === "payed" && "submit"}
              {status === "rejected" && "rejected"}
              {status === "completed" && "completed"}
            </button>
          )}{" "}
          {status === "pending" && (
            <>
              <div className="reject-accept">
                <button
                  className="status-button-accept "
                  onClick={acceptHandeler}
                >
                  ✔
                </button>
                <button
                  className="status-button-reject "
                  onClick={rejectHandeler}
                >
                  ✖
                </button>
              </div>
            </>
          )}
        </td>
      </tr>
      {isPopupOpen && (
        <tr>
          <td colSpan="7">
            <CompletedPopupArtist
              onClose={() => setIsPopupOpen(false)}
              order={{
                // price: props.price,
                dateLivrison: formatDate(props.dateLivrison),
                dateCommende: formatDate(props.dateCommende),
                orderType: props.orderType,
                description: props.description,
                orderImage: props.orderImage,
                clientImage: props.clientImage,
                client: props.client,
                orderId: props.orderId,
              }}
            />
          </td>
        </tr>
      )}
      {isSubmitPopupOpen && (
        <tr>
          <td colSpan="7">
            <SubmitPopupArtist
              UpdateStatus={() => setStatus("completed")}
              onClose={() => setIsSubmitPopupOpen(false)}
              order={{
                // price: props.price,
                dateCommende: formatDate(props.dateCommende),
                orderType: props.orderType,
                description: props.description,
                orderImage: props.orderImage,
                clientImage: props.clientImage,
                client: props.client,
                orderId: props.orderId,
              }}
            />
          </td>
        </tr>
      )}
    </>
  );
};

export default OrdersItemArtist;
