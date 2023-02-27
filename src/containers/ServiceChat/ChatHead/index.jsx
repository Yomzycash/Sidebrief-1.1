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
import { useLocation } from "react-router-dom";
import { getSelectedThread } from "../Chats/actions";
import { getReceivedNotifications } from "components/navbar/actions";

export const ChatHead = ({ data }) => {
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [status, setStatus] = useState("new");

  const possibleStatuses = ["new", "progress", "completed"];

  const { getStatus } = useActions();

  const deleteMessage = () => {};

  const location = useLocation();
  let params = new URLSearchParams(location.search);
  let subject = params.get("subject");

  const selectedThread = getSelectedThread(data, subject);

  const lastMessage = selectedThread?.messages[0];

  let received = getReceivedNotifications(data);

  return (
    <Container>
      <TextAndImage>
        <UserImageContainer>
          {/* Should be relaced with an image if image is available */}
          <User />
          <OnlineIndicator />
        </UserImageContainer>
        <TextContainer>
          <Name>{received[0]?.senderId}</Name>
          <ServiceID>
            <span>Subject: </span> {lastMessage?.messageSubject}
          </ServiceID>
        </TextContainer>
      </TextAndImage>
      <Buttons>
        {/* <StatusButton
          color={getStatus(status).color}
          onClick={() => setShowStatusDropdown((prev) => !prev)}
        >
          {getStatus(status).text}
        </StatusButton> */}
        {showStatusDropdown ? (
          <>
            <InvisibleBackDrop onClick={() => setShowStatusDropdown(false)} />
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
        {/* <CommonButton
          text={"Attachment"}
          LeftIcon={Download}
          action={getAttachment}
        /> */}

        {/* <CommonButton
          text={"Delete"}
          action={deleteMessage}
          style={{ backgroundColor: "#ffc0c0", padding: "5px 15px" }}
          textStyle={{ color: "#cc0000", fontWeight: "500" }}
        /> */}
      </Buttons>
    </Container>
  );
};
