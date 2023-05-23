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
  tagTypes: ["Application", "DraftLaunch", "PendingLaunch"],

  endpoints: (builder) => ({
    // get all draft
    getUserDraft: builder.query({
      query: () => "/user/launch/drafts",
      providesTags: ["DraftLaunch"],
    }),

    getUserSubmitted: builder.query({
      query: () => "/user/launch/submitted",
      providesTags: ["PendingLaunch"],
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
      query: (data) => ({
        url: "/launch/start",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    //update launch with registration country and registration type
    updateLaunch: builder.mutation({
      query: (data) => ({
        url: "/launch/update",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    //make payment with stripe
    payWithStripe: builder.mutation({
      query: (data) => ({
        url: "/create-payment-intent",
        method: "POST",
        body: data,
      }),
    }),

    //make payment with stripe (test)
    testPayWithStripe: builder.mutation({
      query: (data) => ({
        url: "/create-test-payment-intent",
        method: "POST",
        body: data,
      }),
    }),

    // Send payment response
    payLaunch: builder.mutation({
      query: (data) => ({
        url: "/launch/pay",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    // View payment response
    viewPayLaunch: builder.mutation({
      query: (data) => ({
        url: "/launch/viewpayment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    // Add business names
    addBusinessNames: builder.mutation({
      query: (data) => ({
        url: "/launch/names/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    // Update business names
    updateBusinessNames: builder.mutation({
      query: (data) => ({
        url: "/launch/names/update",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    // View business names
    viewBusinessNames: builder.mutation({
      query: (data) => ({
        url: "/launch/names/view",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    // Add business objectives
    addBusinessObjectives: builder.mutation({
      query: (data) => ({
        url: "/launch/objects/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    // Update business objectives
    updateBusinessObjectives: builder.mutation({
      query: (data) => ({
        url: "/launch/objects/update",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    // View business objectives
    viewBusinessObjectives: builder.mutation({
      query: (data) => ({
        url: "/launch/objects/view",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    // Add business address
    addBusinessAddress: builder.mutation({
      query: (data) => ({
        url: "/launch/address/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    // Update business address
    updateBusinessAddress: builder.mutation({
      query: (data) => ({
        url: "/launch/address/update",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    // View business address
    viewBusinessAddress: builder.query({
      query: (data) => ({
        url: "/launch/address/view",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    // View launch request
    viewLaunchRequest: builder.query({
      query: (data) => ({
        url: "launch/view",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    // Add Business Members
    addMember: builder.mutation({
      query: (data) => ({
        url: "/launch/members/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    // Add Business Members
    updateMember: builder.mutation({
      query: (data) => ({
        url: "/launch/members/update",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    // Delete business member
    deleteMember: builder.mutation({
      query: (data) => ({
        url: "/launch/members/remove",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    // View business member
    viewMembers: builder.mutation({
      query: (data) => ({
        url: "/launch/members/view",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    // Add Business Shareholders
    addShareHolder: builder.mutation({
      query: (data) => ({
        url: "/launch/shareholders/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    // Update business shareholder
    updateShareholder: builder.mutation({
      query: (data) => ({
        url: "/launch/shareholders/update",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    // Delete business shareholder
    deleteShareholder: builder.mutation({
      query: (data) => ({
        url: "/launch/shareholders/remove",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    // View business shareholder
    viewShareholders: builder.mutation({
      query: (data) => ({
        url: "/launch/shareholders/view",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    // Add Business Directors
    addDirector: builder.mutation({
      query: (data) => ({
        url: "/launch/directors/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    // Update business director
    updateDirector: builder.mutation({
      query: (data) => ({
        url: "/launch/directors/update",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    // Delete business director
    deleteDirector: builder.mutation({
      query: (data) => ({
        url: "/launch/directors/remove",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    // View business director
    viewDirectors: builder.mutation({
      query: (data) => ({
        url: "/launch/directors/view",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    // Add Business Beneficiaries
    addBeneficiary: builder.mutation({
      query: (data) => ({
        url: "/launch/beneficialowners/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    // Update Business Beneficiaries
    updateBeneficiary: builder.mutation({
      query: (data) => ({
        url: "/launch/beneficialowners/update",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    // Delete Business Beneficiaries
    deleteBeneficiary: builder.mutation({
      query: (data) => ({
        url: "/launch/beneficialowners/remove",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    // View a beneficiary
    viewBeneficiaries: builder.mutation({
      query: (data) => ({
        url: "/launch/beneficialowners/view",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    // Add MemberKYC KYC
    addMemberKYC: builder.mutation({
      query: (data) => ({
        url: "/launch/members/addkyc",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    // Delete MemberKYC KYC
    deleteMemberKYC: builder.mutation({
      query: (data) => ({
        url: "/launch/members/removekyc",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    // View MemberKYC KYC
    viewMembersKYC: builder.mutation({
      query: (data) => ({
        url: "/launch/members/viewkyc",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    // add beneficial KYC
    addBeneficialKYC: builder.mutation({
      query: (data) => ({
        url: "/launch/beneficialowners/addkyc",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    // Delete beneficial KYC
    deleteBeneficialKYC: builder.mutation({
      query: (data) => ({
        url: "/launch/beneficialowners/removekyc",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    // View beneficial KYC
    viewBeneficialsKYC: builder.mutation({
      query: (data) => ({
        url: "/launch/beneficialowners/viewkyc",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    // Submit Launch Request
    submitLaunch: builder.mutation({
      query: (data) => ({
        url: "/launch/submit",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    deleteLaunchRequest: builder.mutation({
      query: (data) => ({
        url: "/launch/remove",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["DraftLaunch", "PendingLaunch"],
    }),
    batchDeleteLaunchRequests: builder.mutation({
      query: (data) => ({
        url: "launch/batch/delete",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["DraftLaunch", "PendingLaunch"],
    }),
    uploadDocument: builder.mutation({
      query: (data) => ({
        url: "launch/document",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["DraftLaunch", "PendingLaunch"],
    }),
    addUploadDocument: builder.mutation({
      query: (data) => ({
        url: "launch/document",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["DraftLaunch", "PendingLaunch"],
    }),
    updateUploadDocument: builder.mutation({
      query: (data) => ({
        url: "launch/document",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["DraftLaunch", "PendingLaunch"],
    }),
    deleteUploadDocument: builder.mutation({
      query: (data) => ({
        url: "launch/document-removal",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["DraftLaunch", "PendingLaunch"],
    }),
  
  }),
});


export const {
  useGetUserDraftQuery,
  useLazyGetUserDraftQuery,

  useGetUserSubmittedQuery,
  useLazyGetUserSubmittedQuery,

  useGetAllCountriesQuery,

  useGetAllTheEntitiesQuery,
  useGetAllEntitiesQuery,

  useGetSingleEntityQuery,
  usePayWithStripeMutation,
  useTestPayWithStripeMutation,
  useGetStartedMutation,
  useUpdateLaunchMutation,

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
  useBatchDeleteLaunchRequestsMutation,

  useAddUploadDocumentMutation, 
  useUpdateUploadDocumentMutation,
  useDeleteUploadDocumentMutation, 





} = launchApi;
