import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const vendorApi = createApi({
  reducerPath: "vendorApi",
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers, { getState }) => {
      headers.set("Access-Control-Allow-Origin", "*");
      return headers;
    },
  }),

  endpoints: (builder) => ({
    // if anyone can get this to work, that'll be appreciated
    getCountryInfo: builder.query({
      query: (ISO) => ({
        url: `https://countrycode.dev/api/countries/iso3/${ISO}/`,
      }),
    }),
  }),
});

export const { useGetCountryInfoQuery } = vendorApi;
