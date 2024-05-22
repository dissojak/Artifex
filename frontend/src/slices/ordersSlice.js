import { apiSlice } from "./apiSlice";
const ORDERS_URL = "/api/order";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClientOrders: builder.mutation({
      query: () => ({
        url: `${ORDERS_URL}/client`,
        method: "GET",
      }),
    }),
    getArtistOrders: builder.mutation({
      query: () => ({
        url: `${ORDERS_URL}/artist`,
        method: "GET",
      }),
    }),
    makeOrder: builder.mutation({
      query: (data) => ({
        url: `${ORDERS_URL}/new`,
        method: "POST",
        body: data,
      }),
    }),
    orderPayment: builder.mutation({
      query: (data) => ({
        url: `${ORDERS_URL}/orderPayment`,
        method: "POST",
        body: data,
      }),
    }),
    payOrder: builder.mutation({
      query: (data) => ({
        url: `${ORDERS_URL}/pay`,
        method: "POST",
        body: data,
      }),
    }),
    acceptOrder: builder.mutation({
      query: (data) => ({
        url: `${ORDERS_URL}/accept`,
        method: "PUT",
        body: data,
      }),
    }),
    rejectOrder: builder.mutation({
      query: (data) => ({
        url: `${ORDERS_URL}/reject`,
        method: "PUT",
        body: data,
      }),
    }),
    submitOrder: builder.mutation({
      query: (data) => ({
        url: `${ORDERS_URL}/submit`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetClientOrdersMutation,
  useGetArtistOrdersMutation,
  useMakeOrderMutation,
  useOrderPaymentMutation,
  usePayOrderMutation,
  useAcceptOrderMutation,
  useRejectOrderMutation,
  useSubmitOrderMutation,
} = orderApiSlice;
