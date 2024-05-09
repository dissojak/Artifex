import React, { useState, useEffect, useRef } from "react";
import "./CommentSection.css";
import Adem from "../../assets/images/Adem.jpg";
const comments = [
  {
    name: "Hazem Ben Saria",
    comment:
      "Embark on a journey to unlock your creative potential and immerse yourself in a world of artistic excellence with Artifex Museums. Join us in celebrating the transformative power of creativity and the inherent beauty found within unique expressions.",
    avatar: Adem,
  },
  {
    name: "Aziz Drachnowa",
    comment:
      "Artifex Museums: Premier destination for art lovers. Exclusive collections celebrate diversity. Explore one-of-a-kind pieces, unlock creativity, and immerse in artistic excellence.",
    avatar: Adem,
  },
  {
    name: "Fathi Lasmer",
    comment:
      "Embark on a journey to unlock your creative potential and immerse yourself in a world of artistic excellence with Artifex Museums. Join us in celebrating the transformative power of creativity and the inherent beauty found within unique expressions.",
    avatar: Adem,
  },
];
const CommentSection = () => {
  const [visibleMenuIndex, setVisibleMenuIndex] = useState(null);
  const menuRef = useRef();

  const toggleMenu = (index) => {
    setVisibleMenuIndex(visibleMenuIndex === index ? null : index);
  };

  // Click outside to close menu
  useEffect(() => {
    const clickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setVisibleMenuIndex(null);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, []);
  return (
    <>
      <h1 style={{ paddingLeft: "60px", color: "#7e3fff" }}>COMMENTS :</h1>
        <div className="comments-section">
            <div className="comment-input-container">
            <img src={Adem} alt="Samir Lousif" className="user-avatar" />
            <input
                type="text"
                placeholder="Comment As Samir Lousif"
                className="comment-input"
            />
            </div>
            {comments.map((comment, index) => (
                <div key={index} className="comment">
                    <img src={comment.avatar} alt={comment.name} className="avatar" />
                    <div className="comment-content">
                            <div className="comment-header">
                                <h4>{comment.name}</h4>
                                <button
                                onClick={() => toggleMenu(index)}
                                className="menu-button"
                                >
                                ⋮
                                </button>
                                    {visibleMenuIndex === index && (
                                        <ul className="comment-menu" ref={menuRef}>
                                        <li>Spam</li>
                                        <li>Nudity/Pornography</li>
                                        <li>Hate Speech/Discrimination</li>
                                        <li>Harassment/Bullying</li>
                                        <li>Violence/Gore</li>
                                        </ul>
                                    )}
                            </div>
                        <p>{comment.comment}</p>
                    </div>
                </div>
            ))}
        </div>
    </>
  );
};

export default CommentSection;
