import React, { useEffect } from "react";
import "./ArtImgSection.css";
import DefaultImg from "../../assets/images/default_profile_img.jpg";
import { useUpdateViewMutation } from "../../slices/reviewSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const ArtImgSection = (props) => {
  const artwork = props.artwork;
  const artist = props.artwork.id_artist;
  const { userInfo } = useSelector((state) => state.auth);

  const [updateView] = useUpdateViewMutation();
  useEffect(() => {
    const req = async () => {
      try {
        const res = await updateView({
          artistId: artist._id,
          artworkId: artwork._id,
        }).unwrap();
        if (res.status) {
          toast.success("You Are Welcome ! This is Your First Time Here!");
          props.onAddtionReview(res.review);
        }
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };
    req();
  }, []);

  const updateImageUrl = (imageUrl) => {
    const oldBaseUrl = "http://res.cloudinary.com/duvougrqx/image/upload/";
    const newBaseUrl =
      "http://res.cloudinary.com/duvougrqx/image/upload/l_logo_artifex,e_colorize,co_white,o_50/";

    // console.log("here the image ",imageUrl);
    // console.log(imageUrl.startsWith(oldBaseUrl));
    if (imageUrl.startsWith(oldBaseUrl)) {
      return imageUrl.replace(oldBaseUrl, newBaseUrl);
    } else {
      return imageUrl; // Return the original URL if it doesn't start with the old base URL
    }
  };

  return (
    <div id="ArtImgSection">
      <div className="Artist-container-ArtImg">
        <img
          src={artist.profileImage || DefaultImg}
          alt="profile-img"
          className="Artist-image-ArtImg"
        />
        <Link
          to={`/artist/${artist.username}`}
          style={{ cursor: "pointer" }}
          className="text-decoration-link"
        >
          <div className="Artist-info-ArtImg">
            <div className="Artist-name-ArtImg">{artist.username}</div>
            <div className="Artist-Type-ArtImg">Artist</div>
          </div>
        </Link>
      </div>
      <a
        href={
          (userInfo._id === artwork.Buyer && artwork.imageArtwork) ||
          updateImageUrl(artwork.imageArtwork)
        }
        style={{ cursor: "pointer" }}
        target="_blank"
      >
        <img
          src={
            (userInfo._id === artwork.Buyer && artwork.imageArtwork) ||
            updateImageUrl(artwork.imageArtwork)
          }
          alt="Placeholder"
          className="image-containertest"
        />
      </a>
    </div>
  );
};

export default ArtImgSection;
