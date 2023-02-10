import HeaderCheckout from "components/Header/HeaderCheckout";
import { CheckoutController } from "containers";
import { CheckoutFormInfo, CheckoutSection } from "containers/Checkout";
import LaunchFormContainer from "containers/Checkout/CheckoutFormContainer/LaunchFormContainer";
import LaunchPrimaryContainer from "containers/Checkout/CheckoutFormContainer/LaunchPrimaryContainer";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCheckoutProgress } from "redux/Slices";
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
import { checkInfoBeneficiarySchema } from "utils/config";
import {
  useAddBeneficiaryMutation,
  useDeleteBeneficiaryMutation,
  useUpdateBeneficiaryMutation,
  useViewBeneficiariesMutation,
} from "services/launchService";
import toast from "react-hot-toast";
import { beneficiaryAdd, beneficiaryDelete, beneficiaryUpdate } from "./action";
import { Puff } from "react-loading-icons";
import AppFeedback from "components/AppFeedback";

const DirectorsInfo = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [cardAction, setCardAction] = useState();
  const [selectedToEdit, setSelectedToEdit] = useState({});
  const [selectedToDelete, setSelectedToDelete] = useState({});
  const [beneficiariesInfo, setBeneficiariesInfo] = useState([]);

  // Endpont hooks
  const [addBeneficiary, addState] = useAddBeneficiaryMutation();
  const [deleteBeneficiary, deleteState] = useDeleteBeneficiaryMutation();
  const [updateBeneficiary, updateState] = useUpdateBeneficiaryMutation();
  const [viewBeneficiaries, viewState] = useViewBeneficiariesMutation();

  // This gets the beneficiary information from the store
  const LaunchApplicationInfo = useSelector((store) => store.LaunchReducer);
  const { beneficiariesLaunchInfo, generatedLaunchCode, launchResponse } =
    LaunchApplicationInfo;

  const handleNext = async () => {
    if (beneficiariesInfo.length > 0) {
      localStorage.setItem("beneficiaries", true);
    } else {
      localStorage.setItem("beneficiaries", false);
    }

    let useSidebriefShareholders = localStorage.getItem(
      "useSidebriefShareholders"
    );
    let useSidebriefDirectors = localStorage.getItem("useSidebriefDirectors");

    // let navigatedFrom = localStorage.getItem("navigatedFrom");

    let navigateTo = "";

    if (!useSidebriefShareholders) navigateTo = "/launch/shareholders-kyc";
    if (useSidebriefShareholders) navigateTo = "/launch/directors-kyc";
    if (useSidebriefDirectors && useSidebriefShareholders)
      navigateTo = "/launch/beneficiaries-kyc";
    if (beneficiariesInfo.length === 0 && useSidebriefShareholders)
      navigateTo = "/launch/review";

    // if (navigatedFrom) {
    //   navigate(navigatedFrom);
    //   localStorage.removeItem("navigatedFrom");
    // } else {
    //   navigate(navigateTo);
    // }

    navigate(navigateTo ? navigateTo : "/launch/shareholders-kyc");
  };
  const handlePrev = () => {
    navigate(-1);
  };

  const handleAddMore = () => {
    setCardAction("add");
    setOpenModal(true);
  };
  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleEdit = (beneficiary) => {
    setCardAction("edit");
    setOpenModal(true);
    setSelectedToEdit(beneficiary);
  };

  const handleError = (error) => {
    // console.log(error);
    if (error?.status === "FETCH_ERROR") {
      toast.error("Please check your internet connection");
    } else {
      toast.error(error?.data.message);
    }
  };

  //
  // This deletes a beneficiary's informataion
  const handleDelete = async (beneficiary) => {
    setSelectedToDelete(beneficiary);

    let deleteResponse = await beneficiaryDelete(
      generatedLaunchCode,
      beneficiary,
      beneficiariesLaunchInfo,
      deleteBeneficiary
    );
    // console.log(deleteResponse);

    let data = deleteResponse.data;
    let error = deleteResponse.error;

    if (data) toast.success("Beneficiary deleted successfully");
    else handleError(error);
  };

  //
  // This adds a new beneficiary
  const handleBeneficiaryAdd = async (formData, launchCode) => {
    let addBeneficiaryResponse = await beneficiaryAdd(
      launchCode,
      formData,
      addBeneficiary
    );

    let beneficiaryData = addBeneficiaryResponse?.data;
    let error = addBeneficiaryResponse?.error;

    if (beneficiaryData) {
      toast.success("Beneficiary added successfully");
      setOpenModal(false);
    } else {
      handleError(error);
    }
  };

  //
  // This updates the beneficiary's information
  const handleBeneficiaryUpdate = async (
    formData,
    launchCode,
    selectedBeneficiary
  ) => {
    let beneficiaryUpdateResponse = await beneficiaryUpdate(
      formData,
      launchCode,
      selectedBeneficiary,
      updateBeneficiary
    );
    // console.log(beneficiaryUpdateResponse);

    // The data from the response got from the backend
    let beneficiariesUpdatedData = beneficiaryUpdateResponse?.data;

    let error = beneficiaryUpdateResponse.error;

    // Executes if data is returned from the backend
    if (beneficiariesUpdatedData) {
      toast.success("Beneficiary updated successfully");
      handleModalClose();
    } else {
      handleError(error);
    }
  };

  // Get beneficiaries data from the backend
  const getBeneficiaries = async () => {
    let requiredData = {
      launchCode: launchResponse.launchCode,
      registrationCountry: launchResponse.registrationCountry,
      registrationType: launchResponse.registrationType,
    };

    // Get data from view endpoints
    let beneficiaries = await viewBeneficiaries(requiredData);
    let beneficiariesData = beneficiaries?.data && [
      ...beneficiaries.data.businessBeneficialOwners,
    ];

    return { data: beneficiariesData };
  };

  // Get the data from backend and set to state
  const viewDraft = async () => {
    let beneficiariesData = await getBeneficiaries();
    setBeneficiariesInfo(beneficiariesData.data);
  };

  useEffect(() => {
    viewDraft();
  }, [addState.isSuccess, deleteState.isSuccess, updateState.isSuccess]);

  // Set the progress of the application
  useEffect(() => {
    store.dispatch(setCheckoutProgress({ total: 13, current: 7.5 })); // total- total pages and current - current page
  }, []);

  return (
    <Container>
      <HeaderCheckout />
      <Body>
        <CheckoutSection
          title={"Beneficiaries Information (Optional)"}
          hideCheckbox={true}
        />
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
                editAction={() => handleEdit(beneficiary)}
                deleteAction={() => handleDelete(beneficiary)}
                isLoading={
                  selectedToDelete?.beneficialOwnerCode ===
                    beneficiary?.beneficialOwnerCode && deleteState?.isLoading
                    ? true
                    : false
                }
              />
            ))}
            {viewState.isLoading && (
              <Loading>
                <Puff stroke="#00A2D4" fill="white" />
              </Loading>
            )}
            <AddMore onClick={handleAddMore}>
              <AddIcon />
              <span>Add a Beneficiary</span>
            </AddMore>
            {/* )} */}
            <Dialog open={openModal}>
              <DialogContent style={modalStyle}>
                <CheckoutFormInfo
                  title="Beneficiary"
                  handleClose={handleModalClose}
                  handleAdd={handleBeneficiaryAdd}
                  handleUpdate={handleBeneficiaryUpdate}
                  cardAction={cardAction}
                  checkInfoSchema={checkInfoBeneficiarySchema}
                  beneficiary
                  selectedToEdit={selectedToEdit}
                  addIsLoading={
                    addState.isLoading ||
                    deleteState.isLoading ||
                    updateState.isLoading
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
            />
          </Bottom>
        </LaunchPrimaryContainer>
      </Body>
      {/* <AppFeedback subProject="Beneficiary Info" /> */}
    </Container>
  );
};

export default DirectorsInfo;
