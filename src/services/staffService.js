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
	}),
});

export const {
	useGetAllCountriesQuery,
	useGetSingleCountryQuery,
	useGetCountryEntitiesQuery,
} = staffApi;
