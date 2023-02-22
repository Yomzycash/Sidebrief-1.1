import {
	Container,
	Head,
	Heading,
	DropDown,
	SearchContainer,
	TextContainer,
	ArrowDown,
	TopContainer,
	ChatContainer,
	DropDownBtn,
	DropDownContent,
	DropDownItems,
} from "./style";
import Search from "components/navbar/Search";
import ChatCard from "components/cards/ChatCard";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { CommonButton } from "components/button";
import { useSearchParams } from "react-router-dom";

export const Chats = ({ data, isUser }) => {
	const [selected, setSelected] = useState("filter");
	const [isActive, setIsActive] = useState(false);
	const [params, setParams] = useSearchParams();

	const options = ["senderID", "serviceID"];

	const handleNew = () => {
		setParams({ serviceId: data[0]?.serviceId });
		console.log(data);
	};

	return (
		<Container>
			<TopContainer>
				<Head>
					<Heading>Chats ({data?.length})</Heading>

					<DropDown>
						<DropDownBtn
							onClick={() => {
								setIsActive(!isActive);
							}}
						>
							<TextContainer> {selected}</TextContainer>
							<ArrowDown
								onClick={() => setIsActive(!isActive)}
								isActive={isActive}
							>
								<IoIosArrowDown />
							</ArrowDown>
						</DropDownBtn>
						{isActive && (
							<DropDownContent>
								{options.map((option, index) => (
									<DropDownItems
										key={index}
										onClick={(e) => {
											setSelected(option);
											setIsActive(false);
										}}
									>
										{option}
									</DropDownItems>
								))}
							</DropDownContent>
						)}
					</DropDown>
				</Head>
				<SearchContainer>
					<Search />
				</SearchContainer>
			</TopContainer>
			<ChatContainer>
				<CommonButton text="New Conversation" action={handleNew} />

				{data?.map((notification, index) => (
					<ChatCard notification={notification} key={index} />
				))}
			</ChatContainer>
		</Container>
	);
};
