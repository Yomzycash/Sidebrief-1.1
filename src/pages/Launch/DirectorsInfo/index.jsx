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
  useDeleteDirectorMutation,
  useDeleteMemberMutation,
  useUpdateDirectorMutation,
  useUpdateMemberMutation,
} from "services/launchService";
import toast from "react-hot-toast";

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
    const requiredDeleteData = {
      launchCode: director.launchCode,
      directorCode: director.directorCode,
      memberCode: director.memberCode,
      directorRole: director.directorRole,
    };
    let deleteResponse = await deleteDirector(requiredDeleteData);
    console.log(deleteResponse);
    if (deleteResponse.data) {
      // This filters and set the filtered directors info to the store
      let filteredDirectors = directorsLaunchInfo.filter(
        (director) => director.directorCode !== requiredDeleteData.directorCode
      );
      store.dispatch(setDirectorsLaunchInfo({ info: filteredDirectors }));
      // This checks if the deleted director is a shareholder
      let memberCheck = shareholdersLaunchInfo.filter(
        (shareholder) =>
          shareholder?.memberCode === requiredDeleteData?.memberCode
      );
      // if memberCheck length is 0 (i.e the director is not a shareholder), member delete endpoint is called.
      if (memberCheck.length === 0) {
        let requiredMemberDeleteData = {
          launchCode: director.launchCode,
          memberCode: director.memberCode,
        };
        let memberDeleteResponse = await deleteMember(requiredMemberDeleteData);
        console.log(memberDeleteResponse);
      }
    } else {
      if (deleteResponse.error.status === "FETCH_ERROR") {
        toast.error("Please check your internet connection");
      } else {
        toast.error(deleteResponse.error.data.message);
      }
    }
  };

  // This adds a new director
  const handleDirectorAdd = async (formData, launchCode, memberInfo) => {
    const requiredDirectorData = {
      launchCode: launchCode,
      memberCode: memberInfo.memberCode,
      directorRole: formData.director_role,
    };

    let addDirectorResponse = await addDirector(requiredDirectorData);
    if (addDirectorResponse.data) {
      // Get the information of all added directors
      const allDirectors = Object.entries(
        addDirectorResponse.data.businessDirectors
      );
      // Get the information of the just added director
      const directorInfo = allDirectors[allDirectors.length - 1][1];
      // Merge the member information and the director information of the just added director
      let directorAllInfo = { ...memberInfo, ...directorInfo };
      console.log(directorAllInfo);
      // Set the combined information to store
      store.dispatch(
        setDirectorsLaunchInfo({ info: directorAllInfo, type: "add" })
      );
      setOpenModal(false);
      console.log(addDirectorResponse);
    } else {
      console.log(addDirectorResponse.error);
      toast.error(addDirectorResponse.error.data.message);
    }
  };

  // This updates the director's information
  const handleDirectorUpdate = async (formData, selectedDirector) => {
    const requiredDirectorUpdateData = {
      launchCode: selectedDirector.launchCode,
      memberCode: selectedDirector.memberCode,
      directorRole: formData.director_role,
      directorCode: selectedDirector.directorCode,
    };
    const requiredMemberUpdateData = {
      launchCode: selectedDirector.launchCode,
      memberCode: selectedDirector.memberCode,
      businessMember: {
        memberName: formData.full_name,
        memberEmail: formData.email,
        memberPhone: formData.phone,
      },
    };
    // Responses from the backend
    let directorsUpdateResponse = await updateDirector(
      requiredDirectorUpdateData
    );
    let membersUpdateResponse = await updateMember(requiredMemberUpdateData);

    // The data from the response got from the backend
    let directorsUpdatedData = directorsUpdateResponse?.data?.businessDirectors;
    let membersUpdatedData = membersUpdateResponse?.data?.businessMembers;

    // Executes if data is returned from the backend
    if (directorsUpdatedData) {
      let directorsMembersMerged = [];
      directorsUpdatedData.forEach((director) => {
        membersUpdatedData.forEach((member) => {
          if (member.memberCode === director.memberCode) {
            let merged = { ...director, ...member };
            directorsMembersMerged.push(merged);
          }
        });
      });
      console.log(directorsMembersMerged);
      store.dispatch(setDirectorsLaunchInfo({ info: directorsMembersMerged }));
      handleModalClose();
    } else {
      if (directorsUpdateResponse.error.status === "FETCH_ERROR") {
        toast.error("Please check your internet connection");
      } else {
        toast.error(directorsUpdateResponse.error.data.message);
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
