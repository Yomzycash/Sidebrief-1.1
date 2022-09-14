import { motion } from "framer-motion";
import styled from "styled-components";

export const InputWrapper = styled.div`
	border: ${(props) => props.border};
	align-items: center;
	display: flex;
	flex-direction: row;
	border-radius: 10px;
	padding: 8px 24px;
	margin-top: 20px;
	height: 56px;

	&:focus {
		outline: none;
		border-color: yellow;
	}

	@media screen and (max-width: 600px) {
		height: 48px;
	}
`;

export const DropWrapper = styled.div`
	border: 1px solid #ececec;
	align-items: center;
	display: flex;
	flex-direction: row;
	border-radius: 10px;
	border: solid red;
	padding: 0px 20px;
	margin-top: 20px;
	height: 56px;

	@media screen and (max-width: 600px) {
		height: 48px;
	}
`;

export const Wrapper = styled(motion.div)`
	/margin-bottom: 24px;
	width: 100%;
	position: relative;

	@media screen and (max-width: 600px) {
		margin-bottom: 20px;
	}
`;

export const Input = styled.input`
	color: #4e5152;
	height: 56px;
	width: 90%;
	border: none;
	background: none;
	outline: none;
	font-weight: 400;
	font-size: 16px;
	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
	}
	@media screen and (max-width: 600px) {
		font-size: 14px;
	}
`;

export const Select = styled.select`
	color: #4e5152;
	height: 56px;
	width: 100%;
	border: none;
	padding: 5px 4px;
	background: none;
	cursor: inherit;
	outline: none;
	font-weight: 400;
	font-size: 16px;

	@media screen and (max-width: 600px) {
		font-size: 14px;
	}
`;

export const Show = styled.p`
	cursor: pointer;
	color: #4e5152;
	font-size: 16px;

	@media screen and (max-width: 600px) {
		font-size: 14px;
	}
`;

export const Label = styled.label`
	color: #4e5152;
	font-weight: 400;
	font-size: 16px;

	@media screen and (max-width: 600px) {
		font-size: 14px;
	}
`;

export const Iconwrapper = styled.div`
	margin-right: 20px;

	@media screen and (max-width: 600px) {
		margin-right: 18px;
	}
`;

export const ErrMsg = styled.div`
	color: red;
	font-size: 12px;
	justify-content: center;
	align-items: center;
`;

export const Top = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

export const DateWrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;

	.date {
		border: 0;
		width: 100%;
		height: 100%;
		outline: none;
		font-size: 16px;
	}
`;

export const TransparentBackdrop = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	z-index: 1;
`;

export const CalendarWrapper = styled.div`
	position: absolute;
	z-index: 3;
	top: 90%;
	left: 30px;
	width: 100%;

	@media screen and (max-width: 500px) {
		left: 0;
		top: 110%;
	}

	.calendar {
		@media screen and (max-width: 500px) {
			font-size: 12px;
			max-width: 100%;
		}
	}
`;

// width: ${props => props.width };

// @media screen and (max-width: 600px) {
// font-size: 14px;
//   }
// `;

// Taginput styles
export const AllWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	column-gap: 8px;
`;
export const TagWrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 20px;
	margin-bottom: 8px;
`;
export const TagInputWrapper = styled.div`
	width: 100%;
	height: 40px;
	disply: flex;
	align-items: center;
`;
export const TagItem = styled.div`
	display: inline-flex;
	flex-direction: row;
	padding: 2px 8px;
	background: #0082aa;
	border-radius: 4px;
	opacity: 0.8;
	justify-content: space-between;
	align-items: center;
	gap: 0.5em;
	color: #fafafa;
`;

export const TagText = styled.span`
	font-family: "BR Firma";
	font-style: normal;
	font-weight: 400;
	font-size: 14px;
	line-height: 21px;
`;
export const Tagclose = styled.span`
	height: 21px;
	width: 21px;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	margin-left: 3px;
	color: #fff;
	font-size: 14px;
	cursor: pointer;
`;
export const TagInputField = styled.input`
	flex-grow: 1;

	width: inherit;
	height: inherit;
	outline: none;

	border: 1px solid #00c3ff;
	padding: 10px;
	border-radius: 8px;
`;
export const TagLabel = styled.label`
	font-family: "BR Firma";
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 21px;
	color: #4e5152;
`;

export const BottomText = styled.p`
	font-family: "BR Firma";
	font-weight: 400;
	font-size: 12px;
	line-height: 21px;
	color: #4e5152;
`;
