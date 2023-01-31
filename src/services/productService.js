import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const serviceApi = createApi({
  reducerPath: "serviceApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_DEV_BASE_URL}`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().UserDataReducer.userInfo.token;
      // If we have a token set in state, let's assume that we should be passing it.
      headers.set("Access-Control-Allow-Origin", "*");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Application"],

  endpoints: (builder) => ({
    // get all services
    getAllServices: builder.query({
      query: () => "/services/all",
    }),
  }),
});

export const { useGetAllServicesQuery } = serviceApi;
