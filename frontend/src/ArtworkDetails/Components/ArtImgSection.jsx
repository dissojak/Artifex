import React, { useEffect } from "react";
import "./ArtImgSection.css";
import DefaultImg from "../../assets/images/default_profile_img.jpg";
import { useUpdateViewMutation } from "../../slices/reviewSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const ArtImgSection = (props) => {
  const artwork = props.artwork;
  const artist = props.artwork.id_artist;

  const [updateView] = useUpdateViewMutation();
  useEffect(() => {
    const req = async () => {
      try {
        const res = await updateView({
          artistId: artist._id,
          artworkId: artwork._id,
        }).unwrap();
        res.status &&
          toast.success("You Are Welcome ! This is Your First Time Here!");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };
    req();
  }, []);

  return (
    <div id="ArtImgSection">
      <div className="Artist-container-ArtImg">
        <img
          src={artist.profileImage || DefaultImg}
          alt="profile-img"
          className="Artist-image-ArtImg"
        />
        <Link to={`/artist/${artist.username}`} style={{ cursor: "pointer" }} className="text-decoration-link">
          <div className="Artist-info-ArtImg">
            <div className="Artist-name-ArtImg">{artist.username}</div>
            <div className="Artist-Type-ArtImg">Artist</div>
          </div>
        </Link>
      </div>
      <a
        href={artwork.imageArtwork}
        style={{ cursor: "pointer" }}
        target="_blank"
      >
        <img
          src={artwork.imageArtwork}
          alt="Placeholder"
          className="image-containertest"
        />
      </a>
    </div>
  );
};

export default ArtImgSection;
