import HeaderCheckout from "components/Header/HeaderCheckout";
import { CheckoutController } from "containers";
import { CheckoutFormInfo, CheckoutSection } from "containers/Checkout";
import LaunchFormContainer from "containers/Checkout/CheckoutFormContainer/LaunchFormContainer";
import LaunchPrimaryContainer from "containers/Checkout/CheckoutFormContainer/LaunchPrimaryContainer";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  LaunchReducer,
  setCheckoutProgress,
  setDirectorsLaunchInfo,
  setShareHoldersLaunchInfo,
} from "redux/Slices";
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
import {
  checkInfoShareDirSchema,
  checkInfoShareholderSchema,
} from "utils/config";
import {
  useAddDirectorMutation,
  useAddMemberMutation,
  useAddShareHolderMutation,
  useDeleteDirectorMutation,
  useDeleteMemberMutation,
  useDeleteShareholderMutation,
  useGetUserDraftQuery,
  useUpdateDirectorMutation,
  useUpdateMemberMutation,
  useUpdateShareholderMutation,
  useViewDirectorsMutation,
  useViewMembersMutation,
  useViewShareholdersMutation,
} from "services/launchService";
import toast from "react-hot-toast";
import {
  mergeDirectorRole,
  mergeInfo,
  shareHolderAdd,
  shareholderDelete,
  shareholderUpdate,
  updateDirectorRole,
} from "./actions";
import {
  memberAdd,
  memberUpdate,
} from "containers/Checkout/InfoSection/actions";
import {
  directorAdd,
  directorDelete,
  directorUpdate,
} from "../DirectorsInfo/actions";
import { Puff } from "react-loading-icons";

const ShareHoldersInfo = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [cardAction, setCardAction] = useState();
  const [isDirector, setIsDirector] = useState(false);
  const [selectedToEdit, setSelectedToEdit] = useState({});
  const [selectedToDelete, setSelectedToDelete] = useState({});
  const [useSidebriefShareholders, setUseSidebriefShareholders] =
    useState(false);
  const [shareholdersInfo, setShareholdersInfo] = useState([]);

  // Endpont hook for shareholder add
  const [addShareHolder, addState] = useAddShareHolderMutation();
  const [deleteShareholder, deleteState] = useDeleteShareholderMutation();
  const [updateShareholder, updateState] = useUpdateShareholderMutation();
  const [addMember, memberAddState] = useAddMemberMutation();
  const [updateMember, memberUpdateState] = useUpdateMemberMutation();
  const [deleteMember] = useDeleteMemberMutation();
  const [addDirector, dirAddState] = useAddDirectorMutation();
  const [updateDirector, dirUpdateState] = useUpdateDirectorMutation();
  const [deleteDirector, dirDeleteState] = useDeleteDirectorMutation();
  const [viewShareholders, viewState] = useViewShareholdersMutation();
  const [viewMembers, viewMembersState] = useViewMembersMutation();
  const [viewDirectors, viewDirectorsState] = useViewDirectorsMutation();

  // This gets some information from the store
  const LaunchApplicationInfo = useSelector((store) => store.LaunchReducer);
  const { shareHoldersLaunchInfo, directorsLaunchInfo, launchResponse } =
    LaunchApplicationInfo;

  const handleNext = () => {
    navigate("/launch/directors-info");
  };

  const handlePrev = () => {
    navigate(-1);
  };

  const handleCheckbox = (checked) => {
    setUseSidebriefShareholders(checked);
  };

  const handleAddMore = () => {
    setCardAction("add");
    setOpenModal(true);
  };
  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleEdit = (shareholder) => {
    setCardAction("edit");
    setOpenModal(true);
    setSelectedToEdit(shareholder);
  };

  const handleError = (error) => {
    if (error?.status === "FETCH_ERROR") {
      toast.error("Please check your internet connection");
    } else {
      toast.error(error?.data.message);
    }
  };

  //
  // This adds a new director
  const handleDirectorAdd = async (launchCode, formData, memberInfo) => {
    let addDirectorResponse = await directorAdd(
      launchCode,
      formData,
      memberInfo,
      addDirector
    );

    let error = addDirectorResponse?.error;

    if (addDirectorResponse.data) {
      setOpenModal(false);
    } else {
      handleError(error);
    }
  };

  //
  // This updates the director's information
  const handleDirectorUpdate = async (formData, selectedDirector) => {
    // Responses from the backend
    let directorsUpdateResponse = await directorUpdate(
      formData,
      selectedDirector,
      updateDirector
    );

    // The data from the response got from the backend
    let directorsUpdatedData = directorsUpdateResponse?.data;

    let error = directorsUpdateResponse?.error;

    if (directorsUpdatedData) {
      handleModalClose();
    } else {
      handleError(error);
    }
  };

  //
  // Checks if a director exists
  const directorExists = async (selectedDirector) => {
    let requiredViewData = {
      launchCode: launchResponse.launchCode,
      registrationCountry: launchResponse.registrationCountry,
      registrationType: launchResponse.registrationType,
    };

    const directors = await viewDirectors(requiredViewData);
    const directorsData = directors?.data?.businessDirectors;
    let isDirector = directorsData?.find(
      (e) => e.directorCode === selectedDirector.directorCode
    );

    return isDirector;
  };

  //
  // This deletess the director's information
  const handleDirectorDelete = async (selectedDirector) => {
    let requiredData = {
      launchCode: launchResponse.launchCode,
      registrationCountry: launchResponse.registrationCountry,
      registrationType: launchResponse.registrationType,
    };
    let directors = await viewDirectors(requiredData);
    let directorsData = [...directors.data.businessDirectors];

    let exists = directorsData.findIndex(
      (e) => e.memberCode === selectedDirector.memberCode
    );
    console.log(exists);
    if (exists >= 0) {
      const res = await directorDelete(
        // LaunchApplicationInfo,
        selectedDirector,
        // viewShareholders,
        deleteDirector
        // deleteMember
      );
      console.log(res);
    }
  };

  //
  // This adds a new shareholder
  const handleShareholderAdd = async (formData, launchCode) => {
    // Add a member
    let addMemberResponse = await memberAdd(launchCode, formData, addMember);

    let error = addMemberResponse?.error;

    // Runs if successfully added member
    if (addMemberResponse.data) {
      const memberInfo = addMemberResponse.data;
      const addShareHolderResponse = await shareHolderAdd(
        launchCode,
        formData,
        memberInfo,
        addShareHolder
      );

      let error = addShareHolderResponse?.error;

      if (error) {
        toast.error(error.data.message);
      }

      // Add shareholder as a director if he is a director (i.e director role exists)
      if (formData.director_role) {
        await handleDirectorAdd(launchCode, formData, memberInfo);
      }
      setOpenModal(false);
    }

    // Runs if failed to add member
    else if (error) {
      handleError(error);
    }
  };

  //
  // This updates the shareholders information
  const handleShareholderUpdate = async (formData, selectedShareholder) => {
    // Responses from the backend
    let shareholdersUpdateResponse = await shareholderUpdate(
      formData,
      selectedShareholder,
      updateShareholder
    );
    let memberUpdateResponse = await memberUpdate(
      formData,
      selectedShareholder,
      updateMember
    );

    // The data from the response gotten from backend
    const shareholdersUpdatedData = await shareholdersUpdateResponse?.data;
    const memberUpdatedData = await memberUpdateResponse?.data;

    const error = shareholdersUpdateResponse?.error;

    const selectedDirector = {
      launchCode: selectedShareholder.launchCode,
      memberCode: selectedShareholder.memberCode,
      directorCode: selectedShareholder.directorCode,
      directorRole: selectedShareholder.directorRole,
    };

    let isDirector = await directorExists(selectedDirector);
    // Executes if data is returned from the backend
    if (shareholdersUpdatedData && memberUpdatedData) {
      // Update or add director's role if role exists or does not respectively
      if (formData.isDirector) {
        if (!isDirector) {
          handleDirectorAdd(
            selectedShareholder.launchCode,
            formData,
            memberUpdatedData
          );
        } else {
          handleDirectorUpdate(formData, selectedDirector);
        }
        console.log(selectedShareholder);
        handleModalClose();
      }

      // Else delete director info
      else {
        handleDirectorDelete(selectedDirector);
        handleModalClose();
      }
    } else {
      console.log(error);
      handleError(error);
    }
  };

  //
  // This deletes a shareholder's informataion
  const handleDelete = async (shareholder) => {
    const selectedDirector = {
      launchCode: shareholder.launchCode,
      memberCode: shareholder.memberCode,
      directorCode: shareholder.directorCode,
      directorRole: shareholder.directorRole,
    };

    const isDirector = await directorExists(selectedDirector);

    setSelectedToDelete(shareholder);
    // The delete response gotten from the backend
    let deleteResponse = await shareholderDelete(
      isDirector,
      shareholder,
      deleteShareholder,
      deleteMember
    );

    let error = deleteResponse.error;

    // This runs if an error is recieved
    if (error) {
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
    let shareholders = await viewShareholders(requiredData);
    let shareholdersData = [...shareholders.data.businessShareholders];
    let members = await viewMembers(requiredData);
    let membersData = [...members.data.businessMembers];
    let directors = await viewDirectors(requiredData);
    let directorsData = [...directors.data.businessDirectors];

    // Merge shareholders shareholder's data and member data
    let mergedInfo = mergeInfo(shareholdersData, membersData);

    // Merge shareholders director role, if the shareholer is a director
    mergeDirectorRole(mergedInfo, directorsData);

    setShareholdersInfo(mergedInfo);

    return mergedInfo;
  };

  useEffect(() => {
    viewDraft();
  }, [addState.isSuccess, deleteState.isSuccess, updateState.isSuccess]);

  // Set the progress of the application
  useEffect(() => {
    store.dispatch(setCheckoutProgress({ total: 13, current: 6.5 })); // total- total pages and current - current page
  }, []);

  return (
    <Container>
      <HeaderCheckout />
      <Body>
        <CheckoutSection
          title={"Shareholders Information"}
          checkbox="Shareholders"
          checkBoxAction={handleCheckbox}
          disableCheckbox={shareholdersInfo?.length > 0 ? true : false}
        />
        <LaunchPrimaryContainer>
          {viewState.isLoading ||
            (viewMembersState.isLoading && (
              <Loading>
                <Puff stroke="#00A2D4" fill="white" />
              </Loading>
            ))}
          <LaunchFormContainer>
            {shareholdersInfo.map((shareholder, index) => (
              <LaunchSummaryCard
                key={index}
                number={index + 1}
                name={shareholder?.memberName}
                shares={shareholder?.shareholderOwnershipType}
                email={shareholder?.memberEmail}
                phone={shareholder?.memberPhone}
                sharesPercentage={shareholder?.shareholderOwnershipPercentage}
                editAction={() => handleEdit(shareholder)}
                deleteAction={() => handleDelete(shareholder)}
                isLoading={
                  selectedToDelete?.shareholdingCode ===
                    shareholder?.shareholdingCode && deleteState?.isLoading
                    ? true
                    : false
                }
              />
            ))}
            {!useSidebriefShareholders && (
              <AddMore onClick={handleAddMore}>
                <AddIcon />
                <span>Add a Shareholder</span>
              </AddMore>
            )}
            <Dialog open={openModal}>
              <DialogContent style={modalStyle}>
                <CheckoutFormInfo
                  title="Shareholder"
                  handleClose={handleModalClose}
                  handleAdd={handleShareholderAdd}
                  handleUpdate={handleShareholderUpdate}
                  cardAction={cardAction}
                  checkInfoSchema={checkInfoShareholderSchema}
                  shareDirSchema={checkInfoShareDirSchema}
                  isDirector={isDirector}
                  shareholder
                  director={isDirector ? true : false}
                  addIsLoading={
                    addState.isLoading ||
                    deleteState.isLoading ||
                    updateState.isLoading ||
                    memberAddState.isLoading ||
                    memberUpdateState.isLoading ||
                    dirAddState.isLoading
                  }
                  selectedToEdit={selectedToEdit}
                  directorsInfo={directorsLaunchInfo}
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
                shareholdersInfo.length === 0 && !useSidebriefShareholders
              }
            />
          </Bottom>
        </LaunchPrimaryContainer>
      </Body>
    </Container>
  );
};

export default ShareHoldersInfo;
