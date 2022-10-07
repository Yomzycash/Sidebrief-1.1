import HeaderCheckout from "components/Header/HeaderCheckout";
import { CheckoutController } from "containers";
import { CheckoutFormInfo, CheckoutSection } from "containers/Checkout";
import LaunchFormContainer from "containers/Checkout/CheckoutFormContainer/LaunchFormContainer";
import LaunchPrimaryContainer from "containers/Checkout/CheckoutFormContainer/LaunchPrimaryContainer";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  LaunchReducer,
  setCheckoutProgress,
  setDirectorsLaunchInfo,
  setShareHoldersLaunchInfo,
} from "redux/Slices";
import { store } from "redux/Store";
import { AddMore, Body, Bottom, Container } from "../styled";
import { ReactComponent as AddIcon } from "asset/Launch/Add.svg";
import { Dialog } from "@mui/material";
import LaunchSummaryCard from "components/cards/LaunchSummaryCard";
import {
  checkInfoShareDirSchema,
  checkInfoShareholderSchema,
} from "utils/config";
import {
  useAddDirectorMutation,
  useAddMembersMutation,
  useAddShareHolderMutation,
  useDeleteMemberMutation,
  useDeleteShareholderMutation,
  useGetUserDraftQuery,
  useUpdateDirectorMutation,
  useUpdateMemberMutation,
  useUpdateShareholderMutation,
} from "services/launchService";
import toast from "react-hot-toast";
import {
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
import { directorAdd, directorUpdate } from "../DirectorsInfo/actions";

const ShareHoldersInfo = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [cardAction, setCardAction] = useState();
  const [isDirector, setIsDirector] = useState(false);
  const [selectedToEdit, setSelectedToEdit] = useState({});
  const [selectedToDelete, setSelectedToDelete] = useState({});
  const [useSidebriefShareholders, setUseSidebriefShareholders] =
    useState(false);

  // Endpont hook for shareholder add
  const [addShareHolder, addState] = useAddShareHolderMutation();
  const [deleteShareholder, deleteState] = useDeleteShareholderMutation();
  const [updateShareholder, updateState] = useUpdateShareholderMutation();
  const [addMembers, memberAddState] = useAddMembersMutation();
  const [updateMember, memberUpdateState] = useUpdateMemberMutation();
  const [deleteMember] = useDeleteMemberMutation();
  const [addDirector, dirAddState] = useAddDirectorMutation();
  const [updateDirector, dirUpdateState] = useUpdateDirectorMutation();
  const { data, error, isLoading, isSuccess } = useGetUserDraftQuery();

  // This gets some information from the store
  const LaunchApplicationInfo = useSelector((store) => store.LaunchReducer);
  const { shareHoldersLaunchInfo, directorsLaunchInfo, generatedLaunchCode } =
    LaunchApplicationInfo;

  const handleNext = () => {
    navigate("/launch/directors-info");
    store.dispatch(setCheckoutProgress({ total: 13, current: 6 })); // total- total pages and current - current page
  };

  const handlePrev = () => {
    navigate(-1);
    store.dispatch(setCheckoutProgress({ total: 13, current: 5 })); // total- total pages and current - current page
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

  //
  // This deletes a shareholder's informataion
  const handleDelete = async (shareholder) => {
    setSelectedToDelete(shareholder);
    // The delete response gotten from the backend
    let deleteResponse = await shareholderDelete(
      LaunchApplicationInfo,
      shareholder,
      deleteShareholder,
      deleteMember
    );

    // This fires off, if delete response is success
    if (deleteResponse.data) {
      console.log(deleteResponse.data);
      store.dispatch(setShareHoldersLaunchInfo({ info: deleteResponse.data }));
    }
    // This runs if an error is recieved
    else {
      if (deleteResponse.error.status === "FETCH_ERROR") {
        toast.error("Please check your internet connection");
      } else {
        toast.error(deleteResponse.error.data.message);
      }
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

  //
  // This adds a new shareholder
  const handleShareholderAdd = async (formData, launchCode) => {
    // Add a member
    let addMemberResponse = await memberAdd(launchCode, formData, addMembers);
    // Runs if successfully added member
    if (addMemberResponse.data) {
      const memberInfo = addMemberResponse.data;
      const addShareHolderResponse = await shareHolderAdd(
        launchCode,
        formData,
        memberInfo,
        addShareHolder
      );
      let shareholderAllInfo = addShareHolderResponse?.data;
      let error = addShareHolderResponse?.error;

      if (shareholderAllInfo) {
        // Push to store
        console.log(formData);
        store.dispatch(
          setShareHoldersLaunchInfo({
            info: {
              ...shareholderAllInfo,
              directorRole: formData?.director_role,
            },
            type: "add",
          })
        );
      } else if (error) {
        toast.error(error.data.message);
      }
      console.log(formData);
      if (formData.director_role) {
        await handleDirectorAdd(launchCode, formData, memberInfo);
        setOpenModal(false);
        handleDirectorAdd(formData, launchCode, memberInfo);
      } else {
        setOpenModal(false);
      }
    }
    // Runs if failed to add member
    else if (addMemberResponse.error) {
      let error = addMemberResponse.error;
      if (error.status === "FETCH_ERROR")
        toast.error("Please check your internet connection");
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
    let membersUpdateResponse = await memberUpdate(
      formData,
      selectedShareholder,
      updateMember
    );

    // The data from the response got from the backend
    const shareholdersUpdatedData = await shareholdersUpdateResponse?.data;
    const membersUpdatedData = await membersUpdateResponse?.data;
    const error = shareholdersUpdateResponse.error;

    // Executes if data is returned from the backend
    if (shareholdersUpdatedData) {
      const shareholdersMembersMerged = mergeInfo(
        shareholdersUpdatedData,
        membersUpdatedData
      );
      if (formData.director_role) {
        updateDirectorRole(
          formData,
          shareholdersMembersMerged,
          selectedShareholder
        );
        // let selectedDirector = directorsLaunchInfo.filter(
        //   (dir) => dir.memberCode === selectedShareholder.memberCode
        // );
        // console.log(selectedDirector);
        // let directorsUpdateResponse = await directorUpdate(
        //   formData,
        //   selectedDirector,
        //   updateDirector
        // );
      }
      // Save to store
      store.dispatch(
        setShareHoldersLaunchInfo({ info: [...shareholdersMembersMerged] })
      );

      handleModalClose();
    } else {
      if (error.status === "FETCH_ERROR") {
        toast.error("Please check your internet connection");
      } else {
        toast.error(error.data.message);
      }
    }
  };

  useState(() => {
    if (data) {
      let currentDraft = data.find(
        (draft) => draft.launchCode === generatedLaunchCode
      );
      console.log(currentDraft);
    }
  }, [data]);

  return (
    <Container>
      <HeaderCheckout />
      <Body>
        <CheckoutSection
          title={"Shareholders Information"}
          checkbox="Shareholders"
          checkBoxAction={handleCheckbox}
          disableCheckbox={shareHoldersLaunchInfo?.length > 0 ? true : false}
        />
        <LaunchPrimaryContainer>
          <LaunchFormContainer>
            {shareHoldersLaunchInfo.map((shareholder, index) => (
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
              <CheckoutFormInfo
                title="Shareholder"
                handleClose={handleModalClose}
                handleAdd={handleShareholderAdd}
                handleUpdate={handleShareholderUpdate}
                cardAction={cardAction}
                checkInfoSchema={
                  isDirector
                    ? checkInfoShareDirSchema
                    : checkInfoShareholderSchema
                }
                isDirector={isDirector}
                setIsDirector={setIsDirector}
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

export default ShareHoldersInfo;
