import React from "react";
import "./Landing.css";
import Nav from "./Nav.jsx";
import Slider from "./slider.jsx";
import Slider2 from "./slider2.jsx";
import Banner from "./Banners.jsx";
import ImageStars from "./imagestars.jsx";
import ImageStars2 from "./imagestars2.jsx";
import ImageStars3 from "./imagestars3.jsx";
import Collection from "./CollectionBanner.jsx";
import ViewMore from "./ViewMore.jsx";
import Faqs from "./Faqs.jsx";
import ContactUsSection from "./ContactUsSection.jsx";
import ServicesSection from "./ServicesSection.jsx";
import TeamBehind from "./TeamBehind.jsx";
import DiscoverBanner from "./DiscoverBanner.jsx";
import Footer from "./Footer.jsx";
import ArtsHomeList from "../../home/ArtsHomeList.jsx";
import Art from "../../assets/images/image_artwork.png";

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
      {!isLoading && Artworks && <ArtsHomeList items={Artworks} numberOfItems={8} />}
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
