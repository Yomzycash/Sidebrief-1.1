import React from "react";
import {
  SearchBar,
  SearchBarWrapper,
  SearchIcon,
  SearchIconWrapper,
} from "./styled";
import search from "../../asset/images/search.png";

const Search = ({ style }) => {
  return (
    <SearchBarWrapper style={style}>
      <SearchIconWrapper>
        <SearchIcon src={search} alt="logo" />
      </SearchIconWrapper>
      <SearchBar placeholder="Search something..." />
    </SearchBarWrapper>
  );
};

export default Search;
