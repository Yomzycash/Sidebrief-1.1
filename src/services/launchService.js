import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const launchApi = createApi({
	reducerPath: "launchApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://api.sidebrief.com/",
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

		//update launch with registration country and registration type
		updateLaunch: builder.mutation({
			query: (values) => ({
				url: "/launch/update",
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

		// Add Business Members
		addMembers: builder.mutation({
			query: (values) => ({
				url: "/launch/members/add",
				method: "POST",
				body: values,
			}),
			invalidatesTags: ["Application"],
		}),

		// Add Business Members
		updateMembers: builder.mutation({
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
				url: "/launch/members/remove",
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

		// Update beneficiary owner
		updateBeneficiary: builder.mutation({
			query: (values) => ({
				url: "/launch/beneficialowners/update",
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

		// Add MemberKYC
		addMemberKYC: builder.mutation({
			query: (values) => ({
				url: "/launch/members/addkyc",
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

		// Update business member
		updateMember: builder.mutation({
			query: (values) => ({
				url: "/launch/members/update",
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
	useGetAllEntitiesQuery,
	useGetStartedMutation,
	useUpdateLaunchMutation,
	useAddBusinessNamesMutation,
	useUpdateBusinessNamesMutation,
	useAddBusinessObjectivesMutation,
	useUpdateBusinessObjectivesMutation,
	useAddBusinessAddressMutation,
	useUpdateBusinessAddressMutation,
	useAddMembersMutation,
	useUpdateMemberMutation,
	useDeleteMemberMutation,
	useAddShareHolderMutation,
	useUpdateShareholderMutation,
	useDeleteShareholderMutation,
	useAddDirectorMutation,
	useUpdateDirectorMutation,
	useDeleteDirectorMutation,
	useAddBeneficiaryMutation,
	useUpdateBeneficiaryMutation,
	useDeleteBeneficiaryMutation,
	useAddMemberKYCMutation,
	useAddBeneficialKYCMutation,
} = launchApi;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
//   .eyJpZCI6IjYyYzNhYzlmNjUyMGZiMmVkNjk2OTliMSIsImlhdCI6MTY1Njk5MDg4MCwiZXhwIjoxNjY0NzY2ODgwfQ
//   .O0AiYvD_MybRDhYmis03OdDOnvexu4fI9 - hv8HlwETg
