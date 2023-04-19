import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const staffApi = createApi({
  reducerPath: "staffApi",
  baseQuery: fetchBaseQuery({
    // the base query used by each endpoint to request data.
    baseUrl: process.env.REACT_APP_DEV_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().UserDataReducer.userInfo.token;
      // console.log("Token: ", token);
      headers.set("Access-Control-Allow-Origin", "*");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: [
    "Staff",
    "allLaunch",
    "submittedLaunch",
    "approvedLaunch",
    "rejectedLaunch",
    "draftLaunch",
  ],

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
      providesTags: ["allLaunch"],
    }),

    //submitted launches
    getSubmittedLaunch: builder.query({
      query: () => "/launch/submitted",
      providesTags: ["submittedLaunch"],
    }),

    //in progress launches
    getApprovedLaunch: builder.query({
      query: () => "/launch/approved",
      providesTags: ["approvedLaunch"],
    }),

    //rejected launches
    getRejectedLaunch: builder.query({
      query: () => "/launch/rejected",
      providesTags: ["rejectedLaunch"],
    }),

    //draft launches
    getDraftLaunch: builder.query({
      query: () => "/launch/pending",
      providesTags: ["draftLaunch"],
    }),

    //delete launch
    deleteLaunchRequestStaff: builder.mutation({
      query: (values) => ({
        url: "/launch/remove",
        method: "POST",
        body: values,
      }),
      invalidatesTags: [
        "allLaunch",
        "submittedLaunch",
        "approvedLaunch",
        "rejectedLaunch",
        "draftLaunch",
      ],
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

    // Reset password - send code
    sendResetPasswordCodeStaff: builder.mutation({
      query: (data) => ({
        url: "/teamspace/sendresetpasswordcode",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),

    // validate reset code
    validateResetCodeStaff: builder.mutation({
      query: (data) => ({
        url: "/teamspace/validateresetcode",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),

    // change password
    changePasswordStaff: builder.mutation({
      query: (data) => ({
        url: "/teamspace/changepassword/",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
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
      query: (bankCode) => ({
        url: `/banks/delete/${bankCode}`,
        method: "DELETE",
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

    // Add service form field
    addServiceFormField: builder.mutation({
      query: (data) => ({
        url: `/services/add/formfield`,
        method: "POST",
        body: data,
      }),
    }),

    // Update service form field
    updateServiceFormField: builder.mutation({
      query: (data) => ({
        url: `/services/update/formfield`,
        method: "POST",
        body: data,
      }),
    }),

    // Delete service form field
    deleteServiceFormField: builder.mutation({
      query: (data) => ({
        url: `/services/delete/formfield`,
        method: "POST",
        body: data,
      }),
    }),

    // Add service required document
    addServiceRequiredDoc: builder.mutation({
      query: (data) => ({
        url: `/services/add/requirement`,
        method: "POST",
        body: data,
      }),
    }),

    // Update service required document
    updateServiceRequiredDoc: builder.mutation({
      query: (data) => ({
        url: `/services/update/requirement`,
        method: "POST",
        body: data,
      }),
    }),

    // Delete service required document
    deleteServiceRequiredDoc: builder.mutation({
      query: (data) => ({
        url: `/services/delete/requirement`,
        method: "POST",
        body: data,
      }),
    }),

    // Add service document template
    addServiceDocTemplate: builder.mutation({
      query: (data) => ({
        url: `/services/add/template`,
        method: "POST",
        body: data,
      }),
    }),

    // Update service document template
    updateServiceDocTemplate: builder.mutation({
      query: (data) => ({
        url: `/services/update/template`,
        method: "POST",
        body: data,
      }),
    }),

    // delete service document template
    deleteServiceDocTemplate: builder.mutation({
      query: (data) => ({
        url: `/services/delete/template`,
        method: "POST",
        body: data,
      }),
    }),

    // add a service
    addService: builder.mutation({
      query: (data) => ({
        url: "/services/create",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["User"],
    }),

    // update a service
    updateService: builder.mutation({
      query: (data) => ({
        url: `/services/update/${data.serviceId}`,
        method: "PUT",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),

    // delete a service
    deleteService: builder.mutation({
      query: (data) => ({
        url: `/services/delete/${data.serviceId}`,
        method: "DELETE",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),

    // Get a single service
    getSingleService: builder.query({
      query: (serviceId) => `/services/view/${serviceId}`,
    }),

    // Get all Services
    getAllServices: builder.query({
      query: () => "/services/all",
    }),

    // Get services by category
    getServicesByCategory: builder.query({
      query: (serviceCategory) => `/services/category/${serviceCategory}`,
    }),

    // Get services by country
    getServicesByCountry: builder.query({
      query: (serviceCountry) => {
        if (serviceCountry) return `/services/country/${serviceCountry}`;
        else return null;
      },
    }),

    // Get services by category and country
    getServicesByCountryandCategory: builder.query({
      query: (data) =>
        `/services/category/${data.serviceCategory}/country/KEN${data.serviceCountry}`,
    }),

    // Create a service category
    createCategory: builder.mutation({
      query: (data) => ({
        url: "/create-category",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),

    // Update a service category
    updateCategory: builder.mutation({
      query: (data) => ({
        url: `/update-category/${data?.categoryId}`,
        method: "PUT",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),

    // delete a service category
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `/delete-category/${categoryId}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),

    // Get all categories
    getAllCategories: builder.query({
      query: () => `/all-category`,
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
  useSendResetPasswordCodeStaffMutation,
  useValidateResetCodeStaffMutation,
  useChangePasswordStaffMutation,

  useGetAllLaunchQuery,
  useGetApprovedLaunchQuery,
  useGetSubmittedLaunchQuery,
  useGetRejectedLaunchQuery,
  useGetDraftLaunchQuery,
  useDeleteLaunchRequestStaffMutation,

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

  useAddServiceFormFieldMutation,
  useUpdateServiceFormFieldMutation,
  useDeleteServiceFormFieldMutation,

  useAddServiceRequiredDocMutation,
  useUpdateServiceRequiredDocMutation,
  useDeleteServiceRequiredDocMutation,

  useAddServiceDocTemplateMutation,
  useUpdateServiceDocTemplateMutation,
  useDeleteServiceDocTemplateMutation,

  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useGetSingleServiceQuery,
  useGetAllServicesQuery,
  useGetServicesByCategoryQuery,
  useLazyGetServicesByCategoryQuery,
  useGetServicesByCountryQuery,
  useLazyGetServicesByCountryQuery,
  useGetServicesByCountryandCategoryQuery,

  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} = staffApi;
