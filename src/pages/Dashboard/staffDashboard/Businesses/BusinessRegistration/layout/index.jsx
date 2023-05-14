import { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import styled from "styled-components";
import { HiX } from "react-icons/hi";
import { CheckoutController } from "containers/Checkout";
import { toast } from "react-hot-toast";
import { RedTrash } from "asset/svg";
import { useMediaQuery } from "@mui/material";
import MobileBusiness from "layout/MobileBusiness";

import {
  Container,
  Header,
  MainHeader,
  TopContent,
  PageTitle,
  Drop,
  BottomContent,
  ButtonWrapper,
  ExportWrapper,
  Flex,
  SearchWrapper,
  SubHeader,
  TitleWrapper,
  DeleteWrapper,
  DeleteButton,
} from "./style";
import { SummaryCard } from "components/cards";
import ActiveNav from "components/navbar/ActiveNav";
import Search from "components/navbar/Search";
import React from "react";
import { ReactComponent as ExportIcon } from "asset/svg/ExportIcon.svg";
import { ReactComponent as NoteIcon } from "asset/images/note.svg";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  useGetAllLaunchQuery,
  useGetApprovedLaunchQuery,
  useGetDraftLaunchQuery,
  useGetRejectedLaunchQuery,
  useGetSubmittedLaunchQuery,
} from "services/staffService";
import { useSelector } from "react-redux";
import { handleError } from "utils/globalFunctions";
import { useBatchDeleteLaunchRequestsMutation } from "services/launchService";
import useMobile from "utils/useMobile";
import Dropdown from "components/Dropdown";
import CustomDropdown from "components/input/CustomDropdown";

const Registrationlayout = () => {
  const navigate = useNavigate();
  const [allReg, setAllReg] = useState([]);
  const [awaitingReg, setAwaiting] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false)

  const allLaunch = useGetAllLaunchQuery();

  const awaitingLaunch = useGetSubmittedLaunchQuery();

  const rejectedLaunch = useGetRejectedLaunchQuery();

  const pendingLaunch = useGetDraftLaunchQuery();

  const [batchDelete, deleteState] = useBatchDeleteLaunchRequestsMutation();

  const approvedLaunch = useGetApprovedLaunchQuery();
  let all = allLaunch?.currentData?.length;
  let awaiting = awaitingLaunch?.currentData?.length;
  let rejected = rejectedLaunch?.currentData?.length;
  let pending = pendingLaunch?.currentData?.length;
  let approved = approvedLaunch?.currentData?.length;
  let paid = pendingLaunch?.currentData?.filter((el) => el.paid).length;

  const { unreadLaunchNotifications } = useSelector((store) => store.UserDataReducer);
  const { batchDeleteArray } = useSelector((store) => store.UserDataReducer);

  const { pathname } = useLocation();
  let deleteShown = pathname.includes("pending");

  const matches = useMediaQuery("(max-width:700px)");

  const options = ["All", "Paid Drafts", "Drafts", "Submitted"];

  const handleClick = () => {
    setOpenModal(true);
  };

  const handleNo = () => {
    setOpenModal(false);
  };

  const deleteAction = async () => {
    // perform delete action here

    const response = await batchDelete({
      launchCodes: batchDeleteArray,
    });

    let data = response?.data;
    let error = response?.error;

    if (data) {
      toast.success("Deleted");
      pendingLaunch.refetch();
      allLaunch.refetch();
      navigate("/staff-dashboard/businesses/registration/pending");
    } else handleError(error);
    setOpenModal(false);
  };

  useEffect(() => {
    setAllReg(all ? all : []);
    setAwaiting(awaiting ? awaiting : []);
  }, [all, awaiting, pending, approved]);

  // WINDOW SIZE 
  useEffect(() => {
    
  })
  const location = useLocation();

  let home = location.pathname === "/staff-dashboard/businesses/registration" ? true : false;


  const searchStyle = {
    borderRadius: "12px",
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  };

  const iconStyle = { width: "17px", height: "17px" };
  return (
    <Container>
      <Header>
        <MainHeader>
          <TopContent>
            <div>
              <PageTitle>Business Registrations</PageTitle>
              <SummaryCard shown={23} total={503} />
            </div>
            <Drop>
              <select>
                <option value="Sort">Sort</option>
                <option value="All">All</option>
              </select>
            </Drop>
            {deleteShown && batchDeleteArray.length > 0 && (
              <DeleteWrapper>
                <DeleteButton onClick={handleClick}>
                  <p>Delete</p>
                  <RedTrash />
                </DeleteButton>
              </DeleteWrapper>
            )}

            <Dialog open={openModal} fullWidth maxWidth="sm">
              <ModalWrapper>
                <TopLevelContent>
                  <CloseWrapper onClick={() => setOpenModal(false)}>
                    <HiX size={20} />
                  </CloseWrapper>
                </TopLevelContent>

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
          </TopContent>
          <BottomContent>
            <SearchWrapper>
              <Search
                style={searchStyle}
                iconStyle={iconStyle}
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
                className={"searchbox"}
              />
            </SearchWrapper>
            {/* <Flex>
              <ExportWrapper>
                <ExportIcon />
                <TitleWrapper>Export Businesses</TitleWrapper>
              </ExportWrapper>
              <ButtonWrapper onClick={() => navigate("/launch")}>
                <button>
                  <NoteIcon />
                  Start Business Registration
                </button>
              </ButtonWrapper>
            </Flex> */}
          </BottomContent>
        </MainHeader>
         
         { !matches ? (
            <SubHeader>
            <ActiveNav
              text="All"
              total={allReg}
              status={unreadLaunchNotifications?.length > 0}
              path={"/staff-dashboard/businesses/registration/all"}
              defaultActive={home}
            />
            <ActiveNav
              text="Paid drafts"
              total={paid}
              path={"/staff-dashboard/businesses/registration/paid-draft"}
            />
            <ActiveNav
              text="Drafts"
              total={pending}
              path="/staff-dashboard/businesses/registration/pending"
            />
            <ActiveNav
              text="Submitted"
              total={awaitingReg}
              status={unreadLaunchNotifications?.length > 0}
              path="/staff-dashboard/businesses/registration/awaiting-approval"
            />
            <ActiveNav
              text="Approved"
              total={approved}
              path="/staff-dashboard/businesses/registration/in-progress"
            />
            <ActiveNav
              text="Rejected"
              total={rejected}
              path="/staff-dashboard/businesses/registration/rejected"
            />
            </SubHeader>
         ) : (
          <MobileBusiness options={options} title={"Business Registrations"}>

          </MobileBusiness>
          // <CustomDropdown />
         )}
        {/* <Dropdown
          options={[
            {
              text: 'Paid drafts',
              path: '/staff-dashboard/businesses/registration/paid-draft',
              total: paid,
            },
            {
              text: 'Drafts',
              path: '/staff-dashboard/businesses/registration/pending',
              total: pending,
            },
            {
              text: 'Submitted',
              path: '/staff-dashboard/businesses/registration/awaiting-approval',
              total: awaitingReg,
              status: unreadLaunchNotifications?.length > 0,
            },
            {
              text: 'Approved',
              path: '/staff-dashboard/businesses/registration/in-progress',
              total: approved,
            },
            {
              text: 'Rejected',
              path: '/staff-dashboard/businesses/registration/rejected',
              total: rejected,
            },
          ]}
        /> */}
      </Header>
      <Outlet
        context={{ allLaunch, awaitingLaunch, rejectedLaunch, pendingLaunch, approvedLaunch }}
      />
    </Container>
  );
};

export default Registrationlayout;

// const searchStyle = styled.div`
// 	border-radius: 12px;
// 	background-color: "white";
// 	max-width: 384px;
// 	height: 40px;
// 	@media screen and (max-width: 700px) {
// 		width: 100%;
// 	}
// `;

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
const TopLevelContent = styled.div`
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
