import HeaderCheckout from "components/Header/HeaderCheckout";
import { CheckoutController } from "containers";
import { CheckoutFormInfo, CheckoutSection } from "containers/Checkout";
import LaunchFormContainer from "containers/Checkout/CheckoutFormContainer/LaunchFormContainer";
import LaunchPrimaryContainer from "containers/Checkout/CheckoutFormContainer/LaunchPrimaryContainer";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCheckoutProgress, setDirectorsLaunchInfo } from "redux/Slices";
import { store } from "redux/Store";
import { AddMore, Body, Bottom, Container } from "../styled";
import { ReactComponent as AddIcon } from "asset/Launch/Add.svg";
import { Dialog } from "@mui/material";
import LaunchSummaryCard from "components/cards/LaunchSummaryCard";
import { checkInfoDirectorSchema } from "utils/config";
import {
  useAddDirectorMutation,
  useAddMembersMutation,
  useDeleteDirectorMutation,
  useDeleteMemberMutation,
  useUpdateDirectorMutation,
  useUpdateMemberMutation,
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

const DirectorsInfo = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [cardAction, setCardAction] = useState();
  const [selectedToEdit, setSelectedToEdit] = useState({});
  const [selectedToDelete, setSelectedToDelete] = useState({});
  const [useSidebriefDirectors, setUseSidebriefDirectors] = useState(false);

  // Endpont hooks
  const [addDirector, addState] = useAddDirectorMutation();
  const [deleteDirector, deleteState] = useDeleteDirectorMutation();
  const [updateDirector, updateState] = useUpdateDirectorMutation();
  const [addMembers, memberAddState] = useAddMembersMutation();
  const [updateMember, memberUpdateState] = useUpdateMemberMutation();
  const [deleteMember] = useDeleteMemberMutation();

  // This gets the directors information from the store
  const LaunchApplicationInfo = useSelector((store) => store.LaunchReducer);
  const { directorsLaunchInfo, shareholdersLaunchInfo } = LaunchApplicationInfo;

  const handleNext = () => {
    navigate("/launch/beneficiaries-info");
    store.dispatch(setCheckoutProgress({ total: 13, current: 7 })); // total- total pages and current - current page
  };

  const handlePrev = () => {
    navigate(-1);
    store.dispatch(setCheckoutProgress({ total: 13, current: 6 })); // total- total pages and current - current page
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

  // This deletes a director's informataion
  const handleDelete = async (director) => {
    setSelectedToDelete(director);

    let deleteResponse = await directorDelete(
      LaunchApplicationInfo,
      director,
      deleteDirector,
      deleteMember
    );
    console.log(deleteResponse);

    if (deleteResponse.data) {
      store.dispatch(setDirectorsLaunchInfo({ info: deleteResponse.data }));
    } else {
      if (deleteResponse.error.status === "FETCH_ERROR") {
        toast.error("Please check your internet connection");
      } else {
        toast.error(deleteResponse.error.data.message);
      }
    }
  };

  // This adds a new director
  const handleDirectorAdd = async (formData, launchCode) => {
    // Add a member
    let addMemberResponse = await memberAdd(launchCode, formData, addMembers);
    // Runs if successfully added member
    if (addMemberResponse.data) {
      const memberInfo = addMemberResponse.data;

      const addDirectorResponse = await directorAdd(
        launchCode,
        formData,
        memberInfo,
        addDirector
      );
      let directorAllInfo = addDirectorResponse?.data;
      let error = addDirectorResponse?.error;

      if (addDirectorResponse.data) {
        // Set the combined information to store
        store.dispatch(
          setDirectorsLaunchInfo({ info: directorAllInfo, type: "add" })
        );
        setOpenModal(false);
        console.log(addDirectorResponse);
      } else {
        console.log(addDirectorResponse.error);
        toast.error(error.data.message);
      }
    }
    // Runs if failed to add member
    else if (addMemberResponse.error) {
      let error = addMemberResponse.error;
      if (error.status === "FETCH_ERROR")
        toast.error("Please check your internet connection");
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
      const directorsMembersMerged = mergeInfo(
        directorsUpdatedData,
        membersUpdatedData
      );
      console.log(directorsMembersMerged);
      store.dispatch(setDirectorsLaunchInfo({ info: directorsMembersMerged }));
      handleModalClose();
    } else {
      if (error?.status === "FETCH_ERROR") {
        toast.error("Please check your internet connection");
      } else {
        toast.error(error?.data.message);
      }
    }
  };

  return (
    <Container>
      <HeaderCheckout />
      <Body>
        <CheckoutSection
          title={"Directors Information"}
          checkbox="Directors"
          checkBoxAction={handleCheckbox}
          disableCheckbox={directorsLaunchInfo.length > 0 ? true : false}
        />
        <LaunchPrimaryContainer>
          <LaunchFormContainer>
            {directorsLaunchInfo.map((director, index) => (
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
            </Dialog>
          </LaunchFormContainer>
          <Bottom>
            <CheckoutController
              backAction={handlePrev}
              backText={"Previous"}
              forwardAction={handleNext}
              forwardText={"Proceed"}
            />
          </Bottom>
        </LaunchPrimaryContainer>
      </Body>
    </Container>
  );
};

export default DirectorsInfo;
