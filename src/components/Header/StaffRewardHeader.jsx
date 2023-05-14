import { SummaryCard } from "components/cards";
import Search from "components/navbar/Search";
import React from "react";
import styled from "styled-components";
import { ReactComponent as AddIcon } from "../../../src/asset/svg/Plus.svg";
import { useGetAllCategoriesQuery } from "services/staffService";
import { useGetAllCountriesQuery } from "services/launchService";
import CustomDropdown from "components/input/CustomDropdown";
import { useLocation } from "react-router-dom";
import { CommonButton } from "components/button";

const StaffRewardHeader = ({
  title = "Rewards",
  shown = "12",
  total = "328",
  Description = "Add New Reward",
  placeholder = "Search for a reward",
  open,
  setOpen,
  handleButton,
  totalShown,
  countrySelected,
  categorySelected,
  onSearchChange,
}) => {
  const category = useGetAllCategoriesQuery();

  const countries = useGetAllCountriesQuery();

  const servicesCategory = category?.data?.map((el) => {
    return el?.catergoryName;
  });
  const countriesCategory = countries?.data?.map((el) => {
    return el?.countryName;
  });

  const all = ["All"];
  let newCountriesCategory = [].concat(all, countriesCategory);
  let newservicesCategory = [].concat(all, servicesCategory);

  const searchStyle = {
    borderRadius: "12px",
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  };

  const iconStyle = { width: "17px", height: "17px" };

  const buttonAction = () => {
    if (setOpen) setOpen(true);
    if (handleButton) handleButton();
  };
  const { pathname } = useLocation();                                               
  let filterShown = pathname.includes("services/all");                                   

  return (
    <Container>
      <Header>
        <MainHeader>
          <TopContent>
            <div>
              <PageTitle>{title}</PageTitle>
              <SummaryCard shown={totalShown} total={totalShown} />
            </div>
          </TopContent>
          <BottomContent>
            <SearchWrapper>
              <Search
                style={searchStyle}
                iconStyle={iconStyle}
                placeholder={placeholder}
                onChange={onSearchChange}
              />
            </SearchWrapper>
            {filterShown && (
              <DropdownContainer>
                <DropdownWrapper>
                  <CategoryText>Category</CategoryText>
                  <CustomDropdown
                    options={newservicesCategory}
                    intialvalue="All"
                    selectedValue={categorySelected}
                  />
                </DropdownWrapper>
                <DropdownWrapper>
                  <CategoryText>Country</CategoryText>
                  <CustomDropdown
                    options={newCountriesCategory}
                    intialvalue="All"
                    selectedValue={countrySelected}
                  />
                </DropdownWrapper>
              </DropdownContainer>
            )}
            <CommonButton action={buttonAction} text={Description} LeftIcon={AddIcon} />
            {/* <ButtonWrapper onClick={buttonAction}>
              <button>
                <AddIcon />
                {Description}
              </button>
            </ButtonWrapper> */}
          </BottomContent>
        </MainHeader>
      </Header>
    </Container>
  );
};
export default StaffRewardHeader;
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
  width: 100%;
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
  gap: 24px;
  flex: 1;
  justify-content: space-between;
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
const DropdownContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 24px;
  max-width: 431px;
`;
const DropdownWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;
`;
const CategoryText = styled.h3`
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  /* identical to box height, or 150% */
  color: #000000;
`;
