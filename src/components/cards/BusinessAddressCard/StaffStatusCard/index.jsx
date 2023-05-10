import React from "react";
import styled from "styled-components";
import awaitingImg from "asset/staff/Awaiting.svg";
import completedImg from "asset/staff/Completed.svg";
import inProgressImg from "asset/staff/InProgress.svg";



const Container = ({ icon, number, text}) => {
	return (
		<StyledContainer>
			<IconWrapper>
				<img src={icon} alt="icon" />
			</IconWrapper>
			<Number>{number}</Number>
			<TextWrapper>
				<StatusWrapper>{text}</StatusWrapper>
			</TextWrapper>
		</StyledContainer>
	)
}
const StaffStatusCard = ({ status }) => {
	return (
		<Wrapper>
			<Container
				icon={awaitingImg}
				number={status?.awaiting}
				text="Businesses In Progress"
			/>
			<Container
				icon={inProgressImg}
				number={status?.inProgress}
				text="Businesses In Progress"
			/>
			<Container
				icon={completedImg}
				number={status?.completted}
				text="Businesses Completed"
			/>
		</Wrapper>
	);
};

export default StaffStatusCard;

const Wrapper = styled.div`
	// display: flex;
	// width: 100%;
	// flex-direction: row;
	// align-items: flex-start;
	// padding: 0px;
	// gap: 24px;
	
	@media screen and (max-width: 700px) {
		grid-template-columns: 1fr;
	}
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-gap:3rem 4rem;
	gap:3rem 4rem;
	width: 100%;
	padding: 0px;
	// justify-content: space-between;
`;
const StyledContainer = styled.div`
	width: 100%;
	height: 168px;
	padding: 24px;
	background: #ffffff;
	border: 1px solid #edf1f7;
	box-shadow: 0px 10px 10px -5px #9596970a;
	border-radius: 16px;

	@media screen and (min-width: 701px) {
		grid-row: span 2;
		grid-column: span 1;
		width:auto
	}
	
	@media screen and (max-width: 700px) {
		grid-row: span 2;
		grid-column: span 1;
		width:100%;
	}
`;
const IconWrapper = styled.div`
	margin-block-end: 16px;
`;
const Number = styled.h3`
	font-weight: 700;
	font-size: 20px;
	line-height: 24px;
	color: #242627;
	// margin-block-end: 8px;
`;
const TextWrapper = styled.div`
	display: flex;
	flex-direction: column;
	font-weight: 400;
	font-size: 14px;
	line-height: 20px;
	letter-spacing: -0.02em;
	color: #959697;
`;
const StatusWrapper = styled.div`
	font-weight: 400;
	font-size: 14px;
	line-height: 20px;
	letter-spacing: -0.02em;
	color: #959697;
`;
