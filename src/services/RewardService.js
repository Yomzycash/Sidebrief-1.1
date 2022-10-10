import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const RewardApi = createApi({
  reducerPath: "RewardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.sidebrief.com/",
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

  tagTypes: ["RewardApi"],

  endpoints: (builder) => ({
    // get all rewards
    getAllRewards: builder.query({
      query: () => "/reward/getall",
    }),

    //get user reward
    getUserReward: builder.query({
      query: () => "user/rewards/claimed",
    }),

    //view reward
    viewReward: builder.mutation({
      query: (values) => ({
        url: "/reward/getbycode",
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["Reward"],
    }),

    //get rewards by category
    getRewardsByCategory: builder.mutation({
      query: (values) => ({
        url: "reward/getbycategory",
        method: "POST",
        body: values,
      }),
    }),
    inavlidatesTags: ["Reward"],
  }),
});
export const {
  useGetAllRewardsQuery,
  useGetUserRewardQuery,
  useViewRewardMutation,
  useGetRewardsByCategoryMutation,
} = RewardApi;