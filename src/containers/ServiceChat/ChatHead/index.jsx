import {
	Container,
	TextAndImage,
	TextContainer,
	Name,
	ServiceID,
	Buttons,
	StatusButton,
	UserImageContainer,
	OnlineIndicator,
} from "./style";
import { User, Download } from "asset/svg";
import { CommonButton } from "components/button";
import { useActions } from "./actions";
import { useState } from "react";
import {
	ContextButton,
	ContextMenu,
	InvisibleBackDrop,
} from "components/Menu/ThreeDotMenu/style";

export const ChatHead = () => {
	const [showStatusDropdown, setShowStatusDropdown] = useState(false);
	const [status, setStatus] = useState("new");

	const possibleStatuses = ["new", "progress", "completed"];

	const { getStatus } = useActions();

	const getAttachment = () => {
		console.log("Attachment");
	};

	return (
		<Container>
			<TextAndImage>
				<UserImageContainer>
					{/* Should be relaced with an image if image is available */}
					<User />
					<OnlineIndicator />
				</UserImageContainer>
				<TextContainer>
					<Name>Ayomide Olabisi</Name>
					<ServiceID>Service ID</ServiceID>
				</TextContainer>
			</TextAndImage>
			<Buttons>
				<StatusButton
					color={getStatus(status).color}
					onClick={() => setShowStatusDropdown((prev) => !prev)}
				>
					{getStatus(status).text}
				</StatusButton>
				{showStatusDropdown ? (
					<>
						<InvisibleBackDrop
							onClick={() => setShowStatusDropdown(false)}
						/>
						<ContextMenu>
							{possibleStatuses.map((el, index) => (
								<ContextButton
									key={index}
									onClick={() => {
										setStatus(el);
										setShowStatusDropdown(false);
									}}
								>
									{getStatus(el).text}
								</ContextButton>
							))}
						</ContextMenu>
					</>
				) : null}
				<CommonButton
					text={"Attachment"}
					LeftIcon={Download}
					action={getAttachment}
				/>
			</Buttons>
		</Container>
	);
};
