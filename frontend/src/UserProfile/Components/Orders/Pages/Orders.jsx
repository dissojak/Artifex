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

const Orders = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);

  const { userInfo } = useSelector(state => state.auth);
  const isClient = userInfo.userType === "client";
  const isArtist = userInfo.userType === "artist";

  const [clientOrders] = useGetClientOrdersMutation();
  const [artistOrders] = useGetArtistOrdersMutation();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = isClient ? await clientOrders().unwrap() : await artistOrders().unwrap();
        setOrders(response.orders);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, [isClient, clientOrders, artistOrders]);

  // Get current posts
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="orders-container">
      {isLoading ? (
        <div className="center_spinner">
          <img src={loading} alt="Loading..." />
        </div>
      ) : orders.length > 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Artist</th>
                <th>Description</th>
                  {isClient && (<th>Price</th>)}
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
            currentPage={currentPage}  // This ensures the active page is highlighted
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
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)}
              
               className={`page-link ${currentPage === number ? 'active' : ''}`}
               // Inline style for demonstration; usually better to use CSS classes
               style={currentPage === number ? { backgroundColor: '#7E3FFF', color: 'white' } : null}
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
