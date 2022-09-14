import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const launchApi = createApi({
  reducerPath: "launchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.sidebrief.com/",
  }),
  tagTypes: ["Application"],

  endpoints: (builder) => ({
    // get all countries
    getAllCountries: builder.query({
      query: () => "/countries",
    }),

    //get all entities
    getAllEntities: builder.query({
      query: () => "/entities",
    }),

    //create launch with registration country and registration type

    getStarted: builder.mutation({
      query: (values) => ({
        url: "/launch/start",
        method: "POST",
        body: values,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
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
