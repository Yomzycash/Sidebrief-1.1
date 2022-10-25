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
} from "./styles";
import { FiArrowLeft } from "react-icons/fi";
import { StatusIndicator } from "components/Indicators";
import { RedTrash } from "asset/svg";
import ActiveNav from "components/navbar/ActiveNav";
import { Search } from "./Search";
import { SortDropdown } from "./SortDropdown";
import { useLocation, useParams } from "react-router-dom";
import { useViewLaunchRequestQuery } from "services/launchService";
import { useSelector } from "react-redux";

export const Header = () => {
	const { code } = useParams();
	const { pathname } = useLocation();
	const launchResponse = useSelector(
		(store) => store.LaunchReducer.launchResponse
	);
	const { first_name, last_name } = useSelector(
		(store) => store.UserDataReducer.userInfo
	);

	const launchRequest = useViewLaunchRequestQuery(launchResponse, {
		refetchOnMountOrArgChange: true,
	});

	if (launchRequest.isSuccess) {
		console.log(launchRequest.data);
	}

	const page = pathname.split("/").pop();

	const deleteAction = () => {
		// perform delete action here
	};

	const triggerSearch = (query) => {};

	const getStatus = (stat) => {
		switch (stat) {
			case "pending":
				return {
					text: "draft",
					color: "#00A2D4",
				};
			case "submitted":
				return {
					text: "pending",
					color: "#D400CC",
				};
			default:
				return {
					text: stat,
					color: "black",
				};
		}
	};

	return (
		<Container>
			<Top>
				<BackContainer to="/dashboard/businesses">
					<FiArrowLeft color="#151717" size={24} />
					<Text>Back to Applications</Text>
				</BackContainer>
				<TitleContainer>
					<LHS>
						<TopInfo>
							<CompanyName>
								{launchRequest.isLoading
									? `--`
									: Object.values(
											launchRequest.data.businessNames
									  )[0]}
							</CompanyName>
							{/* Status */}
							<StatusIndicator
								status={getStatus(
									launchRequest.isLoading
										? `--`
										: launchRequest.data.registrationStatus
								)}
							/>
							{/* Type */}
							<StatusIndicator
								status={{
									text: launchRequest.isLoading
										? `--`
										: launchRequest.data.registrationType,
									color: "#00A2D4",
								}}
							/>
						</TopInfo>
						<BottomInfo>
							<UserName>{`${first_name} ${last_name}`}</UserName>
							<DotSeperator />
							<DateText>28th August 2022</DateText>
						</BottomInfo>
					</LHS>
					<RHS>
						<DeleteButton onClick={deleteAction}>
							<p>Delete</p>
							<RedTrash />
						</DeleteButton>
					</RHS>
				</TitleContainer>
			</Top>
			<SubHeader>
				<ActiveNav
					text={"Business Information"}
					// total={0}
					path={`/dashboard/business/${code}/detail`}
				/>
				<ActiveNav
					text={"Shareholders"}
					total={
						launchRequest.isLoading
							? 0
							: launchRequest.data.businessShareholders.length
					}
					path={`/dashboard/business/${code}/shareholders`}
				/>
				<ActiveNav
					text={"Directors"}
					total={
						launchRequest.isLoading
							? 0
							: launchRequest.data.businessDirectors.length
					}
					path={`/dashboard/business/${code}/directors`}
				/>
				<ActiveNav
					text={"Beneficiaries"}
					total={
						launchRequest.isLoading
							? 0
							: launchRequest.data.businessBeneficialOwners.length
					}
					path={`/dashboard/business/${code}/beneficiaries`}
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
		</Container>
	);
};
