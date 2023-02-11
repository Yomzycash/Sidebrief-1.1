import TabNavBar from "components/TabNavBar/TabNavBar";
import React, { useState, useEffect } from "react";
import { Body, BodyMain, Container, Loading } from "./styled";
import image from "../../../../asset/images/coming.png";
import { useNavigate } from "react-router-dom";
import { SummaryCard } from "components/cards";
import Search from "components/navbar/Search";
import styled from "styled-components";
import { Puff } from "react-loading-icons";
import PetalsCard from "components/cards/RewardCard/PetalsCard";
import { useGetAllBanksQuery } from "services/staffService";

const BankAccount = () => {
  const [filteredBank, setFilteredBank] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const { data, isLoading } = useGetAllBanksQuery();

  const navigate = useNavigate();

  useEffect(() => {
    setFilteredBank(data);
    
  }, [data, searchValue]);

  const handleBankClick = (bankCode) => {
    navigate(`/dashboard/bank-account/${bankCode}`);
  };

  return (
    <Container>
      <MainHeader>
        <p>Bank Accounts</p>
        <div>
          <SummaryCard shown={data?.length} total={data?.length} />
          <Search
            style={searchStyle}
            placeholder={"Search for a bank"}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </MainHeader>
      <Body>
        {isLoading ? (
          <Loading height="300px">
            <Puff stroke="#00A2D4" fill="white" width={60} />
          </Loading>
        ) : (
          <BodyMain>
            {filteredBank?.map((bank, index) => (
              <PetalsCard
                key={index}
                title={bank?.bankCountry}
                subText={bank?.bankName}
                image={bank?.bankLogo}
                action={() => handleBankClick(bank.bankCode)}
                rewardspage
              />
            ))}
          </BodyMain>
        )}
      </Body>
    </Container>
  );
};

export default BankAccount;

const searchStyle = {
  borderRadius: "12px",
  backgroundColor: "white",
  maxWidth: "384px",
};

export const MainHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 48px;
  width: 100%;
  height: clamp(80px, 10vw, 120px);
  padding-inline: 24px;
  border: 1px solid #edf1f7;
  border-top: none;
  transition: 0.2s all ease;

  > p {
    display: flex;
    align-items: center;
    font-size: clamp(20px, 1.5vw, 24px);
    font-weight: 700;
    color: #151717;
  }

  > div {
    display: flex;
    gap: 48px;
    flex: 1;
    justify-content: space-between;
  }

  @media screen and (max-width: 700px) {
    display: none;
  }
`;
