import { CheckoutController, CheckoutSection } from "containers";
import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Container } from "../styled";
import styled from "styled-components";
import { imageTypeImage, ReviewTab } from "utils/config";
import LaunchSummaryCard from "components/cards/LaunchSummaryCard";
import HeaderCheckout from "components/Header/HeaderCheckout";
import { useSelector } from "react-redux";
import { ReactComponent as EditIcon } from "asset/Launch/Edit.svg";
import { store } from "redux/Store";
import toast from "react-hot-toast";
import { setCheckoutProgress } from "redux/Slices";
import {
  useSubmitLaunchMutation,
  useViewBeneficialsKYCMutation,
  useViewBeneficiariesMutation,
} from "services/launchService";
import { useEffect } from "react";
import { useState } from "react";
import ReviewCard from "components/cards/ReviewCard";
import AppFeedback from "components/AppFeedback";
import { mergeInfo } from "utils/LaunchHelper";
import { Puff } from "react-loading-icons";

const BeneficiaryReview = () => {
  const ActiveStyles = {
    color: "#151717",
    borderBottom: "4px solid #00A2D4",
    borderRadius: 0,
  };
  const [beneficialArray, setBeneficialArray] = useState([]);
  // const [beneficialKycArray, setBeneficialKycArray] = useState([]);
  // const [mergedBeneficialKycArray, setMergedBeneficialKycArray] = useState([]);

  const LaunchApplicationInfo = useSelector((store) => store.LaunchReducer);
  const navigate = useNavigate();
  const [submitLaunch] = useSubmitLaunchMutation();
  const generatedLaunchCode = useSelector(
    (store) => store.LaunchReducer.generatedLaunchCode
  );
  // getting the beneficiary container from store
  const beneficiaryDocumentContainer = useSelector(
    (state) => state.LaunchReducer.beneficiaryDocs
  );
  const launchResponse = useSelector(
    (store) => store.LaunchReducer.launchResponse
  );

  const [viewBeneficials, viewBeneficialState] = useViewBeneficiariesMutation();
  const [viewBeneficialKyc, viewBeneficialKycState] =
    useViewBeneficialsKYCMutation();

  const handleNext = async () => {
    const requiredData = {
      launchCode: generatedLaunchCode,
    };
    const response = await submitLaunch(requiredData);
    const error = response.error;
    if (response.data) {
      toast.success(response.data.registrationStatus);
      navigate("/launch/review-success");
    } else {
      toast.error(error.data.message);
    }
  };
  const handlePrev = () => {
    navigate(-1);
  };

  const handleNavigate = () => {
    navigate("/launch/beneficiaries-info");
  };

  const handleBeneficialArray = async () => {
    let titlesMembersMerged = [];

    let beneficialInfo = await viewBeneficials(launchResponse);
    // setBeneficialArray(beneficialInfo.data.businessBeneficialOwners);
    let newBeneficiaryInfo = [...beneficialInfo.data.businessBeneficialOwners];
    newBeneficiaryInfo.forEach((title) => {
      beneficiaryDocumentContainer.forEach((member) => {
        if (member.code === title.beneficialOwnerCode) {
          let merged = { ...title, ...member };
          titlesMembersMerged.push(merged);
        }
      });
    });
    setBeneficialArray(titlesMembersMerged);
  };

  // useEffect(() => {
  //   let titlesMembersMerged = [];

  //   let beneficialInfo = await viewBeneficials(launchResponse);
  //   // setBeneficialArray(beneficialInfo.data.businessBeneficialOwners);
  //   console.log(beneficialInfo.data.businessBeneficialOwners);
  //   let newBeneficiaryInfo = [...beneficialInfo.data.businessBeneficialOwners]
  //   newBeneficiaryInfo.forEach((title) => {
  //     beneficiaryDocumentContainer.forEach((member) => {
  //       if (member.code === title.beneficialOwnerCode) {
  //         let merged = { ...title, ...member };
  //         titlesMembersMerged.push(merged);
  //       }
  //     });
  //   });
  //   setBeneficialArray(titlesMembersMerged);
  //   console.log("testing files", titlesMembersMerged);
  // }, [beneficiaryDocumentContainer]);
  useEffect(() => {
    handleBeneficialArray();
  }, [beneficiaryDocumentContainer]);

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
                  style={({ isActive }) => (isActive ? ActiveStyles : {})}
                >
                  {item.title}
                </NavLink>
              </ReviweTabWrapper>
            ))}
          </Nav>
          <ContentWrapper>
            <EditWrapper onClick={handleNavigate}>
              <EditIcon />
              <EditText>Edit beneficiary Information</EditText>
            </EditWrapper>
          </ContentWrapper>

          {viewBeneficialState.isLoading && (
            <Loading height="50vh">
              <Puff stroke="#00A2D4" fill="white" />
            </Loading>
          )}

          <CardWrapper>
            {beneficialArray.map((beneficiary, index) => (
              <ReviewCard
                key={index}
                number={index + 1}
                name={beneficiary?.beneficialOwnerName}
                email={beneficiary?.beneficialOwnerEmail}
                phone={beneficiary?.beneficialOwnerPhone}
                occupation={beneficiary?.beneficialOwnerOccupation}
                stake={beneficiary?.beneficialOwnershipStake}
                government={beneficiary.files.government_id}
                proof={beneficiary.files.proof_of_home_address}
                passport={beneficiary.files.passport_photograph}
                beneficialOwnerCode={beneficiary?.beneficialOwnerCode}
              />
            ))}
          </CardWrapper>

          <ButtonWrapper>
            <CheckoutController
              backText={"Previous"}
              forwardText={"Done"}
              forwardAction={handleNext}
              backAction={handlePrev}
            />
          </ButtonWrapper>
        </Body>
        <AppFeedback subProject="Beneficiary review" />
      </Container>
    </>
  );
};

export default BeneficiaryReview;
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
