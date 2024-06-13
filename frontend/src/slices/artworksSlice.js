import { apiSlice } from "./apiSlice";
const ARTWORKS_URL = "/api/artwork";

export const artworkApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addArtworkSignup: builder.mutation({
      query: (data) => ({
        url: `${ARTWORKS_URL}/signup/AddArtwork`,
        method: "POST",
        body: data,
      }),
    }),
    getArtworks: builder.mutation({
      query: () => ({
        url: `${ARTWORKS_URL}/getArtworks`,
        method: "GET",
      }),
    }),
    getArtworksForAdmin: builder.mutation({
      query: () => ({
        url: `${ARTWORKS_URL}/getArtworksForAdmin`,
        method: "GET",
      }),
    }),
    getArtworksOfArtist: builder.mutation({
      query: (data) => ({
        url: `${ARTWORKS_URL}/getArtworksByArtistId`,
        method: "POST",
        body: data,
      }),
    }),
    getArtwork: builder.mutation({
      query: (artworkId) => ({
        url: `${ARTWORKS_URL}/getArtwork/${artworkId}`,
        method: "GET",
      }),
    }),
    artworkPayment: builder.mutation({
      query: (data) => ({
        url: `${ARTWORKS_URL}/artworkPayment`,
        method: "POST",
        body: data,
      }),
    }),
    buyArtwork: builder.mutation({
      query: (data) => ({
        url: `${ARTWORKS_URL}/buyArtwork`,
        method: "POST",
        body: data,
      }),
    }),
    getBoughtArtwork: builder.mutation({
      query: () => ({
        url: `${ARTWORKS_URL}/getBoughtArtwork`,
        method: "GET",
      }),
    }),
    editArtwork: builder.mutation({
      query: (data) => ({
        url: `${ARTWORKS_URL}/editArtwork/${data.artworkId}`,
        method: 'PUT',
        body: data,
      }),
    }),
    makePrivate: builder.mutation({
      query: (data) => ({
        url: `${ARTWORKS_URL}/private`,
        method: 'PUT',
        body: data,
      }),
    }),
    makePublic: builder.mutation({
      query: (data) => ({
        url: `${ARTWORKS_URL}/public`,
        method: 'PUT',
        body: data,
      }),
    }),
    approveArtwork: builder.mutation({
      query: (data) => ({
        url: `${ARTWORKS_URL}/approveArtwork`,
        method: 'PUT',
        body: data,
      }),
    }),
    declineArtwork: builder.mutation({
      query: (data) => ({
        url: `${ARTWORKS_URL}/declineArtwork`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteArtwork: builder.mutation({
      query: (data) => ({
        url: `${ARTWORKS_URL}/deleteArtwork`,
        method: 'DELETE',
        body:data
      }),
    }),
    checkVisibility: builder.mutation({
      query: (artworkId) => ({
        url: `${ARTWORKS_URL}/visibility/${artworkId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddArtworkSignupMutation,
  useGetArtworksMutation,
  useGetArtworksForAdminMutation,
  useGetArtworksOfArtistMutation,
  useGetArtworkMutation,
  useArtworkPaymentMutation,
  useBuyArtworkMutation,
  useGetBoughtArtworkMutation,
  useEditArtworkMutation,
  useDeleteArtworkMutation,
  useMakePrivateMutation,
  useMakePublicMutation,
  useCheckVisibilityMutation,
  useApproveArtworkMutation,
  useDeclineArtworkMutation,

  //   useRegisterMutation,
  //   useUpdateUserMutation,
} = artworkApiSlice;
