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
import Footer from "../../shared/components/UIElements/Footer.jsx";
import ArtsHomeList from "../../home/Components/ArtsLandingList.jsx";
import Art from "../../assets/images/image_artwork.png";
import { useGetArtworksMutation } from "../../slices/artworksSlice.js";
import { toast } from "react-toastify";

const Artworks = [
  {
    id: 1,
    Image: Art,
    Artist: "Tarek Chebbi",
    Likes: "77",
    Views: "10.7",
    title: "stars",
    price: "12",
  },
  {
    id: 2,
    Image: Art,
    Artist: "Tarek Chebbi",
    Likes: "77",
    Views: "10.7",
    title: "stars",
    price: "12",
  },
  {
    id: 3,
    Image: Art,
    Artist: "Tarek Chebbi",
    Likes: "77",
    Views: "10.7",
    title: "stars",
    price: "12",
  },
  {
    id: 4,
    Image: Art,
    Artist: "Tarek Chebbi",
    Likes: "77",
    Views: "10.7",
    title: "stars",
    price: "12",
  },
  {
    id: 5,
    Image: Art,
    Artist: "Tarek Chebbi",
    Likes: "77",
    Views: "10.7",
    title: "stars",
    price: "12",
  },
  {
    id: 6,
    Image: Art,
    Artist: "Tarek Chebbi",
    Likes: "77",
    Views: "10.7",
    title: "stars",
    price: "12",
  },
  {
    id: 7,
    Image: Art,
    Artist: "Tarek Chebbi",
    Likes: "77",
    Views: "10.7",
    title: "stars",
    price: "12",
  },
  {
    id: 8,
    Image: Art,
    Artist: "Tarek Chebbi",
    Likes: "77",
    Views: "10.7",
    title: "stars",
    price: "12",
  },
  {
    id: 9,
    Image: Art,
    Artist: "Tarek Chebbi",
    Likes: "77",
    Views: "10.7",
    title: "stars",
    price: "12",
  },
  {
    id: 10,
    Image: Art,
    Artist: "Tarek Chebbi",
    Likes: "77",
    Views: "10.7",
    title: "stars",
    price: "12",
  },
];
const isLoading = false;

const Landing = () => {
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
      {isLoading && (
        <div className="center_spinner">
          {/* <LoadingSpinner /> */}
          <img src="./elements/11a.gif" alt="" />
        </div>
      )}
      {!isLoading && Artworks && <ArtsHomeList items={artworks} numberOfItems={8} />}
      <br />
      <ViewMore />
      <br />
      <Faqs />
      <ContactUsSection />
      <ServicesSection />
      <TeamBehind />
      <DiscoverBanner />
      <Footer />
    </div>
  );
};

export default Landing;
