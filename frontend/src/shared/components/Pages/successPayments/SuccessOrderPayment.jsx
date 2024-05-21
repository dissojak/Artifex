import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { usePayOrderMutation } from '../../../../slices/ordersSlice';
import { toast } from 'react-toastify';
import SuccessIcon from "../../../../assets/images/success.svg";

const SuccessOrderPayment = () => {
  const [payOrder] = usePayOrderMutation();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState();

  useEffect(() => {
    const req = async () => {
      const orderId = localStorage.getItem("orderId");
      console.log('Retrieved orderId from localStorage:', orderId);
      try {
        const res = await payOrder({
          paymentId: searchParams.get("payment_id"),
          orderId,
        }).unwrap();
        console.log(res);
        setStatus(res.success);
        toast.success(`Your Order with ID = ${res.order.orderId} is now under preparation`);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };
    req();
  }, [payOrder, searchParams]);

  return (
    status && (
      <div id="Payment-success-section">
        <div className="payment-success-container-success">
          <div className="icon-success">
            <img src={SuccessIcon} alt='success' />
          </div>
          <h1>Payment Successful</h1>
          <p>Your Details Has Been Successfully Submitted. Keep trusting and supporting our artists. Thanks!</p>
          <Link to="/profile">
            <button className="gocollection-button-success">Check Your Orders List</button>
          </Link>
        </div>
      </div> 
    )
  );
}

export default SuccessOrderPayment;
