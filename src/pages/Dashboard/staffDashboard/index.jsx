import { BusinessesChartCard } from "components/cards";
import AnalyticsChart from "components/cards/businessesChart/analyticsChart";
import StatusCard from "components/cards/StaffStatusCard/StaffStatusCard";
import DashboardSection from "layout/DashboardSection";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";
import {
  useGetAllLaunchQuery,
  useGetApprovedLaunchQuery,
  useGetDraftLaunchQuery,
  useGetRejectedLaunchQuery,
  useGetSubmittedLaunchQuery,
  useGetAllUsersQuery,
} from "services/staffService";
import { StaffContainer, StatusCardContainer } from "./styled";
// import { compareAsc } from "date-fns";
import { getPercentage } from "utils/staffHelper";
import { useLocation } from "react-router-dom";
import { referralOptions } from "utils/config";

const StaffDashboard = (props) => {
  // const [allApplications, setAllApplications] = useState([]);
  // const [launchToUser, setLaunchToUser] = useState();

  const allLaunches = useGetAllLaunchQuery();
  const allSubmittedLaunches = useGetSubmittedLaunchQuery();
  const allApprovedLaunches = useGetApprovedLaunchQuery();
  const allRejectedLaunches = useGetRejectedLaunchQuery();
  const allDraftLaunches = useGetDraftLaunchQuery();
  const allUsers = useGetAllUsersQuery();
  const { state } = useLocation();

  // const location = useLocation();

  // Get user data information
  const userInfo = useSelector((store) => store.UserDataReducer.userInfo);
  let firstName_raw = userInfo?.first_name;
  let firstName = firstName_raw?.charAt(0)?.toUpperCase() + firstName_raw?.slice(1);
  let alreadyUser = state;

  // console.log("userInfo", userInfo )

  const realReferral = {};

  referralOptions
    .map((option) => option.value)
    .forEach((item) => {
      realReferral[item] = 0;
    });

  const allReferrals = {};

  if (allUsers.isSuccess) {
    allUsers.data.users.forEach((user) => {
      if (user.referral_code) {
        if (allReferrals[user.referral_code]) {
          allReferrals[user.referral_code] = allReferrals[user.referral_code] + 1;
        } else {
          allReferrals[user.referral_code] = 1;
        }
      }
    });
  }

  const fields = Object.keys(allReferrals);

  fields.forEach((item) => {
    switch (item) {
      case "facebook":
      case "Facebook":
        realReferral["Facebook"] = realReferral["Facebook"] + allReferrals[item];
        break;
      case "Instagram":
        realReferral["Instagram"] = realReferral["Instagram"] + allReferrals[item];
        break;
      case "Twitter":
        realReferral["Twitter"] = realReferral["Twitter"] + allReferrals[item];
        break;
      case "Bus Ad":
        realReferral["Bus Ad"] = realReferral["Bus Ad"] + allReferrals[item];
        break;
      case "Bill board":
        realReferral["Bill board"] = realReferral["Bill board"] + allReferrals[item];
        break;
      case "google":
      case "Google":
      case "Chrome":
        realReferral["Google"] = realReferral["Google"] + allReferrals[item];
        break;
      case "LinkedIn":
      case "Linkin":
        realReferral["LinkedIn"] = realReferral["LinkedIn"] + allReferrals[item];
        break;
      case "Radio":
        realReferral["Radio"] = realReferral["Radio"] + allReferrals[item];
        break;
      default:
        if (
          item.toLowerCase().includes("recommend") ||
          item.toLowerCase().includes("friend") ||
          item.toLowerCase().includes("referral") ||
          item.toLowerCase().includes("through")
        ) {
          realReferral["Recommendation"] = realReferral["Recommendation"] + allReferrals[item];
        } else if (item.toLowerCase().includes("google")) {
          realReferral["Google"] = realReferral["Google"] + allReferrals[item];
        } else {
          realReferral["Other"] = realReferral["Other"] + allReferrals[item];
        }
        break;
    }
  });

  const referralColors = {
    Facebook: "#3b5998",
    Instagram: "#c32aa3",
    Twitter: "#1da1f2",
    LinkedIn: "#5e44ac",
    Google: "#34a853",
    "Bus Ad": "#93a82e",
    Radio: "#28b28f",
    "Bill board": "#d79db2",
    Recommendation: "#db0d35",
    Other: "#c37916",
  };

  const analytics = {
    title: "User Analytics",
    options: ["All time", 1, 2, 3, 4, 5, 6, 7],
    data: [
      {
        text: "Total Users",
        total: allUsers?.data?.users.length || 0,
        color: "#ffffff66",
      },
      {
        text: "Registrations",
        total: allLaunches?.data?.length || 0,
        color: "#ffffff",
      },
    ],
  };

  const referralAnalytics = {
    title: "Referral Analytics",
    data: Object.keys(realReferral).map((key) => {
      return {
        text: key,
        total: realReferral[key],
        color: referralColors[key] || "#fe730a",
      };
    }),
  };

  return (
    <StaffContainer>
      <DashboardSection
        title={
          alreadyUser
            ? `Welcome back${firstName ? ", " + firstName : ""}`
            : `Welcome to Sidebrief${firstName ? ", " + firstName : ""}`
        }
        nowrap
      >
        <StatusCardContainer>
          <StatusCard
            total={allLaunches?.data?.length}
            draft={allDraftLaunches?.data?.length}
            approved={allApprovedLaunches?.data?.length}
            awaiting={allSubmittedLaunches?.data?.length}
            rejected={allRejectedLaunches?.data?.length}
            totalPercentageIncrease={getPercentage(allLaunches?.data)}
            draftPercentageIncrease={getPercentage(allDraftLaunches?.data)}
            approvedPercentageIncrease={getPercentage(allApprovedLaunches?.data)}
            awaitingPercentageIncrease={getPercentage(allSubmittedLaunches?.data)}
            rejectedPercentageIncrease={getPercentage(allRejectedLaunches?.data)}
          />
        </StatusCardContainer>
      </DashboardSection>
      
      <DashboardSection>
        <BusinessesChartCard analytics={analytics} staff noTotal />
        <AnalyticsChart data={allLaunches?.data || []} />
      </DashboardSection>

      <DashboardSection>
        <BusinessesChartCard analytics={referralAnalytics} staff noTotal />
      </DashboardSection>
    </StaffContainer>
  );
};

export default StaffDashboard;
