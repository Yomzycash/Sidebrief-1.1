import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const launchApi = createApi({
  reducerPath: "launchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.sidebrief.com/",
    prepareHeaders: (headers, { getState }) => {
      // const token = getState().UserDataReducer.userInfo.token;
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzlhMGIxZTg4ZWRjZGZjNjcwMjVkYSIsImlhdCI6MTY2NDcyMTA3MywiZXhwIjoxNjY1OTMwNjczfQ.lYcS1Tzc0WkOJ-7NXFOIkrn9G12jrreS-3LlpGs5ICg";
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
        url: "/launch/start",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // Add business names
    addBusinessNames: builder.mutation({
      query: (values) => ({
        url: "/launch/names/add",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // Add business objectives
    addBusinessObjectives: builder.mutation({
      query: (values) => ({
        url: "/launch/objects/add",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // Add business address
    addBusinessAddress: builder.mutation({
      query: (values) => ({
        url: "/launch/address/add",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // Add Business Members
    addMembers: builder.mutation({
      query: (values) => ({
        url: "/launch/members/add",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // Add Business Shareholders
    addShareHolder: builder.mutation({
      query: (values) => ({
        url: "/launch/shareholders/add",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // Add Business Directors
    addDirector: builder.mutation({
      query: (values) => ({
        url: "/launch/directors/add",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // Add Business Beneficiaries
    addBeneficiary: builder.mutation({
      query: (values) => ({
        url: "/launch/beneficialowners/add",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // Add MemberKYC
    addMemberKYC: builder.mutation({
      query: (values) => ({
        url: "/launch/members/addkyc",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // Delete business member
    deleteMember: builder.mutation({
      query: (values) => ({
        url: "/launch/members/remove",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),
    // add beneficial
    addBeneficialKYC: builder.mutation({
      query: (values) => ({
        url: "/launch/beneficialowners/addkyc",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // Delete business shareholder
    deleteShareholder: builder.mutation({
      query: (values) => ({
        url: "/launch/shareholders/remove",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // Delete business director
    deleteDirector: builder.mutation({
      query: (values) => ({
        url: "/launch/members/remove",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // Delete a beneficiary
    deleteBeneficiary: builder.mutation({
      query: (values) => ({
        url: "/launch/beneficialowners/remove",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // Update business member
    updateMember: builder.mutation({
      query: (values) => ({
        url: "/launch/members/update",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // Update business shareholder
    updateShareholder: builder.mutation({
      query: (values) => ({
        url: "/launch/shareholders/update",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // Update business director
    updateDirector: builder.mutation({
      query: (values) => ({
        url: "/launch/directors/update",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // Update beneficiary owner
    updateBeneficiary: builder.mutation({
      query: (values) => ({
        url: "/launch/beneficialowners/update",
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
