import React from "react";
import {
  BottomContent,
  ButtonWrapper,
  Drop,
  Header,
  iconStyle,
  MainHeader,
  PageTitle,
  searchStyle,
  SearchWrapper,
  SubHeader,
  TopContent,
} from "./styled";
import ActiveNav from "components/navbar/ActiveNav";
import { SummaryCard } from "components/cards";
import { ReactComponent as NoteIcon } from "asset/images/note.svg";
import Search from "components/navbar/Search";
import { clearProductsInfo } from "utils/globalFunctions";
import { useLocation } from "react-router-dom";

const ProductHeader = ({
  title,
  searchPlaceholder,
  summary,
  action,
  actionText,
  navInfo,
  defaultActive,
  onSearchChange,
  filterList,
  emptyText,
}) => {
  const availableNavs = navInfo?.filter((el) => el.isAvailable);

  const handleButtonClick = () => {
    clearProductsInfo();
    action();
  };
  const { pathname } = useLocation();
  let path = pathname.includes("staff");

  return (
    <Header>
      <MainHeader>
        <TopContent>
          <div>
            <PageTitle>{title}</PageTitle>
            <SummaryCard shown={summary?.current} total={summary?.total} />
          </div>
          <Drop>
            <select>
              {filterList?.map((el, i) => (
                <option key={i} value={el}>
                  {el}
                </option>
              ))}
            </select>
          </Drop>
        </TopContent>
        <BottomContent>
          <SearchWrapper>
            <Search
              style={searchStyle}
              iconStyle={iconStyle}
              onChange={onSearchChange}
              placeholder={searchPlaceholder}
              className="searchbox"
            />
          </SearchWrapper>
          <ButtonWrapper>
            {!path && (
              <button onClick={handleButtonClick}>
                <NoteIcon />
                {actionText}
              </button>
            )}
          </ButtonWrapper>
        </BottomContent>
      </MainHeader>
      {availableNavs?.length > 0 && (
        <SubHeader>
          {availableNavs.map((el, i) => (
            <ActiveNav
              key={i}
              index={i}
              text={el?.text}
              total={el?.total}
              path={el?.path}
              defaultActive={defaultActive}
            />
          ))}
        </SubHeader>
      )}
    </Header>
  );
};

export default ProductHeader;
