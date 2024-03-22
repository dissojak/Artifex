import React, { useContext } from "react";

import HackatonRegistredItem from "./HackatonRegistredItem";
import Card from "../../shared/components/UIElements/Card";
import "./RegisterList.css";

import { AuthContext } from "../../shared/context/auth-context";

const RegisterHackatonsList = (props) => {
  const auth = useContext(AuthContext);

  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No Hackatons found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <div id="hackatons_index">
      {props.items.map(
        (hackaton) =>
          hackaton.participants.includes(auth.teamId) && (
            <HackatonRegistredItem
              key={hackaton.id}
              id={hackaton.id}
              // image={hackaton.image}
              title={hackaton.title}
              organisateur={hackaton.organisateur}
              // imgOrganisateur={hackaton.imgOrganisateur}
              theme={hackaton.theme}
              email={hackaton.email}
              // description={hackaton.description}
              StartingDate={hackaton.StartingDate}
              EndingDate={hackaton.EndingDate}
              participantsCount={hackaton.participants.length}
              participants={hackaton.participants}
              onDelete={props.onDeletePlace}
              // teamId={teamId}
            />
          )
      )}
    </div>
  );
};

export default RegisterHackatonsList;
