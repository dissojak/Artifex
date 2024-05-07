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
    // logout: builder.mutation({
    //   query: () => ({
    //     url: `${ARTWORKS_URL}/logout`,
    //     method: 'POST',
    //   }),
    // }),
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
  useAddArtworkSignupMutation,
//   useLogoutMutation,
//   useRegisterMutation,
//   useUpdateUserMutation,
} = artworkApiSlice;
