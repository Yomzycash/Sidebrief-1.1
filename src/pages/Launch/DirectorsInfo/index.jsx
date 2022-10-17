import HeaderCheckout from "components/Header/HeaderCheckout";
import { CheckoutController } from "containers";
import { CheckoutFormInfo, CheckoutSection } from "containers/Checkout";
import LaunchFormContainer from "containers/Checkout/CheckoutFormContainer/LaunchFormContainer";
import LaunchPrimaryContainer from "containers/Checkout/CheckoutFormContainer/LaunchPrimaryContainer";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCheckoutProgress, setDirectorsLaunchInfo } from "redux/Slices";
import { store } from "redux/Store";
import {
  AddMore,
  Body,
  Bottom,
  Container,
  Loading,
  modalStyle,
} from "../styled";
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
  useViewDirectorsMutation,
  useViewMembersMutation,
} from "services/launchService";
import toast from "react-hot-toast";
import {
  directorAdd,
  directorDelete,
  directorUpdate,
  mergeInfo,
} from "./actions";
import {
  memberAdd,
  memberUpdate,
} from "containers/Checkout/InfoSection/actions";
import { Puff } from "react-loading-icons";
import AppFeedback from "components/AppFeedback";

const DirectorsInfo = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [cardAction, setCardAction] = useState();
  const [selectedToEdit, setSelectedToEdit] = useState({});
  const [selectedToDelete, setSelectedToDelete] = useState({});
  const [useSidebriefDirectors, setUseSidebriefDirectors] = useState(false);
  const [directorsInfo, setDirectorsInfo] = useState([]);

  // Endpont hooks
  const [addDirector, addState] = useAddDirectorMutation();
  const [deleteDirector, deleteState] = useDeleteDirectorMutation();
  const [updateDirector, updateState] = useUpdateDirectorMutation();
  const [addMember, memberAddState] = useAddMemberMutation();
  const [updateMember, memberUpdateState] = useUpdateMemberMutation();
  const [deleteMember] = useDeleteMemberMutation();
  const [viewDirectors, viewDirectorsState] = useViewDirectorsMutation();
  const [viewMembers, viewMembersState] = useViewMembersMutation();

  // This gets the directors information from the store
  const LaunchApplicationInfo = useSelector((store) => store.LaunchReducer);
  const { directorsLaunchInfo, shareholdersLaunchInfo, launchResponse } =
    LaunchApplicationInfo;

  const handleNext = () => {
    navigate("/launch/beneficiaries-info");
  };

  const handlePrev = () => {
    navigate(-1);
  };

  const handleCheckbox = (checked) => {
    setUseSidebriefDirectors(checked);
  };

  const handleAddMore = () => {
    setCardAction("add");
    setOpenModal(true);
  };
  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleEdit = (director) => {
    setCardAction("edit");
    setOpenModal(true);
    setSelectedToEdit(director);
  };

  const handleError = (error) => {
    if (error?.status === "FETCH_ERROR") {
      toast.error("Please check your internet connection");
    } else {
      toast.error(error?.data.message);
    }
  };

  // This deletes a director's informataion
  const handleDelete = async (director) => {
    setSelectedToDelete(director);

    let deleteResponse = await directorDelete(director, deleteDirector);

    let error = deleteResponse?.error;

    if (error) {
      handleError(error);
    }
  };

  // This adds a new director
  const handleDirectorAdd = async (formData, launchCode) => {
    // Add a member
    let addMemberResponse = await memberAdd(launchCode, formData, addMember);
    let error = addMemberResponse?.error;

    // Runs if successfully added member
    if (addMemberResponse.data) {
      const memberInfo = addMemberResponse.data;

      const addDirectorResponse = await directorAdd(
        launchCode,
        formData,
        memberInfo,
        addDirector
      );

      let directorData = addDirectorResponse?.data;
      let error = addDirectorResponse?.error;

      if (directorData) {
        setOpenModal(false);
      } else {
        console.log(addDirectorResponse.error);
        toast.error(error.data.message);
      }
    }
    // Runs if failed to add member
    else if (error) {
      console.log(error);
      handleError(error);
    }
  };

  // This updates the director's information
  const handleDirectorUpdate = async (formData, selectedDirector) => {
    // Responses from the backend
    let directorsUpdateResponse = await directorUpdate(
      formData,
      selectedDirector,
      updateDirector
    );
    let membersUpdateResponse = await memberUpdate(
      formData,
      selectedDirector,
      updateMember
    );

    // The data from the response got from the backend
    let directorsUpdatedData = directorsUpdateResponse?.data;
    let membersUpdatedData = membersUpdateResponse?.data;
    let error = directorsUpdateResponse?.error;

    // Executes if data is returned from the backend
    if (directorsUpdatedData) {
      // const directorsMembersMerged = mergeInfo(
      //   directorsUpdatedData,
      //   membersUpdatedData
      // );
      // console.log(directorsMembersMerged);
      // store.dispatch(setDirectorsLaunchInfo({ info: directorsMembersMerged }));
      handleModalClose();
    } else {
      handleError(error);
    }
  };

  // Get the data from backend and set to state
  const viewDraft = async () => {
    let requiredData = {
      launchCode: launchResponse.launchCode,
      registrationCountry: launchResponse.registrationCountry,
      registrationType: launchResponse.registrationType,
    };

    // Get data from view endpoints
    let members = await viewMembers(requiredData);
    let membersData = [...members.data.businessMembers];
    let directors = await viewDirectors(requiredData);
    let directorsData = [...directors.data.businessDirectors];

    // Merge shareholders shareholder's data and member data
    let mergedInfo = mergeInfo(directorsData, membersData);

    setDirectorsInfo(mergedInfo);

    console.log(mergedInfo);
    return mergedInfo;
  };

  useEffect(() => {
    viewDraft();
  }, [
    addState.isSuccess,
    deleteState.isSuccess,
    updateState.isSuccess,
    openModal,
  ]);

  // Set the progress of the application
  useEffect(() => {
    store.dispatch(setCheckoutProgress({ total: 13, current: 7 })); // total- total pages and current - current page
  }, []);

  return (
    <Container>
      <HeaderCheckout />
      <Body>
        <CheckoutSection
          title={"Directors Information"}
          checkbox="Directors"
          checkBoxAction={handleCheckbox}
          disableCheckbox={directorsInfo.length > 0 ? true : false}
        />
        <LaunchPrimaryContainer>
          {viewDirectorsState.isLoading ||
            (viewMembersState.isLoading && (
              <Loading>
                <Puff stroke="#00A2D4" fill="white" />
              </Loading>
            ))}
          <LaunchFormContainer>
            {directorsInfo.map((director, index) => (
              <LaunchSummaryCard
                key={index}
                number={index + 1}
                name={director?.memberName}
                email={director?.memberEmail}
                phone={director?.memberPhone}
                director_role={director.directorRole}
                editAction={() => handleEdit(director)}
                deleteAction={() => handleDelete(director)}
                isLoading={
                  selectedToDelete?.directorCode === director?.directorCode &&
                  deleteState?.isLoading
                    ? true
                    : false
                }
              />
            ))}
            {!useSidebriefDirectors && (
              <AddMore onClick={handleAddMore}>
                <AddIcon />
                <span>Add a Director</span>
              </AddMore>
            )}
            <Dialog open={openModal}>
              <DialogContent style={modalStyle}>
                <CheckoutFormInfo
                  title="Director"
                  handleClose={handleModalClose}
                  handleAdd={handleDirectorAdd}
                  handleUpdate={handleDirectorUpdate}
                  cardAction={cardAction}
                  checkInfoSchema={checkInfoDirectorSchema}
                  director
                  selectedToEdit={selectedToEdit}
                  addIsLoading={
                    addState.isLoading ||
                    deleteState.isLoading ||
                    memberAddState.isLoading ||
                    updateState.isLoading ||
                    memberUpdateState.isLoading
                  }
                />
              </DialogContent>
            </Dialog>
          </LaunchFormContainer>
          <Bottom>
            <CheckoutController
              backAction={handlePrev}
              backText={"Previous"}
              forwardAction={handleNext}
              forwardText={"Proceed"}
              forwardDisable={
                directorsInfo.length === 0 && !useSidebriefDirectors
              }
            />
          </Bottom>
        </LaunchPrimaryContainer>
        <AppFeedback subProject="Directors info" />
      </Body>
    </Container>
  );
};

export default DirectorsInfo;
