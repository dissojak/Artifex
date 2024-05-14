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
    // updateUser: builder.mutation({
    //   query: (data) => ({
    //     url: `${ARTWORKS_URL}/settings`,
    //     method: 'PUT',
    //     body: data,
    //   }),
    // }),
  }),
});

export const {
  useAddArtworkSignupMutation,
  useGetArtworksMutation,
  useGetArtworksOfArtistMutation,
  useGetArtworkMutation,
  useArtworkPaymentMutation,
  useBuyArtworkMutation,
  useGetBoughtArtworkMutation,
  //   useRegisterMutation,
  //   useUpdateUserMutation,
} = artworkApiSlice;
