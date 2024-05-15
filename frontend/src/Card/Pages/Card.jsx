import React, { useEffect, useState } from 'react';
import { useGetPanierMutation } from '../../slices/usersApiSlice';
import { toast } from 'react-toastify';
import LoadingArtifex from '../../shared/components/UI/LoadingUI/LoadingArtifex';
import "../../Collection/Pages/Collection.css"
import CardList from '../Components/CardList';

const Card = () => {
    const [artworks, setArtworks] = useState();
    const [getPanier, { isLoading }] = useGetPanierMutation();
  
    useEffect(() => {
      const req = async () => {
        try {
          const res = await getPanier();
          console.log(res.data);
          setArtworks(res.data.artworks);
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
            {!isLoading && artworks && <CardList collection={artworks} />}
          </div>
        </>
      );
}

export default Card;