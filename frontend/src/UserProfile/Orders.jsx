import React, {  } from "react";
import "./Orders.css";
const orders = [
    { id: 15467, artist: "Tarek Chebbi", description: "This ensures that each product", price: "130 DT", orderDate: "12/04/2024", deliveryDate: "20/04/2024", orderType: "Normal", status: "Pending" },
    { id: 17586, artist: "Emma Gmati", description: "loop to generate a random id", price: "160 DT", orderDate: "15/08/2024", deliveryDate: "19/08/2024", orderType: "Rapid", status: "Completed" },
    { id: 25191, artist: "Med Mouhib Med", description: "we continue generating new ids", price: "50 DT", orderDate: "02/07/2024", deliveryDate: "07/07/2024", orderType: "Rapid", status: "Rejected" },
];
const Orders = () => {
 

  //   document.documentElement.style.setProperty('--scrollbar-thumb-color', !auth.isAdmin ? '#87CEEB' : '#C99C6E');

  return (
    <>
  <div className="orders-container">
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Artist</th>
            <th>Description</th>
            <th>Price</th>
            <th>Order Date</th>
            <th>Delivery Date</th>
            <th>Order Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.artist}</td>
              <td>{order.description}</td>
              <td>{order.price}</td>
              <td>{order.orderDate}</td>
              <td>{order.deliveryDate}</td>
              <td>{order.orderType}</td>
              <td className={`status ${order.status.toLowerCase()}`}>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
</>
  );
};

export default Orders;