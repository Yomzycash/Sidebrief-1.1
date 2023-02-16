import React from "react";
import {
	Container,
	TopContainer,
	ImageContainer,
	Image,
	NameContainer,
	UpperText,
	LowerText,
	LowerWrapper,
	InnerContainer,
	Wrapper,
	ListWrapper,
} from "./styled.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ChatCard = ({
	image,
	name,
	serviceName,
	time,
	message,
	senderID,
	currentSelected,

}) => {
	const navigate = useNavigate();
	const [iconHovered, setIconHovered] = useState(false);
	const [collapsed, setCollapsed] = useState(false);
	const ActiveStyle = {
		background: "#00a2d419",
		color: "#00a2d4",
	};

	const openChat = (id) => {
		navigate(`${id}`);
	};

	const isSelected = currentSelected === senderID;

	return (
		<Wrapper>
			<ListWrapper >
			<div
					
					onClick={() => setCollapsed(!collapsed)}
				>

				</div>
				</ListWrapper>
		<Container onClick={() => openChat(senderID)} selected={isSelected}>
			<TopContainer>
				<InnerContainer>
					<ImageContainer>
						<Image src={image} alt="" />
					</ImageContainer>
					<NameContainer>
						<UpperText>{name}</UpperText>
						<LowerText>{serviceName}</LowerText>
					</NameContainer>
				</InnerContainer>
				<LowerText>{time}</LowerText>
			</TopContainer>
			<LowerWrapper>{message}</LowerWrapper>
			</Container>
			</Wrapper>
		
	);
};

export default ChatCard;
