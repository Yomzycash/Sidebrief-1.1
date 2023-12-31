import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
	reducerPath: "authsApi", // a unique key that defines where the redux store will store the cache.
	baseQuery: fetchBaseQuery({
		// the base query used by each endpoint to request data.
		baseUrl: process.env.REACT_APP_DEV_BASE_URL,
	}),
	tagTypes: ["User"],
	endpoints: (builder) => ({
		// actions we want to perform.
		//POST requests
		//user registration
		registerNewUser: builder.mutation({
			query: (data) => ({
				url: "/register",
				method: "POST",
				body: data,
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			}),
			invalidatesTags: ["User"],
		}),

		//partner registration
		registerNewPartner: builder.mutation({
			query: (values) => ({
				url: "/partner/register",
				method: "POST",
				body: values,
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			}),
			invalidatesTags: ["User"],
		}),

		//reseller registration
		registerNewReseller: builder.mutation({
			query: (values) => ({
				url: "/reseller/register",
				method: "POST",
				body: values,
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			}),
			invalidatesTags: ["User"],
		}),

		//user login
		loginNewUser: builder.mutation({
			query: (values) => ({
				url: "/login",
				method: "POST",
				body: values,
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			}),
			invalidatesTags: ["User"],
		}),

		//activate user
		activateUser: builder.mutation({
			query: (values) => ({
				url: "/activate",
				method: "POST",
				body: values,
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			}),
			invalidatesTags: ["User"],
		}),

		//Reset Password
		sendResetPasswordCode: builder.mutation({
			query: (values) => ({
				url: "/sendresetpasswordcode",
				method: "POST",
				body: values,
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			}),
			invalidatesTags: ["User"],
		}),

		//Validate Code
		validateResetCode: builder.mutation({
			query: (values) => ({
				url: "/validateresetcode",
				method: "POST",
				body: values,
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			}),
			invalidatesTags: ["User"],
		}),

		//Change Password
		changePassword: builder.mutation({
			query: (values) => ({
				url: "/changepassword",
				method: "POST",
				body: values,
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			}),
			invalidatesTags: ["User"],
		}),

		//Resend Verification Email
		sendVerification: builder.mutation({
			query: (values) => ({
				url: "/sendverification",
				method: "POST",
				body: values,
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			}),
			invalidatesTags: ["User"],
		}),
	}),
});

//custom hooks
export const {
	useRegisterNewUserMutation,
	useRegisterNewPartnerMutation,
	useRegisterNewResellerMutation,
	useLoginNewUserMutation,
	useActivateUserMutation,
	useSendResetPasswordCodeMutation,
	useValidateResetCodeMutation,
	useChangePasswordMutation,
	useSendVerificationMutation,
} = authApi;
