import React from 'react'
import {
  SearchBar,
  SearchBarWrapper,
  SearchIcon,
  SearchIconWrapper,
} from './styled'
import search from '../../asset/images/search.png'

const Search = ({ style, placeholder = 'Search something...' }) => {
  return (
    <SearchBarWrapper style={style}>
      <SearchIconWrapper>
        <SearchIcon src={search} alt="logo" />
      </SearchIconWrapper>
      <SearchBar placeholder={placeholder} />
    </SearchBarWrapper>
  )
}

export default Search
