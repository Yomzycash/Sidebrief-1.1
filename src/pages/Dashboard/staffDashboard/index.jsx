import { BusinessesChartCard } from "components/cards";
import AnalyticsChart from "components/cards/businessesChart/analyticsChart";
import StatusCard from "components/cards/StatusCard/StaffStatusCard";
import { ApplicationTable } from "components/Staff/Tables";
import { MockData } from "components/Staff/Tables/ApplicationTable/constants";
import DashboardSection from "layout/DashboardSection";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
	useGetAllLaunchQuery,
	useGetApprovedLaunchQuery,
	useGetDraftLaunchQuery,
	useGetRejectedLaunchQuery,
	useGetSubmittedLaunchQuery,
} from "services/staffService";
import { StaffContainer, StatusCardContainer } from "./styled";

const StaffDashboard = (props) => {
	const [allApplications, setAllApplications] = useState([]);

	const allLaunches = useGetAllLaunchQuery();
	const allSubmittedLaunches = useGetSubmittedLaunchQuery();
	const allApprovedLaunches = useGetApprovedLaunchQuery();
	const allRejectedLaunches = useGetRejectedLaunchQuery();
	const allDraftLaunches = useGetDraftLaunchQuery();

	const location = useLocation();

	let hideSearch = location.pathname.includes("/dashboard/rewards");

	// Get user data information
	const userInfo = useSelector((store) => store.UserDataReducer.userInfo);
	let firstName_raw = userInfo?.first_name;
	let firstName =
		firstName_raw?.charAt(0)?.toUpperCase() + firstName_raw?.slice(1);
	let newUser = userInfo?.newUser;

	// Get all users submitted launch requests
	useEffect(() => {
		console.log(allSubmittedLaunches?.data);
		setAllApplications(
			allSubmittedLaunches &&
				allSubmittedLaunches?.data?.map((application, index) => {
					return {
						id: index + 1,
						name: "Ismael Hassan",
						type: application.registrationType,
						country: application.registrationCountry,
						status: application.registrationStatus,
						date: application?.createdAt.slice(0, 10),
					};
				})
		);
	}, [allSubmittedLaunches?.data]);

	return (
		<StaffContainer>
			<DashboardSection
				title={
					newUser
						? `Welcome to Sidebrief${
								firstName ? ", " + firstName : ""
						  }`
						: `Welcome back${firstName ? ", " + firstName : ""}`
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
					/>
				</StatusCardContainer>
			</DashboardSection>
			<DashboardSection>
				<BusinessesChartCard analytics={analytics} staff />
				<AnalyticsChart />
			</DashboardSection>
			<DashboardSection>
				<ApplicationTable data={allApplications} />
			</DashboardSection>
		</StaffContainer>
	);
};

export default StaffDashboard;

const analytics = {
	title: "User Analytics",
	options: ["All time", 1, 2, 3, 4, 5, 6, 7],
	status1: {
		text: "Total Users",
		total: 825,
		color: "rgba(255, 255, 255, 0.4)",
	},
	status2: {
		text: "Registrations",
		total: 450,
		color: "#ffffff",
	},
};
