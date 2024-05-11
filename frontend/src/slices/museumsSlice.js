import { apiSlice } from "./apiSlice";
const MUSEUMS_URL = "/api/museum";

export const museumApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClientMuseums: builder.mutation({
      query: () => ({
        url: `${MUSEUMS_URL}/museums`,
        method: "GET",
      }),
    }),
    participantArtists: builder.mutation({
      query: (museumId) => ({
        url: `${MUSEUMS_URL}/participantArtists`,
        method: "GET",
        body: museumId,
      }),
    }),
    //new function
  }),
});

export const { useGetClientMuseumsMutation, useParticipantArtistsMutation } =
  museumApiSlice;
