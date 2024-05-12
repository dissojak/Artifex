import { apiSlice } from './apiSlice';
const ARTWORKS_URL = '/api/artwork';

export const artworkApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addArtworkSignup: builder.mutation({
      query: (data) => ({
        url: `${ARTWORKS_URL}/signup/AddArtwork`,
        method: 'POST',
        body: data,
      }),
    }),
    getArtworks: builder.mutation({
      query: () => ({
        url: `${ARTWORKS_URL}/getArtworks`,
        method: 'GET',
      }),
    }),
    getArtworksOfArtist: builder.mutation({
      query: (data) => ({
        url: `${ARTWORKS_URL}/getArtworksByArtistId`,
        method: 'POST',
        body:data
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
//   useRegisterMutation,
//   useUpdateUserMutation,
} = artworkApiSlice;
