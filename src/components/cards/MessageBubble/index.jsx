import {
	Container,
	Wrapper,
	Title,
	Body,
	TimeStamp,
	CardContainer,
} from "./style";
import { format, isToday, isYesterday, parseJSON } from "date-fns";
import ChatFileCard from "../ChatFileCard";
import escapeHtml from "escape-html";
import { Text } from "slate";
import parse from "html-react-parser";

export const MessageBubble = ({
	messageBody,
	messageSubject,
	messageFiles,
	updatedAt,
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

	const formatDate = (updatedAt) => {
		if (isToday(new Date(updatedAt))) {
			return "Today";
		} else if (isYesterday(new Date(updatedAt))) {
			return "Yesterday";
		} else {
			let date = new Date(updatedAt);
			return date.toLocaleString("default", {
				month: "long",
				day: "numeric",
				year: "numeric",
			});
		}
	};

	const serializeToHtml = (node) => {
		if (Text.isText(node)) {
			let string = escapeHtml(node.text);
			if (node.bold) {
				string = `<strong>${string}</strong>`;
			}
			if (node.italic) {
				string = `<i>${string}</i>`;
			}
			if (node.underline) {
				string = `<u>${string}</u>`;
			}
			return string;
		}

		const children = node.children.map((n) => serializeToHtml(n)).join("");

		switch (node.type) {
			case "block-quote":
				return `<blockquote><p>${children}</p></blockquote>`;
			case "paragraph":
				return `<p>${children}</p>`;
			case "heading-one":
				return `<h1>${children}</h1>`;
			case "heading-two":
				return `<h2>${children}</h2>`;
			case "numbered-list":
				return `<ol>${children}</ol>`;
			case "bulleted-list":
				return `<ul>${children}</ul>`;
			case "list-item":
				return `<li>${children}</li>`;
			// case "link":
			// 	return `<a href="${escapeHtml(node.url)}">${children}</a>`;
			default:
				return children;
		}
	};

	const message = serializeToHtml({ children: JSON.parse(messageBody) });

	return (
		<Wrapper>
			{messageBody ? (
				<Container>
					<Title>{messageSubject}</Title>
					<Body>{parse(message)}</Body>
				</Container>
			) : null}
			<CardContainer>
				{messageFiles?.length > 0
					? messageFiles?.map((el, index) => {
							return (
								<ChatFileCard
									key={index}
									fileName={el?.fileName}
									fileType={el?.fileType}
								/>
							);
					  })
					: null}
			</CardContainer>
			{updatedAt && (
				<TimeStamp>
					<span>{formatDate(updatedAt)}</span>
					<span>{format(parseJSON(updatedAt), "hh:mm aaa")}</span>
				</TimeStamp>
			)}
		</Wrapper>
	);
};
// updatedAt?.slice(11, 16);
