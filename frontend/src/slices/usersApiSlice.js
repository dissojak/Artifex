import { apiSlice , url } from "./apiSlice";
const USERS_URL = url+"/api/user";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/signup`,
        method: "POST",
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/settings`,
        method: "PUT",
        body: data,
      }),
    }),
    getUser: builder.mutation({
      query: (username) => ({
        url: `${USERS_URL}/getUserData/${username}`,
        method: "GET",
      }),
    }),
    addArtworkToPanier: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/addArtworkToPanier`,
        method: "POST",
        body: data,
      }),
    }),
    getPanier: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/getPanier`,
        method: "GET",
      }),
    }),
    removeArtworkFromPanier: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/removeArtworkFromPanier`,
        method: "DELETE",
        body: data,
      }),
    }),
    updateProfileImage: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/update-profile-image`,
        method: "PATCH",
        body: data,
      }),
    }),
    checkUsername: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/checkUsername`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useGetUserMutation,
  useAddArtworkToPanierMutation,
  useGetPanierMutation,
  useRemoveArtworkFromPanierMutation,
  useUpdateProfileImageMutation,
  useCheckUsernameMutation,
} = userApiSlice;
