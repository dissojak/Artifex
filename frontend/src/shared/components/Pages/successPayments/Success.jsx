import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useBuyArtworkMutation } from "../../../../slices/artworksSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import SuccessIcon from "../../../../assets/images/success.svg";
//import { Link } from "react-router-dom";
import './Success.css'; 
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
      <div id="Payment-success-section">
      <div className="payment-success-container-success">
      <div className="icon-success">
        <img src={SuccessIcon} alt='success' />
      </div>
      <h1>Payment Successful</h1>
      <p>Your Details Has Been Successfully Submitted. Check Your Collections To See Your Purchase. Thanks!</p>
    
      <button className="gocollection-button-success" >Check Your Collection</button>
      
    </div>
    </div> 
    )
  );
};

export default Success;
