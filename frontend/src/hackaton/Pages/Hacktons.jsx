import React, { useEffect, useState } from "react";

import ListHackatons from "../Components/ListHackatons";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
// import SBLoader from "../../shared/components/UI/LoadingUI/SBLoader";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttp } from "../../shared/hooks/http-hook";
import "./Hackaton.css";
// import ImageUpload from "../../shared/components/FormElements/ImageUpload";

const Hackatons = () => {
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

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <div className="article_index">
        <div id="sahara">sahara</div>
        <h1 className="title_index">Coming Hackatons</h1>
      </div>
      {isLoading && (
        <div className="center_spinner">
          {/* <SBLoader className="Overlay"/> */}
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && hackatons && <ListHackatons items={hackatons} />}
      
    </>
  );
};

export default Hackatons;
