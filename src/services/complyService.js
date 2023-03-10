import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ComplyApi = createApi({
  reducerPath: "complyApi",
  baseQuery: fetchBaseQuery({
    // the base query used by each endpoint to request data.
    baseUrl: process.env.REACT_APP_DEV_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().UserDataReducer.userInfo.token;
      headers.set("Access-Control-Allow-Origin", "*");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["CountryService"],
  endpoints: (builder) => ({
    getServicesByCountry: builder.query({
      query: (countryCode) => {
        if (!countryCode) {
          return;
        }
        return {
          url: `/services/country/${countryCode}`,
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        };
      },
      providesTags: ["CountryService"],
      invalidatesTags: "CountryService",
    }),
  }),
});

export const { useLazyGetServicesByCountryQuery } = ComplyApi;
