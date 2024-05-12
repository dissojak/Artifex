import React, { useRef, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import './MenuDropdown.css';  // Ensure the CSS file is named appropriately
import avatar from '../../../assets/images/tarek.png';  // Ensure paths are correct
import userIcon from '../../../assets/images/usertest.png';
import editIcon from '../../../assets/images/edit.png';
import settingsIcon from '../../../assets/images/settings.png';
import questionIcon from '../../../assets/images/question.png';
import logoutIcon from '../../../assets/images/log-out.png';
import drop from '../../../assets/images/drop.svg';
import { AuthContext } from "../../../shared/context/auth-context";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../../slices/usersApiSlice';
import { logout } from '../../../slices/authSlice';

function MenuDropdown() {
    const [isActive, setIsActive] = useState(false);

    const menuToggle = () => {
        setIsActive(!isActive);
    };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

    return (
        <div className="actionss">
        <div className="profile" onClick={menuToggle}>
            <img src={avatar} alt="Profile" />
           
        </div>
        <img src={drop} style={{width:'13px',height:'13px',position:'relative',left:'48px',bottom:'20px'}} alt="drop" />
        <div className={isActive ? "menu active" : "menu"}>
            <h3 style={{textAlign:'center',fontFamily:'Raleway-Bold'}}>Tarek Chebbi</h3>
            <div className="menu-item">
                <img src={userIcon} alt="My Profile" /><Link to="/profile">My profile</Link>
            </div>
            <div className="menu-item">
                <img src={editIcon} alt="Edit Profile" /><a href="#">Edit profile</a>
            </div>
            <div className="menu-item">
                <img src={settingsIcon} alt="Settings" /><a href="#">Setting</a>
            </div>
            <div className="menu-item">
                <img src={questionIcon} alt="Help" /><a href="#">Help</a>
            </div>
            <div className="menu-item">
                <img src={logoutIcon} alt="Logout" /><a  onClick={logoutHandler}>Logout</a>
            </div>
        </div>
    </div>
    );
}

export default MenuDropdown;
