import {
	Container,
	FileContainer,
	Wrapper,
	Name,
	Size,
	TextContainer,
	ContextContainer,
	Title,
	Body,
	TimeStamp,
} from "./style";
import { ReactComponent as PdfIcon } from "asset/svg/pdf.svg";
import { ThreeDotMenu } from "components/Menu";
import { format, parseJSON } from "date-fns";

export const MessageBubble = ({
	messageBody,
	messageSubject,
	messageFiles,
	updatedAt,
	date,
	containsFile,
	fileName,
	fileType,
	fileSize,
}) => {
	const menuContent = [
		{
			text: "View",
			action: () => {},
		},
		{
			text: "Download",
			action: () => {},
		},
	];

	return (
		<Wrapper>
			{messageBody ? (
				<Container>
					<Title>{messageSubject}</Title>
					<Body>{messageBody}</Body>
				</Container>
			) : null}

			{containsFile ? (
				<FileContainer>
					<PdfIcon />
					<TextContainer>
						<Name>{fileName}</Name>
						<Size>{fileSize}</Size>
					</TextContainer>
					<ContextContainer>
						<ThreeDotMenu contextContent={menuContent} />
					</ContextContainer>
				</FileContainer>
			) : null}
			<TimeStamp>{format(parseJSON(updatedAt), "hh:mm aaa")}</TimeStamp>
		</Wrapper>
	);
};
// updatedAt?.slice(11, 16);
