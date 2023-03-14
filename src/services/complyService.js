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
    // get available services by country
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

        // get all countries
        getAllCountries: builder.query({
          query: () => "/countries",
        }),

    // create new compliance / service
    createCompliance: builder.mutation({
      query: (serviceId) => ({
        url: `/comply/start`,
        method: "POST",
        body: {
          serviceId,
        },
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),

    //get user reward
    viewService: builder.query({
      query: (serviceId) => `services/view/${serviceId}`,
    }),

    //view reward
    addServiceDocument: builder.mutation({
      query: (values) => ({
        url: "/comply/add/document",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Services"],
    }),

    //view service document
    viewServiceDocument: builder.mutation({
      query: (values) => ({
        url: "/comply/view",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Services"],
    }),

    //delete service document
    deleteServiceDocument: builder.mutation({
      query: (values) => ({
        url: "/comply/delete/document",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Services"],
    }),

    //add comply payment
    addServicePayment: builder.mutation({
      query: (values) => ({
        url: "/comply/add/payment",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Services"],
    }),
  }),
});


export const {
  useLazyGetServicesByCountryQuery,
  useCreateComplianceMutation,
  useViewServiceQuery,
  useGetAllCountriesQuery,
  useAddServiceDocumentMutation,
  useViewServiceDocumentMutation,
  useDeleteServiceDocumentMutation,
  useAddServicePaymentMutation,
} = ComplyApi;
