import styled from "styled-components";

export const Container = styled.div`
	min-width: clamp(181px, 22vw, 304px);
	max-width: 304px;
	max-height: 238px;
	background: #ffffff;
	border: 1px solid #edf1f7;
	box-shadow: 0px 10px 10px -5px rgba(149, 150, 151, 0.04);
	border-radius: 16px;
	padding: clamp(16px, 1.5vw, 24px);
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 17px;
	transition: all 0.2s;
	flex: 1;
	cursor: ${({ rewardspage }) => (rewardspage ? "pointer" : "")};
	overflow: hidden;

	${({ hover }) =>
		hover &&
		`
      border: 1px solid #00A2D4;
			box-shadow: 0px 20px 25px -5px rgba(149, 150, 151, 0.1);
		`};

	@media screen and (max-width: 532px) {
		max-width: 100%;
		max-height: 100px;
	}
`;

export const Corner = styled.div`
	position: absolute;
	top: 0;
	right: 0;

	svg {
		ellipse {
			fill: rgba(204, 243, 255, 0.48);
			fill-opacity: 1;
		}
	}

	${({ hover }) =>
		hover &&
		`
		svg {
			ellipse {
				// fill: rgba(255, 255, 255, 0.64);
			}
		}
		`};
`;

export const Frame = styled.div`
	display: flex;
	flex-direction: column;
	gap: 24px;

	@media screen and (max-width: 532px) {
		flex-direction: row;
	}
`;

export const ImageHolder = styled.div`
	height: 32px;
	width: 32px;
	border-radius: 50%;
	overflow: hidden;

	img {
		height: 100%;
		width: 100%;
		object-fit: contain;
	}
`;

export const TextContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: clamp(4px, 1.5vw, 8px);
`;

export const Title = styled.h4`
	font-family: "BR Firma";
	font-weight: 600;
	font-size: 20px;
	line-height: 24px;
	letter-spacing: 0.02em;
	color: #242627;

	${({ hover }) =>
		hover &&
		`
			// color: #ffffff;
		`};

	@media screen and (max-width: 532px) {
		font-weight: 600;
		font-size: 16px;
	}
`;

export const Body = styled.p`
	font-family: "BR Firma";
	font-weight: 500;
	font-size: 16px;
	line-height: 21px;
	color: #4e5152;

	${({ hover }) =>
		hover &&
		`
			// color: #f1f1f1;
		`};

	@media screen and (max-width: 532px) {
		font-size: 14px;
	}
`;

export const StartButton = styled.button`
	height: 36px;
	border-radius: 8px;
	border: none;
	background: transparent;
	display: ${({ hide }) => (hide ? "none" : "")};

	@media screen and (max-width: 760px) {
		display: none;
	}
`;
