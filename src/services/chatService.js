import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const ChatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    // the base query used by each endpoint to request data.
    baseUrl: process.env.REACT_APP_DEV_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().UserDataReducer.userInfo.token
      console.log(token)
      headers.set('Access-Control-Allow-Origin', '*')
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  tagTypes: ['Chat'],
  endpoints: (builder) => ({
    // get all notifications
    getAllNotifications: builder.query({
      query: () => '/notifications/all',
    }),

    // get all notifications by serviceID
    getNotificationsById: builder.query({
      query: (serviceID) => `/notifications/service/${serviceID}`,
    }),
  }),
})
export const {
  useGetAllNotificationsQuery,
  useGetAllNotificationsByIdQuery,
} = ChatApi
