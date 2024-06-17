import React from "react";
import "../../shared/components/UIElements/ArtsItemCard.css";
import { useSelector } from "react-redux";
import "./ArtsItemMuseum.css"

const ArtsItemMuseum = ({ id, Image, title, price, selected, onSelect }) => {
  const { userInfo } = useSelector((state) => state.auth);

  const handleSelect = () => {
    onSelect(id);
  };

  return (
    <div className={`card_museum_artwork ${selected ? "selected" : ""}`} key={id} onClick={handleSelect}>
      <img src={Image} alt="" className="card-image" />
      <div className="card-body-Artwork">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{price} DT</p>
      </div>
      {selected && <div className="selected-overlay">Selected</div>}
    </div>
  );
};

export default ArtsItemMuseum;
