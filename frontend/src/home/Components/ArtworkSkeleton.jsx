import React from "react";
import "./ArtworkSkeleton.css";
// import AdemImage from "../../assets/images/Adem.jpg";

const ArtworkSkeleton = () => {
  return (
    <div className="product-card skeleton">
      <div className="skeleton-rect"></div>
      <div className="skeleton-text skeleton-text-large"></div>
      <div className="skeleton-text skeleton-text-small"></div>
      <div className="skeleton-button"></div>
      <div className="skeleton-icons">
        <div className="icon-placeholder"></div>
        <div className="icon-placeholder"></div>
        <div className="icon-placeholder"></div>
      </div>
    </div>
  );
};

export default ArtworkSkeleton;
