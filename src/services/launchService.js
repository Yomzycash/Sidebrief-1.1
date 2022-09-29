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

    // Add business address
    addBusinessAddress: builder.mutation({
      query: (values) => ({
        url: "v1/launch/address/add",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // Add Business Members
    addMembers: builder.mutation({
      query: (values) => ({
        url: "/v1/launch/members/add",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // Add Business Shareholders
    addShareHolder: builder.mutation({
      query: (values) => ({
        url: "/v1/launch/shareholders/add",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // Add Business Directors
    addDirector: builder.mutation({
      query: (values) => ({
        url: "/v1/launch/directors/add",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // Add Business Beneficiaries
    addBeneficiary: builder.mutation({
      query: (values) => ({
        url: "/v1/launch/beneficialowners/add",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // Add MemberKYC
    addMemberKYC: builder.mutation({
      query: (values) => ({
        url: "/v1/launch/members/addkyc",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // Delete business member
    deleteMember: builder.mutation({
      query: (values) => ({
        url: "/v1/launch/members/remove",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),
    // add beneficial
    addBeneficialKYC: builder.mutation({
      query: (values) => ({
        url: "/v1/launch/beneficialowners/addkyc",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // Delete business shareholder
    deleteShareholder: builder.mutation({
      query: (values) => ({
        url: "/v1/launch/shareholders/remove",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // Delete business director
    deleteDirector: builder.mutation({
      query: (values) => ({
        url: "/v1/launch/members/remove",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // Delete a beneficiary
    deleteBeneficiary: builder.mutation({
      query: (values) => ({
        url: "/v1/launch/beneficialowners/remove",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // Update business member
    updateMember: builder.mutation({
      query: (values) => ({
        url: "/v1/launch/members/update",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // Update business shareholder
    updateShareholder: builder.mutation({
      query: (values) => ({
        url: "/v1/launch/shareholders/update",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // Update business director
    updateDirector: builder.mutation({
      query: (values) => ({
        url: "/v1/launch/directors/update",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // Update beneficiary owner
    updateBeneficiary: builder.mutation({
      query: (values) => ({
        url: "/v1/launch/beneficialowners/update",
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
  useAddBusinessAddressMutation,
  useAddMembersMutation,
  useAddShareHolderMutation,
  useAddDirectorMutation,
  useAddBeneficiaryMutation,
  useAddMemberKYCMutation,
  useAddBeneficialKYCMutation,
  useDeleteMemberMutation,
  useDeleteShareholderMutation,
  useDeleteDirectorMutation,
  useDeleteBeneficiaryMutation,
  useUpdateMemberMutation,
  useUpdateShareholderMutation,
  useUpdateDirectorMutation,
  useUpdateBeneficiaryMutation,
} = launchApi;
