import React, { useState } from "react";
import "../Pages/Orders.css";
import CompletedPopup from "../../CompletedPopup.jsx";

const OrdersItem = (props) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control the popup visibility

  function formatDate(dateString) {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options); // Using British locale to get DD/MM/YYYY
  }

  const handleStatusClick = (status) => {
    if (status === "accepted") {
      console.log("Redirecting to payment...");
      // Redirect to payment or handle payment logic
    } else if (status === "completed") {
      setIsPopupOpen(!isPopupOpen);
    } else {
      console.log(`Action for status: ${status}`);
      // Handle other status-related actions
    }
  };

  return (
    <>
      <tr key={props._id}>
        <td>{props.id}</td>
        <td>{props.artist}</td>
        <td>{props.description}</td>
        <td>{props.price}</td>
        <td>{formatDate(props.orderDate)}</td>
        <td>{props.orderType}</td>
        <td className={`status ${props.status.toLowerCase()}`}>
          <button
            className="status-button"
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
