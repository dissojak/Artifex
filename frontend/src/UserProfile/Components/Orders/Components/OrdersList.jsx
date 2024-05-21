import React from "react";
import "../Pages/Orders.css";
import OrdersItem from "./OrdersItem";
const OrdersList = (props) => {
  return (
    <>
      <tbody>
        {props.items.map((order) => (
          <OrdersItem
            key={order._id}
            id={order._id}
            orderId={order.orderId}
            artist={order.artistId.username}
            description={order.description}
            price={order.artistId.normalPrice}
            orderDate={order.date}
            // deliveryDate={order.deliveryDate}
            orderType={order.serviceType}
            status={order.status}
          />
        ))}
      </tbody>
    </>
  );
};

export default OrdersList;
