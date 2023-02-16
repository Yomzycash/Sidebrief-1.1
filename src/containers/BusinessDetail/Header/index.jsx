import {
	Container,
	BackContainer,
	Text,
	Top,
	TitleContainer,
	TopInfo,
	CompanyName,
	LHS,
	RHS,
	BottomInfo,
	UserName,
	DotSeperator,
	DateText,
	DeleteButton,
	SubHeader,
	SearchAndSort,
	StatusType,
	MessageCount,
} from "./styles";
import { FiArrowLeft } from "react-icons/fi";
import { StatusIndicator } from "components/Indicators";
import { RedTrash } from "asset/svg";
import ActiveNav from "components/navbar/ActiveNav";
import { Search } from "./Search";
import { SortDropdown } from "./SortDropdown";
import { Dialog } from "@mui/material";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { HiX } from "react-icons/hi";
import {
	useViewLaunchRequestQuery,
	useDeleteLaunchRequestMutation,
} from "services/launchService";
import { useDeleteLaunchRequestStaffMutation } from "services/staffService";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import styled from "styled-components";
import { CheckoutController } from "containers/Checkout";
import { CommonButton } from "components/button";
import { Mail } from "asset/svg";

export const Header = ({ isStaff }) => {
	const [subHeaderHovered, setSubHeaderHovered] = useState(false);
	const [deleteLaunch, deleteState] = useDeleteLaunchRequestMutation();
	const [deleteLaunchStaff, deleteLaunchStaffState] =
		useDeleteLaunchRequestStaffMutation();
	const [openModal, setOpenModal] = useState(false);

	const { code } = useParams();
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const launchResponse = useSelector(
		(store) => store.LaunchReducer.launchResponse
	);

	const { first_name, last_name } = useSelector(
		(store) => store.UserDataReducer.userInfo
	);

	const launchRequest = useViewLaunchRequestQuery(launchResponse);
	const page = pathname.split("/").pop();

	const handleClick = () => {
		setOpenModal(true);
	};

	// when launch is submitted and userside
	const noDelete =
		!isStaff && launchRequest?.data?.registrationStatus === "submitted";

	const deleteAction = async () => {
		// perform delete action here
		if (!isStaff) {
			await deleteLaunch({
				launchCode: launchResponse.launchCode,
			});
		} else {
			await deleteLaunchStaff({
				launchCode: launchResponse.launchCode,
			});
		}

		navigate(
			isStaff
				? `/${"staff-dashboard"}/businesses/registration/${
						launchRequest.isLoading
							? `all`
							: launchRequest.data.registrationStatus ===
							  "pending"
							? `pending`
							: launchRequest.data.registrationStatus ===
							  "submitted"
							? "awaiting-approval"
							: "all"
				  }`
				: `/${"dashboard"}/businesses/${
						launchRequest.isLoading
							? `all-businesses`
							: launchRequest.data.registrationStatus ===
							  "pending"
							? `draft-applications`
							: launchRequest.data.registrationStatus ===
							  "submitted"
							? "submitted-applications"
							: null
				  }`
		);
		setOpenModal(false);
	};

	const handleNo = () => {
		setOpenModal(false);
	};

	const triggerSearch = (query) => {
		// perform search filter here
	};

	const navigateToMessages = () => {
		if (isStaff) {
			navigate(`/staff-dashboard/businesses/services/chats/${code}`);
		} else {
			const path = pathname.split("/").slice(0, -3).join("/");
			navigate(`${path}/chat/${code}`);
		}
	};

	const getStatus = (stat) => {
		switch (stat) {
			case "pending":
				return {
					text: "draft",
					color: "#00A2D4",
				};
			case "submitted":
				return {
					text: "submitted",
					color: "#D400CC",
				};
			default:
				return {
					text: stat,
					color: "black",
				};
		}
	};

	const subHeader = useRef();

	useEffect(() => {
		const subHeaderContainer = subHeader.current;
		// Listen to the mouse wheel event
		subHeaderContainer.addEventListener("wheel", (e) => {
			e.preventDefault();
			subHeaderContainer.scrollLeft += e.deltaY;
		});

		return () => {
			subHeaderContainer.removeEventListener("wheel", () => {});
		};
	}, []);

	return (
		<Container>
			<Top>
				<BackContainer
					to={
						isStaff
							? `/${"staff-dashboard"}/businesses/registration/${
									launchRequest?.isLoading
										? `all`
										: launchRequest?.data
												?.registrationStatus ===
										  "pending"
										? `pending`
										: launchRequest?.data
												?.registrationStatus ===
										  "submitted"
										? "awaiting-approval"
										: "all"
							  }`
							: `/${"dashboard"}/businesses/${
									launchRequest?.isLoading
										? `all-businesses`
										: launchRequest?.data
												?.registrationStatus ===
										  "pending"
										? `draft-applications`
										: launchRequest?.data
												?.registrationStatus ===
										  "submitted"
										? "submitted-applications"
										: null
							  }`
					}
				>
					<FiArrowLeft color="#151717" size={24} />
					<Text>Back to Applications</Text>
				</BackContainer>
				<TitleContainer>
					<LHS>
						<TopInfo>
							{launchRequest?.data?.businessNames && (
								<CompanyName>
									{launchRequest?.isLoading
										? `--`
										: Object.values(
												launchRequest?.data
													?.businessNames
										  )[0]}
								</CompanyName>
							)}
							{/* Status */}
							<StatusType>
								<StatusIndicator
									status={getStatus(
										launchRequest?.isLoading
											? `--`
											: launchRequest?.data
													?.registrationStatus
									)}
								/>
								{/* Type */}
								<StatusIndicator
									status={{
										text: launchRequest?.isLoading
											? `--`
											: launchRequest?.data
													?.registrationType,
										color: "#00A2D4",
									}}
								/>
							</StatusType>
							<CommonButton
								text={"Messages"}
								classname="transbutton"
								LeftIcon={Mail}
								component={<MessageCount>1</MessageCount>}
								action={navigateToMessages}
							/>
						</TopInfo>
						<BottomInfo>
							<UserName>{`${first_name} ${last_name}`}</UserName>
							<DotSeperator />
							<DateText>
								{launchRequest?.isLoading
									? `--`
									: format(
											new Date(
												launchRequest?.data?.createdAt
											),
											"do MMMM yyyy"
									  )}
							</DateText>
						</BottomInfo>
					</LHS>
					<RHS>
						{/* <CommonButton
							text={"Messages"}
							classname="transbutton"
							LeftIcon={Mail}
							component={<MessageCount>1</MessageCount>}
						/> */}
						{!noDelete ? (
							<DeleteButton onClick={handleClick}>
								<p>Delete</p>
								<RedTrash />
							</DeleteButton>
						) : null}
					</RHS>
				</TitleContainer>
			</Top>
			<SubHeader
				ref={subHeader}
				onMouseEnter={() => setSubHeaderHovered(true)}
				onMouseLeave={() => setSubHeaderHovered(false)}
				$hovered={subHeaderHovered}
			>
				<ActiveNav
					text={"Business Information"}
					// total={0}
					path={`/${
						isStaff ? "staff-dashboard" : "dashboard"
					}/business/${code}/detail`}
				/>
				<ActiveNav
					text={"Shareholders"}
					total={
						launchRequest?.isLoading
							? 0
							: launchRequest?.data?.businessShareholders?.length
					}
					path={`/${
						isStaff ? "staff-dashboard" : "dashboard"
					}/business/${code}/shareholders`}
				/>
				<ActiveNav
					text={"Directors"}
					total={
						launchRequest?.isLoading
							? 0
							: launchRequest?.data?.businessDirectors?.length
					}
					path={`/${
						isStaff ? "staff-dashboard" : "dashboard"
					}/business/${code}/directors`}
				/>
				<ActiveNav
					text={"Beneficiaries"}
					total={
						launchRequest?.isLoading
							? 0
							: launchRequest?.data?.businessBeneficialOwners
									?.length
					}
					path={`/${
						isStaff ? "staff-dashboard" : "dashboard"
					}/business/${code}/beneficiaries`}
				/>
			</SubHeader>
			{page !== "detail" ? (
				<SearchAndSort>
					{/* placeholder changes based on the page it's on */}
					{/* not implemented yet */}
					<Search triggerSearch={triggerSearch} page={page} />
					<SortDropdown />
				</SearchAndSort>
			) : null}
			<Dialog open={openModal} fullWidth maxWidth="sm">
				<ModalWrapper>
					<TopContent>
						<CloseWrapper onClick={() => setOpenModal(false)}>
							<HiX size={20} />
						</CloseWrapper>
					</TopContent>

					<Question>
						Do you want to Delete this Application ?
					</Question>
					<ModalButton>
						<CheckoutController
							backAction={handleNo}
							backText={"No"}
							forwardAction={deleteAction}
							forwardText={"Yes"}
							forwardLoading={
								deleteState.isLoading ||
								deleteLaunchStaffState.isLoading
							}
						/>
					</ModalButton>
				</ModalWrapper>
			</Dialog>
		</Container>
	);
};
const ModalWrapper = styled.div`
	display: flex;
	align-items: center;
	padding: 40px 0px;
	flex-flow: column;
`;

const ModalButton = styled.div`
	display: flex;
	width: 80%;
`;

const Question = styled.p`
	font-size: clamp(16px, 1.5vw, 20px);
	margin-bottom: 20px;
`;
const TopContent = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
	width: 80%;
`;

const CloseWrapper = styled.div`
	display: flex;
	justify-content: center;
	cursor: pointer;
	align-items: center;
	padding: 10px;
	border-radius: 100%;
	background-color: #d7d7d7;
	margin-bottom: 20px;
`;
