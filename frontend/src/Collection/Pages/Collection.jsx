import React, { useEffect, useState } from "react";
import { useGetBoughtArtworkMutation } from "../../slices/artworksSlice";
import { toast } from "react-toastify";
import LoadingArtifex from "../../shared/components/UI/LoadingUI/LoadingArtifex";
import CollectionList from "../Components/CollectionList";

const Purchases = () => {
  const [collection, setCollection] = useState();
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
    <LoadingArtifex />
  ) : (
    <>
      <div className="Collection-container">
        {!isLoading && collection && <CollectionList collection={collection} />}
      </div>
    </>
  );
};

export default Purchases;
