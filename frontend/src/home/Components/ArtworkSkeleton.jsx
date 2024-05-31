import React from "react";
import "./ArtworkSkeleton.css";
// import AdemImage from "../../assets/images/Adem.jpg";

const ArtworkSkeleton = () => {
  return (
    <div class="product-card skeleton">
      <div class="skeleton-rect"></div>
      <div class="skeleton-text skeleton-text-large"></div>
      <div class="skeleton-text skeleton-text-small"></div>
      <div class="skeleton-button"></div>
      <div class="skeleton-icons">
        <div class="icon-placeholder"></div>
        <div class="icon-placeholder"></div>
        <div class="icon-placeholder"></div>
      </div>
    </div>
  );
};

export default ArtworkSkeleton;
