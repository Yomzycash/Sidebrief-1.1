import HeaderCheckout from "components/Header/HeaderCheckout";
import { CheckoutController } from "containers";
import { CheckoutSection, MembersBasicInfo } from "containers/Checkout";
import LaunchFormContainer from "containers/Checkout/CheckoutFormContainer/LaunchFormContainer";
import LaunchPrimaryContainer from "containers/Checkout/CheckoutFormContainer/LaunchPrimaryContainer";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setBeneficiariesLaunchInfo, setCheckoutProgress } from "redux/Slices";
import { store } from "redux/Store";
import { AddMore, Body, Bottom, Container, Loading, modalStyle } from "../styled";
import { ReactComponent as AddIcon } from "asset/Launch/Add.svg";
import { Dialog, DialogContent } from "@mui/material";
import LaunchSummaryCard from "components/cards/LaunchSummaryCard";
import { checkInfoBeneficiarySchema } from "utils/config";
import {
  useAddBeneficiaryMutation,
  useDeleteBeneficiaryMutation,
  useUpdateBeneficiaryMutation,
  useViewBeneficiariesMutation,
} from "services/launchService";
import {
  handleBeneficiariesView,
  handleBeneficiaryAdd,
  handleBeneficiaryDelete,
  handleBeneficiaryUpdate,
} from "./action";
import { Puff } from "react-loading-icons";
import { handleError } from "utils/globalFunctions";
import { handleResponse } from "../actions";

//

//

const BeneficiariesInfo = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [cardAction, setCardAction] = useState("");
  const [selectedToEdit, setSelectedToEdit] = useState({});
  const [selectedToDelete, setSelectedToDelete] = useState({});
  const [beneficiariesInfo, setBeneficiariesInfo] = useState([]);
  const [maxPercentage, setMaxPercentage] = useState(100);

  // Endpont hooks
  const [addBeneficiary, addState] = useAddBeneficiaryMutation();
  const [deleteBeneficiary, deleteState] = useDeleteBeneficiaryMutation();
  const [updateBeneficiary, updateState] = useUpdateBeneficiaryMutation();
  const [viewBeneficiaries, viewState] = useViewBeneficiariesMutation();

  const launchResponse = JSON.parse(localStorage.getItem("launchInfo"));

  const handleNext = () => {
    let navigatedFrom = localStorage.getItem("navigatedFrom");

    if (navigatedFrom) {
      navigate(navigatedFrom);
      localStorage.removeItem("navigatedFrom");
      return;
    }

    if (beneficiariesInfo.length > 0) {
      localStorage.setItem("beneficiaries", true);
    } else {
      localStorage.setItem("beneficiaries", false);
    }

    let useSidebriefShareholders = localStorage.getItem("useSidebriefShareholders");
    let useSidebriefDirectors = localStorage.getItem("useSidebriefDirectors");

    let navigateTo = "";

    if (!useSidebriefShareholders) navigateTo = "/launch/shareholders-kyc";
    if (useSidebriefShareholders) navigateTo = "/launch/directors-kyc";
    if (useSidebriefDirectors && useSidebriefShareholders) navigateTo = "/launch/beneficiaries-kyc";
    if (beneficiariesInfo.length === 0 && useSidebriefShareholders && useSidebriefDirectors)
      navigateTo = "/launch/review";

    navigate(navigateTo ? navigateTo : "/launch/shareholders-kyc");
  };

  //

  // ADD BENEFICIARY
  const handleAdd = async (formData) => {
    let actionInfo = {
      launchCode: launchResponse.launchCode,
      formData: formData,
      addBeneficiary: addBeneficiary,
    };

    let addResponse = await handleBeneficiaryAdd(actionInfo);
    // console.log(addResponse);
    if (addResponse.data) {
      handleResponse(addResponse, "Beneficiary added successfully");
      return true;
    } else handleError(addResponse?.error);
    return false;
  };

  //

  // UPDATE BENEFICIARY
  const handleUpdate = async (formData) => {
    let actionInfo = {
      launchCode: launchResponse.launchCode,
      formData: formData,
      selectedBeneficiary: selectedToEdit,
      updateBeneficiary: updateBeneficiary,
    };

    let addResponse = await handleBeneficiaryUpdate(actionInfo);

    if (addResponse.data) {
      handleResponse(addResponse, "Beneficiary updated successfully");
      return true;
    } else handleError(addResponse?.error);
    return false;
  };

  //

  // DELETE BENEFICIARY
  const handleDelete = async (beneficiary) => {
    setSelectedToDelete(beneficiary);

    let actionInfo = {
      launchCode: launchResponse.launchCode,
      selectedBeneficiary: beneficiary,
      deleteBeneficiary: deleteBeneficiary,
    };

    let addResponse = await handleBeneficiaryDelete(actionInfo);
  };

  // VIEW ALL BENEFICIARIES
  const handleView = async () => {
    let actionInfo = {
      ...launchResponse,
      viewBeneficiaries: viewBeneficiaries,
    };
    // VIEW ALL DIRECTORS
    let viewResponse = await handleBeneficiariesView(actionInfo);
    if (viewResponse.data) {
      store.dispatch(setBeneficiariesLaunchInfo(viewResponse.data));
      setBeneficiariesInfo(viewResponse.data);
      // Get all share percentage and set the percentage left
      let totalStakePerc = viewResponse.data.reduce(
        (acc, curr) => curr.beneficialOwnershipStake + acc,
        0
      );
      setMaxPercentage(100 - totalStakePerc);
    } else {
      handleError(viewResponse?.error);
    }
  };

  useEffect(() => {
    if (cardAction === "") handleView();
  }, [cardAction, selectedToDelete]);

  //

  const handlePopulate = (setValue) => {
    if (cardAction === "edit") {
      setValue("fullName", selectedToEdit?.beneficialOwnerName);
      setValue("email", selectedToEdit?.beneficialOwnerEmail);
      setValue("phone", selectedToEdit?.beneficialOwnerPhone);
      setValue("stake", selectedToEdit?.beneficialOwnershipStake);
      setValue("occupation", selectedToEdit?.beneficialOwnerOccupation);
    } else {
      setValue("fullName", "");
      setValue("email", "");
      setValue("phone", "");
      setValue("stake", "");
      setValue("occupation", "");
    }
  };

  //

  const handleFormSubmit = async (formData) => {
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

  //

  const handleAddButton = () => {
    setSelectedToEdit({});
    setCardAction("add");
    setOpenModal(true);
  };

  const handleEditButton = (beneficiary) => {
    setCardAction("edit");
    setOpenModal(true);
    setSelectedToEdit(beneficiary);
  };

  //

  // Set the progress of the application
  useEffect(() => {
    let review = localStorage.getItem("navigatedFrom");

    store.dispatch(setCheckoutProgress({ total: 13, current: review ? 13 : 7.5 })); // total- total pages and current - current page
  }, []);

  let loading = !deleteState.isLoading && !addState && !updateState && viewState.isLoading;

  return (
    <Container>
      <HeaderCheckout />
      <Body>
        <CheckoutSection title={"Beneficiaries Information (Optional)"} hideCheckbox={true} />
        <LaunchPrimaryContainer>
          <LaunchFormContainer>
            {beneficiariesInfo.map((beneficiary, index) => (
              <LaunchSummaryCard
                key={index}
                number={index + 1}
                name={beneficiary?.beneficialOwnerName}
                email={beneficiary?.beneficialOwnerEmail}
                phone={beneficiary?.beneficialOwnerPhone}
                occupation={beneficiary.beneficialOwnerOccupation}
                stake={beneficiary.beneficialOwnershipStake}
                editAction={() => handleEditButton(beneficiary)}
                deleteAction={() => handleDelete(beneficiary)}
                isLoading={
                  selectedToDelete?.beneficialOwnerCode === beneficiary?.beneficialOwnerCode &&
                  deleteState?.isLoading
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
            <AddMore onClick={handleAddButton}>
              <AddIcon />
              <span>Add a Beneficiary</span>
            </AddMore>

            <Dialog open={openModal}>
              <DialogContent style={modalStyle}>
                <MembersBasicInfo
                  title="Beneficiary"
                  handleClose={() => setOpenModal(false)}
                  maxPercentage={maxPercentage}
                  submitForm={handleFormSubmit}
                  populateModal={handlePopulate}
                  infoSchema={checkInfoBeneficiarySchema}
                  info={selectedToEdit}
                  isLoading={addState.isLoading || updateState.isLoading}
                  beneficiary
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
            />
          </Bottom>
        </LaunchPrimaryContainer>
      </Body>
      {/* <AppFeedback subProject="Beneficiary Info" /> */}
    </Container>
  );
};

export default BeneficiariesInfo;
