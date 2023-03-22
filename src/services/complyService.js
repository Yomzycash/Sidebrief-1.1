import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ComplyApi = createApi({
  reducerPath: "complyApi",
  baseQuery: fetchBaseQuery({
    // the base query used by each endpoint to request data.
    baseUrl: process.env.REACT_APP_DEV_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().UserDataReducer.userInfo.token;
      headers.set("Access-Control-Allow-Origin", "*");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["CountryService", "Services"],

  endpoints: (builder) => ({
    // Create new compliance / service request
    createComply: builder.mutation({
      query: (serviceId) => ({
        url: `/comply/start`,
        method: "POST",
        body: {
          serviceId,
        },
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),

    // Update an existing compliance / service request
    updateComply: builder.mutation({
      query: (serviceId) => ({
        url: `/comply/update`,
        method: "POST",
        body: {
          serviceId,
        },
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),

    // view service
    viewService: builder.query({
      query: (serviceId) => `/services/view/${serviceId}`,
    }),

    viewComply: builder.mutation({
      query: (data) => ({
        url: "/comply/view",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),

    deleteComply: builder.mutation({
      query: (data) => ({
        url: "/comply/delete",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),

    viewAllComply: builder.mutation({
      query: (data) => ({
        url: "/comply/view/all",
        method: "GET",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),

    viewAllComplyByServiceId: builder.mutation({
      query: (data) => ({
        url: "/comply/view/all/service",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),

    viewAllComplyByMeta: builder.mutation({
      query: (data) => ({
        url: "/comply/view/all/meta",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),

    deleteManyComplies: builder.mutation({
      query: (data) => ({
        url: "/comply/batch/delete",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),

    addComplyPayment: builder.mutation({
      query: (data) => ({
        url: "/comply/add/payment",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),

    deleteComplyPayment: builder.mutation({
      query: (data) => ({
        url: "/comply/delete/payment",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),

    addComplyDataQA: builder.mutation({
      query: (data) => ({
        url: "/comply/add/data",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),

    deleteComplyDataQA: builder.mutation({
      query: (data) => ({
        url: "/comply/delete/data",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),

    addComplyDocument: builder.mutation({
      query: (data) => ({
        url: "/comply/add/document",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),

    deleteComplyDocument: builder.mutation({
      query: (data) => ({
        url: "/comply/delete/document",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
  }),
});

export const {
  useCreateComplyMutation,
  useUpdateComplyMutation,
  useViewComplyMutation,
  useDeleteComplyMutation,

  useViewAllComplyMutation,
  useViewAllComplyByServiceIdMutation,
  useViewAllComplyByMetaMutation,
  useDeleteManyCompliesMutation,
  useViewServiceQuery,

  useAddComplyPaymentMutation,
  useDeleteComplyPaymentMutation,

  useAddComplyDataQAMutation,
  useDeleteComplyDataQAMutation,

  useAddComplyDocumentMutation,
  useDeleteComplyDocumentMutation,
} = ComplyApi;
