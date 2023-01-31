import { useState } from "react";
import {
	ThreeDotContainer,
	ContextMenu,
	ContextButton,
	InvisibleBackDrop,
	Container,
} from "./style";
import { ThreeDot } from "asset/svg";

export const ThreeDotMenu = ({ contextContent, classname }) => {
	const [showContext, setShowContext] = useState(false);

	const hideContext = () => {
		setShowContext(false);
	};

	const toggleContext = () => {
		setShowContext((prev) => !prev);
	};

	return (
		<Container className={classname}>
			<ThreeDotContainer onClick={toggleContext}>
				<ThreeDot />
			</ThreeDotContainer>
			{showContext ? (
				<>
					<InvisibleBackDrop onClick={hideContext} />
					<ContextMenu>
						{contextContent.map((el, index) => (
							<ContextButton
								key={index}
								onClick={() => {
									hideContext();
									el.action();
								}}
								look={el.style}
							>
								{el.Icon && <el.Icon />}
								{el.text}
							</ContextButton>
						))}
					</ContextMenu>
				</>
			) : null}
		</Container>
	);
};
