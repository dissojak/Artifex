import { apiSlice } from "./apiSlice";
const USERS_URL = "/api/user";

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
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useGetUserMutation,
} = userApiSlice;
