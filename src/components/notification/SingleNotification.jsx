import { formatDistanceToNow, parseJSON } from "date-fns";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Node } from "slate";
import { checkStaffEmail } from "utils/globalFunctions";
import { Message, MessageBody, MessageSubject, MessageTIme } from "./style";

const SingleNotification = ({ item, handleBlur }) => {
  const serializeToText = (nodes) => {
    return nodes.map((n) => Node.string(n)).join("\n");
  };

  const navigate = useNavigate();

  let userEmail = localStorage.getItem("userEmail");
  let staffEmail = checkStaffEmail(userEmail);

  const handleClick = () => {
    navigate(
      staffEmail
        ? `/staff-dashboard/businesses/services/chats?serviceId=${item?.serviceId}&subject=${item?.messageSubject}`
        : `/dashboard/businesses/chats/?serviceId=${item?.serviceId}&subject=${item?.messageSubject}`
    );
    handleBlur();
  };

  const parse = (messageBody) => {
    try {
      return serializeToText(JSON.parse(messageBody));
    } catch (err) {
      return messageBody;
    }
  };

  const message = parse(item?.messageBody);

  return (
    <Message onClick={handleClick}>
      <MessageSubject>{item.messageSubject}</MessageSubject>

      <MessageBody>{message}</MessageBody>
      <MessageTIme>
        {formatDistanceToNow(parseJSON(item.createdAt), {
          addSuffix: true,
        })}
      </MessageTIme>
    </Message>
  );
};

export default SingleNotification;
