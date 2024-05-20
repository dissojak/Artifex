import React, { useEffect, useState } from "react";
import "./PinnedMuseums.css";
import { toast } from "react-toastify";
import PinnedMuseumsList from "./PinnedMuseumsList.jsx";
import { useGetPinnedMuseumsMutation } from "../../slices/museumsSlice.js";


const PinnedMuseums = () => {
  const [museums, setMuseums] = useState();
  const [getPinnedMuseums, { isLoading }] = useGetPinnedMuseumsMutation();
  
  useEffect(() => {
    const req = async () => {
      try {
        const responseData = await getPinnedMuseums().unwrap();
        // console.log("adem");
        const populatedMuseums = responseData.pinnedMuseums.map(item => item.museumId);
        // console.log(populatedMuseums);
        setMuseums(populatedMuseums);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };
    req();
  }, []);

  return (
    <>
 <div className="PinnedMuseums-container">
 {!isLoading && museums && <PinnedMuseumsList items={museums} />}
</div>
{/*the end */}
</>
  );
};

export default PinnedMuseums;