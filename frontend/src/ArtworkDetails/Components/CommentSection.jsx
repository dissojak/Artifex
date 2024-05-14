import React, { useState, useEffect, useRef } from "react";
import "./CommentSection.css";
import DefaultImg from "../../assets/images/default_profile_img.jpg";
import { useSelector } from "react-redux";
import { useAddCommentMutation, useDeleteCommentMutation } from "../../slices/reviewSlice";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const CommentSection = (props) => {
  const [visibleMenuIndex, setVisibleMenuIndex] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [userHasCommented, setUserHasCommented] = useState(false);
  const [editingText, setEditingText] = useState("");
  const menuRef = useRef();

  const { userInfo } = useSelector((state) => state.auth);
  const { reviews } = props.reviews;
  const artwork = props.artwork;
  const artist = props.artwork.id_artist;

  const toggleMenu = (index) => {
    setVisibleMenuIndex(visibleMenuIndex === index ? null : index);
  };

  const handleEditClick = (review) => {
    setEditingCommentId(review._id);
    setEditingText(review.comment);
    setVisibleMenuIndex(null);
  };

  const handleCommentChange = (event) => {
    setEditingText(event.target.value);
  };

  const [editComment] = useAddCommentMutation();
  const handleSave = async () => {
    try {
      toast.loading("Saving your comment...");
      const res = await editComment({
        artistId: artist._id,
        artworkId: artwork._id,
        comment: editingText,
      }).unwrap();
      toast.success("Your Comment was edited successfully");
      setTimeout(() => {
        window.location.reload(); // Reload the page after a delay
      }, 1000);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
    setEditingCommentId(null);
  };

  const [deleteComment]=useDeleteCommentMutation();

  const deleteHandler = async () => {
    try {
      toast.loading("Deleting your comment...");
      const res = await deleteComment({
        artistId: artist._id,
        artworkId: artwork._id,
      }).unwrap();
      toast.success("Your Comment was Deleted successfully");
      setTimeout(() => {
        window.location.reload(); // Reload the page after a delay
      }, 1000);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

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

  useEffect(() => {
    const userCommentExists = reviews.some(
      (review) =>
        review.clientId._id === userInfo._id && review.comment.trim() !== ""
    );
    setUserHasCommented(userCommentExists);
  }, [reviews, userInfo]);

  // Filter and sort reviews
  const validReviews = reviews.filter((review) => review.comment.trim() !== "");
  validReviews.sort((a, b) => {
    if (a.clientId._id === userInfo._id) return -1;
    if (b.clientId._id === userInfo._id) return 1;
    return 0;
  });

  return (
    <>
      <h1 style={{ color: "#9866FF", fontSize: "2.8rem", marginTop: "8vh" }}>
        COMMENTS :
      </h1>
      <div className="comments-section">
        {!userHasCommented && (
          <div className="comment-input-container">
            <img
              src={userInfo.image || DefaultImg}
              alt="User Avatar"
              className="user-avatar"
            />
            <input
              type="text-comment"
              placeholder={`Comment As ${userInfo.username || "Anonymous"}`}
              className="comment-input"
              onChange={handleCommentChange}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSave();
                  event.preventDefault();
                }
              }}
            />
          </div>
        )}
        {validReviews.map((review) => (
          <div key={review._id} className="comment">
            <img
              src={review.clientId.profileImage || DefaultImg}
              alt={review.clientId.username}
              className="avatar"
            />
            <div className="comment-content">
              <div className="comment-header">
                <h2>{review.clientId.username}</h2>
                <button
                  onClick={() => toggleMenu(review._id)}
                  className="menu-button"
                >
                  ⋮
                </button>
                {visibleMenuIndex === review._id && (
                  <ul className="comment-menu" ref={menuRef}>
                    {review.clientId._id === userInfo._id ? (
                      <>
                        <li onClick={() => handleEditClick(review)}>Edit</li>
                        <li onClick={deleteHandler}>
                          Delete
                        </li>
                      </>
                    ) : (
                      <>
                        <li>Spam</li>
                        <li>Nudity/Pornography</li>
                        <li>Hate Speech/Discrimination</li>
                        <li>Harassment/Bullying</li>
                        <li>Violence/Gore</li>
                      </>
                    )}
                  </ul>
                )}
              </div>
              {editingCommentId === review._id ? (
                <input
                  type="text"
                  value={editingText}
                  onChange={handleCommentChange}
                  onBlur={handleSave}
                  className="comment-input"
                  autoFocus
                />
              ) : (
                <p>{review.comment}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CommentSection;
