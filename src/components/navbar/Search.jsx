import React from "react";
import {
  SearchBar,
  SearchBarWrapper,
  SearchIcon,
  SearchIconWrapper,
} from "./styled";
import search from "../../asset/images/search.png";

const Search = ({
  style,
  iconStyle,
  placeholder = "Search something...",
  onChange,
}) => {
  return (
    <SearchBarWrapper style={style}>
      <SearchIconWrapper>
        <SearchIcon src={search} alt="logo" style={iconStyle} />
      </SearchIconWrapper>
      <SearchBar placeholder={placeholder} onChange={onChange} />
    </SearchBarWrapper>
  );
};

export default Search;
