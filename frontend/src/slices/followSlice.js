import { apiSlice } from "./apiSlice";
const FOLLOW_URL = "/api/follow";

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
  }),
});

export const {
  useIsFollowingMutation,
  useFollowArtistMutation,
  useUnFollowArtistMutation,
  //   useUpdateUserMutation,
} = followApiSlice;
