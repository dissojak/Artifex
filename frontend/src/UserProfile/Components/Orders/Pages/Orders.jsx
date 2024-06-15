import React, { useEffect, useState } from "react";
import "./Orders.css";
import loading from "../../../../assets/images/loadpurple.gif";
import {
  useGetArtistOrdersMutation,
  useGetClientOrdersMutation,
} from "../../../../slices/ordersSlice";
import OrdersList from "../Components/OrdersList";
import OrdersListArtist from "../Components/OrdersListArtist";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import OrderSkeleton from "../Components/OrderSkeleton";

const Orders = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);

  const { userInfo } = useSelector((state) => state.auth);
  const isClient = userInfo.userType === "client";
  const isArtist = userInfo.userType === "artist";

  const [clientOrders] = useGetClientOrdersMutation();
  const [artistOrders] = useGetArtistOrdersMutation();

  useEffect(() => {
    window.addEventListener("beforeunload", clearSessionStorage);
    return () => {
      window.removeEventListener("beforeunload", clearSessionStorage);
    };
  }, []);

  const clearSessionStorage = () => {
    sessionStorage.removeItem("clientOrdersCache");
    sessionStorage.removeItem("artistOrdersCache");
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const cacheKey = isClient ? "clientOrdersCache" : "artistOrdersCache";
      const cache = JSON.parse(sessionStorage.getItem(cacheKey));
      const now = new Date().getTime();

      if (cache && now - cache.timestamp < 300000) {
        console.log("cache orders");
        // Use cached data if it's less than 5 minutes old
        const reversedOrders = cache.data.slice().reverse();
        setOrders(reversedOrders);
        setIsLoading(false);
      } else {
        try {
          const response = isClient
            ? await clientOrders().unwrap()
            : await artistOrders().unwrap();

          console.log("request orders");
          // Reverse the order of the orders array
          if (response.orders.length !== 0) {
            const reversedOrders = response.orders.slice().reverse();
            setOrders(reversedOrders);
            sessionStorage.setItem(
              cacheKey,
              JSON.stringify({ data: response.orders, timestamp: now })
            );
          } else {
            setOrders([]);
          }
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchOrders();
  }, [isClient, clientOrders, artistOrders]);

  // Get current posts
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="orders-container">
      {isLoading ? (
        <>
          <table>
            <thead>
              <tr>
                <th style={{ width: "150px", borderTopLeftRadius: "8px" }}>
                  Order ID
                </th>
                <th style={{ width: "120px" }}>Artist</th>
                {isClient && <th style={{ width: "210px" }}>Description</th>}
                {isArtist && <th style={{ width: "320px" }}>Description</th>}
                {isClient && (
                  <th th style={{ width: "115px" }}>
                    Price
                  </th>
                )}
                <th style={{ width: "180px" }}>Order Date</th>
                <th style={{ width: "200px" }}>Order Type</th>
                <th style={{ width: "120px", borderTopRightRadius: "8px" }}>
                  Status
                </th>
              </tr>
            </thead>
          </table>
          {Array.from({ length: ordersPerPage }).map((_, index) => (
            <OrderSkeleton key={index} />
          ))}
        </>
      ) : orders.length > 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Artist</th>
                <th>Description</th>
                {isClient && <th>Price</th>}
                <th>Order Date</th>
                <th>Order Type</th>
                <th>Status</th>
              </tr>
            </thead>
            {isClient && <OrdersList items={currentOrders} />}
            {isArtist && <OrdersListArtist items={currentOrders} />}
          </table>
          <Pagination
            ordersPerPage={ordersPerPage}
            totalOrders={orders.length}
            paginate={paginate}
            currentPage={currentPage} // This ensures the active page is highlighted
          />
        </>
      ) : (
        <div className="noOrdersContainer">
          <h1>There are no orders yet!</h1>
        </div>
      )}
    </div>
  );
};

const Pagination = ({ ordersPerPage, totalOrders, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalOrders / ordersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a
              onClick={() => paginate(number)}
              className={`page-link ${currentPage === number ? "active" : ""}`}
              // Inline style for demonstration; usually better to use CSS classes
              style={
                currentPage === number
                  ? { backgroundColor: "#7E3FFF", color: "white" }
                  : null
              }
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Orders;
