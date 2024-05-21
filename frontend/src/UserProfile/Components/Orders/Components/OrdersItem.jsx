import React, { useState } from "react";
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

  const [payment] = useOrderPaymentMutation();
  const handleStatusClick = async (status) => {
    if (status === "accepted") {
      try {
        const res = await payment({
          amount: props.price * 1000,
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
    }
  };

  return (
    <>
      <tr key={props.id}>
        <td>{props.orderId}</td>
        <td>{props.artist}</td>
        <td>{props.description}</td>
        <td>{props.price}</td>
        <td>{formatDate(props.orderDate)}</td>
        <td>{props.orderType}</td>
        <td className={`status ${props.status.toLowerCase()}`}>
          <button
            className="status-button "
            onClick={() => handleStatusClick(props.status)}
          >
            {props.status === "accepted" ? "Pay" : props.status}
          </button>
        </td>
      </tr>
      {isPopupOpen && (
        <tr>
          <td colSpan="7">
            <CompletedPopup onClose={() => setIsPopupOpen(false)} />
          </td>
        </tr>
      )}
    </>
  );
};

export default OrdersItem;
