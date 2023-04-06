import React from "react";
import { ReactComponent as EditIcon } from "asset/Launch/Edit.svg";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useViewBusinessNamesMutation,
  useViewBusinessObjectivesMutation,
} from "services/launchService";

import { useEffect } from "react";
import { useState } from "react";
import { isElement } from "react-dom/test-utils";

const BusinessInfoCard = () => {
  const [businessArray, setBusinessArray] = useState([]);
  const [objectiveArray, setObjectiveArray] = useState([]);
  const LaunchApplicationInfo = useSelector((store) => store.LaunchReducer);
  let navigate = useNavigate();
  let location = useLocation();

  const handleNavigate = () => {
    navigate("/launch/business-info");
    localStorage.setItem("navigatedFrom", location.pathname);
  };

  const LaunchInfo = useSelector((store) => store.LaunchReducer);
  const { launchResponse } = LaunchInfo;
  const [viewBusinessNames] = useViewBusinessNamesMutation();
  const [viewBusinessObjects] = useViewBusinessObjectivesMutation();
  const handleViewBusinessNames = async () => {
    let responseData = await viewBusinessNames(launchResponse);
    let responseArr = Object.values(responseData.data.businessNames);
    setBusinessArray(responseArr);
  };

  const handleViewBusinessObject = async () => {
    let responseData = await viewBusinessObjects(launchResponse);
    let responseArr = Object.values(responseData.data.businessObjects);
    let filteredResponseArr = responseArr.filter((element) => element !== "null");

    setObjectiveArray(filteredResponseArr);
  };
  useEffect(() => {
    handleViewBusinessNames();
    handleViewBusinessObject();
  }, []);

  return (
    <>
      <Wrapper>
        <TitleWrapper>
          <Title>Business Information</Title>
          <EditWrapper onClick={handleNavigate}>
            <EditIcon />
            <EditText>Edit</EditText>
          </EditWrapper>
        </TitleWrapper>
        <LowerContainer>
          <SubContainer>
            <Heading>Business Names in order of preference</Heading>
            <TagContainer>
              {businessArray.map((businessName, index) => (
                <TagWrapper key={index}>
                  <Tag> {businessName}</Tag>
                </TagWrapper>
              ))}
            </TagContainer>
          </SubContainer>
          <SubContainer>
            <Heading>Business Objectives</Heading>
            <TagContainer>
              {objectiveArray.map((objective, index) => (
                <TagWrapper key={index}>
                  <Tag> {objective}</Tag>
                </TagWrapper>
              ))}
            </TagContainer>
          </SubContainer>
        </LowerContainer>
      </Wrapper>
    </>
  );
};

export default BusinessInfoCard;

const Wrapper = styled.div`
  background: #ffffff;
  border: 1px solid #edf1f7;
  border-radius: 16px;
  padding: 40px;
  width: 100%;
`;
const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;
const Title = styled.h3`
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  color: #151717;
`;
const EditWrapper = styled.div`
  display: flex;
  justify-content: space-between;
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

const LowerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 40px;
`;
const SubContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: flex-start;
  padding: 0px;
  gap: 8px;
  column-gap: 4px;
  width: 100%;
`;
const Heading = styled.h3`
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #959697;
`;
const TagContainer = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row wrap;
  row-gap: 4px;
  column-gap: 16px;
`;
const TagWrapper = styled.div`
  display: inline-flex;
  flex-direction: row;
  padding: 11px 8px;
  background: #0082aa;
  border-radius: 8px;
  justify-content: space-between;
  align-items: center;
  color: #fafafa;
`;

const Tag = styled.span`
  font-weight: 400;
  font-size: 14px;
  color: #fafafa;
`;
