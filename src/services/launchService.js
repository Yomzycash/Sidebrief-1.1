import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const launchApi = createApi({
  reducerPath: "launchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.sidebrief.com/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().LaunchReducer.token;
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
    // get all countries
    getAllCountries: builder.query({
      query: () => "/countries",
    }),

    //get all entities

    getAllEntities: builder.query({
      query: (ISO) => `/entities/country/${ISO}`,
      headers: {
        Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzNhYzlmNjUyMGZiMmVkNjk2OTliMSIsImlhdCI6MTY1Njk5MDg4MCwiZXhwIjoxNjY0NzY2ODgwfQ.O0AiYvD_MybRDhYmis03OdDOnvexu4fI9-hv8HlwETg`,
      },
    }),

    //create launch with registration country and registration type

    getStarted: builder.mutation({
      query: (values) => ({
        url: "/launch/start",
        method: "POST",
        body: values,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzNhYzlmNjUyMGZiMmVkNjk2OTliMSIsImlhdCI6MTY1Njk5MDg4MCwiZXhwIjoxNjY0NzY2ODgwfQ.O0AiYvD_MybRDhYmis03OdDOnvexu4fI9-hv8HlwETg`,
        },
      }),
      invalidatesTags: ["Application"],
    }),
  }),
});

export const {
  useGetAllCountriesQuery,
  useGetAllEntitiesQuery,
  useGetStartedMutation,
} = launchApi;
