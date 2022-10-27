import { Container, SortButton, Hidden } from "./style";
import { DropDownArrow } from "asset/svg";
import { useState } from "react";

export const SortDropdown = () => {
	const [showHidden, setShowHidden] = useState(false);

	return (
		<Container>
			<SortButton
				onClick={() => setShowHidden((prev) => !prev)}
				showing={showHidden}
			>
				<p>Sort</p> <DropDownArrow />
			</SortButton>
			{/* Will contain content of the dropdown */}
			{<Hidden show={showHidden}></Hidden>}
		</Container>
	);
};
