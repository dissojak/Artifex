import React from "react";
import "./PinnedMuseums.css";
import MuseumItemCard from "../../MuseumPage/Components/Museums/Components/MuseumItemCard";
const MuseumList = (props) => {
  return (
    <>
      <div className="PinnedMuseums-List-container">
        {props.items.map((museum) => (
          <MuseumItemCard
            key={museum._id}
            id={museum._id}
            name={museum.title}
            Image={museum.museumImage}
            Description={museum.description}
            numberMaxArtists={museum.numberMaxArtists}
            numberMaxClients={museum.numberMaxClients}
            priceClient={museum.priceClient}
            priceArtist={museum.priceArtist}
            Start={museum.dateStart}
            Ends={museum.dateEnd}
            isExclusive={museum.isExclusive}
            Categorie={museum.idCategory.name}
            artistsEntered={museum.artistsEntered}
            clientsEntered={museum.clientsEntered}
            artworkIds={museum.artworkIds}
          />
        ))}
      </div>
    </>
  );
};

export default MuseumList;
