

import React, { useEffect, useState } from "react";
import "./Orders.css";
import loading from "../../../../assets/images/loadpurple.gif";
import {
  useGetArtistOrdersMutation,
  useGetClientOrdersMutation,
} from "../../../../slices/ordersSlice";
import OrdersList from "../Components/OrdersList";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import OrdersListArist from "../Components/OrdersListArtist";

const Orders = () => {
  const [isLoading, setIsLoading] = useState();
  const [artistOrders] = useGetArtistOrdersMutation();
  const [clientOrders] = useGetClientOrdersMutation();

  const [orders, setOrders] = useState();
  const { userInfo } = useSelector((state) => state.auth);

  const isClinet = userInfo.userType === "client";
  const isArtist = userInfo.userType === "artist";

  useEffect(() => {
    const req = async () => {
      if (isClinet) {
        setIsLoading(true);
        try {
          const res = await clientOrders().unwrap();
          // console.log(res.orders);
          setOrders(res.orders);
          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);
          toast.error(err?.data?.message || err.error);
        }
      } else if (isArtist) {
        try {
          setIsLoading(true);
          const res = await artistOrders().unwrap();
          setIsLoading(false);
          // console.log(res.orders);
          setOrders(res.orders);
        } catch (err) {
          setIsLoading(false);
          toast.error(err?.data?.message || err.error);
        }
      }
    };
    req();
  }, []);

  return (
    <>
      {isLoading ? (
        <div
          className="center_spinner"
          style={{ position: "relative", top: "4rem" }}
        >
          <img src={loading} alt="" />
        </div>
      ) : (
        <>
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
                  {isClinet && (<th>Price</th>)}
                  <th>Order Date</th>
                  {/* <th>Delivery Date</th> */}
                  <th>Order Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              {/* componenet here  */}
              {!isLoading && orders && isClinet && (
                <OrdersList items={orders} />
              )}
              {!isLoading && orders && isArtist && (
                <OrdersListArist items={orders} />
              )}
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default Orders;