import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { ReactComponent as SearchIcon } from "asset/svg/SearchIcon.svg";
import Search from "components/navbar/Search";

const HeaderSearch = ({ title }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <Wrapper>
      {!isActive && (
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TitleWrapper>{title}</TitleWrapper>
          <IconWrapper onClick={() => setIsActive(true)}>
            <SearchIcon />
          </IconWrapper>
        </div>
      )}
      {isActive && <Search style={{ height: "32px" }} />}
    </Wrapper>
  );
};

export default HeaderSearch;
const Wrapper = styled.div`
  width: 100%;
  display: flex;

  justify-content: space-between;
`;
const TitleWrapper = styled.h3`
  font-weight: 400;
  font-size: 20px;
  line-height: 40px;

  display: flex;
  align-items: center;

  color: #242627;
`;
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
