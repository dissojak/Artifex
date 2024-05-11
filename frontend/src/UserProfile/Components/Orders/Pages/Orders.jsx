import React, { useEffect, useState } from "react";
import "./Orders.css";
import loading from "../../../../assets/images/loadpurple.gif";

import { useDispatch } from "react-redux";
import { useGetClientOrdersMutation } from "../../../../slices/ordersSlice";
import { setCredentials } from "../../../../slices/authSlice";
import OrdersList from "../Components/OrdersList";
// const orders = [
//     { id: 15467, artist: "Tarek Chebbi", description: "This ensures that each product", price: "130 DT", orderDate: "12/04/2024", deliveryDate: "20/04/2024", orderType: "Normal", status: "Pending" },
//     { id: 17586, artist: "Emma Gmati", description: "loop to generate a random id", price: "160 DT", orderDate: "15/08/2024", deliveryDate: "19/08/2024", orderType: "Rapid", status: "Completed" },
//     { id: 25191, artist: "Med Mouhib Med", description: "we continue generating new ids", price: "50 DT", orderDate: "02/07/2024", deliveryDate: "07/07/2024", orderType: "Rapid", status: "Rejected" },
// ];

const Orders = () => {
  // const dispatch = useDispatch();
  const [clientOrders, { isLoading }] = useGetClientOrdersMutation();
  const [orders, setOrders] = useState();

  useEffect(() => {
    const req = async () => {
      try {
        const res = await clientOrders();
        // dispatch(setCredentials(res));
        console.log(res.data.orders);
        setOrders(res.data.orders);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };
    req();
  }, []);

  //   document.documentElement.style.setProperty('--scrollbar-thumb-color', !auth.isAdmin ? '#87CEEB' : '#C99C6E');

  return (
    <>
      {isLoading ? (
        <div
          className="center_spinner"
          style={{ position: "relative", top: "4rem" }}
        >
          {/* <SBLoader className="Overlay"/> */}
          {/* <LoadingSpinner /> */}
          {/* <img src="./elements/11a.gif" alt="" /> */}
          <img src={loading} alt="" />

          {/* <SkeletonLoader /> */}
        </div>
      ) : (<>
          {!orders && (
            <div className="noOrdersContainer">
              <h1>There are no orders yet !</h1>
            </div>
          )}
        <div className="orders-container">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Artist</th>
                <th>Description</th>
                <th>Price</th>
                <th>Order Date</th>
                {/* <th>Delivery Date</th> */}
                <th>Order Type</th>
                <th>Status</th>
              </tr>
            </thead>
            {/* componenet here  */}
            {!isLoading && orders && <OrdersList items={orders} />}
          </table>
        </div>
      </>)}
    </>
  );
};

export default Orders;
