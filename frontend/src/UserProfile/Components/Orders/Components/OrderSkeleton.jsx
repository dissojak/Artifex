import React from "react";
import "./OrderSkeleton.css";
import { useSelector } from "react-redux";
const OrderSkeleton = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const isArtist = userInfo.userType === "artist";
  const isClient = userInfo.userType === "client";
  return (
    <div className="table-skeleton">
      <div className="skeleton-row">
        <div className="skeleton-cell idSkeleton"></div>
        <div className="skeleton-cell artistSkeleton"></div>
        {/* <div className="skeleton-cell description"></div> */}
        {isClient && <div className="skeleton-cell descriptionSkeleton"></div>}
        {isArtist && <div className="skeleton-cell descriptionArtistSkeleton"></div>}
        {isClient && <div className="skeleton-cell priceSkeleton"></div>}
        <div className="skeleton-cell dateSkeleton"></div>
        <div className="skeleton-cell typeSkeleton"></div>
        <div className="skeleton-cell statusSkeleton"></div>
      </div>
    </div>
  );
};

export default OrderSkeleton;
