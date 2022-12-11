import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const staffApi = createApi({
  reducerPath: "staffApi",
  baseQuery: fetchBaseQuery({
    // the base query used by each endpoint to request data.
    baseUrl: process.env.REACT_APP_DEV_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().UserDataReducer.userInfo.token;
      console.log(token);
      headers.set("Access-Control-Allow-Origin", "*");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Staff"],

  endpoints: (builder) => ({
    getAllCountries: builder.query({
      query: () => "/countries",
    }),

    getSingleCountry: builder.query({
      query: (ISO) => `/countries/${ISO}`,
    }),

    getCountryEntities: builder.query({
      query: (ISO) => `/entities/country/${ISO}`,
    }),

    //all launches
    getAllLaunch: builder.query({
      query: () => "/launch/all",
    }),

    //submitted launches
    getSubmittedLaunch: builder.query({
      query: () => "/launch/submitted",
    }),

    //in progress launches
    getApprovedLaunch: builder.query({
      query: () => "/launch/approved",
    }),

    //rejected launches
    getRejectedLaunch: builder.query({
      query: () => "/launch/rejected",
    }),

    //rejected launches
    getDraftLaunch: builder.query({
      query: () => "/launch/pending",
    }),

    //Staff registration
    registerNewStaff: builder.mutation({
      query: (data) => ({
        url: "/teamspace/register",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["User"],
    }),

    //Staff login
    loginStaff: builder.mutation({
      query: (data) => ({
        url: "/teamspace/login",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["User"],
    }),

    //Staff Activate
    ActivateStaff: builder.mutation({
      query: (data) => ({
        url: "/teamspace/activate",
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

export const {
  useGetAllCountriesQuery,
  useGetSingleCountryQuery,
  useGetCountryEntitiesQuery,
  useRegisterNewStaffMutation,
  useLoginStaffMutation,
  useActivateStaffMutation,
  useGetAllLaunchQuery,
  useGetApprovedLaunchQuery,
  useGetSubmittedLaunchQuery,
  useGetRejectedLaunchQuery,
  useGetDraftLaunchQuery,
} = staffApi;
