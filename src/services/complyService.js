import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ComplyApi = createApi({
  reducerPath: "ComplyApi",
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
  tagTypes: [""],
  endpoints: (builder) => ({
    //get user reward
    viewService: builder.query({
      query: () => "services/view/9031415997",
    }),

    //view reward
    addServiceDocument: builder.mutation({
      query: (values) => ({
        url: "/comply/add/document",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Services"],
    }),

    //view service document
    viewServiceDocument: builder.mutation({
      query: (values) => ({
        url: "/comply/view",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Services"],
    }),

    //delete service document
    deleteServiceDocument: builder.mutation({
      query: (values) => ({
        url: "/comply/delete/document",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Services"],
    }),
  }),
});

export const {
  useViewServiceQuery,
  useAddServiceDocumentMutation,
  useViewServiceDocumentMutation,
  useDeleteServiceDocumentMutation,
} = ComplyApi;
