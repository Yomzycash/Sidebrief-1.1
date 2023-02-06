import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const ChatApi = createApi({
	reducerPath: "chatApi",
	baseQuery: fetchBaseQuery({
		// the base query used by each endpoint to request data.
		baseUrl: import.meta.env.VITE_DEV_BASE_URL,
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
			query: (notificationId) => ({
				url: `/notifications/update/${notificationId}`,
				method: "POST",
				body: notificationId,
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
				body: notificationId,
				headers: {
					"Content-type": "application/json; charset=UTF-8",
				},
			}),
			invalidatesTags: ["User"],
		}),

		// get all notifications
		getAllNotifications: builder.query({
			query: () => "/notifications/all",
		}),

		// get a notifications by notificationID
		getNotificationsByNotificationId: builder.query({
			query: (notificationID) => `/notifications/view/${notificationID}`,
		}),

		// get all notifications by serviceID
		getNotificationsByServiceId: builder.query({
			query: (serviceID) => `/notifications/service/${serviceID}`,
		}),
	}),
});
export const {
	useAddNotificationMutation,
	useDeleteNotificationMutation,
	useGetAllNotificationsQuery,
	useGetAllNotificationsByIdQuery,
	useGetNotificationsByServiceIdQuery,
	useGetNotificationsByNotificationIdQuery,
} = ChatApi;
