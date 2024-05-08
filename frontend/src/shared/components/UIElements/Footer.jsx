import React from "react";
import "./Footer.css";
import Logo from "../../../assets/images/Logo_Artifex.svg";
import { Link } from "react-router-dom";
import Facebook from "../../../assets/images/Facebook.svg";
import Instagram from "../../../assets/images/Instagram.svg";
import Twitter from "../../../assets/images/Tracé 2.svg";
// import Youtube from "../../../assets/images/youtube.svg";
// import Location from "../../../assets/images/location.png";
// import Telephone from "../../../assets/images/telephone.png";
// import Mail from "../../../assets/images/mail.png";
const Footer = () => {
  return (
    <>
      <div className="footer-container">
        <footer>
          <div className="background">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              width="100%"
              height="100%"
              viewBox="0 0 1600 900"
            >
              <defs>
                <path
                  id="wave"
                  fill="rgba(105, 27, 252, 0.6)"
                  d="M-363.852,502.589c0,0,236.988-41.997,505.475,0
                s371.981,38.998,575.971,0s293.985-39.278,505.474,5.859s493.475,48.368,716.963-4.995v560.106H-363.852V502.589z"
                />
              </defs>
              <g>
                <use xlinkHref="#wave" opacity=".4">
                  <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="translate"
                    dur="8s"
                    calcMode="spline"
                    values="270 230; -334 180; 270 230"
                    keyTimes="0; .5; 1"
                    keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                    repeatCount="indefinite"
                  />
                </use>
                <use xlinkHref="#wave" opacity=".6">
                  <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="translate"
                    dur="6s"
                    calcMode="spline"
                    values="-270 230;243 220;-270 230"
                    keyTimes="0; .6; 1"
                    keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                    repeatCount="indefinite"
                  />
                </use>
                <use xlinkHref="#wave" opacity=".9">
                  <animateTransform
                    attributeName="transform"
                    attributeType="XML"
                    type="translate"
                    dur="4s"
                    calcMode="spline"
                    values="0 230;-140 200;0 230"
                    keyTimes="0; .4; 1"
                    keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                    repeatCount="indefinite"
                  />
                </use>
              </g>
            </svg>
          </div>
          <section>
            <ul className="socials">
              <li>
                <Link to="https://www.facebook.com/ArtifexMareketplace" target="_blank">
                  <img
                    src={Facebook}
                    style={{ width: "1em", height: "1em" }}
                    alt="facebook"
                  />
                </Link>
              </li>
              <li>
                <Link to="https://www.instagram.com/artifexMarketPlace" target="_blank">
                  <img
                    src={Instagram}
                    style={{ width: "1em", height: "1em" }}
                    alt="Instagram"
                  />
                </Link>
              </li>
              <li>
                <Link to="https://twitter.com/Artifex_MP" target="_blank">
                  <img
                    src={Twitter}
                    style={{ width: "1em", height: "1em" }}
                    alt="Twitter"
                  />
                </Link>
              </li>
            </ul>
            <ul className="links">
              <li>About Us</li>
              <li>Artists</li>
              <li>FAQ</li>
              <li>Contact</li>
              <li>Support</li>
            </ul>
            <p className="legal">© 2024 Artifex All rights reserved</p>
          </section>
        </footer>
      </div>
    </>
  );
};

export default Footer;
