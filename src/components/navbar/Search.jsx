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
	inputStyle,
	placeholder = "Search something...",
	onChange,
	value,
	className,
}) => {
	return (
		<SearchBarWrapper style={style} className={className}>
			<SearchIconWrapper>
				<SearchIcon src={search} alt="logo" style={iconStyle} />
			</SearchIconWrapper>
			{value !== undefined ? (
				<SearchBar
					placeholder={placeholder}
					onChange={(event) => onChange(event.target.value)}
					style={inputStyle}
					value={value}
				/>
			) : (
				<SearchBar placeholder={placeholder} style={inputStyle} />
			)}
		</SearchBarWrapper>
	);
};

export default Search;
