import React from "react";
import "../Pages/Museums.css";
import MuseumItemCard from "./MuseumItemCard";
const MuseumList = (props) => {
  return (
    <>
      <div className="museum-container">
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
