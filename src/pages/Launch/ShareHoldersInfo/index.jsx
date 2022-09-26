import HeaderCheckout from "components/Header/HeaderCheckout";
import { CheckoutController } from "containers";
import { CheckoutFormInfo, CheckoutSection } from "containers/Checkout";
import LaunchFormContainer from "containers/Checkout/CheckoutFormContainer/LaunchFormContainer";
import LaunchPrimaryContainer from "containers/Checkout/CheckoutFormContainer/LaunchPrimaryContainer";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setCheckoutProgress,
  setEditShareholderInfo,
  setShareHoldersLaunchInfo,
  updateLaunchShareHolder,
} from "redux/Slices";
import { store } from "redux/Store";
import { AddMore, Body, Bottom, Container, Header } from "../styled";
import { ReactComponent as AddIcon } from "asset/Launch/Add.svg";
import { Dialog } from "@mui/material";
import LaunchSummaryCard from "components/cards/LaunchSummaryCard";
import {
  checkInfoShareDirSchema,
  checkInfoShareholderSchema,
} from "utils/config";
import {
  useAddShareHolderMutation,
  useDeleteShareholderMutation,
  useUpdateMemberMutation,
  useUpdateShareholderMutation,
} from "services/launchService";
import toast from "react-hot-toast";

const ShareHoldersInfo = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [cardAction, setCardAction] = useState();
  const [isDirector, setIsDirector] = useState(false);
  const [selectedToEdit, setSelectedToEdit] = useState({});

  // Endpont hook for shareholder add
  const [addShareHolder, { isLoading }] = useAddShareHolderMutation();
  const [deleteShareholder] = useDeleteShareholderMutation();
  const [updateShareholder] = useUpdateShareholderMutation();
  const [updateMember] = useUpdateMemberMutation();

  // This gets the shareholders information from the store
  const LaunchApplicationInfo = useSelector((store) => store.LaunchReducer);
  const { shareHoldersLaunchInfo } = LaunchApplicationInfo;

  const handleNext = () => {
    navigate("/launch/directors-info");
    store.dispatch(setCheckoutProgress({ total: 10, current: 5 })); // total- total pages and current - current page
  };

  const handlePrev = () => {
    navigate(-1);
    store.dispatch(setCheckoutProgress({ total: 10, current: 4 })); // total- total pages and current - current page
  };

  const handleCheckbox = (checked) => {
    console.log(checked);
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
    // const clickedShareholder = shareHoldersLaunchInfo[index];
    // store.dispatch(setEditShareholderInfo(clickedShareholder));
    // console.log(clickedShareholder);
  };

  // This deletes a shareholder's informataion
  const handleDelete = async (shareholder) => {
    const requiredDeleteData = {
      launchCode: shareholder.launchCode,
      shareholdingCode: shareholder.shareholdingCode,
      memberCode: shareholder.memberCode,
      shareholderOwnershipPercentage:
        shareholder.shareholderOwnershipPercentage,
      shareholderOwnershipType: shareholder.shareholderOwnershipType,
    };
    let deleteResponse = await deleteShareholder(requiredDeleteData);
    console.log(deleteResponse);
    if (deleteResponse.data) {
      store.dispatch(setShareHoldersLaunchInfo(deleteResponse.data));
    } else {
      toast.error(deleteResponse.error.status);
    }
  };

  // This adds a new shareholder
  const handleShareholderAdd = async (formData, launchCode, memberInfo) => {
    const requiredShareholderData = {
      launchCode: launchCode,
      memberCode: memberInfo.memberCode,
      shareholderOwnershipPercentage: formData.share_percentage,
      shareholderOwnershipType: formData.share_type,
    };

    let addShareHolderResponse = await addShareHolder(requiredShareholderData);
    if (addShareHolderResponse.data) {
      // Get the information of all added shareholder
      const allShareholders = Object.entries(
        addShareHolderResponse.data.businessShareholders
      );
      // Get the information of the just added shareholder
      const shareholderInfo = allShareholders[allShareholders.length - 1][1];
      // Merge the member information and the shareholder information of the just added shareholder
      let shareholderAllInfo = { ...memberInfo, ...shareholderInfo };
      console.log(shareholderAllInfo);
      // Set the combined information to store
      store.dispatch(
        setShareHoldersLaunchInfo({ info: shareholderAllInfo, type: "add" })
      );
      setOpenModal(false);
      console.log(addShareHolderResponse);
    } else {
      console.log(addShareHolderResponse.error);
    }
  };

  // This updates the shareholders information
  const handleShareholderUpdate = async (formData, selectedShareholder) => {
    const requiredShareholderUpdateData = {
      launchCode: selectedShareholder.launchCode,
      memberCode: selectedShareholder.memberCode,
      shareholderOwnershipPercentage: formData.share_percentage,
      shareholderOwnershipType: formData.share_type,
      shareholdingCode: selectedShareholder.shareholdingCode,
    };
    const requiredMemberUpdateData = {
      launchCode: selectedShareholder.launchCode,
      memberCode: selectedShareholder.memberCode,
      businessMember: {
        memberFirstName: formData.full_name.split(" ")[0],
        memberSecondName: formData.full_name.split(" ")[1],
        memberEmail: formData.email,
        memberPhone: formData.phone,
      },
    };
    // Responses from the backend
    let shareholdersUpdateResponse = await updateShareholder(
      requiredShareholderUpdateData
    );
    let membersUpdateResponse = await updateMember(requiredMemberUpdateData);

    // The data from the response got from the backend
    let shareholdersUpdatedData =
      shareholdersUpdateResponse?.data?.businessShareholders;
    let membersUpdatedData = membersUpdateResponse?.data?.businessMembers;

    // Executes if data is returned from the backend
    if (shareholdersUpdatedData) {
      let shareholdersMembersMerged = [];
      shareholdersUpdatedData.forEach((shareholder) => {
        membersUpdatedData.forEach((member) => {
          if (member.memberCode === shareholder.memberCode) {
            let merged = { ...shareholder, ...member };
            shareholdersMembersMerged.push(merged);
          }
        });
      });
      console.log(shareholdersMembersMerged);
      store.dispatch(
        setShareHoldersLaunchInfo({ info: shareholdersMembersMerged })
      );
      handleModalClose();
    }
  };

  return (
    <Container>
      <HeaderCheckout />
      <Body>
        <CheckoutSection
          title={"Shareholder's Information"}
          checkbox="Shareholders"
          checkBoxAction={handleCheckbox}
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
                shareholder={shareholder}
                editAction={() => handleEdit(shareholder)}
                deleteAction={() => handleDelete(shareholder)}
              />
            ))}
            <AddMore onClick={handleAddMore}>
              <AddIcon />
              <span>Add a Shareholder</span>
            </AddMore>
            <Dialog onClose={handleModalClose} open={openModal}>
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
                addIsLoading={isLoading}
                selectedToEdit={selectedToEdit}
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
        {/* {Array.from(Array(shareHolders), (_, index) => (
          <CheckoutFormInfo
            key={index}
            title="Shareholder's Information"
            number={index + 1}
            numbers={shareHolders ? shareHolders : index + 1}
          />
        ))} */}
      </Body>
    </Container>
  );
};

export default ShareHoldersInfo;
