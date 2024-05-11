import { apiSlice } from './apiSlice';
const MUSEUMS_URL = '/api/museum';

export const museumApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClientMuseums: builder.mutation({
      query: (data) => ({
        url: `${MUSEUMS_URL}/museums`,
        method: 'GET'
      }),
    }),
  }),
});

export const {
  useGetClientMuseumsMutation,
} = museumApiSlice;
