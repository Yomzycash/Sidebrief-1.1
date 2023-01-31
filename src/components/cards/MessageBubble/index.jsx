import {
	Container,
	FileContainer,
	Wrapper,
	Name,
	Size,
	TextContainer,
	ContextContainer,
} from "./style";
import { ReactComponent as PdfIcon } from "asset/svg/pdf.svg";
import { ThreeDotMenu } from "components/Menu";

export const MessageBubble = ({
	text,
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
			{text ? (
				<Container>
					<p>{text}</p>
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
		</Wrapper>
	);
};
