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

const Orders = () => {
  const [isLoading, setIsLoading] = useState();
  const [artistOrders] = useGetArtistOrdersMutation();
  const [clientOrders] = useGetClientOrdersMutation();

  const [orders, setOrders] = useState();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const req = async () => {
      if (userInfo.userType === "client") {
        setIsLoading(true);
        try {
          const res = await clientOrders();
          setOrders(res.data.orders);
          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);
          toast.error(err?.data?.message || err.error);
        }
      } else if (userInfo.userType === "artist") {
        try {
          setIsLoading(true);
          const res = await artistOrders();
          setIsLoading(false);
          setOrders(res.data.orders);
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
          {/* <SBLoader className="Overlay"/> */}
          {/* <LoadingSpinner /> */}
          {/* <img src="./elements/11a.gif" alt="" /> */}
          <img src={loading} alt="" />

          {/* <SkeletonLoader /> */}
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
        </>
      )}
    </>
  );
};

export default Orders;
