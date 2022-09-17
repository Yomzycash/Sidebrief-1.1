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
    }),

    //create launch with registration country and registration type
    getStarted: builder.mutation({
      query: (values) => ({
        url: "/v1/launch/start",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // Add business names
    addBusinessNames: builder.mutation({
      query: (values) => ({
        url: "/v1/launch/names/add",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // Add business objectives
    addBusinessObjectives: builder.mutation({
      query: (values) => ({
        url: "/v1/launch/objects/add",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),
  }),
});

export const {
  useGetAllCountriesQuery,
  useGetAllEntitiesQuery,
  useGetStartedMutation,
  useAddBusinessNamesMutation,
  useAddBusinessObjectivesMutation,
} = launchApi;
