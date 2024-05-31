import React from "react";
import "./SkeletonLoader.css";

const ArtistSkeleton = () => {
  return (
    <div className="skeleton-card">
      <div>
        <div className="skeleton-info-container">
          <div className="skeleton-image"></div>
          <div className="skeleton-content">
            <div className="skeleton-text skeleton-title"></div>
            <div className="skeleton-text skeleton-subtitle"></div>
            <div className="skeleton-info-container withgap">
              <div className="skeleton-text skeleton-subtitle"></div>
              <div className="skeleton-text skeleton-subtitle"></div>
            </div>
            <div className="skeleton-text skeleton-followers"></div>
          </div>
        </div>
        <div className="skeleton-stats">
          <div className="skeleton-Follow"></div>
          <div className="skeleton-stat"></div>
          <div className="skeleton-stat"></div>
          <div className="skeleton-stat"></div>
          <div className="skeleton-stat"></div>
        </div>
      </div>
    </div>
  );
};

export default ArtistSkeleton;
