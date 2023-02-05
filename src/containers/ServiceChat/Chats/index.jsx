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
import { useGetAllNotificationsQuery } from "services/chatService";
import profile from "asset/images/profile.svg";
import { formatDistanceToNow, parseJSON, compareAsc } from "date-fns";
import { useParams } from "react-router-dom";
import { getMessages } from "./actions";

export const Chats = () => {
	const options = ["senderID", "serviceID"];

	const [selected, setSelected] = useState("filter");
	// const [user, setUser] = useState([]);
	const [isActive, setIsActive] = useState(false);
	const { data, isError, isLoading } = useGetAllNotificationsQuery();
	const params = useParams();

	const messages = getMessages(data);

	return (
		<Container>
			<TopContainer>
				<Head>
					<Heading>Chats ({messages.length})</Heading>
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
				{messages
					?.sort((a, b) =>
						compareAsc(
							parseJSON(a.notification.slice(-1)[0]?.createdAt),
							parseJSON(b.notification.slice(-1)[0]?.createdAt)
						)
					)
					.map((chat, index) => {
						return (
							<ChatCard
								key={index}
								image={profile}
								name={chat.senderID || "No senderID"}
								serviceName={
									chat?.notification.slice(-1)[0].serviceID ||
									"No serviceID"
								}
								senderID={chat.senderID || "undefined"}
								message={
									chat?.notification.slice(-1)[0]
										.messageSubject
								}
								time={formatDistanceToNow(
									parseJSON(
										chat?.notification.slice(-1)[0]
											.createdAt
									),
									{ addSuffix: true }
								)}
								currentSelected={params.SenderID}
							/>
						);
					})}
			</ChatContainer>
		</Container>
	);
};
