import React from 'react';
import './Footer.css';
import Logo from '../../assets/images/Logo_Artifex.svg';
import { Link } from 'react-router-dom';
import Facebook from '../../assets/images/facebook.svg';
import Instagram from '../../assets/images/instagram.svg';
import Twitter from '../../assets/images/tracé 2.svg';
import Youtube from '../../assets/images/youtube.svg';
import Location from '../../assets/images/location.png';
import Telephone from '../../assets/images/telephone.png';
import Mail from '../../assets/images/mail.png';
const Footer = () => {
  return (
    <div className="footer-container">
      <Link to="/" className="footer-logo">
        <img src={Logo} alt="Artifex Logo" />
      </Link>
      <div className="footer-info">
        <p><img src={Location} alt="location" />Address: Nabeul, Nabeul Center 8000 Tunisia</p>
        <p><img src={Telephone} alt="Telephone" /> Call Us: (+50) - 52-025-123</p>
        <p><img src={Mail} alt="Mail" /> Email: stoonproduction@gmail.com, tarekchebbi33@gmail.com</p>
      </div>
      <div className="footer-info">
      <div className="footer-section">
    <h3>Popular</h3>
    <ul>
      <li><Link to="/about">About Us</Link></li>
      <li><Link to="/artists">Artists</Link></li>
      <li><Link to="/faq">FAQ</Link></li>
      <li><Link to="/contact">Contact</Link></li>
      <li><Link to="/support">Support</Link></li>
    </ul>
  </div>
  </div>
      <div className="footer-info">
      <div className="footer-section">
    <h3>Corporate</h3>
    <ul>
      <li><Link to="/privacy">Privacy Policy</Link></li>
      <li><Link to="/delivery">Delivery Information</Link></li>
      <li><Link to="/terms">Terms & Conditions</Link></li>
      <li><Link to="/cookies">Cookies Settings</Link></li>
    </ul>
  </div>
      </div>
      <div className="footer-links">
        <h3>Follow Us</h3>
        <div className="social-links">
          <Link to="#">  <img src={Facebook} alt="Facebook" /></Link>
          <Link to="#">  <img src={Instagram} alt="Instagram" /></Link>
          <Link to="#">  <img src={Twitter} alt="FaceTwitterbook" /></Link>
          <Link to="#">  <img src={Youtube} alt="Youtube" /></Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
