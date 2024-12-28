import { apiSlice,url } from "./apiSlice";
const FOLLOW_URL = url+"/api/follow";

export const followApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    isFollowing: builder.mutation({
      query: (data) => ({
        url: `${FOLLOW_URL}/isFollowing`,
        method: "POST",
        body: data,
      }),
    }),
    followArtist: builder.mutation({
      query: (data) => ({
        url: `${FOLLOW_URL}/followArtist`,
        method: "PUT",
        body: data,
      }),
    }),
    unFollowArtist: builder.mutation({
      query: (data) => ({
        url: `${FOLLOW_URL}/unfollowArtist`,
        method: "DELETE",
        body: data,
      }),
    }),
    getFollowers: builder.mutation({
      query: (id) => ({
        url: `${FOLLOW_URL}/followers/${id}`,
        method: "GET",
      }),
    }),
    FollowedArtists: builder.mutation({
      query: () => ({
        url: `${FOLLOW_URL}/followedArtists`,
        method: "GET",
      }),
    }),
    removeFollower: builder.mutation({
      query: (clientId) => ({
        url: `${FOLLOW_URL}/removeFollower/${clientId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useIsFollowingMutation,
  useFollowArtistMutation,
  useUnFollowArtistMutation,
  useGetFollowersMutation,
  useFollowedArtistsMutation,
  useRemoveFollowerMutation,
} = followApiSlice;
