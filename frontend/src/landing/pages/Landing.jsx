import React, { useEffect, useState } from "react";
import "./Landing.css";
import Nav from "./Nav.jsx";
import Slider from "../components/slider.jsx";
import Slider2 from "../components/slider2.jsx";
import Banner from "../components/Banners.jsx";
import ImageStars from "../components/imagestars.jsx";
import ImageStars2 from "../components/imagestars2.jsx";
import ImageStars3 from "../components/imagestars3.jsx";
import Collection from "../components/CollectionBanner.jsx";
import ViewMore from "../components/ViewMore.jsx";
import Faqs from "../components/Faqs.jsx";
import ContactUsSection from "../components/ContactUsSection.jsx";
import ServicesSection from "../components/ServicesSection.jsx";
import TeamBehind from "../components/TeamBehind.jsx";
import DiscoverBanner from "../components/DiscoverBanner.jsx";
import Sponsors from "../components/Sponsors.jsx";
import Footer from "../../shared/components/UIElements/Footer.jsx";
import ArtsHomeList from "../../home/Components/ArtsLandingList.jsx";
import Art from "../../assets/images/image_artwork.png";
import { useGetArtworksMutation } from "../../slices/artworksSlice.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ArtworkSkeleton from "../../home/Components/ArtworkSkeleton.jsx";
const Landing = () => {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/login");
  };
  const [artworks, setArtworks] = useState([]);
  const [getArtworks, { isLoading }] = useGetArtworksMutation();
  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const responseData = await getArtworks().unwrap();
        console.log(responseData.artworks);
        setArtworks(responseData.artworks);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };
    fetchArtworks();
  }, []);

  return (
    <div className="landing-container">
      <Nav />
      <Slider />
      <Slider2 />
      <Banner />
      <ImageStars />
      <ImageStars2 />
      <ImageStars3 />
      <Collection />
      <div onClick={handleRedirect}>
        {isLoading && (
          // <div className="center_spinner">
          //   {/* <LoadingSpinner /> */}
          //   <img src="./elements/11a.gif" alt="" />
          // </div>
          <div className="art-skeleton-container">
            {Array.from({ length: 8 }, (_, index) => (
              <ArtworkSkeleton key={index} />
            ))}
          </div>
        )}
        {!isLoading && artworks && (
          <ArtsHomeList items={artworks} numberOfItems={8} />
        )}
      </div>
      <br />
      <ViewMore />
      <br />
      <Faqs />
      <ContactUsSection />
      <ServicesSection />
      <TeamBehind />
      <DiscoverBanner />
      <Sponsors />
      <Footer />
    </div>
  );
};

export default Landing;
