import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const launchApi = createApi({
  reducerPath: "launchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_DEV_BASE_URL}`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().UserDataReducer.userInfo.token;
      // const token =
      //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzg2MTViNDkyNzJlYjA2NjNjNWI5YiIsImlhdCI6MTY2NDczOTc2MiwiZXhwIjoxNjY1OTQ5MzYyfQ.Ap5TmC_WE-IjoX2pPJqYtaHcLmrfwBb3LlXSziJ7z5k";
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
    // get all draft
    getUserDraft: builder.query({
      query: () => "/user/launch/drafts",
    }),

    getUserSubmitted: builder.query({
      query: () => "/user/launch/submitted",
    }),

    // get all countries
    getAllCountries: builder.query({
      query: () => "/countries",
    }),

    //get all entities
    getAllTheEntities: builder.query({
      query: () => "/entities",
    }),

    //get all entities in a country
    getAllEntities: builder.query({
      query: (ISO) => `/entities/country/${ISO}`,
    }),

    getSingleEntity: builder.query({
      query: (entityCode) => `/entities/${entityCode}`,
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

    //update launch with registration country and registration type
    updateLaunch: builder.mutation({
      query: (values) => ({
        url: "/launch/update",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // Get all users' launch requests
    getAllLaunches: builder.query({
      query: () => "/launch/all",
    }),

    // Get all users' submitted launch requests
    getAllSubmittedLaunches: builder.query({
      query: () => "/launch/submitted",
    }),

    // Get all users' approved launch requests
    getAllApprovedLaunches: builder.query({
      query: () => "/launch/approved",
    }),

    // Get all users' rejected launch requests
    getAllRejectedLaunches: builder.query({
      query: () => "/launch/rejected",
    }),

    // Send payment response
    payLaunch: builder.mutation({
      query: (values) => ({
        url: "/launch/pay",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // View payment response
    viewPayLaunch: builder.mutation({
      query: (values) => ({
        url: "/launch/viewpayment",
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

    // Update business names
    updateBusinessNames: builder.mutation({
      query: (values) => ({
        url: "/launch/names/update",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // View business names
    viewBusinessNames: builder.mutation({
      query: (values) => ({
        url: "/launch/names/view",
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

    // Update business objectives
    updateBusinessObjectives: builder.mutation({
      query: (values) => ({
        url: "/launch/objects/update",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // View business objectives
    viewBusinessObjectives: builder.mutation({
      query: (values) => ({
        url: "/launch/objects/view",
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

    // Update business address
    updateBusinessAddress: builder.mutation({
      query: (values) => ({
        url: "/launch/address/update",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // View business address
    viewBusinessAddress: builder.query({
      query: (values) => ({
        url: "/launch/address/view",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // View launch request
    viewLaunchRequest: builder.query({
      query: (values) => ({
        url: "launch/view",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // Add Business Members
    addMember: builder.mutation({
      query: (values) => ({
        url: "/launch/members/add",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // Add Business Members
    updateMember: builder.mutation({
      query: (values) => ({
        url: "/launch/members/update",
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

    // View business member
    viewMembers: builder.mutation({
      query: (values) => ({
        url: "/launch/members/view",
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

    // Update business shareholder
    updateShareholder: builder.mutation({
      query: (values) => ({
        url: "/launch/shareholders/update",
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

    // View business shareholder
    viewShareholders: builder.mutation({
      query: (values) => ({
        url: "/launch/shareholders/view",
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

    // Update business director
    updateDirector: builder.mutation({
      query: (values) => ({
        url: "/launch/directors/update",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // Delete business director
    deleteDirector: builder.mutation({
      query: (values) => ({
        url: "/launch/directors/remove",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // View business director
    viewDirectors: builder.mutation({
      query: (values) => ({
        url: "/launch/directors/view",
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

    // Update Business Beneficiaries
    updateBeneficiary: builder.mutation({
      query: (values) => ({
        url: "/launch/beneficialowners/update",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // Delete Business Beneficiaries
    deleteBeneficiary: builder.mutation({
      query: (values) => ({
        url: "/launch/beneficialowners/remove",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // View a beneficiary
    viewBeneficiaries: builder.mutation({
      query: (values) => ({
        url: "/launch/beneficialowners/view",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // Add MemberKYC KYC
    addMemberKYC: builder.mutation({
      query: (values) => ({
        url: "/launch/members/addkyc",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // Delete MemberKYC KYC
    deleteMemberKYC: builder.mutation({
      query: (values) => ({
        url: "/launch/members/removekyc",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // View MemberKYC KYC
    viewMembersKYC: builder.mutation({
      query: (values) => ({
        url: "/launch/members/viewkyc",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // add beneficial KYC
    addBeneficialKYC: builder.mutation({
      query: (values) => ({
        url: "/launch/beneficialowners/addkyc",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // Delete beneficial KYC
    deleteBeneficialKYC: builder.mutation({
      query: (values) => ({
        url: "/launch/beneficialowners/removekyc",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // View beneficial KYC
    viewBeneficialsKYC: builder.mutation({
      query: (values) => ({
        url: "/launch/beneficialowners/viewkyc",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    // Submit Launch Request
    submitLaunch: builder.mutation({
      query: (values) => ({
        url: "/launch/submit",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),

    deleteLaunchRequest: builder.mutation({
      query: (values) => ({
        url: "/launch/remove",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Application"],
    }),
  }),
});

export const {
  useGetUserDraftQuery,

  useGetUserSubmittedQuery,

  useGetAllCountriesQuery,

  useGetAllTheEntitiesQuery,
  useGetAllEntitiesQuery,

  useGetSingleEntityQuery,

  useGetStartedMutation,
  useUpdateLaunchMutation,

  useGetAllLaunchesQuery,
  useGetAllSubmittedLaunchesQuery,
  useGetAllApprovedLaunchesQuery,
  useGetAllRejectedLaunchesQuery,

  usePayLaunchMutation,
  useViewPayLaunchMutation,

  useAddBusinessNamesMutation,
  useUpdateBusinessNamesMutation,
  useViewBusinessNamesMutation,

  useAddBusinessObjectivesMutation,
  useUpdateBusinessObjectivesMutation,
  useViewBusinessObjectivesMutation,

  useAddBusinessAddressMutation,
  useUpdateBusinessAddressMutation,
  useViewBusinessAddressQuery,

  useAddMemberMutation,
  useUpdateMemberMutation,
  useDeleteMemberMutation,
  useViewMembersMutation,

  useAddShareHolderMutation,
  useUpdateShareholderMutation,
  useDeleteShareholderMutation,
  useViewShareholdersMutation,

  useAddDirectorMutation,
  useUpdateDirectorMutation,
  useDeleteDirectorMutation,
  useViewDirectorsMutation,

  useAddBeneficiaryMutation,
  useUpdateBeneficiaryMutation,
  useDeleteBeneficiaryMutation,
  useViewBeneficiariesMutation,

  useAddMemberKYCMutation,
  useDeleteMemberKYCMutation,
  useViewMembersKYCMutation,

  useAddBeneficialKYCMutation,
  useDeleteBeneficialKYCMutation,
  useViewBeneficialsKYCMutation,

  useViewLaunchRequestQuery,

  useSubmitLaunchMutation,

  useDeleteLaunchRequestMutation,
} = launchApi;
