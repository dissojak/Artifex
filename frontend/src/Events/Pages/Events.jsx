import React, { useEffect, useState } from "react";
import "./Events.css";
import { useGetMuseumsByUserIdMutation } from "../../slices/museumsSlice";
import MuseumList from "../../MuseumPage/Components/Museums/Components/MuseumsList";
import MuseumMuseumSkeleton from "../../MuseumPage/Components/Museums/Components/MuseumSkeleton";

const Events = () => {
  const [museums, setMuseums] = useState();
  const [getMuseums, { isLoading }] = useGetMuseumsByUserIdMutation();
  useEffect(() => {
    const req = async () => {
      try {
        const responseData = await getMuseums();
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
      <div id="museum-section-events">
        <div className="museum-section2">
          <p style={{ color: "#5BD6FF", fontWeight: "bold" }}>Discover</p>
          <h1 style={{ fontWeight: "bold", fontSize: "40px" }}>Your Events</h1>
        </div>
        {isLoading ? (
          <div className="Museum-skeleton-container">
            {Array.from({ length: 4 }, (_, index) => (
              <MuseumMuseumSkeleton key={index} />
            ))}
          </div>
        ) : (
          <>{museums && <MuseumList items={museums} />}</>
        )}
      </div>
    </>
  );
};

export default Events;
