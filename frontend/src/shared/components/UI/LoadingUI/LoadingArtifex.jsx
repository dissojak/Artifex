import React from "react";
import loading from "../../../../assets/images/loadpurple.gif";


const LoadingArtifex = () => {
  return (
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
  );
};

export default LoadingArtifex;
