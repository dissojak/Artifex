import React, { useEffect, useState } from "react";
import { useGetBoughtArtworkMutation } from "../../slices/artworksSlice";
import { toast } from "react-toastify";
import LoadingArtifex from "../../shared/components/UI/LoadingUI/LoadingArtifex";
import CollectionList from "../Components/CollectionList";
import ArtworkSkeleton from "../../home/Components/ArtworkSkeleton";

const Purchases = () => {
  const [collection, setCollection] = useState([]);
  const [getCollection, { isLoading }] = useGetBoughtArtworkMutation();

  useEffect(() => {
    const req = async () => {
      try {
        const res = await getCollection();
        // console.log(res.data.artworks);
        setCollection(res.data.artworks);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };
    req();
  }, []);

  return isLoading ? (
    // <LoadingArtifex />
    <div className="Collection-container">
      <div className="art-skeleton-container">
        {Array.from({ length: 8 }, (_, index) => (
          <ArtworkSkeleton key={index} />
        ))}
      </div>
    </div>
  ) : (
    <>{collection.length === 0 ? (
      <div style={{marginTop:'-250px'}}>
        <h1 className="no-artworks">
          You Don't Own No Artwork Yet !
        </h1>
      </div>
    ) :
      <div className="Collection-container">
        {!isLoading && collection && <CollectionList collection={collection} />}
      </div>}
    </>
  );
};

export default Purchases;
