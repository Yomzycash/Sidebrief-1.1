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
	SearchWrapper,
} from "./styled";
import { SummaryCard } from "components/cards";
import Search from "components/navbar/Search";
import ActiveNav from "components/navbar/ActiveNav";
import { SearchResult } from "components/navbar/SearchResult";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
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
	useViewPayLaunchMutation,
} from "services/launchService";
import { useSelector } from "react-redux";
import Fuse from "fuse.js";
import { navigateToDetailPage } from "utils/globalFunctions";

const searchStyle = {
	borderRadius: "12px",
	backgroundColor: "white",
	width: "100%",
	height: "100%",
};

const iconStyle = { width: "17px", height: "17px" };

const Business = () => {
	const [searchValue, setSearchValue] = useState("");
	const [searchFocused, setSearchFocused] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();
	let check = location.pathname.includes("chats");

	const [viewPayLaunch] = useViewPayLaunchMutation();

	const drafts = useGetUserDraftQuery({
		refetchOnMountOrArgChange: true,
	});

	const submitted = useGetUserSubmittedQuery({
		refetchOnMountOrArgChange: true,
	});

	const fuseOptions = {
		shouldSort: true,
		keys: [
			"businessNames.businessName1",
			"businessNames.businessName2",
			"businessNames.businessName3",
			"businessNames.businessName4",
		],
	};

	const allData = [...(drafts.data || []), ...(submitted.data || [])];

	const fuse = new Fuse(allData, fuseOptions);

	const onItemClick = (item) => {
		setSearchFocused(false);
		const launchInfo = {
			launchCode: item.launchCode,
			registrationCountry: item.registrationCountry,
			registrationType: item.registrationType,
		};
		navigateToDetailPage(navigate, launchInfo, viewPayLaunch);
	};

	const businessesShown = useSelector(
		(store) => store.BusinessesInfo.businessesShown
	);

	let submittedTotal = submitted?.currentData?.length;
	let draftTotal = drafts?.currentData?.length;

	const handleLaunch = () => {
		store.dispatch(setGeneratedLaunchCode(""));
		store.dispatch(setLaunchResponse({}));
		localStorage.removeItem("launchInfo");
		localStorage.removeItem("countryISO");
		localStorage.removeItem("paymentDetails");
		navigate("/launch");
	};

	// This sets the shown of all rewards
	useEffect(() => {
		if (location.pathname === "/dashboard/businesses/all-businesses")
			store.dispatch(
				setBusinessesShown({
					total: submittedTotal + draftTotal,
					shown: submittedTotal + draftTotal,
				})
			);
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
	}, [location.pathname, draftTotal, submittedTotal]);

	useEffect(() => {
		// clear the localstorage when this page is entered
		store.dispatch(setGeneratedLaunchCode(""));
		store.dispatch(setLaunchResponse({}));
		localStorage.removeItem("launchInfo");
		localStorage.removeItem("countryISO");
		localStorage.removeItem("paymentDetails");
	}, []);

	return (
		<>
			<Container>
				{!check && (
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
								<SearchWrapper
									onFocus={() => setSearchFocused(true)}
								>
									<Search
										style={searchStyle}
										iconStyle={iconStyle}
										onChange={(value) =>
											setSearchValue(value)
										}
										value={searchValue}
										className={"searchbox"}
									/>
									<SearchResult
										items={fuse
											.search(searchValue)
											.map((el) => {
												return {
													id: el.item.launchCode,
													name:
														el.item.businessNames
															.businessName1 ||
														"no name",
													launchCode:
														el.item.launchCode,
													registrationCountry:
														el.item
															.registrationCountry,
													registrationType:
														el.item
															.registrationType,
												};
											})}
										show={searchFocused}
										unShow={() => setSearchFocused(false)}
										onItemClick={onItemClick}
									/>
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
										? submittedTotal + draftTotal
										: 0
								}
								path={"/dashboard/businesses/all-businesses"}
							/>
							<ActiveNav
								text="Submitted"
								total={submitted.isSuccess ? submittedTotal : 0}
								path="/dashboard/businesses/submitted-applications"
							/>
							<ActiveNav
								text="Draft"
								total={drafts.isSuccess ? draftTotal : 0}
								path="/dashboard/businesses/draft-applications"
							/>
						</SubHeader>
					</Header>
				)}
				<Outlet />
				{/* <AppFeedback subProject="Businesses" /> */}
			</Container>
		</>
	);
};
export default Business;
