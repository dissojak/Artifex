import React from "react";
import "./SkeletonLoader.css";

const ArtistSkeleton = () => {
  return (
    <div class="skeleton-card">
      <div>
        <div className="skeleton-info-container">
          <div class="skeleton-image"></div>
          <div class="skeleton-content">
            <div class="skeleton-text skeleton-title"></div>
            <div class="skeleton-text skeleton-subtitle"></div>
            <div className="skeleton-info-container withgap">
              <div class="skeleton-text skeleton-subtitle"></div>
              <div class="skeleton-text skeleton-subtitle"></div>
            </div>
            <div class="skeleton-text skeleton-followers"></div>
          </div>
        </div>
        <div class="skeleton-stats">
          <div class="skeleton-Follow"></div>
          <div class="skeleton-stat"></div>
          <div class="skeleton-stat"></div>
          <div class="skeleton-stat"></div>
          <div class="skeleton-stat"></div>
        </div>
      </div>
    </div>
  );
};

export default ArtistSkeleton;
