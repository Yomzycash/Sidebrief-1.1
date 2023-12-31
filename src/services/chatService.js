import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const ChatApi = createApi({
  reducerPath: "chatApi",
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
  tagTypes: ["Chat"],
  endpoints: (builder) => ({
    // Add a notification
    addNotification: builder.mutation({
      query: (data) => ({
        url: "/notifications/create",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["User"],
    }),

    // Update a notification
    updateNotification: builder.mutation({
      query: (data) => ({
        url: `/notifications/update/${data.notificationId}`,
        method: "PUT",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["User"],
    }),

    // delete a  notification
    deleteNotification: builder.mutation({
      query: (notificationId) => ({
        url: `/notifications/delete/${notificationId}`,
        method: "DELETE",

        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["User"],
    }),

    // get all notifications
    getAllNotifications: builder.query({
      query: (staffEmail) => (staffEmail ? "/notifications/all" : ""),
    }),

    // get a notifications by notificationID
    getNotificationsByNotificationId: builder.query({
      query: (notificationID) => `/notifications/view/${notificationID}`,
    }),
    viewNotificationsByUserId: builder.query({
      query: (data) => ({
        url: "/notifications/viewByUserId",
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),

    // get all notifications by serviceID
    getNotificationsByServiceId: builder.query({
      query: (serviceID) => `/notifications/service/${serviceID}`,
    }),
  }),
});
export const {
  useAddNotificationMutation,
  useUpdateNotificationMutation,
  useDeleteNotificationMutation,
  useGetAllNotificationsQuery,
  useGetAllNotificationsByIdQuery,
  useLazyGetAllNotificationsByIdQuery,
  useGetNotificationsByServiceIdQuery,
  useViewNotificationsByUserIdQuery,
  useLazyViewNotificationsByUserIdQuery,
  useGetNotificationsByNotificationIdQuery,
} = ChatApi;
