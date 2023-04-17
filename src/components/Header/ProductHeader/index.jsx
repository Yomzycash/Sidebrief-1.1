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
}) => {
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
            <button onClick={action}>
              <NoteIcon />
              {actionText}
            </button>
          </ButtonWrapper>
        </BottomContent>
      </MainHeader>
      <SubHeader>
        {navInfo?.map((el, i) => (
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
    </Header>
  );
};

export default ProductHeader;
