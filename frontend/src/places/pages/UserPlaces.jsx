import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import PlaceList from "../components/PlaceList";
import { useHttp } from "../../shared/hooks/http-hook";

const UserPlaces = () => {
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const [places, setPlaces] = useState();

  const userId = useParams().userId;

  useEffect(() => {
    const req = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/places/user/" + userId
        );
        setPlaces(responseData.PLACES);
      } catch (e) {}
    };
    req();
  }, [sendRequest, userId]);

  const deletPlaceHandler = (Pid) => {
    setPlaces((prevPlaces) => prevPlaces.filter(place => place.id !== Pid));
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && places && (
        <PlaceList items={places} onDeletePlace={deletPlaceHandler} />
      )}
    </>
  );
};

export default UserPlaces;
