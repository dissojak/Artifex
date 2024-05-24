import React from "react";
import "../Pages/Orders.css";
import OrdersItemArtist from "./OrdersItemArtist";
const OrdersListArist = (props) => {
  return (
    <>
      <tbody>
        {props.items.map((order) => (
          <OrdersItemArtist
            key={order._id}
            id={order._id}
            orderId={order.orderId}
            client={order.clientId.username}
            clientImage={order.clientId.profileImage}
            orderImage={order.image_liv}
            description={order.description}
            dateCommende={order.date}
            dateLivrison={order.date}
            // deliveryDate={order.deliveryDate}
            orderType={order.serviceType}
            status={order.status}
          />
        ))}
      </tbody>
    </>
  );
};

export default OrdersListArist;
