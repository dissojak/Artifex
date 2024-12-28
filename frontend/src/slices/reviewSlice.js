import { apiSlice,url } from './apiSlice';
const REVIEWS_URL = url+'/api/review';

export const reviewApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getViews: builder.mutation({
      query: (artworkId) => ({
        url: `${REVIEWS_URL}/views/${artworkId}`,
        method: 'GET'
      }),
    }),
    getReviewsByArtworkId: builder.mutation({
      query: (artworkId) => ({
        url: `${REVIEWS_URL}/artwork/${artworkId}`,
        method: 'GET'
      }),
    }),
    updateView: builder.mutation({
      query: (data) => ({
        url: `${REVIEWS_URL}/updateView`,
        method: 'PATCH',
        body:data
      }),
    }),
    addRating: builder.mutation({
      query: (data) => ({
        url: `${REVIEWS_URL}/addRating`,
        method: 'PATCH',
        body:data
      }),
    }),
    addComment: builder.mutation({
      query: (data) => ({
        url: `${REVIEWS_URL}/addComment`,
        method: 'PATCH',
        body:data
      }),
    }),
    deleteComment: builder.mutation({
      query: (data) => ({
        url: `${REVIEWS_URL}/deleteComment`,
        method: 'DELETE',
        body:data
      }),
    }),
  }),
});

export const {
  useGetViewsMutation,
  useGetReviewsByArtworkIdMutation,
  useUpdateViewMutation,
  useAddRatingMutation,
  useAddCommentMutation,
  useDeleteCommentMutation,
} = reviewApiSlice;
