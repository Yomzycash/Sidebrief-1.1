import React from "react";
import { useState } from "react";
import styled from "styled-components";
import NigeriaFlag from "../../asset/images/NigeriaFlag.png";
import { FiArrowLeft } from "react-icons/fi";
import { RedTrash } from "asset/svg";
import ActiveNav from "components/navbar/ActiveNav";
import { Link, useNavigate } from "react-router-dom";
import Search from "components/navbar/Search";
import { SortDropdown } from "containers/BusinessDetail/Header/SortDropdown";
import { useLocation } from "react-router-dom";
import { ReactComponent as AddIcon } from "../../../src/asset/svg/Plus.svg";

const HeaderDetail = ({
  countryName = "Nigeria",
  numberCode = "234",
  countryCode = "NGA",
  countryCurrency = "Naira",
  Description = "Add Entity",
}) => {
  const [subHeaderHovered, setSubHeaderHovered] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const page = pathname.split("/").pop();
  const triggerSearch = () => {
    // perform search filter here
  };

  return (
    <Container>
      <Top>
        <BackContainer
          onClick={() => navigate("/staff-dashboard/businesses/countries")}
        >
          <FiArrowLeft color="#151717" size={24} />
          <Text>Back to Countries</Text>
        </BackContainer>
        <TitleContainer>
          <LHS>
            <TopInfo>
              <CountryName>{countryName}</CountryName>
              <ImageWrapper>
                <img src={NigeriaFlag} alt="flag" />
              </ImageWrapper>
            </TopInfo>
            <BottomInfo>
              <BottomContainer>
                <BottomWrapper>
                  <TextWrapper>{numberCode}</TextWrapper>
                </BottomWrapper>
                <BottomWrapper>
                  <TextWrapper>{countryCode}</TextWrapper>
                </BottomWrapper>
                <TextWrapper>{countryCurrency}</TextWrapper>
              </BottomContainer>
            </BottomInfo>
          </LHS>
          <RHS>
            <DeleteButton>
              <p>Delete</p>
              <RedTrash />
            </DeleteButton>
          </RHS>
        </TitleContainer>
      </Top>
      <SubHeader
        onMouseEnter={() => setSubHeaderHovered(true)}
        onMouseLeave={() => setSubHeaderHovered(false)}
        $hovered={subHeaderHovered}
      >
        <ActiveNav
          text={"Country Details"}
          path={`/staff-dashboard/businesses/countries/countrydetail`}
        />
        <ActiveNav
          text={"Entities"}
          total={24}
          path={`/staff-dashboard/businesses/countries/entitydetail`}
        />
      </SubHeader>
      {page !== "countrydetail" ? (
        <SearchAndSort>
          {/* placeholder changes based on the page it's on */}
          {/* not implemented yet */}
          <Search triggerSearch={triggerSearch} page={page} />
          <ButtonWrapper>
            <AddIcon />
            <TextContent>{Description}</TextContent>
          </ButtonWrapper>
        </SearchAndSort>
      ) : null}
    </Container>
  );
};

export default HeaderDetail;

const Container = styled.header`
  width: 100%;
  border: 1px solid #edf1f7;

  border-top: none;
  @media screen and (max-width: 700px) {
    border: 0;
  }
`;

const Top = styled.div`
  padding-inline: 40px;
  padding-block: 40px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
  @media screen and (max-width: 700px) {
    padding-block: 0;
    padding-inline: 0px;
  }
`;

const BackContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  align-self: flex-start;

  @media screen and (max-width: 700px) {
    display: none;
  }
`;

const Text = styled.p`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #151717;
`;

const TitleContainer = styled.div`
  padding-block: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  width: 100%;
`;

const TopInfo = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
`;

const ImageWrapper = styled.div``;
const CountryName = styled.h2`
  font-family: "BR Firma";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 150% */

  /* Grey 3 */

  color: #4e5152;
`;

const LHS = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  @media screen and (max-width: 700px) {
    gap: 16px;
    padding-inline: 24px;
  }
`;

const RHS = styled.div`
  @media screen and (max-width: 700px) {
    display: none;
  }
`;

const BottomInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  @media screen and (max-width: 700px) {
    gap: 16px;
    font-size: 14px;
  }
`;

const CountryDetails = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #4e5152;
`;

const DeleteButton = styled.button`
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px;
  cursor: pointer;

  p {
    font-family: "BR Firma";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.02em;
    color: #ed4e3a;
  }
`;

const SubHeader = styled.div`
  border-top: 1px solid #edf1f7;
  display: flex;
  gap: 24px;
  padding-inline: 24px;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    height: 5px;
    background: ${({ $hovered }) => ($hovered ? "#aaaaaa33" : "#fff")};
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ $hovered }) => ($hovered ? "#aaaaaa" : "#fff")};
    border-radius: 15px;
  }

  @media screen and (max-width: 700px) {
    /* border-width: 1px 0px;
      border-style: solid; */
    border-bottom: 1px solid #edf1f7;
    /* border-color: #edf1f7; */
  }
`;
const BottomContainer = styled.div`
  display: inline-flex;
  align-items: center;

  gap: 16px;
`;
const BottomWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 8px 0px 0px;
  gap: 8px;
  border-right: 1px solid #edf1f7;
`;
const TextWrapper = styled.h3`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #4e5152;
`;
const SearchAndSort = styled.div`
  padding: clamp(20px, 2vw, 40px) 24px;
  border-top: 1px solid #edf1f7;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 24px;
  gap: 8px;
  width: 196px;
  height: 40px;
  background: #00a2d4;
  border-radius: 8px;
`;
const TextContent = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.5px;
  color: #ffffff;
`;
