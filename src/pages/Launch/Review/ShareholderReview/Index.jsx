import { CheckoutController, CheckoutSection } from "containers";
import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Container } from "../styled";
import styled from "styled-components";
import { ReviewTab } from "utils/config";
import HeaderCheckout from "components/Header/HeaderCheckout";
import { useSelector } from "react-redux";
import { store } from "redux/Store";
import { setCheckoutProgress } from "redux/Slices";
import ReviewCard from "components/cards/ReviewCard";
import {
  useGetAllEntitiesQuery,
  useViewMembersKYCMutation,
  useViewMembersMutation,
  useViewShareholdersMutation,
} from "services/launchService";
import { useEffect } from "react";
import { Puff } from "react-loading-icons";
import { handleCheckDocument, handleMemberCodeMerge, handleMembersCodeMerge } from "../action";

const ShareholderReview = () => {
  const [mergedResponse, setMergedResponse] = useState([]);
  const [mergedDocuments, setMergedDocuments] = useState([]);
  // getting the shareholder container from store
  const shareholderDocumentContainer = useSelector((state) => state.LaunchReducer.shareholderDocs);
  const launchInfo = JSON.parse(localStorage.getItem("launchInfo"));
  const countryISO = localStorage.getItem("countryISO");

  const navigate = useNavigate();
  const location = useLocation();

  const handleNext = () => {
    navigate("/launch/review/directors");
    store.dispatch(setCheckoutProgress({ total: 13, current: 11 })); // total- total pages and current - current page
  };
  const handlePrev = () => {
    navigate(-1);
  };
  const LaunchInfo = useSelector((store) => store.LaunchReducer);
  const { launchResponse } = LaunchInfo;
  const [viewShareholders, viewShareholderState] = useViewShareholdersMutation();
  const [viewMembers, viewMembersState] = useViewMembersMutation();
  const [viewMemberKYC] = useViewMembersKYCMutation();
  const { data } = useGetAllEntitiesQuery(countryISO);
  const [requiredDocuments, setRequiredDocuments] = useState([]);
  const handleNavigate = () => {
    navigate("/launch/shareholders-info");
    localStorage.setItem("navigatedFrom", location.pathname);
  };

  const handleMerge = async () => {
    let memberInfo = await viewMembers(launchResponse);
    let membersUpdatedData = [...memberInfo.data.businessMembers];

    let shareholderInfo = await viewShareholders(launchResponse);
    let shareholdersUpdatedData = [...shareholderInfo.data.businessShareholders];

    // let viewResponse = await viewMemberKYC(launchInfo);
    // let MemberUploadedKYCInfo = [...viewResponse?.data.businessMembersKYC];

    let finalMerge = handleMembersCodeMerge(shareholdersUpdatedData, membersUpdatedData);
    // let fileInfo = MemberUploadedKYCInfo.filter(
    //   (member) => member.memberCode === memberCode
    // );

    // console.log("merge", finalMerge);
    // console.log("upload", MemberUploadedKYCInfo);

    setMergedResponse(finalMerge);
  };

  useEffect(() => {
    handleMerge();
  }, []);

  // useEffect(() => {
  //   const check = data?.find(
  //     (entity) => entity.entityCode === launchInfo.registrationType
  //   );
  //   setRequiredDocuments(check?.entityRequiredDocuments);
  // }, [data, launchInfo]);

  // // merging required document list and uploaded list
  // const handleDocumentCheck = async () => {
  //   let viewResponse = await viewMemberKYC(launchInfo);
  //   let MemberUploadedKYCInfo = [...viewResponse?.data.businessMembersKYC];

  //   const checkMergeDocument = handleCheckDocument(
  //     requiredDocuments,
  //     MemberUploadedKYCInfo
  //   );
  //   console.log("check document merged", checkMergeDocument);
  // };

  // useEffect(() => {
  //   handleDocumentCheck();
  // }, []);

  // Set the progress of the application
  useEffect(() => {
    store.dispatch(setCheckoutProgress({ total: 13, current: 13 })); // total- total pages and current - current page
  }, []);
  return (
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
              <NavLink to={item.path} style={({ isActive }) => (isActive ? ActiveStyles : {})}>
                {item.title}
              </NavLink>
            </ReviweTabWrapper>
          ))}
        </Nav>

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
              shares={shareholder?.shareholderRegistrationNumber ? "company" : "individual"}
              email={shareholder?.memberEmail}
              phone={shareholder?.memberPhone}
              sharesPercentage={shareholder?.shareholderOwnershipPercentage}
              icon
              memberCode={shareholder?.memberCode}
              editAction={handleNavigate}
            />
          ))}
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
    </Container>
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
  gap: 20px;
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

const ActiveStyles = {
  color: "#151717",
  borderBottom: "4px solid #00A2D4",
  borderRadius: 0,
};
