import { apiSlice } from './apiSlice';
const ARTWORKS_URL = '/api/artist';

export const artworkApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getArtists: builder.mutation({
      query: () => ({
        url: `${ARTWORKS_URL}/artists`,
        method: 'GET',
      }),
    }),
    openOrder: builder.mutation({
      query: (data) => ({
        url: `${ARTWORKS_URL}/openOrder`,
        method: 'PUT',
        body: data,
      }),
    }),
    // register: builder.mutation({
    //   query: (data) => ({
    //     url: `${ARTWORKS_URL}/signup`,
    //     method: 'POST',
    //     body: data,
    //   }),
    // }),
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
  useGetArtistsMutation,
  useOpenOrderMutation,
//   useLogoutMutation,
//   useRegisterMutation,
//   useUpdateUserMutation,
} = artworkApiSlice;
