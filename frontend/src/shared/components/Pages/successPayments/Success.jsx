import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useBuyArtworkMutation } from "../../../../slices/artworksSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Success = () => {
  const [buyArtwork] = useBuyArtworkMutation();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const req = async () => {
      const artworkId = localStorage.getItem("artworkId");
      try {
        const res = await buyArtwork({
          userId:userInfo._id,
          paymentId: searchParams.get("payment_id"),
          artworkId,
        }).unwrap();
        setStatus(res.success);
        localStorage.removeItem("artworkId");
        toast.success(`Congrats you are now the owner of ${res.artwork.title}`);
      } catch (err) {
        localStorage.removeItem("artworkId");
        setStatus(res.success);
        toast.error(err?.data?.message || err.error);
      }
    };
    req();
  }, []);
  return (
    status && (
      <div>
        <h1>Success</h1>
      </div>
    )
  );
};

export default Success;
