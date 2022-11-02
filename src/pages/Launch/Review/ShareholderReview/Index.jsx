import { CheckoutController, CheckoutSection } from "containers";
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Container } from "../styled";
import styled from "styled-components";
import { ReviewTab } from "utils/config";
import LaunchSummaryCard from "components/cards/LaunchSummaryCard";
import HeaderCheckout from "components/Header/HeaderCheckout";
import { useSelector } from "react-redux";
import { ReactComponent as EditIcon } from "asset/Launch/Edit.svg";
import { store } from "redux/Store";
import { setCheckoutProgress } from "redux/Slices";
import ReviewCard from "components/cards/ReviewCard";
import {
	useViewMembersKYCMutation,
	useViewMembersMutation,
	useViewShareholdersMutation,
} from "services/launchService";
import AppFeedback from "components/AppFeedback";
import { mergeInfo } from "utils/LaunchHelper";
import { Puff } from "react-loading-icons";

const ShareholderReview = () => {
  const ActiveStyles = {
    color: "#151717",
    borderBottom: "4px solid #00A2D4",
    borderRadius: 0,
  };
  const [shareholderInfo, setShareholderInfo] = useState([]);
  const [shareholdersKycInfo, setShareholdersKycInfo] = useState([]);
  const [members, setMembers] = useState([]);
  const [mergedResponse, setMergedResponse] = useState([]);
  const LaunchApplicationInfo = useSelector((store) => store.LaunchReducer);
  //console.log(LaunchApplicationInfo)
  // getting the shareholder container from store
  const shareholderDocumentContainer = useSelector(
    (state) => state.LaunchReducer.shareholderDocs
  );
  const navigate = useNavigate();
  const handleNext = () => {
    navigate("/launch/review-director");
    store.dispatch(setCheckoutProgress({ total: 13, current: 11 })); // total- total pages and current - current page
  };
  const handlePrev = () => {
    navigate(-1);
  };
  const LaunchInfo = useSelector((store) => store.LaunchReducer);
  const { launchResponse } = LaunchInfo;
  const [viewShareholders, viewShareholderState] =
    useViewShareholdersMutation();
  const [viewShareholdersKyc] = useViewMembersKYCMutation();
  const [viewMembers, viewMembersState] = useViewMembersMutation();
  const [viewMemberKYC] = useViewMembersKYCMutation();

	const handleNavigate = () => {
		navigate("/launch/shareholders-info");
	};

	const handleMerge = async () => {
		let memberInfo = await viewMembers(launchResponse);
		let newMemberInfo = [...memberInfo.data.businessMembers];

		let shareholderInfo = await viewShareholders(launchResponse);
		let newShareHolderInfo = [...shareholderInfo.data.businessShareholders];

		let titlesMembersMerged = [];
		newShareHolderInfo.forEach((title) => {
			newMemberInfo.forEach((member) => {
				shareholderDocumentContainer.forEach((store) => {
					if (
						member.memberCode === title.memberCode &&
						title.memberCode === store.code
					) {
						let merged = { ...title, ...member, ...store };
						titlesMembersMerged.push(merged);
					}
				});
			});
		});

		// let newMerge = mergeInfo(newShareHolderInfo, newMemberInfo);
		setMergedResponse(titlesMembersMerged);

		// return newMerge;
	};

	useEffect(() => {
		handleMerge();
	}, [shareholderDocumentContainer]);

	let shareholderLocalStorage = JSON.parse(
		localStorage.getItem("localShareholderInfo")
	);

	console.log("package from local", shareholderLocalStorage);
	return (
		<>
			<Container>
				<HeaderCheckout />
				<Body>
					<CheckoutSection
						title={"Review Information"}
						HeaderParagraph="Please ensure all information provided for this business are correct"
					/>
					<Nav>
						{ReviewTab.map((item, index) => (
							<ReviweTabWrapper to={item.path} key={index}>
								<NavLink
									to={item.path}
									style={({ isActive }) =>
										isActive ? ActiveStyles : {}
									}
								>
									{item.title}
								</NavLink>
							</ReviweTabWrapper>
						))}
					</Nav>
					<ContentWrapper>
						<EditWrapper onClick={handleNavigate}>
							<EditIcon />
							<EditText>Edit Shareholder Information</EditText>
						</EditWrapper>
					</ContentWrapper>

					{viewShareholderState.isLoading ||
						(viewMembersState.isLoading && (
							<Loading height="50vh">
								<Puff stroke="#00A2D4" fill="white" />
							</Loading>
						))}

          <CardWrapper>
            {mergedResponse.map((shareholder, index) => (
              <ReviewCard
                key={index}
                number={index + 1}
                name={shareholder?.memberName}
                shares={shareholder?.shareholderOwnershipType}
                email={shareholder?.memberEmail}
                phone={shareholder?.memberPhone}
                sharesPercentage={shareholder?.shareholderOwnershipPercentage}
                icon
                memberCode={shareholder?.memberCode}
                government={shareholder.files.government_id}
                proof={shareholder.files.proof_of_home_address}
                passport={shareholder.files.passport_photograph}
              />
            ))}{" "}
          </CardWrapper>
          <ButtonWrapper>
            <CheckoutController
              backText={"Previous"}
              forwardText={"Proceed"}
              forwardAction={handleNext}
              backAction={handlePrev}
            />
          </ButtonWrapper>
        </Body>
        <AppFeedback subProject="Shareholder review" />
      </Container>
    </>
  );
};

export default ShareholderReview;

const Nav = styled.nav`
	background: #ffffff;
	width: 100%;
	border-width: 1px;
	border-style: solid;
	border-color: #edf1f7;
	padding: 20px 40px 0px 40px;
	display: flex;
	align-items: center;
	gap: 24px;
	overflow-x: auto;
	overflow-y: hidden;
`;
const ReviweTabWrapper = styled.div`
	display: flex;
	flex: 1;

	> a {
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		padding: 7px 10px;
		transition: 0.3s all ease;
		padding-bottom: 20px;

		border: none;

		margin: 0;
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 24px;
		color: #959697;
		white-space: nowrap;
	}
`;
const ContentWrapper = styled.div`
	width: 100%;
	padding: 40px 40px 0px;
`;
const EditWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
	gap: 16px;
	cursor: pointer;
`;

const EditText = styled.div`
	font-weight: 500;
	font-size: 16px;
	line-height: 27px;
	color: #00a2d4;
`;
const CardWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 40px;
	gap: 40px;
`;
const ButtonWrapper = styled.div`
	display: flex;
	width: 100%;
	padding: 40px;
`;
const Body = styled.form`
	display: flex;
	flex-flow: column;
	height: 100%;
	margin: auto;
	width: 100%;
	max-width: 962px;
	background-color: white;
	border: 1px solid #edf1f6;
	border-top: none;
	flex: 1;
	padding-bottom: 50px;
	border-top: none;
`;

export const Loading = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	padding: 40px;
	height: ${({ height }) => height && height};
`;
