import React from 'react';
import { useLocation } from 'react-router-dom';
import MainNavigation from './MainNavigation.jsx';

const NavigationWrapper = ({ children }) => {
  const location = useLocation();
  const publicPaths = ["/login", "/signup","/addArtwork","/socialMedia","/"]; // Adjust based on your public paths
  const showMainNavigation = !publicPaths.includes(location.pathname);

  return (
    <>
      {showMainNavigation && <MainNavigation />}
      <main style={{ marginTop: 0 }}>{children}</main>
    </>
  );
};

export default NavigationWrapper;
