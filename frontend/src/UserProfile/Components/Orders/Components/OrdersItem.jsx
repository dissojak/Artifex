import React from "react";
import "../Pages/Orders.css";
const OrdersItem = (props) => {
  function formatDate(dateString) {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options); // Using British locale to get DD/MM/YYYY
  }

  return (
    <tr key={props._id}>
      <td>{props.id}</td>
      <td>{props.artist}</td>
      <td>{props.description}</td>
      <td>{props.price}</td>
      <td>{formatDate(props.orderDate)}</td>
      {/* <td>{props.deliveryDate}</td> */}
      <td>{props.orderType}</td>
      <td className={`status ${props.status.toLowerCase()}`}>
        {/* <button> */}
        {props.status === "accepted" ? "Pay" : props.status}
        {/* </button> */}
      </td>
    </tr>
  );
};

export default OrdersItem;
