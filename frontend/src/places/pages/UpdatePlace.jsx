import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
// import Card from '../../shared/components/UIElements/Card';
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttp } from "../../shared/hooks/http-hook";
import "./PlaceForm.css";
import { useNavigate  } from "react-router-dom";

const UpdatePlace = () => {
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const [place, setPlace] = useState();
  const placeId = useParams().placeId;
  const history = useNavigate();
  const auth = useContext(AuthContext);

  // eslint-disable-next-line
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const req = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/places/" + placeId
        );
        setPlace(responseData.place);
      } catch (e) {}
    };
    req();
  }, [sendRequest, setFormData, placeId]);

  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        "http://localhost:5000/api/places/" + placeId,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          image: formState.inputs.image.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      history("/"+auth.userId+"/places");
    } catch (e) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && place && <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
          initialValue={place.title}
          initialValid={true}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (min. 5 characters)."
          onInput={inputHandler}
          initialValue={place.description}
          initialValid={true}
        />
        <Input
          id="image"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid image Url."
          onInput={inputHandler}
          initialValue={place.image}
          initialValid={true}
        />
        <Button type="submit" disabled={!formState.isValid}>
          UPDATE PLACE
        </Button>
      </form>}
    </>
  );
};

export default UpdatePlace;
