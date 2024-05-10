import { apiSlice } from './apiSlice';
const ORDERS_URL = '/api/order';

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClientOrders: builder.mutation({
      query: (data) => ({
        url: `${ORDERS_URL}/client`,
        method: 'GET'
      }),
    }),
  }),
});

export const {
  useGetClientOrdersMutation,
} = orderApiSlice;
