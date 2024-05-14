import React from "react";
import "./PopupFollowers.css"; // Make sure your CSS is correctly linked
import Tarek from "../../assets/images/tarek.png";
import Unfollow from "../../assets/images/unfollow.svg";

const Followers = [
  { Image: Tarek, Artist: "Tarek Chebbi", Category: "Digital Art" },
  { Image: Tarek, Artist: "Tarek Chebbi", Category: "Digital Art" },
  { Image: Tarek, Artist: "Tarek Chebbi", Category: "Digital Art" },
  { Image: Tarek, Artist: "Tarek Chebbi", Category: "Digital Art" },
  { Image: Tarek, Artist: "Tarek Chebbi", Category: "Digital Art" },
  { Image: Tarek, Artist: "Tarek Chebbi", Category: "Digital Art" },
  { Image: Tarek, Artist: "Tarek Chebbi", Category: "Digital Art" },
  { Image: Tarek, Artist: "test", Category: "test" },
  
];

const PopupFollowers = ({ onClose }) => {
  return (
    <div className="modal-backdropflw">
      <div className="modal-contentflw">
        <div className="modal-headerflw">
          <p style={{ fontSize: '24px', fontFamily: 'Raleway-Bold',paddingLeft:'8.5vw' }}>Following</p>
          <img
            src="elements/X.svg"
            alt="Close"
            className="close-iconflw"
            onClick={onClose}
          />
        </div>
        <div className="followers-listflw">
          {Followers.map((Follower, index) => (
            <div key={index} className="follower-itemflw">
              <div className="follower-img-avatarflw">
                <img src={Follower.Image} alt="avatar" />
              </div>
              <div className="follower-infoflw">
                <span className="follower-nameflw">{Follower.Artist}</span>
                <span className="follower-titleflw">{Follower.Category}</span>
              </div>
              <span className="status-iconflw">
                <img src={Unfollow} alt="Unfollow icon" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopupFollowers;
