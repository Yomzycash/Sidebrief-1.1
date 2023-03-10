import HeaderCheckout from "components/Header/HeaderCheckout";
import { CheckoutController } from "containers";
import { CheckoutSection, MembersBasicInfo } from "containers/Checkout";
import LaunchFormContainer from "containers/Checkout/CheckoutFormContainer/LaunchFormContainer";
import LaunchPrimaryContainer from "containers/Checkout/CheckoutFormContainer/LaunchPrimaryContainer";
import React, { useEffect, useState } from "react";
import { setCheckoutProgress } from "redux/Slices";
import { useNavigate } from "react-router-dom";
import { store } from "redux/Store";
import { AddMore, Body, Bottom, Container, Loading, modalStyle } from "../styled";
import { ReactComponent as AddIcon } from "asset/Launch/Add.svg";
import { Dialog, DialogContent } from "@mui/material";
import LaunchSummaryCard from "components/cards/LaunchSummaryCard";
import { checkInfoShareCompSchema, checkInfoShareholderSchema } from "utils/config";
import {
  useAddDirectorMutation,
  useAddMemberMutation,
  useAddShareHolderMutation,
  useDeleteDirectorMutation,
  useDeleteMemberMutation,
  useDeleteShareholderMutation,
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
  handleMemberAdd,
  handleMemberDelete,
  handleMemberUpdate,
  handleResponse,
} from "../actions";
import {
  handleShareholderAdd,
  handleShareholderDelete,
  handleShareholdersView,
  handleShareholderUpdate,
  handleSingleShareholderView,
} from "./actions";
import {
  handleDirectorAdd,
  handleDirectorDelete,
  handleDirectorUpdate,
  handleSingleDirectorView,
} from "../DirectorsInfo/actions";
import { handleError } from "utils/globalFunctions";

//

//

//

const ShareHoldersInfo = () => {
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [cardAction, setCardAction] = useState("");
  // const [isDirector, setIsDirector] = useState(false);
  const [selectedToEdit, setSelectedToEdit] = useState({});
  const [selectedToDelete, setSelectedToDelete] = useState({});
  const [useSidebriefShareholders, setUseSidebriefShareholders] = useState(
    localStorage.getItem("useSidebriefShareholders")
  );
  const [shareholdersInfo, setShareholdersInfo] = useState([]);
  const [maxPercentage, setmaxPercentage] = useState(100);

  // Endpont hook for shareholder add
  const [addShareHolder, addState] = useAddShareHolderMutation();
  const [deleteShareholder, deleteState] = useDeleteShareholderMutation();
  const [updateShareholder, updateState] = useUpdateShareholderMutation();
  const [addMember, memberAddState] = useAddMemberMutation();
  const [deleteMember, memberDelState] = useDeleteMemberMutation();
  const [updateMember, memberUpdateState] = useUpdateMemberMutation();
  const [addDirector, dirAddState] = useAddDirectorMutation();
  const [deleteDirector, dirDelState] = useDeleteDirectorMutation();
  const [updateDirector, dirUpdateState] = useUpdateDirectorMutation();
  const [viewShareholders, viewState] = useViewShareholdersMutation();
  const [viewMembers, viewMembersState] = useViewMembersMutation();
  const [viewDirectors] = useViewDirectorsMutation();

  const launchResponse = JSON.parse(localStorage.getItem("launchInfo"));

  //

  // ADD A SHAREHOLDER (ADD AS A DIRECTOR, WHEN SPECIFIED)
  const handleAdd = async (formData) => {
    let actionInfo_M = {
      ...launchResponse,
      identificationNumber: formData.nin,
      viewShareholders: viewShareholders,
      viewMembers: viewMembers,
    };
    let shareholderCheck = await handleSingleShareholderView(actionInfo_M);

    if (shareholderCheck.data) {
      // THROW ERROR
      toast.error("Shareholder exists");
      return false;
    } else {
      actionInfo_M = {
        ...actionInfo_M,
        formData: formData,
        addMember: addMember,
      };

      // ADD MEMBER
      let memberResponse = await handleMemberAdd(actionInfo_M);

      if (memberResponse.data) {
        // ADD SHAREHOLDER
        let actionInfo_S = {
          ...actionInfo_M,
          addShareHolder: addShareHolder,
          addMemberData: memberResponse.data,
        };
        let shareholderResponse = await handleShareholderAdd(actionInfo_S);
        if (shareholderResponse.data) {
          toast.success("Shareholder added successfully");
        } else {
          handleError(shareholderResponse?.error);
        }

        if (formData.isDirector) {
          // ADD DIRECTOR
          let actionInfo_D = {
            ...actionInfo_S,
            addDirector: addDirector,
          };
          let directorResponse = await handleDirectorAdd(actionInfo_D);
          if (directorResponse.data) {
            toast.success("Director added successfully");
          } else {
            handleError(directorResponse?.error);
          }
        }
      } else {
        handleError(memberResponse?.error);
      }
      return true;
    }
  };

  //

  // UPDATE A SHAREHOLDER (UPDATE DIRECTOR INFO TOO, IF DIRECTOR)
  const handleUpdate = async (formData) => {
    let actionInfo_M = {
      ...launchResponse,
      formData: formData,
      ...selectedToEdit,
      updateMember: updateMember,
    };

    // UPDATE MEMBER
    let memberResponse = await handleMemberUpdate(actionInfo_M);

    // UPDATE SHAREHOLDER
    let actionInfo_S = {
      ...actionInfo_M,
      updateShareholder: updateShareholder,
      addMemberData: memberResponse.data,
    };
    let shareholderResponse = await handleShareholderUpdate(actionInfo_S);
    handleResponse(shareholderResponse, "Shareholder updated successfully");

    // UPDATE DIRECTOR / ADD DIRECTOR / DELETE DIRECTOR
    if (formData.isDirector) {
      let actionInfo_D = {
        ...actionInfo_S,
        identificationNumber: selectedToEdit.shareholderIdentificationNumber,
        viewDirectors: viewDirectors,
        updateDirector: updateDirector,
        addDirector: addDirector,
        viewMembers: viewMembers,
      };
      let director = await handleSingleDirectorView(actionInfo_D);
      // UPDATE DIRECTOR / ADD DIRECTOR
      actionInfo_D = {
        ...actionInfo_D,
        ...director?.data,
      };
      let directorCode = actionInfo_D?.directorCode;
      let directorResponse = directorCode
        ? await handleDirectorUpdate(actionInfo_D)
        : await handleDirectorAdd(actionInfo_D);
      let message = directorCode ? "Director updated successfully" : "Director added successfully";
      handleResponse(directorResponse, message);
    } else {
      // DELETE DIRECTOR, IF EXTSTS
      let actionInfo_D = {
        ...actionInfo_S,
        identificationNumber: formData.nin,
        viewDirectors: viewDirectors,
        viewMembers: viewMembers,
      };
      let director = await handleSingleDirectorView(actionInfo_D);
      if (director.data) {
        actionInfo_D = {
          ...actionInfo_D,
          ...director.data,
          deleteDirector: deleteDirector,
        };
        let deleteResponse = await handleDirectorDelete(actionInfo_D);
        handleResponse(deleteResponse, "Director deleted successfully");
      }
    }
  };

  //

  // DELETE A SHAREHOLDER
  const handleDelete = async (shareholder) => {
    setSelectedToDelete(shareholder);

    let actionInfo_S = {
      ...launchResponse,
      ...shareholder,
      deleteShareholder: deleteShareholder,
    };

    // DELETE SHAREHOLDER
    let shareholderResponse = await handleShareholderDelete(actionInfo_S);
    handleResponse(shareholderResponse, "Shareholder deleted successfully", handleView);

    // IF DIRECTOR, RETURN, ELSE DELETE MEMBER
    let actionInfo_D = {
      ...launchResponse,
      identificationNumber: shareholder.shareholderIdentificationNumber,
      viewDirectors: viewDirectors,
      viewMembers: viewMembers,
    };
    let director = await handleSingleDirectorView(actionInfo_D);
    if (director.data) return;
    // DELETE MEMBER
    let actionInfo_M = {
      launchCode: actionInfo_D.launchCode,
      memberCode: shareholder.memberCode,
      deleteMember: deleteMember,
    };
    let memberResponse = await handleMemberDelete(actionInfo_M);
    setSelectedToDelete(shareholder);
    console.log(memberResponse);
  };

  //

  // VIEW ALL SHAREHOLDERS
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
      // Get all share percentage and set the percentage left
      let totalSharePerc = shareholderResponse.data.reduce(
        (acc, curr) => curr.shareholderOwnershipPercentage + acc,
        0
      );
      setmaxPercentage(100 - totalSharePerc);
    } else {
      handleError(shareholderResponse?.error);
    }
  };

  useEffect(() => {
    if (cardAction === "") handleView();
  }, [cardAction, selectedToDelete]);

  //

  // POPULATE FIELDS INFORMATION
  const handlePopulate = (setValue) => {
    if (cardAction === "edit") {
      setValue("fullName", selectedToEdit?.memberName);
      setValue("email", selectedToEdit?.memberEmail);
      setValue("phone", selectedToEdit?.memberPhone);
      setValue("sharePercentage", selectedToEdit?.shareholderOwnershipPercentage);
      setValue("nin", selectedToEdit.shareholderIdentificationNumber);
      setValue("regNo", selectedToEdit.shareholderRegistrationNumber);
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
    setUseSidebriefShareholders(checked === true ? checked : false);
    if (checked) {
      localStorage.setItem("useSidebriefShareholders", checked);
    } else {
      localStorage.removeItem("useSidebriefShareholders");
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
    navigate("/launch/directors-info");
  };

  // Set the progress of the application
  useEffect(() => {
    let review = localStorage.getItem("navigatedFrom");

    store.dispatch(setCheckoutProgress({ total: 13, current: review ? 13 : 6.5 })); // total- total pages and current - current page
  }, []);

  let loading =
    !addState.isLoading &&
    !updateState.isLoading &&
    !deleteState.isLoading &&
    !memberAddState.isLoading &&
    !memberUpdateState.isLoading &&
    !memberDelState.isLoading &&
    !dirAddState.isLoading &&
    !dirUpdateState.isLoading &&
    !dirDelState.isLoading &&
    (viewState.isLoading || viewMembersState.isLoading);

  return (
    <Container>
      <HeaderCheckout />
      <Body>
        <CheckoutSection
          title={"Shareholders Information"}
          checkbox="Shareholders"
          checkBoxAction={handleCheckbox}
          disableCheckbox={shareholdersInfo?.length > 0 ? true : false}
          checked={useSidebriefShareholders}
          tipText="Shareholders in a company are individuals or entities that own shares of stock, which represent a portion of ownership in the company."
          tipStyle={{ maxWidth: "290px" }}
        />
        <LaunchPrimaryContainer>
          <LaunchFormContainer>
            {shareholdersInfo.map((shareholder, index) => (
              <LaunchSummaryCard
                key={index}
                number={index + 1}
                name={shareholder?.memberName}
                shares={shareholder?.shareholderRegistrationNumber ? "company" : "individual"}
                email={shareholder?.memberEmail}
                phone={shareholder?.memberPhone}
                sharesPercentage={shareholder?.shareholderOwnershipPercentage}
                editAction={() => handleEditButton(shareholder)}
                deleteAction={() => handleDelete(shareholder)}
                isLoading={
                  selectedToDelete?.shareholdingCode === shareholder?.shareholdingCode &&
                  (deleteState.isLoading || memberDelState?.isLoading)
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
            {!useSidebriefShareholders && (
              <AddMore onClick={handleAddButton}>
                <AddIcon />
                <span>Add a Shareholder</span>
              </AddMore>
            )}
            <Dialog open={openModal}>
              <DialogContent style={modalStyle}>
                <MembersBasicInfo
                  title="Shareholder"
                  handleClose={() => setOpenModal(false)}
                  maxPercentage={maxPercentage}
                  submitForm={handleFormSubmit}
                  populateModal={handlePopulate}
                  shareCompanySchema={checkInfoShareCompSchema}
                  infoSchema={checkInfoShareholderSchema}
                  info={selectedToEdit}
                  isLoading={
                    addState.isLoading ||
                    updateState.isLoading ||
                    memberAddState.isLoading ||
                    memberUpdateState.isLoading ||
                    viewMembersState.isLoading ||
                    dirAddState.isLoading ||
                    dirUpdateState.isLoading
                  }
                  shareholder
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
              forwardDisable={shareholdersInfo.length === 0 && !useSidebriefShareholders}
            />
          </Bottom>
        </LaunchPrimaryContainer>
      </Body>
      {/* <AppFeedback subProject="Shareholders Info" /> */}
    </Container>
  );
};

export default ShareHoldersInfo;
