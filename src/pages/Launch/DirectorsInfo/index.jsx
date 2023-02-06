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
import {
  checkMemberExistence,
  handleMemberAdd,
  handleMemberUpdate,
  handleResponse,
} from "../actions";
import { handleDirectorAdd, handleDirectorUpdate } from "./actionss";
import { handleError } from "utils/globalFunctions";

const DirectorsInfo = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [cardAction, setCardAction] = useState();
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
  const [addMember, memberAddState] = useAddMemberMutation();
  const [updateMember, memberUpdateState] = useUpdateMemberMutation();
  const [deleteMember] = useDeleteMemberMutation();
  const [viewDirectors, viewDirectorsState] = useViewDirectorsMutation();
  const [viewMembers, viewMembersState] = useViewMembersMutation();

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
      viewMembers: viewMembers,
      addMember: addMember,
    };
    let memberCheck = await checkMemberExistence(actionInfo_M);

    let actionInfo_D = {
      ...actionInfo_M,
      addDirector: addDirector,
    };
    if (memberCheck.data) {
      // ADD DIRECTOR
      let directorResponse = await handleDirectorAdd(actionInfo_D);
      handleResponse(directorResponse, "Director added successfully");
    } else {
      // ADD MEMBER
      let memberResponse = await handleMemberAdd(actionInfo_M);
      actionInfo_D = {
        ...actionInfo_D,
        ...memberResponse,
      };
      if (memberResponse.data) {
        // ADD DIRECTOR
        let directorResponse = await handleDirectorAdd(actionInfo_D);
        handleResponse(directorResponse, "Director added successfully");
      } else {
        handleError(memberResponse?.error);
      }
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
      updateDirector: updateDirector,
    };
    // UPDATE DIRECTOR
    let directorResponse = await handleDirectorUpdate(actionInfo_D);
    handleResponse(directorResponse, "Director updated successfully");
  };

  //

  // DELETE A DIRECTOR
  const handleDelete = async (director) => {
    setSelectedToDelete(director);
    let actionInfo_D = {
      ...launchResponse,
      memberCode: director.memberCode,
      deleteDirector: deleteDirector,
      deleteMember: deleteMember,
    };
    // DELETE MEMBER
    let actionInfo_M = {
      launchCode: actionInfo_D.launchCode,
      memberCode: actionInfo_D.memberCode,
      deleteMember: deleteMember,
    };
    let memberResponse = await handleMemberDelete(actionInfo_M);
    console.log(memberResponse);
  };

  const handleView = async () => {
    let actionInfo = {
      ...launchResponse,
      viewShareholders: viewShareholders,
      viewMembers: viewMembers,
    };
    // VIEW ALL SHAREHOLDERS
    let shareholderResponse = await handleShareholdersView(actionInfo);
    if (shareholderResponse.data) {
      setShareholdersInfo(shareholderResponse.data);
    } else {
      handleError(shareholderResponse?.error);
    }
  };

  useEffect(() => {
    if (cardAction === "") handleView();
  }, [cardAction, selectedToDelete]);

  const handlePopulate = (setValue) => {
    // console.log(selectedToEdit);
    if (cardAction === "edit") {
      setValue("fullName", selectedToEdit?.memberName);
      setValue("email", selectedToEdit?.memberEmail);
      setValue("phone", selectedToEdit?.memberPhone);
      setValue(
        "sharePercentage",
        selectedToEdit?.shareholderOwnershipPercentage
      );
      setValue("nin", selectedToEdit.shareholderIdentificationNumber);
      // setValue("regNo", selectedToEdit.shareholderRegistrationNumber);
    } else {
      setValue("fullName", "");
      setValue("email", "");
      setValue("phone", "");
      setValue("sharePercentage", "");
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
  // const handleNext = () => {
  //   navigate("/launch/beneficiaries-info");
  // };

  // const handlePrev = () => {
  //   navigate(-1);
  // };

  // const handleCheckbox = (checked) => {
  //   setUseSidebriefDirectors(checked === true ? checked : false);
  //   if (checked) {
  //     localStorage.setItem("useSidebriefDirectors", checked);
  //   } else {
  //     localStorage.removeItem("useSidebriefDirectors");
  //   }
  // };

  // const handleAddMore = () => {
  //   setCardAction("add");
  //   setOpenModal(true);
  // };
  // const handleModalClose = () => {
  //   setOpenModal(false);
  // };

  // const handleEdit = (director) => {
  //   setCardAction("edit");
  //   setOpenModal(true);
  //   setSelectedToEdit(director);
  // };

  // const handleError = (error) => {
  //   if (error?.status === "FETCH_ERROR") {
  //     toast.error("Please check your internet connection");
  //   } else {
  //     toast.error(error?.data.message);
  //   }
  // };

  // // This deletes a director's informataion
  // const handleDelete = async (director) => {
  //   setSelectedToDelete(director);

  //   let deleteResponse = await directorDelete(director, deleteDirector);

  //   let data = deleteResponse?.data;
  //   let error = deleteResponse?.error;
  //   if (data) toast.success("Director deleted successfully");
  //   else handleError(error);
  // };

  // // This adds a new director
  // const handleDirectorAdd = async (formData, launchCode) => {
  //   // Add a member
  //   let addMemberResponse = await memberAdd(launchCode, formData, addMember);
  //   let error = addMemberResponse?.error;

  //   // Runs if successfully added member
  //   if (addMemberResponse.data) {
  //     const memberInfo = addMemberResponse.data;

  //     const addDirectorResponse = await directorAdd(
  //       launchCode,
  //       formData,
  //       memberInfo,
  //       addDirector
  //     );

  //     let directorData = addDirectorResponse?.data;
  //     let error = addDirectorResponse?.error;

  //     if (directorData) {
  //       toast.success("Director added successfully");
  //       setOpenModal(false);
  //     } else {
  //       handleError(error);
  //     }
  //   }
  //   // Runs if failed to add member
  //   else if (error) {
  //     // console.log(error);
  //     handleError(error);
  //   }
  // };

  // // This updates the director's information
  // const handleDirectorUpdate = async (formData, selectedDirector) => {
  //   // Responses from the backend
  //   let directorsUpdateResponse = await directorUpdate(
  //     formData,
  //     selectedDirector,
  //     updateDirector
  //   );
  //   let membersUpdateResponse = await memberUpdate(
  //     formData,
  //     selectedDirector,
  //     updateMember
  //   );

  //   // The data from the response got from the backend
  //   let directorsUpdatedData = directorsUpdateResponse?.data;
  //   let membersUpdatedData = membersUpdateResponse?.data;
  //   let error = directorsUpdateResponse?.error;

  //   // Executes if data is returned from the backend
  //   if (directorsUpdatedData) {
  //     toast.success("Director updated successfully");
  //     // const directorsMembersMerged = mergeInfo(
  //     //   directorsUpdatedData,
  //     //   membersUpdatedData
  //     // );
  //     // console.log(directorsMembersMerged);
  //     // store.dispatch(setDirectorsLaunchInfo({ info: directorsMembersMerged }));
  //     handleModalClose();
  //   } else {
  //     handleError(error);
  //   }
  // };

  // // Get the data from backend and set to state
  // const viewDraft = async () => {
  //   let requiredData = {
  //     launchCode: launchResponse.launchCode,
  //     registrationCountry: launchResponse.registrationCountry,
  //     registrationType: launchResponse.registrationType,
  //   };

  //   // Get data from view endpoints
  //   let members = await viewMembers(requiredData);
  //   let membersData = [...members.data.businessMembers];
  //   let directors = await viewDirectors(requiredData);
  //   let directorsData = [...directors.data.businessDirectors];

  //   // Merge shareholders shareholder's data and member data
  //   let mergedInfo = mergeInfo(directorsData, membersData);

  //   setDirectorsInfo(mergedInfo);

  //   if (mergedInfo.length > 0) {
  //     setUseSidebriefDirectors(false);
  //     localStorage.removeItem("useSidebriefDirectors");
  //   }

  //   return mergedInfo;
  // };

  // useEffect(() => {
  //   viewDraft();
  // }, [
  //   addState.isSuccess,
  //   deleteState.isSuccess,
  //   updateState.isSuccess,
  //   openModal,
  // ]);

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
          checked={useSidebriefDirectors}
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
      </Body>
      {/* <AppFeedback subProject="Directors info" /> */}
    </Container>
  );
};

export default DirectorsInfo;
