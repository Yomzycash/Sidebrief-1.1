import { useState } from "react";
import {
	ThreeDotContainer,
	ContextMenu,
	ContextButton,
	DeleteButton,
	InvisibleBackDrop,
} from "./styles";
import { ThreeDot } from "asset/svg";

export const ThreeDotMenu = ({ contextContent }) => {
	const [showContext, setShowContext] = useState(false);

	const hideContext = () => {
		setShowContext(false);
	};

	const toggleContext = () => {
		setShowContext((prev) => !prev);
	};

	return (
		<>
			<ThreeDotContainer onClick={toggleContext}>
				<ThreeDot />
			</ThreeDotContainer>
			{showContext ? (
				<>
					<InvisibleBackDrop onClick={hideContext} />
					<ContextMenu>
						{contextContent.map((el, index) => (
							<ContextButton key={index} onClick={el.action}>
								<el.Icon /> el.text
							</ContextButton>
						))}
					</ContextMenu>
				</>
			) : null}
		</>
	);
};
