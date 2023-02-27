import {
  Container,
  Wrapper,
  Title,
  Body,
  TimeStamp,
  CardContainer,
  Delete,
  DeleteStatus,
} from "./style";
import { format, isToday, isYesterday, parseJSON } from "date-fns";
import ChatFileCard from "../ChatFileCard";
import escapeHtml from "escape-html";
import { Text } from "slate";
import parse from "html-react-parser";
import DeleteIcon from "asset/Icons/DeleteIcon";
import { useDeleteNotificationMutation } from "services/chatService";
import { SpinningCircles } from "react-loading-icons";
import { handleResponse } from "pages/Launch/actions";
import { checkStaffEmail, handleError } from "utils/globalFunctions";
import { useState, useEffect } from "react";
import { Node } from "slate";

export const MessageBubble = ({
  senderId,
  messageBody,
  messageSubject,
  messageFiles,
  createdAt,
  notificationId,
  threadsRefetch,
}) => {
  const [selectedToDelete, setSelectedToDelete] = useState("");

  const [deleteNotification, deleteState] = useDeleteNotificationMutation();

  const formatDate = (createdAt) => {
    if (isToday(new Date(createdAt))) {
      return "Today";
    } else if (isYesterday(new Date(createdAt))) {
      return "Yesterday";
    } else {
      let date = new Date(createdAt);
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

  const parseMessage = (messageBody) => {
    try {
      return serializeToHtml({ children: JSON.parse(messageBody) });
    } catch (err) {
      return messageBody;
    }
  };

  const message = parse(parseMessage(messageBody));

  const handleDelete = async () => {
    setSelectedToDelete(notificationId);
    const response = await deleteNotification(notificationId);
    if (response?.data) handleResponse(response, "Deleted", threadsRefetch);
    else handleError(response?.error);
  };

  let timeDiff = (Date.now() - new Date(createdAt).getTime()) / 1000;
  let width = timeDiff < 900 ? (timeDiff / 900) * 100 : 100;

  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  let userEmail = localStorage.getItem("userEmail");

  let staffEmail = checkStaffEmail(userEmail);
  let username = userInfo.username;

  let isStaff = senderId === "Sidebrief" ? true : false;

  let isMyMessage =
    senderId === username || (isStaff && staffEmail) ? true : false;

  return (
    <Wrapper $isMyMessage={isMyMessage}>
      <Title $isMyMessage={isMyMessage}>
        <span>{senderId}</span>
        {isMyMessage && timeDiff < 900 && (
          <Delete>
            <DeleteStatus width={width > 0 ? width : 0}>
              <div />
            </DeleteStatus>
            {deleteState.isLoading && notificationId === selectedToDelete ? (
              <SpinningCircles
                stroke="#BD1C1C"
                fill="#BD1C1C"
                width={24}
                height={24}
              />
            ) : (
              <DeleteIcon color="#c20000ce" onClick={handleDelete} />
            )}
          </Delete>
        )}
      </Title>
      {messageBody ? (
        <Container>
          <Body>{message}</Body>
        </Container>
      ) : null}
      {messageFiles?.length > 0 && (
        <CardContainer>
          {messageFiles?.map((el, index) => (
            <ChatFileCard
              key={index}
              fileName={el?.fileName}
              fileType={el?.fileType}
              fileUrl={el?.fileUrl}
            />
          ))}
        </CardContainer>
      )}
      {createdAt && (
        <TimeStamp>
          <span>{formatDate(createdAt)}</span>
          <span>{format(parseJSON(createdAt), "hh:mm aaa")}</span>
        </TimeStamp>
      )}
    </Wrapper>
  );
};
// createdAt?.slice(11, 16);
