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
  tagTypes: ["comply"],
  endpoints: (builder) => ({
    //view endpoint
    viewComply: builder.mutation({
      query: (data) => ({
        url: "comply/view",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useViewComplyMutation } = ComplyApi;
