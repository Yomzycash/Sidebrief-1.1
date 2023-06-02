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
} from "./styles";
import { FiArrowLeft } from "react-icons/fi";
import { StatusIndicator } from "components/Indicators";
import { RedTrash } from "asset/svg";
import ActiveNav from "components/navbar/ActiveNav";
import { Dialog } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
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
import { useGetNotificationsByServiceIdQuery } from "services/chatService";
import { getUnReadNotifications } from "components/navbar/actions";
import { handleError } from "utils/globalFunctions";
import { toast } from "react-hot-toast";

export const Header = ({ isStaff, code }) => {
  const [subHeaderHovered, setSubHeaderHovered] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [deleteLaunch, deleteState] = useDeleteLaunchRequestMutation();
  const [deleteLaunchStaff, deleteLaunchStaffState] = useDeleteLaunchRequestStaffMutation();

  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const { data, isError, isLoading, refetch } = useGetNotificationsByServiceIdQuery(code);

  let newNotifications = getUnReadNotifications(data);

  const searchParams = new URLSearchParams(search);

  const launchResponse = {
    launchCode: searchParams.get("launchCode"),
    registrationCountry: searchParams.get("registrationCountry"),
    registrationType: searchParams.get("registrationType"),
  };

  const { first_name, last_name } = useSelector((store) => store.UserDataReducer.userInfo);

  const launchRequest = useViewLaunchRequestQuery(launchResponse);
  const page = pathname.split("/").pop();

  // console.log("checking page", page);

  const handleClick = () => {
    setOpenModal(true);
  };

  // when launch is submitted and userside
  const noDelete = !isStaff && launchRequest?.data?.registrationStatus === "submitted";

  const completedRegistration = launchRequest?.data?.registrationStatus === "submitted";

  const deleteAction = async () => {
    // perform delete action here
    let payload = {
      launchCode: launchResponse.launchCode,
    };

    let response = isStaff ? await deleteLaunchStaff(payload) : await deleteLaunch(payload);

    if (response?.data) {
      toast.success("Successfully deleted");
      navigate(
        isStaff
          ? `/${"staff-dashboard"}/businesses/registration/${
              launchRequest.isLoading
                ? `all`
                : launchRequest.data.registrationStatus === "pending"
                ? `pending`
                : launchRequest.data.registrationStatus === "submitted"
                ? "awaiting-approval"
                : "all"
            }`
          : `/dashboard/my-products/business/${
              launchRequest.isLoading
                ? `all-businesses`
                : launchRequest.data.registrationStatus === "pending"
                ? `draft-applications`
                : launchRequest.data.registrationStatus === "submitted"
                ? "submitted-applications"
                : null
            }`
      );
    } else handleError(response?.error);
    setOpenModal(false);
  };

  const handleNo = () => {
    setOpenModal(false);
  };

  const triggerSearch = (query) => {
    // perform search filter here
  };

  const navigateToMessages = () => {
    if (isStaff) {
      navigate(`/staff-dashboard/businesses/services/chats/?serviceId=${code}`);
    } else {
      navigate(`/dashboard/my-products/chats/?serviceId=${code}`);
    }
  };

  const getStatus = (stat) => {
    switch (stat) {
      case "pending":
        return {
          text: "draft",
          color: "#00A2D4",
        };
      case "submitted":
        return {
          text: "submitted",
          color: "#D400CC",
        };
      default:
        return {
          text: stat,
          color: "black",
        };
    }
  };

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

  let shareholders = launchRequest?.data?.businessShareholders;
  let directors = launchRequest?.data?.businessDirectors;
  let beneficiaries = launchRequest?.data?.businessBeneficialOwners;
  let paymentInfo = launchRequest?.data?.businessPayment;

  return (
    <Container>
      <Top>
        <BackContainer
          to={
            isStaff
              ? `/staff-dashboard/businesses/registration/${
                  launchRequest?.isLoading
                    ? `all`
                    : launchRequest?.data?.registrationStatus === "pending"
                    ? `pending`
                    : launchRequest?.data?.registrationStatus === "submitted"
                    ? "awaiting-approval"
                    : "all"
                }`
              : `/dashboard/my-products/business/${
                  launchRequest?.isLoading
                    ? `all-businesses`
                    : launchRequest?.data?.registrationStatus === "pending"
                    ? `draft-applications`
                    : launchRequest?.data?.registrationStatus === "submitted"
                    ? "submitted-applications"
                    : null
                }`
          }
        >
          <FiArrowLeft color="#151717" size={24} />
          <Text>Back to Applications</Text>
        </BackContainer>
        <TitleContainer>
          <LHS>
            <TopInfo>
              {launchRequest?.data?.businessNames && (
                <CompanyName>
                  {launchRequest?.isLoading
                    ? `--`
                    : Object.values(launchRequest?.data?.businessNames)[0]}
                </CompanyName>
              )}
              {/* Status */}
              <StatusType>
                <StatusIndicator
                  status={getStatus(
                    launchRequest?.isLoading ? `--` : launchRequest?.data?.registrationStatus
                  )}
                />
                {/* Type */}
                <StatusIndicator
                  status={{
                    text: launchRequest?.isLoading ? `--` : launchRequest?.data?.registrationType,
                    color: "#00A2D4",
                  }}
                />
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
              <DateText>
                {launchRequest?.isLoading
                  ? `--`
                  : format(new Date(launchRequest?.data?.createdAt), "do MMMM yyyy")}
              </DateText>
            </BottomInfo>
          </LHS>
          <RHS>
            {!noDelete ? (
              <DeleteButton onClick={handleClick}>
                <p>Delete</p>
                <RedTrash />
              </DeleteButton>
            ) : null}
          </RHS>
        </TitleContainer>
      </Top>

      <SubHeader
        ref={subHeader}
        onMouseEnter={() => setSubHeaderHovered(true)}
        onMouseLeave={() => setSubHeaderHovered(false)}
        $hovered={subHeaderHovered}
      >
        {completedRegistration && (
          <ActiveNav
            text={"Documents"}
            path={`/${
              isStaff ? "staff-dashboard" : "dashboard/my-products"
            }/business/document?launchCode=${launchResponse.launchCode}&registrationCountry=${
              launchResponse.registrationCountry
            }&registrationType=${launchResponse.registrationType}`}
          />
        )}
        <ActiveNav
          text={"Business Information"}
          path={`/${
            isStaff ? "staff-dashboard" : "dashboard/my-products"
          }/business/detail?launchCode=${launchResponse.launchCode}&registrationCountry=${
            launchResponse.registrationCountry
          }&registrationType=${launchResponse.registrationType}`}
        />

        {isStaff && launchRequest.data?.meta && (
          <ActiveNav
            text={"User Information"}
            path={`/staff-dashboard/business/user-info?launchCode=${launchResponse.launchCode}&registrationCountry=${launchResponse.registrationCountry}&registrationType=${launchResponse.registrationType}`}
          />
        )}

        {paymentInfo?.length > 0 && (
          <ActiveNav
            text={"Payment Details"}
            path={`/${
              isStaff ? "staff-dashboard" : "dashboard/my-products"
            }/business/payment?launchCode=${launchResponse.launchCode}&registrationCountry=${
              launchResponse.registrationCountry
            }&registrationType=${launchResponse.registrationType}`}
          />
        )}
        {shareholders?.length > 0 && (
          <ActiveNav
            text={"Shareholders"}
            total={launchRequest?.isLoading ? 0 : shareholders?.length}
            path={`/${
              isStaff ? "staff-dashboard" : "dashboard/my-products"
            }/business/shareholders?launchCode=${launchResponse.launchCode}&registrationCountry=${
              launchResponse.registrationCountry
            }&registrationType=${launchResponse.registrationType}`}
          />
        )}
        {directors?.length > 0 && (
          <ActiveNav
            text={"Directors"}
            total={launchRequest?.isLoading ? 0 : directors?.length}
            path={`/${
              isStaff ? "staff-dashboard" : "dashboard/my-products"
            }/business/directors?launchCode=${launchResponse.launchCode}&registrationCountry=${
              launchResponse.registrationCountry
            }&registrationType=${launchResponse.registrationType}`}
          />
        )}
        {beneficiaries?.length > 0 && (
          <ActiveNav
            text={"Beneficiaries"}
            total={launchRequest?.isLoading ? 0 : beneficiaries?.length}
            path={`/${
              isStaff ? "staff-dashboard" : "dashboard/my-products"
            }/business/beneficiaries?launchCode=${launchResponse.launchCode}&registrationCountry=${
              launchResponse.registrationCountry
            }&registrationType=${launchResponse.registrationType}`}
          />
        )}
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
              forwardLoading={deleteState.isLoading || deleteLaunchStaffState.isLoading}
            />
          </ModalButton>
        </ModalWrapper>
      </Dialog>
    </Container>
  );
};

const ModalWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 40px 0px;
  flex-flow: column;
`;

const ModalButton = styled.div`
  display: flex;
  width: 80%;
`;

const Question = styled.p`
  font-size: clamp(16px, 1.5vw, 20px);
  margin-bottom: 20px;
`;
const TopContent = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 80%;
`;

const CloseWrapper = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  padding: 10px;
  border-radius: 100%;
  background-color: #d7d7d7;
  margin-bottom: 20px;
`;
