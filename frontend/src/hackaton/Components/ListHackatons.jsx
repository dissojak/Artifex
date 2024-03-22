import React from 'react';

import HackatonItem from './HackatonItem';
import Card from '../../shared/components/UIElements/Card';
import './ListHackatons.css';

const ListHackatons = props => {

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
      {props.items.map(hackaton => (
        <HackatonItem
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
          // teamId={teamId}
        />
      ))}
    </div>
  );
};

export default ListHackatons;
