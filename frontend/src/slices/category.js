import { apiSlice,url } from "./apiSlice";
const CATEGORY_URL = url+"/api/category";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.mutation({
      query: () => ({
        url: `${CATEGORY_URL}/getCategories`,
        method: "GET",
      }),
    }),
    addCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORY_URL}/addCategory`,
        method: "POST",
        body: data,
      }),
    }),
    // register: builder.mutation({
    //   query: (data) => ({
    //     url: `${CATEGORY_URL}/signup`,
    //     method: 'POST',
    //     body: data,
    //   }),
    // }),
    // updateUser: builder.mutation({
    //   query: (data) => ({
    //     url: `${CATEGORY_URL}/settings`,
    //     method: 'PUT',
    //     body: data,
    //   }),
    // }),
  }),
});

export const {
    useGetCategoriesMutation,
    useAddCategoryMutation,

  //   useLogoutMutation,
  //   useRegisterMutation,
  //   useUpdateUserMutation,
} = categoryApiSlice;
