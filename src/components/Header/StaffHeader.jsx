import { SummaryCard } from "components/cards";
import Search from "components/navbar/Search";
import React from "react";
import styled from "styled-components";
import { ReactComponent as AddIcon } from "../../../src/asset/svg/Plus.svg";
import NoBackgroundButton from "components/button/NoBackgroundButton";
import { useMediaQuery } from "@mui/material";

const StaffHeader = ({
  title = "Countries",
  shown = "12",
  total = "12",
  Description = "Add Country",
  handleButton,
}) => {

  const matches = useMediaQuery("(max-width:700px)");

  return (
    <Container>
      <Header>
        <MainHeader>
          <TopContent>
            <div>
              <PageTitle>{title}</PageTitle>
              {!matches && <SummaryCard shown={shown} total={total} /> }
            </div>
          </TopContent>
          <BottomContent>
            <SearchWrapper>
              <Search style={searchStyle} iconStyle={iconStyle} />
            </SearchWrapper>

              {!matches ? (
                <ButtonWrapper onClick={handleButton}>
                <button>
                  <AddIcon />
                  {Description}
                </button>
              </ButtonWrapper>
           ) : (
            <MobileView>
                <NoBackgroundButton
                  action={handleButton} 
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
export default StaffHeader;

const Container = styled.div`
  display: flex;
  flex-flow: column;
  margin: 0 40px;
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
  border: 1px solid #edf1f7;
  border-top: none;
  transition: 0.2s all ease;
`;

//TODO: maybe hide scroll bar

const TopContent = styled.div`
  display: flex;
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
const ButtonWrapper = styled.div`
  width: 200px;

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

const searchStyle = {
  borderRadius: "12px",
  backgroundColor: "white",
  width: "100%",
  height: "100%",
};

const MobileView = styled.div`
  @media screen and (max-width:700px) {
    position:absolute;
    bottom: 99px;
    right: 7px;
  }
`
const iconStyle = { width: "17px", height: "17px" };
