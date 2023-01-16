import { BusinessesChartCard } from "components/cards";
import AnalyticsChart from "components/cards/businessesChart/analyticsChart";
import StatusCard from "components/cards/StaffStatusCard/StaffStatusCard";
import { ApplicationTable } from "components/Staff/Tables";
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
import { subMonths, isWithinInterval, compareAsc } from "date-fns";
import numeral from "numeral";
import { StaffContainer, StatusCardContainer } from "./styled";

const StaffDashboard = (props) => {
	const [allApplications, setAllApplications] = useState([]);
	const [launchToUser, setLaunchToUser] = useState();

	const allLaunches = useGetAllLaunchQuery();
	const allSubmittedLaunches = useGetSubmittedLaunchQuery();
	const allApprovedLaunches = useGetApprovedLaunchQuery();
	const allRejectedLaunches = useGetRejectedLaunchQuery();
	const allDraftLaunches = useGetDraftLaunchQuery();
	const allUsers = useGetAllUsersQuery();

	// const location = useLocation();

	// Get user data information
	const userInfo = useSelector((store) => store.UserDataReducer.userInfo);
	let firstName_raw = userInfo?.first_name;
	let firstName =
		firstName_raw?.charAt(0)?.toUpperCase() + firstName_raw?.slice(1);
	let newUser = userInfo?.newUser;

	// Get all users submitted launch requests
	useEffect(() => {
		setAllApplications(
			allLaunches.data &&
				[...allLaunches?.data]
					.sort((a, b) =>
						compareAsc(new Date(a.createdAt), new Date(b.createdAt))
					)
					.slice(0, 30)
					.map((application, index) => {
						console.log(application.registrationStatus);
						return {
							id: index + 1,
							name:
								launchToUser.get(`${application.launchCode}`) ||
								"Tunde Ednot",
							//TODO: we are not getting the registerers name from the backend
							type: application.registrationType,
							country: application.registrationCountry,
							status: application.registrationStatus,
							date: application?.createdAt.slice(0, 10),
						};
					})
		);
	}, [allLaunches, launchToUser]);

	useEffect(() => {
		setLaunchToUser(ParseUsers(allUsers?.data?.users || []));
	}, [allUsers?.data?.users]);

	// I am filtering last month data on the frontend, can slow things down as data increases, would advice backend
	const getLastMonthDataLength = (array) => {
		const today = new Date();
		const priorMonth = subMonths(today, 1);

		array = array ? array : [];

		return array.filter((item) =>
			isWithinInterval(new Date(item.createdAt), {
				start: priorMonth,
				end: today,
			})
		);
	};

	const calculatePercentageIncrease = (total, number) => {
		return (number / total) * 100;
	};

	const getPercentage = (array) => {
		// console.log(array);

		return numeral(
			calculatePercentageIncrease(
				array?.length,
				getLastMonthDataLength(array).length
			)
		).format("0[.]0");
	};

	const ParseUsers = (usersArray) => {
		let launchToOwner = new Map();

		for (const user of usersArray) {
			const launches = [
				...user.draft_launch_requests,
				...user.completed_launch_requests,
				...user.submitted_launch_requests,
			];
			for (const launch of launches) {
				launchToOwner.set(
					launch,
					`${user.first_name} ${user.last_name}`
				);
			}
		}

		return launchToOwner;
	};

	// if (!allLaunches.isLoading && !allUsers.isLoading) {
	// 	console.log(allLaunches?.data);
	// 	console.log(ParseUsers(allUsers?.data?.users || []));
	// }

	const analytics = {
		title: "User Analytics",
		options: ["All time", 1, 2, 3, 4, 5, 6, 7],
		status1: {
			text: "Total Users",
			total: allUsers?.data?.users.length || 0,
			color: "rgba(255, 255, 255, 0.4)",
		},
		status2: {
			text: "Registrations",
			total: allLaunches?.data?.length || 0,
			color: "#ffffff",
		},
	};

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
						totalPercentageIncrease={getPercentage(
							allLaunches?.data
						)}
						draftPercentageIncrease={getPercentage(
							allDraftLaunches?.data
						)}
						approvedPercentageIncrease={getPercentage(
							allApprovedLaunches?.data
						)}
						awaitingPercentageIncrease={getPercentage(
							allSubmittedLaunches?.data
						)}
						rejectedPercentageIncrease={getPercentage(
							allRejectedLaunches?.data
						)}
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
