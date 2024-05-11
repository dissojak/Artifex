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
        url: `${MUSEUMS_URL}/participantArtists/${museumId}`,
        method: "GET",
        // body: museumId,
      }),
    }),
    pin: builder.mutation({
      query: (data) => ({
        url: `${MUSEUMS_URL}/pin`,
        method: "POST",
        body: data,
      }),
    }),
    unpin: builder.mutation({
      query: (data) => ({
        url: `${MUSEUMS_URL}/unpin`,
        method: "DELETE",
        body: data,
      }),
    }),
    isPinned: builder.mutation({
        query: (data) => ({
          url: `${MUSEUMS_URL}/isPinned`,
          method: "POST",
          body: data,
        }),
      }),
    //new function
  }),
});

export const {
  useGetClientMuseumsMutation,
  useParticipantArtistsMutation,
  usePinMutation,
  useUnpinMutation,
  useIsPinnedMutation,
} = museumApiSlice;
