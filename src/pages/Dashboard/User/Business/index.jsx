import TabNavBar from "components/TabNavBar/TabNavBar";
import React, { useEffect, useState } from "react";
import {
	ButtonWrapper,
	PageTitle,
	Container,
	Header,
	SubHeader,
	TopContent,
	BottomContent,
	MainHeader,
	Drop,
} from "./styled";
import image from "../../../../asset/images/coming.png";
import { SummaryCard } from "components/cards";
import Search from "components/navbar/Search";
import ActiveNav from "components/navbar/ActiveNav";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Button from "components/button";
import { ReactComponent as NoteIcon } from "../../../../asset/images/note.svg";
import {
	setBusinessesShown,
	setGeneratedLaunchCode,
	setLaunchResponse,
} from "redux/Slices";
import { store } from "redux/Store";
import {
	useGetUserDraftQuery,
	useGetUserSubmittedQuery,
} from "services/launchService";
import { useSelector } from "react-redux";
import AppFeedback from "components/AppFeedback";
import styled from "styled-components";

const searchStyle = {
	borderRadius: "12px",
	backgroundColor: "white",
	width: "100%",
	height: "100%",
};

const iconStyle = { width: "17px", height: "17px" };

const Business = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const drafts = useGetUserDraftQuery({
		refetchOnMountOrArgChange: true,
	});
	const submitted = useGetUserSubmittedQuery({
		refetchOnMountOrArgChange: true,
	});

	const businessesShown = useSelector(
		(store) => store.BusinessesInfo.businessesShown
	);

	console.log(businessesShown);

	let submittedTotal = submitted?.currentData?.length;
	let draftTotal = drafts?.currentData?.length;

	const handleLaunch = () => {
		// store.dispatch(setGeneratedLaunchCode(""));
		// window.open("/launch", "_blank");
		store.dispatch(setGeneratedLaunchCode(""));
		store.dispatch(setLaunchResponse({}));
		localStorage.removeItem("launchInfo");
		localStorage.removeItem("countryISO");
		window.open("/launch", "_blank");
	};

	// This sets the shown of all rewards
	useEffect(() => {
		if (location.pathname === "/dashboard/businesses/all-businesses")
			store.dispatch(setBusinessesShown({ total: 0, shown: 0 }));
		if (
			location.pathname === "/dashboard/businesses/submitted-applications"
		)
			store.dispatch(
				setBusinessesShown({
					total: submittedTotal,
					shown: submittedTotal,
				})
			);
		if (location.pathname === "/dashboard/businesses/draft-applications")
			store.dispatch(
				setBusinessesShown({ total: draftTotal, shown: draftTotal })
			);
	}, [location.pathname]);

	useEffect(() => {
		// clear the localstorage when this page is entered
		store.dispatch(setGeneratedLaunchCode(""));
		store.dispatch(setLaunchResponse({}));
		localStorage.removeItem("launchInfo");
		localStorage.removeItem("countryISO");
	}, []);

	return (
		<Container>
			<Header>
				<MainHeader>
					<TopContent>
						<div>
							<PageTitle>Businesses</PageTitle>
							<SummaryCard
								shown={businessesShown.shown}
								total={businessesShown.total}
							/>
						</div>
						<Drop>
							<select>
								<option value="Sort">Sort</option>
								<option value="All">All</option>
							</select>
						</Drop>
					</TopContent>
					<BottomContent>
						<SearchWrapper>
							<Search style={searchStyle} iconStyle={iconStyle} />
						</SearchWrapper>
						<ButtonWrapper>
							<button onClick={handleLaunch}>
								<NoteIcon />
								Launch a Business
							</button>
						</ButtonWrapper>
					</BottomContent>
				</MainHeader>
				<SubHeader>
					<ActiveNav
						text="All"
						total={
							submitted.isSuccess && drafts.isSuccess
								? submitted?.currentData.length +
								  drafts?.currentData.length
								: 0
						}
						path={"/dashboard/businesses/all-businesses"}
					/>
					<ActiveNav
						text="Submitted"
						total={
							submitted.isSuccess
								? submitted?.currentData.length
								: 0
						}
						path="/dashboard/businesses/submitted-applications"
					/>
					<ActiveNav
						text="Draft"
						total={
							drafts.isSuccess ? drafts?.currentData.length : 0
						}
						path="/dashboard/businesses/draft-applications"
					/>
				</SubHeader>
			</Header>
			<Outlet />
			{/* <AppFeedback subProject="Businesses" /> */}
		</Container>
	);
};
export default Business;

const SearchWrapper = styled.div`
	max-width: 384px;
	height: 40px;
	width: 100%;
	@media screen and (max-width: 700px) {
		max-width: 100%;
		width: 100%;
	}
`;
