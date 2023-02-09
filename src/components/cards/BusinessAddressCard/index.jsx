import React from "react";
import styled from "styled-components";
import { navigateToDetailPage } from "utils/globalFunctions";
import { useNavigate } from "react-router-dom";

const BusinessesCard = ({ name, type, code, countryISO }) => {
	const navigate = useNavigate();
	const launchInfo = {
		launchCode: code,
		registrationCountry: countryISO,
		registrationType: type,
	};

	return (
		<Wrapper onClick={() => navigateToDetailPage(navigate, launchInfo)}>
			<InnerContainer>
				<Name>{name}</Name>
				<TypeWrapper>
					<TypeContent>{type}</TypeContent>
				</TypeWrapper>
			</InnerContainer>
		</Wrapper>
	);
};

export default BusinessesCard;

const Wrapper = styled.button`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	width: 100%;
	padding: 24px 16px;
	background: #ffffff;
	border: 1px solid #edf1f7;
	box-shadow: 0px 10px 10px -5px #9596970a;
	border-radius: 16px;
	cursor: pointer;
`;
const InnerContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 0px;
	gap: 24px;

	width: 100%;
	min-height: 42px;
`;
const Name = styled.p`
	font-weight: 500;
	font-size: 14px;
	line-height: 21px;
	letter-spacing: -0.02em;
	color: ${({ theme }) => theme.grey1};
	font-family: "BR Firma";
	text-transform: capitalize;
`;
const TypeWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 4px 16px;
	gap: 10px;
	background: #00d4480c;
	border-radius: 12px;
`;
const TypeContent = styled.div`
	font-family: "BR Firma";
	font-style: normal;
	font-weight: 500;
	font-size: 14px;
	line-height: 18px;
	letter-spacing: 0.01em;

	color: #00a2d4;
`;
