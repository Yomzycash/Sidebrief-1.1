import {
  Container,
  BackContainer,
  Text,
  Top,
  TitleContainer,
  TopInfo,
  CompanyName,
  LHS,
  RHS,
  BottomInfo,
  UserName,
  DotSeperator,
  DateText,
  DeleteButton,
  SubHeader,
  StatusType,
  MessageCount,
} from "./styled";
import { FiArrowLeft } from "react-icons/fi";
import { StatusIndicator } from "components/Indicators";
import { RedTrash } from "asset/svg";
import ActiveNav from "components/navbar/ActiveNav";

import { Dialog } from "@mui/material";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { HiX } from "react-icons/hi";
import { useViewLaunchRequestQuery, useDeleteLaunchRequestMutation } from "services/launchService";
import { useDeleteLaunchRequestStaffMutation } from "services/staffService";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import styled from "styled-components";
import { CheckoutController } from "containers/Checkout";
import { CommonButton } from "components/button";
import { Mail } from "asset/svg";

import { getUnReadNotifications } from "components/navbar/actions";
import { useGetNotificationsByServiceIdQuery } from "services/chatService";

const ServiceDetailHeader = ({
  serviceName,
  date,
  status,
  code,
  isStaff,
  deleteAction = () => {},
}) => {
  const [subHeaderHovered, setSubHeaderHovered] = useState(false);

  const { data, refetch } = useGetNotificationsByServiceIdQuery(code);

  let newNotifications = getUnReadNotifications(data);
  const navigate = useNavigate();

  const { first_name, last_name } = useSelector((store) => store.UserDataReducer.userInfo);

  const subHeader = useRef();

  useEffect(() => {
    const subHeaderContainer = subHeader.current;
    // Listen to the mouse wheel event
    subHeaderContainer.addEventListener("wheel", (e) => {
      e.preventDefault();
      subHeaderContainer.scrollLeft += e.deltaY;
    });
    refetch();

    return () => {
      subHeaderContainer.removeEventListener("wheel", () => {});
    };
  }, []);

  const navigateToMessages = () => {
    if (isStaff) {
      navigate(`/staff-dashboard/businesses/services/chats/?serviceId=${code}`);
    } else {
      navigate(`/dashboard/businesses/chats/?serviceId=${code}`);
    }
  };

  return (
    <Container>
      <Top>
        <BackContainer to={{}}>
          <FiArrowLeft color="#151717" size={24} />
          <Text>{`Back to Service list`}</Text>
        </BackContainer>
        <TitleContainer>
          <LHS>
            <TopInfo>
              <CompanyName>{serviceName}</CompanyName>

              {/* Status */}
              <StatusType>
                <StatusIndicator status={status} />
              </StatusType>
              <CommonButton
                text={"Messages"}
                classname="transbutton"
                LeftIcon={Mail}
                component={
                  newNotifications?.length > 0 && (
                    <MessageCount>{newNotifications?.length}</MessageCount>
                  )
                }
                action={navigateToMessages}
              />
            </TopInfo>
            <BottomInfo>
              <UserName>{`${first_name} ${last_name}`}</UserName>
              <DotSeperator />
              <DateText>{date}</DateText>
            </BottomInfo>
          </LHS>
          <RHS>
            <DeleteButton onClick={deleteAction}>
              <p>Delete</p>
              <RedTrash />
            </DeleteButton>
          </RHS>
        </TitleContainer>
      </Top>
      <SubHeader
        ref={subHeader}
        onMouseEnter={() => setSubHeaderHovered(true)}
        onMouseLeave={() => setSubHeaderHovered(false)}
        $hovered={subHeaderHovered}
      >
        <ActiveNav
          text={"Service Information"}
          // total={0}
          path={"/dashboard/services/details/ServiceInformation"}
        />
        <ActiveNav text={"Form"} path={"/dashboard/services/details/FormInformation"} />
        <ActiveNav text={"Documents"} path={"/dashboard/services/details/DocumentInfo"} />
      </SubHeader>
    </Container>
  );
};

export default ServiceDetailHeader;
