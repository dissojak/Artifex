import React, { useEffect, useState } from "react";
import "./Museums.css";
import MuseumImage from "../../../../assets/images/BIG.svg"; // Update path accordingly
import TraceImage from "../../../../assets/images/Tracé 10.svg"; // Update path accordingly
import EventPassImage from "../../../../assets/images/event_pass.svg"; // Update path accordingly
import ProfileImage from "../../../../assets/images/Adem.jpg";

import { useGetClientMuseumsMutation } from "../../../../slices/museumsSlice";
import MuseumList from "../Components/MuseumsList";

const Museums = () => {
  const [museums, setMuseums] = useState();
  const [getMuseums, { isLoading }] = useGetClientMuseumsMutation();
  useEffect(() => {
    const req = async () => {
      try {
        const responseData = await getMuseums();
        console.log("adem");
        console.log(responseData);
        setMuseums(responseData.data.museums);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };
    req();
  }, []);
  return (
    <>
      <div id="museum-section">
        <div className="museum-section2">
          <p style={{ color: "#5BD6FF", fontWeight: "bold" }}>Discover</p>
          <h1 style={{ fontWeight: "bold", fontSize: "40px" }}>
            Check Out Our Museums
          </h1>
          <p>Get to know the special pieces from our artists in Artifex.</p>
        </div>
        {/* call component here  */}
        {!isLoading && museums && <MuseumList items={museums} />}
      </div>
    </>
  );
};

export default Museums;
