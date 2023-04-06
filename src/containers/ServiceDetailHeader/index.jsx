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
  ModalWrapper,
  ModalButton,
  Question,
  TopContent,
  CloseWrapper,
} from "./styled";
import { FiArrowLeft } from "react-icons/fi";
import { StatusIndicator } from "components/Indicators";
import { RedTrash } from "asset/svg";
import ActiveNav from "components/navbar/ActiveNav";

import { Dialog } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { HiX } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { CheckoutController } from "containers/Checkout";
import { CommonButton } from "components/button";
import { Mail } from "asset/svg";

import { getUnReadNotifications } from "components/navbar/actions";
import { useGetNotificationsByServiceIdQuery } from "services/chatService";
import { useDeleteComplyMutation } from "services/complyService";
import { handleError } from "utils/globalFunctions";
import { toast } from "react-hot-toast";

const ServiceDetailHeader = ({
  serviceName,
  date,
  status,
  code,
  isStaff,
  complyCode,
  form,
  document,
  mainUrl,
}) => {
  const [openModal, setOpenModal] = useState(false);

  const [subHeaderHovered, setSubHeaderHovered] = useState(false);

  const [deleteComply, deleteState] = useDeleteComplyMutation();

  const { data, refetch } = useGetNotificationsByServiceIdQuery(code);

  let newNotifications = getUnReadNotifications(data);
  const navigate = useNavigate();

  const { first_name, last_name } = useSelector((store) => store.UserDataReducer.userInfo);

  const subHeader = useRef();

  const { pathname } = useLocation();
  const servicesUrl = pathname.split("/").slice(0, -2).join("/");

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

  const handleClick = () => {
    setOpenModal(true);
  };

  const handleNo = () => {
    setOpenModal(false);
  };
  const deleteAction = async () => {
    // perform delete action here

    const response = await deleteComply({
      complyCode: complyCode,
    });

    let data = response?.data;
    let error = response?.error;

    if (data) {
      toast.success("Deleted");
      navigate(servicesUrl);
    } else handleError(error);
    setOpenModal(false);
  };

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
        <BackContainer to={servicesUrl}>
          <FiArrowLeft color="#151717" size={24} />
          <Text>{`Back to Products`}</Text>
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
            <DeleteButton onClick={handleClick}>
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
        {/* using both relative and absolute routing to reduce the length of the pathname  */}

        <ActiveNav
          text={"Products Information"}
          // total={0}
          path={`${mainUrl}/info`}
        />
        {form?.length > 0 && <ActiveNav text={"Form"} path={`${mainUrl}/forminfo`} />}
        {document?.length > 0 && <ActiveNav text={"Documents"} path={`${mainUrl}/documentinfo`} />}
      </SubHeader>
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
              forwardLoading={deleteState.isLoading}
            />
          </ModalButton>
        </ModalWrapper>
      </Dialog>
    </Container>
  );
};

export default ServiceDetailHeader;
