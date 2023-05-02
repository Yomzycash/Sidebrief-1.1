import React, { useState } from "react";
import {
  CompanyName,
  LHS,
  RHS,
  BottomInfo,
  UserName,
  DotSeperator,
  DateText,
  DeleteButton,
  StatusType,
  MessageCount,
  ModalWrapper,
  ModalButton,
  Question,
  TopContent,
  CloseWrapper,
} from "./styled";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StatusIndicator } from "components/Indicators";
import { CommonButton } from "components/button";
import { RedTrash } from "asset/svg";
import { Dialog } from "@mui/material";
import { useGetNotificationsByServiceIdQuery } from "services/chatService";
import { getUnReadNotifications } from "components/navbar/actions";
import { ReactComponent as Mailbox } from "asset/svg/mailbox.svg";
import { Mail } from "asset/svg";

import { HiOutlineMail, HiX } from "react-icons/hi";
import { CheckoutController } from "containers/Checkout";
import styled from "styled-components";

const MobileInfo = ({ serviceName, date, status, code, type, isStaff, business }) => {
  const [openModal, setOpenModal] = useState(false);
  const { first_name, last_name } = useSelector((store) => store.UserDataReducer.userInfo);

  const { data, refetch } = useGetNotificationsByServiceIdQuery(code);

  let newNotifications = getUnReadNotifications(data);
  const navigate = useNavigate();
  const handleClick = () => {
    setOpenModal(true);
  };

  const handleNo = () => {
    setOpenModal(false);
  };
  const navigateToMessages = () => {
    if (isStaff) {
      navigate(`/staff-dashboard/businesses/services/chats/?serviceId=${code}`);
    } else {
      navigate(`/dashboard/my-products/chats/?serviceId=${code}`);
    }
  };
  const deleteAction = async () => {
    // perform delete action here
  };
  return (
    <div>
      <Container>
        <LHS>
          <TopInfo>
            <SubTopInfo>
              <CompanyName>{serviceName}</CompanyName>
              {business && (
                <StatusIndicator
                  status={{
                    text: type,
                    color: "#00A2D4",
                  }}
                />
              )}
              <StatusType>
                <StatusIndicator status={status} />
              </StatusType>
              {/* <CommonButton
                text={"Messages"}
                classname="transbutton"
                LeftIcon={Mail}
                component={
                  newNotifications?.length > 0 && (
                    <MessageCount>{newNotifications?.length}</MessageCount>
                    )
                  }
                action={navigateToMessages} */}

              {/* <MailIcon /> */}
            </SubTopInfo>

            <div
              onClick={() => navigateToMessages}
              style={{
                cursor: "pointer",
              }}
            >
              <HiOutlineMail />
            </div>
            {/* Status */}
            {/*  */}
            {/* <CommonButton
              text={"Messages"}
              classname="transbutton"
              LeftIcon={Mail}
              component={
                newNotifications?.length > 0 && (
                  <MessageCount>{newNotifications?.length}</MessageCount>
                )
              }
              action={navigateToMessages}
            /> */}
          </TopInfo>
          <BottomInfo>
            <SubBottomInfo>
              <UserName>{`${first_name} ${last_name}`}</UserName>
              <DotSeperator />
              <DateText>{date}</DateText>
            </SubBottomInfo>
            <DeleteButton onClick={handleClick}>
              <RedTrash />
            </DeleteButton>
          </BottomInfo>
        </LHS>

        <Dialog open={openModal} fullWidth maxWidth="sm">
          <ModalWrapper>
            <TopContent>
              <CloseWrapper onClick={() => setOpenModal(false)}>
                <HiX size={20} />
              </CloseWrapper>
            </TopContent>

            <Question>Do you want to Delete this Application ?</Question>
            <ModalButton>
              <CheckoutController
                backAction={handleNo}
                backText={"No"}
                forwardAction={deleteAction}
                forwardText={"Yes"}
              />
            </ModalButton>
          </ModalWrapper>
        </Dialog>
      </Container>
    </div>
  );
};

export default MobileInfo;

const Container = styled.div`
  width: 100%;
  /* padding: 16px; */
`;
const SubTopInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;
const TopInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const SubBottomInfo = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;
