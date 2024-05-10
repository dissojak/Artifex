import { apiSlice } from './apiSlice';
const REVIEWS_URL = '/api/review';

export const reviewApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getViews: builder.mutation({
      query: (artworkId) => ({
        url: `${REVIEWS_URL}/views/${artworkId}`,
        method: 'GET'
      }),
    }),
  }),
});

export const {
  useGetViewsMutation,
} = reviewApiSlice;
