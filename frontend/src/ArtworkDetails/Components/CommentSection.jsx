import React, { useState, useEffect, useRef } from "react";
import "./CommentSection.css";
import DefaultImg from "../../assets/images/default_profile_img.jpg";
import { useSelector } from "react-redux";
import {
  useAddCommentMutation,
  useDeleteCommentMutation,
} from "../../slices/reviewSlice";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const CommentSection = (props) => {
  const [visibleMenuIndex, setVisibleMenuIndex] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [userHasCommented, setUserHasCommented] = useState(false);
  const [editingText, setEditingText] = useState("");
  const [defaultComment, setDefaultComment] = useState("");
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
    setDefaultComment(review.comment);
    setVisibleMenuIndex(null);
  };

  const handleCommentChange = (event) => {
    setEditingText(event.target.value);
  };

  const [editComment] = useAddCommentMutation();
  const handleSave = async () => {
    if (editingText.trim() === "") {
      setEditingText("");
      return;
    }
    if (editingText===defaultComment){
      setEditingCommentId(null);
      return;
    }
    const toastId = toast.loading("Saving your comment...");
    try {
      const res = await editComment({
        artistId: artist._id,
        artworkId: artwork._id,
        comment: editingText,
      }).unwrap();
      props.onAddition(userInfo._id,editingText);
      toast.update(toastId, {
        render: "Your Comment was edited successfully",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      // setTimeout(() => {
      //   window.location.reload(); // Reload the page after a delay
      // }, 1000);
    } catch (err) {
      toast.update(toastId, {
        render: err?.data?.message || err.error,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
    setEditingCommentId(null);
  };

  const [deleteComment] = useDeleteCommentMutation();

  const deleteHandler = async () => {
    const toastId = toast.loading("Deleting your comment...");
    try {
      const res = await deleteComment({
        artistId: artist._id,
        artworkId: artwork._id,
      }).unwrap();
      props.onDelete(userInfo._id);
      toast.update(toastId, {
        render: "Your Comment was Deleted successfully",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      // setTimeout(() => {
      //   window.location.reload(); // Reload the page after a delay
      // }, 1000);
    } catch (err) {
      toast.update(toastId, {
        render: err?.data?.message || err.error,
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
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
      {/* {validReviews!=0 && userInfo.userType === "artist" && ()} */}
      <div className="comments-section">
        {!userHasCommented && userInfo.userType === "client" && (
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
            <button className="commentSendButton" onClick={handleSave}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0"
                y="0"
                viewBox="0 0 404.644 404.644"
                xmlSpace="preserve"
              >
                <g>
                  <path
                    fill="#096ad9"
                    d="M5.535 386.177c-3.325 15.279 8.406 21.747 19.291 16.867l367.885-188.638h.037c4.388-2.475 6.936-6.935 6.936-12.08 0-5.148-2.548-9.611-6.936-12.085h-.037L24.826 1.6C13.941-3.281 2.21 3.189 5.535 18.469c.225 1.035 21.974 97.914 33.799 150.603l192.042 33.253-192.042 33.249C27.509 288.26 5.759 385.141 5.535 386.177z"
                    opacity="1"
                    dataoriginal="#096ad9"
                  ></path>
                </g>
              </svg>
            </button>
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
                        <li onClick={deleteHandler}>Delete</li>
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
                <div className="comment-input-container">
                  <input
                    autoFocus
                    type="text"
                    value={editingText}
                    className="comment-input"
                    onChange={handleCommentChange}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleSave();
                        event.preventDefault();
                      }
                    }}
                  />
                  <button className="commentSendButton" onClick={handleSave}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      x="0"
                      y="0"
                      viewBox="0 0 404.644 404.644"
                      xmlSpace="preserve"
                    >
                      <g>
                        <path
                          fill="#096ad9"
                          d="M5.535 386.177c-3.325 15.279 8.406 21.747 19.291 16.867l367.885-188.638h.037c4.388-2.475 6.936-6.935 6.936-12.08 0-5.148-2.548-9.611-6.936-12.085h-.037L24.826 1.6C13.941-3.281 2.21 3.189 5.535 18.469c.225 1.035 21.974 97.914 33.799 150.603l192.042 33.253-192.042 33.249C27.509 288.26 5.759 385.141 5.535 386.177z"
                          opacity="1"
                          dataoriginal="#096ad9"
                        ></path>
                      </g>
                    </svg>
                  </button>
                </div>
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
