import React, { useState } from "react";
import "./OrderSection.css";
import { useMakeOrderMutation } from "../../slices/ordersSlice";
import { toast } from "react-toastify";

const OrderSection = (props) => {
  const [urgency, setUrgency] = useState("");
  const [details, setDetails] = useState("");
  const [artType, setArtType] = useState(""); // Added state for artType

  const [makeOrder] = useMakeOrderMutation();

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submit behavior
    const formData = {
      artistId: props.id,
      description: details,
      serviceType: urgency === "ASAP" ? "rapid" : "normal",
    };

    try {
      const res = await makeOrder(formData).unwrap();
      toast.success("Order placed successfully");
      sessionStorage.removeItem("clientOrdersCache");
      // Reset the form state after successful submission
      setUrgency("");
      setDetails("");
      setArtType("");
    } catch (err) {
      toast.error(err?.data?.message || err.error || "Error submitting order");
    }
  };

  return props.orderStatus ? (
    <form className="requestFormWrapper" onSubmit={handleSubmit}>
      <div className="requestForm">
        <div className="formSection left">
          <div className="testinprofile">
            <img
              src={props.image}
              alt="Adem Ben Amor"
              className="Artist-image-ArtImg"
            />
            <p>Let's get your request ready to send</p>
          </div>
          <label htmlFor="artType">
            What's the type of art you are looking for?
          </label>
          <div className="inputGroup">
            <input
              style={{ height: "70px", width: "543px" }}
              type="text"
              id="artType"
              value={artType}
              onChange={(e) => setArtType(e.target.value)}
              placeholder="e.g., Landing Page Design, Portrait Drawing"
            />
          </div>
          <label>How urgent is your request?</label>
          <div className="inputGroup">
            <div className="radioButtons">
              <input
                type="radio"
                id="asap"
                name="urgency"
                value="ASAP"
                checked={urgency === "ASAP"}
                onChange={(e) => setUrgency(e.target.value)}
              />
              <label htmlFor="asap">ASAP</label>
              <input
                type="radio"
                id="nextMonth"
                name="urgency"
                value="Within the next month"
                checked={urgency === "Within the next month"}
                onChange={(e) => setUrgency(e.target.value)}
              />
              <label htmlFor="nextMonth">Next month</label>
            </div>
          </div>
          <button className="buttontest" type="submit">
            Send Request
          </button>
        </div>
        <div className="formSection right">
          <label htmlFor="category">Pick Category:</label>
          <div
            className="inputGroup"
            style={{ height: "70px", width: "543px" }}
          >
            <select id="category" onChange={(e) => console.log(e.target.value)}>
              {" "}
              {/* Added onChange */}
              {props.categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <label htmlFor="details">Tell us more about the project:</label>
          <div className="inputGroup">
            <textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Looking to add another landing page to my current Webflow site..."
            ></textarea>
          </div>
        </div>
      </div>
    </form>
  ) : (
    <h1 className="no-artworks">This Artist do not accept Orders Yet !</h1>
  );
};

export default OrderSection;
