import React, { useEffect, useState } from "react";

import RegisterHackatonsList from "../Components/RegisterHackatonsList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
// import SBLoader from "../../shared/components/UI/LoadingUI/SBLoader";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttp } from "../../shared/hooks/http-hook";
import "./RegisterHackatons.css";
// import ImageUpload from "../../shared/components/FormElements/ImageUpload";

const RegisterHackatons = () => {
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const [hackatons, setHackatons] = useState();

  useEffect(() => {
    const req = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:8000/api/hackaton/getHackatons"
        );
        setHackatons(responseData.hackatons);
      } catch (e) {}
    };
    req();
  }, [sendRequest]);

  const deletPlaceHandler = (Hid) => {
    setHackatons((prevHackatons) =>
      prevHackatons.filter((hackaton) => hackaton.id !== Hid)
    );
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <div style={{color:"white"}}>aa</div>
      <div className="article_index">
        <div id="sahara">sahara</div>
        <h1 className="title_index">Going Hackatons</h1>
      </div>
      {isLoading && (
        <div className="center_spinner">
          {/* <SBLoader className="Overlay"/> */}
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && hackatons && (
        <>
        {(hackatons.length===0) && (
          <h1>no hackatons</h1>
        )}
        <RegisterHackatonsList
          items={hackatons}
          onDeletePlace={deletPlaceHandler}
        />
        </>
      )}
    </>
  );
};

export default RegisterHackatons;
