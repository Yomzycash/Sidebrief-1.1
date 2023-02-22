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

export const ChatHead = ({ data }) => {
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [status, setStatus] = useState("new");

  const possibleStatuses = ["new", "progress", "completed"];

  const { getStatus } = useActions();

  // const getAttachment = () => {
  //   console.log("Attachment");
  // };

  const deleteMessage = () => {};

  const location = useLocation();
  let params = new URLSearchParams(location.search);
  let notificationId = params.get("notificationId");

  const message = data?.filter(
    (el) => el?.notificationId === notificationId
  )[0];
  console.log(message);

  return (
    <Container>
      <TextAndImage>
        <UserImageContainer>
          {/* Should be relaced with an image if image is available */}
          <User />
          <OnlineIndicator />
        </UserImageContainer>
        <TextContainer>
          <ServiceID>Sender ID</ServiceID>
          <Name>{message?.senderId}</Name>
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

        <CommonButton
          text={"Delete"}
          action={deleteMessage}
          style={{ backgroundColor: "#ffc0c0", padding: "5px 15px" }}
          textStyle={{ color: "#cc0000", fontWeight: "500" }}
        />
      </Buttons>
    </Container>
  );
};
