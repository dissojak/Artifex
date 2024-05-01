import React from "react";
import './Landing.css';
import Nav from './Nav.jsx';
import Slider from './slider.jsx';
import Slider2 from './slider2.jsx';
import Banner from './Banners.jsx';
import ImageStars from './imagestars.jsx';
import ImageStars2 from './imagestars2.jsx';
import ImageStars3 from './imagestars3.jsx';
import Collection from './CollectionBanner.jsx';
import ViewMore from './ViewMore.jsx';
import Faqs from './Faqs.jsx';
import ContactUsSection from './ContactUsSection.jsx';
import ServicesSection from './ServicesSection.jsx';
import TeamBehind from './TeamBehind.jsx';
import DiscoverBanner from './DiscoverBanner.jsx';
import Footer from './Footer.jsx';
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
