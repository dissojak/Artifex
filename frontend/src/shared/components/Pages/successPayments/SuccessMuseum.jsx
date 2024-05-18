import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams, Link } from "react-router-dom";
import {
  useBuyArtistPassMutation,
  useBuyClientPassMutation,
} from "../../../../slices/museumsSlice";
import SuccessIcon from "../../../../assets/images/success.svg";
import { toast } from "react-toastify";
import './Success.css'; 


const SuccessPaymentMuseum = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const isArtist = userInfo.userType === "artist";
  const isClient = userInfo.userType === "client";

  const [buyArtistPass] = useBuyArtistPassMutation();
  const [buyClientPass] = useBuyClientPassMutation();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState();

  useEffect(() => {
    const req = async () => {
      const museumId = localStorage.getItem("museumId");
      if (isArtist) {
        try {
          const res = await buyArtistPass({
            artistId: userInfo._id,
            paymentId: searchParams.get("payment_id"),
            museumId,
          }).unwrap();
          setStatus(res.success);
          localStorage.removeItem("museumId");
          toast.success(`Congrats you can now join ${res.museum.title}`);
        } catch (err) {
          localStorage.removeItem("museumId");
          toast.error(err?.data?.message || err.error);
        }
      }
      if (isClient) {
        try {
          const res = await buyClientPass({
            artistId: userInfo._id,
            paymentId: searchParams.get("payment_id"),
            museumId,
          }).unwrap();
          setStatus(res.success);
          localStorage.removeItem("museumId");
          toast.success(`Congrats you can now join ${res.museum.title}`);
        } catch (err) {
          localStorage.removeItem("museumId");
          setStatus(res.success);
          toast.error(err?.data?.message || err.error);
        }
      }
    };
    req();
  }, []);
  return (
    status && (
      <div id="Payment-success-section">
        <div className="payment-success-container-success">
          <div className="icon-success">
            <img src={SuccessIcon} alt="success" />
          </div>
          <h1>Payment Successful</h1>
          <p>
            Your Details Has Been Successfully Submitted. Check Your Events To
            See Your Museums. Thanks!
          </p>
          <Link to="/events">
            <button className="gocollection-button-success">
              Check Your Events
            </button>
          </Link>
        </div>
      </div>
    )
  );
};

export default SuccessPaymentMuseum;
