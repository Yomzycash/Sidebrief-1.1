import { SummaryCard } from "components/cards";
import Search from "components/navbar/Search";
import React from "react";
import styled from "styled-components";
import { ReactComponent as AddIcon } from "../../../src/asset/svg/Plus.svg";
import { useMediaQuery } from "@mui/material";
import NoBackgroundButton from "components/button/NoBackgroundButton";

const StaffBankHeader = ({
  title = "Banks",
  Description = "Add New Bank",
  placeholder = "Search for a bank",
  open,
  setOpen,
  handleButton,
  totalShown,
}) => {
  const searchStyle = {
    borderRadius: "12px",
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  };

  const iconStyle = { width: "17px", height: "17px" };

  const matches = useMediaQuery("(max-width:700px)");

  const buttonAction = () => {
    if (setOpen) setOpen(true);
    if (handleButton) handleButton();
  };

  return (
    <Container>
      <Header>
        <MainHeader>
          <TopContent>
            <div>
              <PageTitle>{title}</PageTitle>
              {!matches && <SummaryCard shown={totalShown} total={totalShown} /> }
            </div>
          </TopContent>
          <BottomContent>
            <SearchWrapper>
              <Search style={searchStyle} iconStyle={iconStyle} placeholder={placeholder} />
            </SearchWrapper>
           {!matches ? (
                <ButtonWrapper onClick={buttonAction}>
                <button>
                  <AddIcon />
                  {Description}
                </button>
              </ButtonWrapper>
           ) : (
            <MobileView>
                <NoBackgroundButton
                  action={buttonAction} 
                  text={Description} 
                />
              </MobileView>
            )} 
          </BottomContent>
        </MainHeader>
      </Header>
    </Container>
  );
};
export default StaffBankHeader;

const Container = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
`;
const Header = styled.div`
  position: sticky;
  top: 57.1px;
  display: flex;
  flex-flow: column;
  background-color: white;
  z-index: 2;
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
`;

//TODO: maybe hide scroll bar

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
`;
const PageTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: clamp(20px, 2vw, 24px);
  font-weight: 700;
  color: #151717;
`;
const BottomContent = styled.div`
  display: flex;
  align-items: center;
  padding-inline: 24px;
  gap: 60px;
  flex: 1;
  justify-content: space-between;

  @media screen and (max-width: 700px) {
    display:flex;
    flex-direction: column-reverse
  }
`;
const ButtonWrapper = styled.div`
  justify-content: center;
  align-items: center;

  button {
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.blue2};
    border-radius: 8px;
    border: none;
    outline: none;
    color: #ffffff;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
    padding: 10px 24px;
    display: flex;
    gap: 8px;
    align-items: center;

    
    @media screen and (max-width: 700px) {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  @media screen and (max-width: 700px) {
    max-width: 100%;
    width: 100%;
  }

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

const MobileView = styled.div`
  @media screen and (max-width:700px) {
    position:absolute;
    bottom: 99px;
    right: 7px;
  }
`