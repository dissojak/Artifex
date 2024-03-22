import React from "react";
import "./Loading.css";
import EventsNavigation from "../Nav-barres/EventsNav";

const Loading = () => {
  return (
    <>
    <EventsNavigation/>
    <div className="flex items-center justify-center h-screen -mt-24 ">
    <div className="my-Indicator">
      <div className="my-Points"></div>
      <div className="my-Points"></div>
      <div className="my-Points"></div>
      <div className="my-Shadow"></div>
      <div className="my-Shadow"></div>
      <div className="my-Shadow"></div>
    </div>
    </div>
    </>
  );
};

export default Loading;
