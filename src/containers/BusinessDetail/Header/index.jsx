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
  SearchAndSort,
  StatusType,
} from "./styles";
import { FiArrowLeft } from "react-icons/fi";
import { StatusIndicator } from "components/Indicators";
import { RedTrash } from "asset/svg";
import ActiveNav from "components/navbar/ActiveNav";
import { Search } from "./Search";
import { SortDropdown } from "./SortDropdown";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import {
  useViewLaunchRequestQuery,
  useDeleteLaunchRequestMutation,
} from "services/launchService";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";

export const Header = () => {
  const [subHeaderHovered, setSubHeaderHovered] = useState(false);
  const [deleteLaunch] = useDeleteLaunchRequestMutation();

  const { code } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const launchResponse = useSelector(
    (store) => store.LaunchReducer.launchResponse
  );

  const { first_name, last_name } = useSelector(
    (store) => store.UserDataReducer.userInfo
  );

  const launchRequest = useViewLaunchRequestQuery(launchResponse);

  const page = pathname.split("/").pop();

  const deleteAction = async () => {
    // perform delete action here
    await deleteLaunch({
      launchCode: launchResponse.launchCode,
    });
    navigate(
      `/dashboard/businesses/${
        launchRequest.isLoading
          ? `all-businesses`
          : launchRequest.data.registrationStatus === "pending"
          ? `draft-applications`
          : launchRequest.data.registrationStatus === "submitted"
          ? "submitted-applications"
          : null
      }`
    );
  };

  if (launchRequest.isSuccess) {
    // console.log(launchRequest.data);
  }

  const triggerSearch = (query) => {
    // perform search filter here
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

    return () => {
      subHeaderContainer.removeEventListener("wheel", () => {});
    };
  }, []);

  return (
    <Container>
      <Top>
        <BackContainer
          to={`/dashboard/businesses/${
            launchRequest.isLoading
              ? `all-businesses`
              : launchRequest.data.registrationStatus === "pending"
              ? `draft-applications`
              : launchRequest.data.registrationStatus === "submitted"
              ? "submitted-applications"
              : null
          }`}
        >
          <FiArrowLeft color="#151717" size={24} />
          <Text>Back to Applications</Text>
        </BackContainer>
        <TitleContainer>
          <LHS>
            <TopInfo>
              <CompanyName>
                {launchRequest.isLoading
                  ? `--`
                  : Object.values(launchRequest.data.businessNames)[0]}
              </CompanyName>
              {/* Status */}
              <StatusType>
                <StatusIndicator
                  status={getStatus(
                    launchRequest.isLoading
                      ? `--`
                      : launchRequest.data.registrationStatus
                  )}
                />
                {/* Type */}
                <StatusIndicator
                  status={{
                    text: launchRequest.isLoading
                      ? `--`
                      : launchRequest.data.registrationType,
                    color: "#00A2D4",
                  }}
                />
              </StatusType>
            </TopInfo>
            <BottomInfo>
              <UserName>{`${first_name} ${last_name}`}</UserName>
              <DotSeperator />
              <DateText>
                {launchRequest.isLoading
                  ? `--`
                  : format(
                      new Date(launchRequest.data.createdAt),
                      "do MMMM yyyy"
                    )}
              </DateText>
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
          text={"Business Information"}
          // total={0}
          path={`/dashboard/business/${code}/detail`}
        />
        <ActiveNav
          text={"Shareholders"}
          total={
            launchRequest.isLoading
              ? 0
              : launchRequest.data.businessShareholders.length
          }
          path={`/dashboard/business/${code}/shareholders`}
        />
        <ActiveNav
          text={"Directors"}
          total={
            launchRequest.isLoading
              ? 0
              : launchRequest.data.businessDirectors.length
          }
          path={`/dashboard/business/${code}/directors`}
        />
        <ActiveNav
          text={"Beneficiaries"}
          total={
            launchRequest.isLoading
              ? 0
              : launchRequest.data.businessBeneficialOwners.length
          }
          path={`/dashboard/business/${code}/beneficiaries`}
        />
      </SubHeader>
      {page !== "detail" ? (
        <SearchAndSort>
          {/* placeholder changes based on the page it's on */}
          {/* not implemented yet */}
          <Search triggerSearch={triggerSearch} page={page} />
          <SortDropdown />
        </SearchAndSort>
      ) : null}
    </Container>
  );
};
