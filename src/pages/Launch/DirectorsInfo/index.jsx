import HeaderCheckout from "components/Header/HeaderCheckout";
import { CheckoutController } from "containers";
import { CheckoutSection, MembersBasicInfo } from "containers/Checkout";
import LaunchFormContainer from "containers/Checkout/CheckoutFormContainer/LaunchFormContainer";
import LaunchPrimaryContainer from "containers/Checkout/CheckoutFormContainer/LaunchPrimaryContainer";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCheckoutProgress, setDirectorsLaunchInfo } from "redux/Slices";
import { store } from "redux/Store";
import { AddMore, Body, Bottom, Container, Loading, modalStyle } from "../styled";
import { ReactComponent as AddIcon } from "asset/Launch/Add.svg";
import { Dialog, DialogContent } from "@mui/material";
import LaunchSummaryCard from "components/cards/LaunchSummaryCard";
import { checkInfoDirectorSchema } from "utils/config";
import {
  useAddDirectorMutation,
  useAddMemberMutation,
  useDeleteDirectorMutation,
  useDeleteMemberMutation,
  useUpdateDirectorMutation,
  useUpdateMemberMutation,
  useUpdateShareholderMutation,
  useViewDirectorsMutation,
  useViewMembersMutation,
  useViewShareholdersMutation,
} from "services/launchService";
import toast from "react-hot-toast";
import { Puff } from "react-loading-icons";
import {
  checkMemberExistence,
  handleMemberAdd,
  handleMemberDelete,
  handleMemberUpdate,
  handleResponse,
} from "../actions";
import {
  handleDirectorAdd,
  handleDirectorDelete,
  handleDirectorsView,
  handleDirectorUpdate,
  handleSingleDirectorView,
} from "./actions";
import { handleError } from "utils/globalFunctions";
import { handleShareholderUpdate, handleSingleShareholderView } from "../ShareHoldersInfo/actions";

const DirectorsInfo = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [cardAction, setCardAction] = useState("");
  const [selectedToEdit, setSelectedToEdit] = useState({});
  const [selectedToDelete, setSelectedToDelete] = useState({});
  const [useSidebriefDirectors, setUseSidebriefDirectors] = useState(
    localStorage.getItem("useSidebriefDirectors")
  );
  const [directorsInfo, setDirectorsInfo] = useState([]);

  // Endpont hooks
  const [addDirector, addState] = useAddDirectorMutation();
  const [deleteDirector, deleteState] = useDeleteDirectorMutation();
  const [updateDirector, updateState] = useUpdateDirectorMutation();
  const [viewDirectors, viewState] = useViewDirectorsMutation();
  const [addMember, memberAddState] = useAddMemberMutation();
  const [deleteMember, memberDelState] = useDeleteMemberMutation();
  const [updateMember, memberUpdateState] = useUpdateMemberMutation();
  const [viewMembers, viewMembersState] = useViewMembersMutation();
  const [updateShareholder, shareholderUpdateState] = useUpdateShareholderMutation();
  const [viewShareholders, shareholderViewState] = useViewShareholdersMutation();

  // // This gets the directors information from the store
  // const LaunchApplicationInfo = useSelector((store) => store.LaunchReducer);
  // const { directorsLaunchInfo, shareholdersLaunchInfo, launchResponse } =
  //   LaunchApplicationInfo;

  const launchResponse = JSON.parse(localStorage.getItem("launchInfo"));

  // ADD A DIRECTOR
  const handleAdd = async (formData) => {
    let actionInfo_M = {
      ...launchResponse,
      formData: formData,
      identificationNumber: formData.nin,
      addMember: addMember,
      viewMembers: viewMembers,
      viewDirectors: viewDirectors,
      viewShareholders: viewShareholders,
    };
    let directorCheck = await handleSingleDirectorView(actionInfo_M);
    let shareholderCheck = await handleSingleShareholderView(actionInfo_M);

    if (directorCheck.data) {
      // THROW ERROR
      toast.error("Director exists");
      return false;
    } else {
      let actionInfo_M = {
        ...launchResponse,
        formData: formData,
        viewMembers: viewMembers,
        addMember: addMember,
      };

      let memberResponse = shareholderCheck?.data
        ? shareholderCheck
        : await handleMemberAdd(actionInfo_M);

      if (memberResponse.data) {
        // ADD DIRECTOR
        let actionInfo_D = {
          ...actionInfo_M,
          addMemberData: memberResponse.data,
          addDirector: addDirector,
        };
        let directorResponse = await handleDirectorAdd(actionInfo_D);
        handleResponse(directorResponse, "Director added successfully");
      } else {
        handleError(memberResponse?.error);
      }
      return true;
    }
  };

  //

  // UPDATE A DIRECTOR
  const handleUpdate = async (formData) => {
    let actionInfo_M = {
      ...launchResponse,
      formData: formData,
      ...selectedToEdit,
      updateMember: updateMember,
    };

    // UPDATE MEMBER
    let memberResponse = await handleMemberUpdate(actionInfo_M);

    let actionInfo_D = {
      ...actionInfo_M,
      ...selectedToEdit,
      identificationNumber: selectedToEdit.directorIdentificationNumber,
      updateDirector: updateDirector,
    };
    // UPDATE DIRECTOR
    let directorResponse = await handleDirectorUpdate(actionInfo_D);
    handleResponse(directorResponse, "Director updated successfully");

    let actionInfo_S = {
      ...actionInfo_D,
      viewShareholders: viewShareholders,
      viewMembers: viewMembers,
    };

    let shareholder = await handleSingleShareholderView(actionInfo_S);
    if (shareholder.data) {
      actionInfo_S = {
        ...actionInfo_S,
        ...shareholder.data,
        addMemberData: shareholder?.data,
        updateShareholder: updateShareholder,
      };
      let shareholderResponse = await handleShareholderUpdate(actionInfo_S);
      handleResponse(shareholderResponse, "Shareholder updated successfully");
    }
  };

  //

  // DELETE A DIRECTOR
  const handleDelete = async (director) => {
    setSelectedToDelete(director);
    let actionInfo_D = {
      ...launchResponse,
      ...director,
      deleteDirector: deleteDirector,
      deleteMember: deleteMember,
    };
    let directorResponse = await handleDirectorDelete(actionInfo_D);
    handleResponse(directorResponse, "Director deleted successfuly", handleView);
    // DELETE MEMBER
    let actionInfo_S = {
      launchCode: actionInfo_D.launchCode,
      identificationNumber: actionInfo_D.directorIdentificationNumber,
      viewShareholders: viewShareholders,
      viewMembers: viewMembers,
    };
    let shareholder = await handleSingleShareholderView(actionInfo_S);
    if (shareholder.data) return;
    let actionInfo_M = {
      launchCode: actionInfo_D.launchCode,
      memberCode: actionInfo_D.memberCode,
      deleteMember: deleteMember,
    };
    let memberResponse = await handleMemberDelete(actionInfo_M);
    console.log(memberResponse);
  };

  //

  // VIEW ALL DIRECTORS
  const handleView = async () => {
    let actionInfo = {
      ...launchResponse,
      viewDirectors: viewDirectors,
      viewMembers: viewMembers,
    };
    // VIEW ALL DIRECTORS
    let directorResponse = await handleDirectorsView(actionInfo);
    if (directorResponse.data) {
      store.dispatch(setDirectorsLaunchInfo(directorResponse.data));
      setDirectorsInfo(directorResponse.data);
    } else {
      handleError(directorResponse?.error);
    }
  };

  useEffect(() => {
    if (cardAction === "") handleView();
  }, [cardAction, selectedToDelete]);

  //

  const handlePopulate = (setValue) => {
    // console.log(selectedToEdit);
    if (cardAction === "edit") {
      setValue("fullName", selectedToEdit?.memberName);
      setValue("email", selectedToEdit?.memberEmail);
      setValue("phone", selectedToEdit?.memberPhone);
      setValue("nin", selectedToEdit.directorIdentificationNumber);
      // setValue("regNo", selectedToEdit.shareholderRegistrationNumber);
    } else {
      setValue("fullName", "");
      setValue("email", "");
      setValue("phone", "");
      setValue("nin", "");
      setValue("regNo", "");
    }
  };

  const handleEditButton = (shareholder) => {
    setSelectedToEdit(shareholder);
    setCardAction("edit");
    setOpenModal(true);
  };

  const handleAddButton = () => {
    setSelectedToEdit({});
    setCardAction("add");
    setOpenModal(true);
  };

  const handleCheckbox = (checked) => {
    setUseSidebriefDirectors(checked === true ? checked : false);
    if (checked) {
      localStorage.setItem("useSidebriefDirectors", checked);
    } else {
      localStorage.removeItem("useSidebriefDirectors");
    }
  };

  const handleFormSubmit = async (formData) => {
    // console.log(formData);
    if (cardAction === "add") {
      let addResponse = await handleAdd(formData);
      if (addResponse) {
        setCardAction("");
        setOpenModal(false);
      }
    } else if (cardAction === "edit") {
      await handleUpdate(formData);
      setCardAction("");
      setOpenModal(false);
    }
  };

  const handleNext = () => {
    let navigatedFrom = localStorage.getItem("navigatedFrom");

    if (navigatedFrom) {
      navigate(navigatedFrom);
      localStorage.removeItem("navigatedFrom");
      return;
    }

    navigate("/launch/beneficiaries-info");
  };

  // Set the progress of the application
  useEffect(() => {
    let review = localStorage.getItem("navigatedFrom");

    store.dispatch(setCheckoutProgress({ total: 13, current: review ? 13 : 7 })); // total- total pages and current - current page
  }, []);

  let loading =
    !addState.isLoading &&
    !updateState.isLoading &&
    !deleteState.isLoading &&
    !memberAddState.isLoading &&
    !memberUpdateState.isLoading &&
    !memberDelState.isLoading &&
    !shareholderUpdateState.isLoading &&
    (viewState.isLoading || viewMembersState.isLoading);

  return (
    <Container>
      <HeaderCheckout />
      <Body>
        <CheckoutSection
          title={"Directors Information"}
          checkbox="Directors"
          checkBoxAction={handleCheckbox}
          disableCheckbox={directorsInfo.length > 0 ? true : false}
          checked={useSidebriefDirectors}
          tipText="Directors are persons duly appointed by the company to direct and manage the business of the company."
          tipStyle={{ maxWidth: "270px" }}
        />
        <LaunchPrimaryContainer>
          <LaunchFormContainer>
            {directorsInfo.map((director, index) => (
              <LaunchSummaryCard
                key={index}
                number={index + 1}
                name={director?.memberName}
                email={director?.memberEmail}
                phone={director?.memberPhone}
                idNumber={director.directorIdentificationNumber}
                editAction={() => handleEditButton(director)}
                deleteAction={() => handleDelete(director)}
                isLoading={
                  selectedToDelete?.directorCode === director?.directorCode &&
                  (deleteState?.isLoading || memberDelState?.isLoading)
                    ? true
                    : false
                }
              />
            ))}
            {loading && (
              <Loading>
                <Puff stroke="#00A2D4" fill="white" />
              </Loading>
            )}
            {!useSidebriefDirectors && (
              <AddMore onClick={handleAddButton}>
                <AddIcon />
                <span>Add a Director</span>
              </AddMore>
            )}
            <Dialog open={openModal}>
              <DialogContent style={modalStyle}>
                <MembersBasicInfo
                  title="Director"
                  handleClose={() => setOpenModal(false)}
                  submitForm={handleFormSubmit}
                  populateModal={handlePopulate}
                  infoSchema={checkInfoDirectorSchema}
                  info={selectedToEdit}
                  isLoading={
                    addState.isLoading ||
                    updateState.isLoading ||
                    memberAddState.isLoading ||
                    memberUpdateState.isLoading ||
                    viewMembersState.isLoading
                  }
                  director
                />
              </DialogContent>
            </Dialog>
          </LaunchFormContainer>
          <Bottom>
            <CheckoutController
              backAction={() => navigate(-1)}
              backText={"Previous"}
              forwardAction={handleNext}
              forwardText={"Proceed"}
              forwardDisable={directorsInfo.length === 0 && !useSidebriefDirectors}
            />
          </Bottom>
        </LaunchPrimaryContainer>
      </Body>
      {/* <AppFeedback subProject="Directors info" /> */}
    </Container>
  );
};

export default DirectorsInfo;
