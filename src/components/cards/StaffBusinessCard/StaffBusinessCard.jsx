import React, {  useState } from "react";
import styled from "styled-components";
import { AiOutlineArrowRight } from "react-icons/ai";
import Search from "components/navbar/Search";
import { Link } from "react-router-dom";
import ScrollableDiv from "layout/scrollableDiv";

const StaffBusinessCard = ({ title, subText, list, link }) => {
	const [searchTerm, setSearchTerm] = useState("");

	return (
		<CardContainer>
			<ScrollableDiv maxHeight="460px">
				<Top>
					<Title>
						{title} <span>({list?.length})</span>
					</Title>
					<ViewWrapper to={link ? link : ""}>
						<Text>View all</Text>
						<AiOutlineArrowRight color="#00A2D4" size={22} />
					</ViewWrapper>
				</Top>
				<BottomText>{subText}</BottomText>
				<ListContainer>
					<Search
						style={searchStyle}
						inputStyle={searchInputStyle}
						iconStyle={{ width: "15px", height: "15px" }}
						placeholder="Search a country"
						onChange={(e) => {
							setSearchTerm(e.target.value);
						}}
					/>

					<LowerContainer>
						{list
							?.filter((each) =>
								each?.text
									?.toLowerCase()
									.includes(searchTerm.toLowerCase())
							)
							?.map((each, index) => (
								<ListWrapper key={index}>
									{each.image && (
										<img src={each.image} alt="" />
									)}
									<TextWrapper
										to={each.link ? each.link : ""}
									>
										{each?.text}
									</TextWrapper>
								</ListWrapper>
							))}
					</LowerContainer>
				</ListContainer>
			</ScrollableDiv>
		</CardContainer>
	);
};

export default StaffBusinessCard;

const CardContainer = styled.div`
	width: 100%;
	max-width: 422px;
	padding: 23px 14px;
	border-left: 1px solid #edf1f7;
`;

const Top = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 4px;
`;

const Title = styled.h2`
	font-weight: 600;
	font-size: 16px;
	line-height: 30px;
	letter-spacing: 0.01em;
	color: ${({ theme }) => theme.grey1};
	white-space: nowrap;
`;

const ViewWrapper = styled(Link)`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 8px;
	cursor: pointer;
	white-space: nowrap;
	text-decoration: none;
`;

const Text = styled.h3`
	font-weight: 500;
	font-size: 14px;
	line-height: 21px;
	display: flex;
	align-items: center;
	text-align: center;
	letter-spacing: -0.5px;
	color: #00a2d4;
`;

const BottomText = styled.h3`
	font-weight: 400;
	font-size: 14px;
	line-height: 20px;
	letter-spacing: -0.02em;
	color: #959697;
	margin-bottom: 24px;
`;

const ListContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 0px;
	gap: 24px;
	width: 100%;
`;

const LowerContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 0px;
	gap: 4px;
	width: 100%;
`;

const ListWrapper = styled.div`
	display: flex;
	flex-direction: row;
	gap: clamp(12px, 1.2vw, 16px);
	align-items: center;
	padding: 12px 24px;
	width: 100%;
	background: #ffffff;
	border: 1px solid #edf1f7;
	border-radius: 20px;

	img {
		width: 20px;
	}
`;

const TextWrapper = styled(Link)`
	font-weight: 400;
	font-size: 14px;
	line-height: 20px;
	color: ${({ theme }) => theme.grey1};
	text-decoration: none;
	white-space: nowrap;
`;

const searchStyle = {
	paddingTop: "10px",
	paddingBottom: "10px",
	width: "100%",
	borderRadius: "12px",
};
const searchInputStyle = {
	placeholder: {
		color: "#959697",
	},
};
