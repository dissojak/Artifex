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

            //   rating={museum.rating.rating||0}

            // Image: MuseumImage,
            // Start: "18 August",
            // Ends: "23 August",
            // Price: "10",
            // Name: "Creativity Conclave",
            // Description:
            //   "Uniting artists to inspire and innovate. Workshops, discussions, and showcases await!",
            // Categorie: "Digital Art",
            // Range: "76",
            // Profile: ProfileImage,
          />
        ))}
      </div>
    </>
  );
};

export default MuseumList;
