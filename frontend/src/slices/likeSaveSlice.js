import { apiSlice } from "./apiSlice";
const LIKED_SAVED_URL = "/api/liked/saved";

export const likedSavedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLikedArtworks: builder.mutation({
      query: () => ({
        url: `${LIKED_SAVED_URL}/getLikedArtworks`,
        method: "GET",
      }),
    }),
    getSavedArtworks: builder.mutation({
      query: () => ({
        url: `${LIKED_SAVED_URL}/getSavedArtworks`,
        method: "GET",
      }),
    }),
    saveArtwork: builder.mutation({
      query: (data) => ({
        url: `${LIKED_SAVED_URL}/saveArtwork`,
        method: "POST",
        body: data,
      }),
    }),
    likeArtwork: builder.mutation({
      query: (data) => ({
        url: `${LIKED_SAVED_URL}/likeArtwork`,
        method: "POST",
        body: data,
      }),
    }),
    unsaveArtwork: builder.mutation({
      query: (data) => ({
        url: `${LIKED_SAVED_URL}/unsaveArtwork`,
        method: "DELETE",
        body: data,
      }),
    }),
    unlikeArtwork: builder.mutation({
      query: (data) => ({
        url: `${LIKED_SAVED_URL}/unlikeArtwork`,
        method: "DELETE",
        body: data,
      }),
    }),
    isLiked: builder.mutation({
      query: (artworkId) => ({
        url: `${LIKED_SAVED_URL}/isLiked/${artworkId}`,
        method: "GET",
      }),
    }),
    isSaved: builder.mutation({
      query: (artworkId) => ({
        url: `${LIKED_SAVED_URL}/isSaved/${artworkId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetLikedArtworksMutation,
  useGetSavedArtworksMutation,
  useSaveArtworkMutation,
  useLikeArtworkMutation,
  useUnsaveArtworkMutation,
  useUnlikeArtworkMutation,
  useIsLikedMutation,
  useIsSavedMutation,
} = likedSavedApiSlice;
