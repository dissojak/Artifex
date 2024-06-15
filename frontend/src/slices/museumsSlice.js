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
    getMuseumById: builder.mutation({
      query: (id) => ({
        url: `${MUSEUMS_URL}/${id}`,
        method: "GET",
      }),
    }),
    getParticipantArtists: builder.mutation({
      query: (museumId) => ({
        url: `${MUSEUMS_URL}/participantArtists/${museumId}`,
        method: "GET",
      }),
    }),
    MuseumPayment: builder.mutation({
      query: (data) => ({
        url: `${MUSEUMS_URL}/payment`,
        method: "POST",
        body: data,
      }),
    }),
    buyClientPass: builder.mutation({
      query: (data) => ({
        url: `${MUSEUMS_URL}/buyClientPass`,
        method: "POST",
        body: data,
      }),
    }),
    buyArtistPass: builder.mutation({
      query: (data) => ({
        url: `${MUSEUMS_URL}/buyArtistPass`,
        method: "POST",
        body: data,
      }),
    }),
    getMuseumsByUserId: builder.mutation({
      query: () => ({
        url: `${MUSEUMS_URL}/user/museums`,
        method: "GET",
      }),
    }),
    getPinnedMuseums: builder.mutation({
      query: () => ({
        url: `${MUSEUMS_URL}/pinned/PinnedMuseums`,
        method: "GET",
      }),
    }),
    createMuseum: builder.mutation({
      query: (data) => ({
        url: `${MUSEUMS_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),
    isParticipant: builder.mutation({
      query: (museumId) => ({
        url: `${MUSEUMS_URL}/isParticipant/${museumId}`,
        method: "GET",
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
  useGetMuseumByIdMutation,
  useGetParticipantArtistsMutation,
  useMuseumPaymentMutation,
  useBuyArtistPassMutation,
  useBuyClientPassMutation,
  useGetMuseumsByUserIdMutation,
  useGetPinnedMuseumsMutation,
  useCreateMuseumMutation,
  useIsParticipantMutation,
} = museumApiSlice;
