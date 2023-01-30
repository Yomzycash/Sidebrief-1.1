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

    //draft launches
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

    // Add an entity
    addEntity: builder.mutation({
      query: (data) => ({
        url: "/entities",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["User"],
    }),

    // Modify an entity
    updateEntity: builder.mutation({
      query: (data) => ({
        url: "/entities",
        method: "PUT",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["User"],
    }),

    // Delete an entity
    deleteEntity: builder.mutation({
      query: (data) => ({
        url: "/entities",
        method: "DELETE",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["User"],
    }),

    // Add a Country
    addCountry: builder.mutation({
      query: (data) => ({
        url: "/countries",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["User"],
    }),

    // Modify a Country
    updateCountry: builder.mutation({
      query: (data) => ({
        url: "/countries",
        method: "PUT",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["User"],
    }),

    // Delete a Country
    deleteCountry: builder.mutation({
      query: (data) => ({
        url: "/countries",
        method: "DELETE",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["User"],
    }),

    // Add a reward
    addReward: builder.mutation({
      query: (data) => ({
        url: "/reward/create",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["User"],
    }),

    // Modify a reward
    updateReward: builder.mutation({
      query: (data) => ({
        url: "/reward/update",
        method: "PUT",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["User"],
    }),

    // Delete a reward
    deleteReward: builder.mutation({
      query: (data) => ({
        url: "/reward/remove",
        method: "DELETE",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["User"],
    }),

    getAllUsers: builder.query({
      query: () => "/launch/allusers",
    }),

    // Add a bank
    addBank: builder.mutation({
      query: (data) => ({
        url: "/banks/create",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["User"],
    }),

    // Modify a bank
    updateBank: builder.mutation({
      query: (data) => ({
        url: "/banks/update",
        method: "PUT",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["User"],
    }),

    // Delete a bank
    deleteBank: builder.mutation({
      query: (data) => ({
        url: "/banks/remove",
        method: "DELETE",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["User"],
    }),

    // Get a single bank
    getSingleBank: builder.query({
      query: (code) => `/banks/${code}`,
    }),

    // Get all banks
    getAllBanks: builder.query({
      query: () => "/banks",
    }),

    
    // get all notifications
    getAllNotifications: builder.query({
      query: () => "/notifications/all"
    }),

    // Add a notification
    addNotification: builder.mutation({
      query: (data) => ({
        url: "/notifications/create",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["User"],
    }),

    // delete a  notification
    deleteNotification: builder.mutation({
    query: (data) => ({
      url: "/notifications/delete/${notificationId}",
      method: "DELETE",
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

  useAddEntityMutation,
  useUpdateEntityMutation,
  useDeleteEntityMutation,

  useAddCountryMutation,
  useUpdateCountryMutation,
  useDeleteCountryMutation,

  useAddRewardMutation,
  useUpdateRewardMutation,
  useDeleteRewardMutation,

  useGetAllUsersQuery,

  useAddBankMutation,
  useUpdateBankMutation,
  useDeleteBankMutation,
  useGetSingleBankQuery,
  useGetAllBanksQuery,
  
  useAddNotificationMutation,
  useGetAllNotificationsQuery,
  useDeleteNotificationMutation
} = staffApi;
