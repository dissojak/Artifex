import React, { useEffect, useState } from "react";
import "../Pages/Orders.css";
import CompletedPopup from "../../CompletedPopup.jsx";
import { useOrderPaymentMutation } from "../../../../slices/ordersSlice.js";
import { toast } from "react-toastify";

const OrdersItem = (props) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control the popup visibility

  function formatDate(dateString) {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options); // Using British locale to get DD/MM/YYYY
  }

  let price;
  if (props.orderType === "normal") {
    price = props.normalPrice;
  } else {
    price = props.rapidPrice;
  }

  const [payment] = useOrderPaymentMutation();
  const handleStatusClick = async (status) => {
    if (status === "accepted") {
      try {
        const res = await payment({
          amount: price * 1000,
        }).unwrap();
        // console.log("Setting orderId in localStorage:", props.orderId);
        localStorage.setItem("orderId", props.orderId);
        const paymentLink = res.paymentInfo.result.link;
        console.log(paymentLink);
        window.location.href = paymentLink;
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    } else if (status === "completed") {
      setIsPopupOpen(!isPopupOpen);
    } else if (status === "pending") {
      toast.info("Wait for the Artist until he accept your order !");
    } else if (status === "payed") {
      toast.info("The Artist is working on Your Order !");
    } else if (status === "rejected") {
      toast.warn("Sorry, The Artist Declined Your Order !");
    }
  };

  return (
    <>
      <tr key={props.id}>
        <td>{props.orderId}</td>
        <td>{props.artist}</td>
        <td>{props.description}</td>
        <td>{price}</td>
        <td>{formatDate(props.dateCommende)}</td>
        <td>{props.orderType}</td>
        <td className={`status ${props.status.toLowerCase()}`}>
          <button
            className="status-button "
            onClick={() => handleStatusClick(props.status)}
          >
            {props.status === "accepted" ? "Pay" : props.status}
            {props.status === "payed" ? "paid" : null}
          </button>
        </td>
      </tr>
      {isPopupOpen && (
        <tr>
          <td colSpan="7">
            <CompletedPopup
              onClose={() => setIsPopupOpen(false)}
              order={{
                // price: props.price,
                dateLivrison: formatDate(props.dateLivrison),
                dateCommende: formatDate(props.dateCommende),
                orderType: props.orderType,
                description: props.description,
                orderImage: props.orderImage,
                artistImage: props.artistImage,
                artist: props.artist,
                orderId: props.orderId,
              }}
            />
          </td>
        </tr>
      )}
    </>
  );
};

export default OrdersItem;
