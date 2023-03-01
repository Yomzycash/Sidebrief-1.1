import { useEffect, useState } from "react";
import { SummaryCard } from "components/cards";
import ActiveNav from "components/navbar/ActiveNav";
import Search from "components/navbar/Search";
import React from "react";
import styled from "styled-components";
import { ReactComponent as ExportIcon } from "../../../../../asset/svg/ExportIcon.svg";
import { ReactComponent as NoteIcon } from "../../../../../asset/images/note.svg";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
	useGetAllLaunchQuery,
	useGetApprovedLaunchQuery,
	useGetDraftLaunchQuery,
	useGetRejectedLaunchQuery,
	useGetSubmittedLaunchQuery,
} from "services/staffService";
import { store } from "redux/Store";
import { setRefreshApp } from "redux/Slices";
import { useSelector } from "react-redux";

const Registrationlayout = () => {
	const navigate = useNavigate();
	const [allReg, setAllReg] = useState([]);
	const [awaitingReg, setAwaiting] = useState([]);

	const allLaunch = useGetAllLaunchQuery();

	const awaitingLaunch = useGetSubmittedLaunchQuery();

	const rejectedLaunch = useGetRejectedLaunchQuery();

	const pendingLaunch = useGetDraftLaunchQuery();

	const approvedLaunch = useGetApprovedLaunchQuery();
	let all = allLaunch?.currentData?.length;
	let awaiting = awaitingLaunch?.currentData?.length;
	let rejected = rejectedLaunch?.currentData?.length;
	let pending = pendingLaunch?.currentData?.length;
	let approved = approvedLaunch?.currentData?.length;

	const { refreshApp, unreadLaunchNotifications } = useSelector(
		(store) => store.UserDataReducer
	);

	// console.log(awaitingLaunch);

	useEffect(() => {
		setAllReg(all ? all : []);
		setAwaiting(awaiting ? awaiting : []);
		store.dispatch(setRefreshApp(!refreshApp));
	}, [all, awaiting, pending, approved]);

	const location = useLocation();

	let home =
		location.pathname === "/staff-dashboard/businesses/registration"
			? true
			: false;

	const searchStyle = {
		borderRadius: "12px",
		backgroundColor: "white",
		width: "100%",
		height: "100%",
	};

	const iconStyle = { width: "17px", height: "17px" };
	return (
		<Container>
			<Header>
				<MainHeader>
					<TopContent>
						<div>
							<PageTitle>Business Registrations</PageTitle>
							<SummaryCard shown={23} total={503} />
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
						<Flex>
							<ExportWrapper>
								<ExportIcon />
								<TitleWrapper>Export Businesses</TitleWrapper>
							</ExportWrapper>
							<ButtonWrapper onClick={() => navigate("/launch")}>
								<button>
									<NoteIcon />
									Start Business Registration
								</button>
							</ButtonWrapper>
						</Flex>
					</BottomContent>
				</MainHeader>
				<SubHeader>
					<ActiveNav
						text="All"
						total={allReg}
						status={unreadLaunchNotifications?.length > 0}
						path={"/staff-dashboard/businesses/registration/all"}
						defaultActive={home}
					/>
					{/* <ActiveNav
						text="Paid draft"
						total={12}
						path={
							"/staff-dashboard/businesses/registration/paid-draft"
						}
					/> */}
					<ActiveNav
						text="Drafts"
						total={pending}
						path="/staff-dashboard/businesses/registration/pending"
					/>
					<ActiveNav
						text="Submitted"
						total={awaitingReg}
						status={unreadLaunchNotifications?.length > 0}
						path="/staff-dashboard/businesses/registration/awaiting-approval"
					/>
					<ActiveNav
						text="Approved"
						total={approved}
						path="/staff-dashboard/businesses/registration/in-progress"
					/>
					<ActiveNav
						text="Rejected"
						total={rejected}
						path="/staff-dashboard/businesses/registration/rejected"
					/>
				</SubHeader>
			</Header>
			<Outlet />
		</Container>
	);
};

export default Registrationlayout;

const Container = styled.div`
	display: flex;
	flex-flow: column;
	flex: 1;
	margin: 0 40px;

	@media screen and (max-width: 1050px) {
		margin: 0;
	}
`;

const Header = styled.div`
	position: sticky;
	top: 57.1px;
	display: flex;
	flex-flow: column;
	background-color: white;
	z-index: 2;

	@media screen and (max-width: 700px) {
		flex-flow: column-reverse;
	}
`;

const MainHeader = styled.div`
	display: flex;
	flex-flow: column;
	width: 100%;
	padding: 40px 0px;
	gap: 24px;
	/* height: clamp(80px, 10vw, 150px); */
	border: 1px solid #edf1f7;
	border-top: none;
	transition: 0.2s all ease;
	@media screen and (max-width: 700px) {
		padding: 16px 24px 32px 24px !important;
	}
`;

const SubHeader = styled.div`
	display: flex;
	height: clamp(48px, 10vw, 58px);
	gap: 24px;
	border: 1px solid #edf1f7;
	border-top: none;
	width: 100%;
	overflow-x: auto;
	overflow-y: hidden;
	padding-inline: 24px;

	//TODO: maybe hide scroll bar
`;
const SearchWrapper = styled.div`
	max-width: 384px;
	height: 40px;
	width: 100%;
	@media screen and (max-width: 700px) {
		max-width: 100%;
		width: 100%;
	}
`;

const TopContent = styled.div`
	display: flex;
	/* gap: 48px; */
	align-items: center;
	padding-inline: 24px;
	flex: 1;
	justify-content: space-between;

	> div {
		display: flex;
		gap: 48px;
		justify-content: space-between;
	}
	@media screen and (max-width: 700px) {
		display: none;
	}
`;
const PageTitle = styled.div`
	display: flex;
	align-items: center;
	font-size: clamp(20px, 2vw, 24px);
	font-weight: 700;
	color: #151717;
	@media screen and (max-width: 700px) {
		display: none;
	}
`;

const BottomContent = styled.div`
	display: flex;
	align-items: center;
	padding-inline: 24px;
	gap: 60px;
	flex: 1;
	justify-content: space-between;
`;

const Drop = styled.div`
	display: flex;
	border: 1px solid #f1f1f1;
	border-radius: 12px;
	background-color: #fafafa;
	padding: 8px 16px;

	select {
		border: none;
		outline: none;
		width: 60px;
		background: none;
	}
`;
const Flex = styled.div`
	display: flex;
	align-items: center;
	gap: 16px;
`;
const ExportWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 10px 24px;
	gap: 8px;

	width: max-content;
	height: 44px;

	border: 1px solid #00a2d4;
	border-radius: 8px;
	cursor: pointer;
`;
const TitleWrapper = styled.h3`
	font-weight: 500;
	font-size: 14px;
	line-height: 21px;
	display: flex;
	align-items: center;
	text-align: center;
	letter-spacing: -0.5px;
	color: #00a2d4;
`;
const ButtonWrapper = styled.div`
	width: 255px;
	height: 44px;
	cursor: pointer;

	background: #00a2d4;
	border-radius: 8px;
	@media screen and (max-width: 700px) {
		width: 100%;
	}

	button {
		width: 100%;
		height: 100%;
		background-color: #00a2d4;
		border-radius: 8px;
		border: none;
		outline: none;
		color: #ffffff;
		text-align: center;
		font-size: 14px;
		cursor: pointer;
		padding: 10px 24px;
		display: flex;
		align-items: center;
		@media screen and (max-width: 700px) {
			width: 100%;
			display: flex;
			align-items: center !important;
			justify-content: center !important;
		}
	}
`;
// const searchStyle = styled.div`
// 	border-radius: 12px;
// 	background-color: "white";
// 	max-width: 384px;
// 	height: 40px;
// 	@media screen and (max-width: 700px) {
// 		width: 100%;
// 	}
// `;
