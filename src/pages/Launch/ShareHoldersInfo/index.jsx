import HeaderCheckout from "components/Header/HeaderCheckout";
import { CheckoutController } from "containers";
import {
  CheckoutFormInfo,
  CheckoutSection,
  MembersBasicInfo,
} from "containers/Checkout";
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

  checkInfoShareCompSchema,
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
import AppFeedback from "components/AppFeedback";
import {
  checkMemberExistence,
  handleMemberAdd,
  handleMemberDelete,
  handleMemberUpdate,
} from "../actions";
import {
  handleShareholderAdd,
  handleShareholderDelete,
  handleShareholdersView,
  handleShareholderUpdate,
} from "./actionss";
import {
  handleDirectorAdd,
  handleDirectorUpdate,
  handleSingleDirectorView,
} from "../DirectorsInfo/actionss";
import { handleError } from "utils/globalFunctions";

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

  // Endpont hook for shareholder add
  const [addShareHolder, addState] = useAddShareHolderMutation();
  const [deleteShareholder, deleteState] = useDeleteShareholderMutation();
  const [updateShareholder, updateState] = useUpdateShareholderMutation();
  const [addMember, memberAddState] = useAddMemberMutation();
  const [deleteMember, memberDelState] = useDeleteMemberMutation();
  const [updateMember, memberUpdateState] = useUpdateMemberMutation();
  const [addDirector, dirAddState] = useAddDirectorMutation();
  const [updateDirector, dirUpdateState] = useUpdateDirectorMutation();
  const [viewShareholders, viewState] = useViewShareholdersMutation();
  const [viewMembers, viewMembersState] = useViewMembersMutation();
  const [viewDirectors, viewDirectorsState] = useViewDirectorsMutation();

  // This gets some information from the store
  // const { launchResponse } = useSelector((store) => store.LaunchReducer);

  const launchResponse = JSON.parse(localStorage.getItem("launchInfo"));

  //

  // ADD A SHAREHOLDER (ADD AS A DIRECTOR, WHEN SPECIFIED)
  const handleAdd = async (formData) => {
    let actionInfo_M = {
      ...launchResponse,
      formData: formData,
      viewMembers: viewMembers,
      addMember: addMember,
    };
    let memberCheck = await checkMemberExistence(actionInfo_M);

    if (memberCheck.data.status) {
      // THROW ERROR
      toast.error("Shareholder exists");
      return false;
    } else {
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
    if (shareholderResponse.data) {
      toast.success("Shareholder updated successfully");
    } else {
      handleError(shareholderResponse?.error);
    }
    if (formData.isDirector) {
      let actionInfo_D = {
        ...actionInfo_M,
        viewDirectors: viewDirectors,
        updateDirector: updateDirector,
        viewMembers: viewMembers,
      };
      let director = await handleSingleDirectorView(actionInfo_D);
      // UPDATE DIRECTOR
      actionInfo_D = {
        ...actionInfo_D,
        ...director.data,
      };
      let directorResponse = await handleDirectorUpdate(actionInfo_D);
      if (directorResponse.data) {
        toast.success("Director updated successfully");
      } else {
        handleError(directorResponse?.error);
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
    if (shareholderResponse.data) {
      toast.success("Shareholder deleted successfully");
    } else {
      handleError(shareholderResponse?.error);
    }
    let actionInfo_D = {
      ...launchResponse,
      memberCode: shareholder.memberCode,
      viewDirectors: viewDirectors,
      viewMembers: viewMembers,
    };
    let director = await handleSingleDirectorView(actionInfo_D);
    if (director.data) return;
    console.log("Not a director");
    // DELETE MEMBER
    let actionInfo_M = {
      launchCode: actionInfo_D.launchCode,
      memberCode: actionInfo_D.memberCode,
      deleteMember: deleteMember,
    };
    let memberResponse = await handleMemberDelete(actionInfo_M);
    console.log(memberResponse);
    setSelectedToDelete(shareholder);
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

  // const handleNext = () => {
  //   navigate("/launch/directors-info");
  // };

  // const handlePrev = () => {
  //   navigate(-1);
  // };

  // const handleCheckbox = (checked) => {
  //   setUseSidebriefShareholders(checked === true ? checked : false);
  //   if (checked) {
  //     localStorage.setItem("useSidebriefShareholders", checked);
  //   } else {
  //     localStorage.removeItem("useSidebriefShareholders");
  //   }
  // };

  // const handleAddMore = () => {
  //   setCardAction("add");
  //   setOpenModal(true);
  // };
  // const handleModalClose = () => {
  //   setOpenModal(false);
  // };

  // const handleEdit = (shareholder) => {
  //   setCardAction("edit");
  //   setOpenModal(true);
  //   setSelectedToEdit(shareholder);
  // };

  // const handleError = (error) => {
  //   if (error?.status === "FETCH_ERROR") {
  //     toast.error("Please check your internet connection");
  //   } else {
  //     toast.error(error?.data.message);
  //   }
  // };

  // //
  // // This adds a new director
  // const handleDirectorAdd = async (launchCode, formData, memberInfo) => {
  //   let addDirectorResponse = await directorAdd(
  //     launchCode,
  //     formData,
  //     memberInfo,
  //     addDirector
  //   );

  //   let error = addDirectorResponse?.error;

  //   if (addDirectorResponse.data) {
  //     setOpenModal(false);
  //   } else {
  //     handleError(error);
  //   }
  // };

  // //
  // // This updates the director's information
  // const handleDirectorUpdate = async (formData, selectedDirector) => {
  //   // Responses from the backend
  //   let directorsUpdateResponse = await directorUpdate(
  //     formData,
  //     selectedDirector,
  //     updateDirector
  //   );

  //   // The data from the response got from the backend
  //   let directorsUpdatedData = directorsUpdateResponse?.data;

  //   let error = directorsUpdateResponse?.error;

  //   if (directorsUpdatedData) {
  //     handleModalClose();
  //   } else {
  //     handleError(error);
  //   }
  // };

  // //
  // // Checks if a director exists
  // const directorExists = async (selectedDirector) => {
  //   let requiredViewData = {
  //     launchCode: launchResponse.launchCode,
  //     registrationCountry: launchResponse.registrationCountry,
  //     registrationType: launchResponse.registrationType,
  //   };

  //   const directors = await viewDirectors(requiredViewData);
  //   const directorsData = directors?.data?.businessDirectors;
  //   let isDirector = directorsData?.find(
  //     (e) => e.directorCode === selectedDirector.directorCode
  //   );

  //   return isDirector;
  // };

  // //
  // // This deletess the director's information
  // const handleDirectorDelete = async (selectedDirector) => {
  //   let requiredData = {
  //     launchCode: launchResponse.launchCode,
  //     registrationCountry: launchResponse.registrationCountry,
  //     registrationType: launchResponse.registrationType,
  //   };
  //   let directors = await viewDirectors(requiredData);
  //   let directorsData = [...directors.data.businessDirectors];

  //   let exists = directorsData.findIndex(
  //     (e) => e.memberCode === selectedDirector.memberCode
  //   );
  //   if (exists >= 0) {
  //     const res = await directorDelete(
  //       // LaunchApplicationInfo,
  //       selectedDirector,
  //       // viewShareholders,
  //       deleteDirector
  //       // deleteMember
  //     );
  //   }
  // };

  // //
  // // This adds a new shareholder
  // const handleShareholderAdd = async (formData, launchCode) => {
  //   // Add a member
  //   let addMemberResponse = await memberAdd(launchCode, formData, addMember);

  //   let error = addMemberResponse?.error;

  //   // Runs if successfully added member
  //   if (addMemberResponse.data) {
  //     const memberInfo = addMemberResponse.data;
  //     const addShareHolderResponse = await shareHolderAdd(
  //       launchCode,
  //       formData,
  //       memberInfo,
  //       addShareHolder
  //     );

  //     let data = addShareHolderResponse?.data;
  //     let error = addShareHolderResponse?.error;

  //     if (data) {
  //       toast.success("Shareholder added successfully");
  //     } else {
  //       toast.error(error.data.message);
  //     }

  //     // Add shareholder as a director if he is a director (i.e director role exists)
  //     if (formData.director_role) {
  //       await handleDirectorAdd(launchCode, formData, memberInfo);
  //     }
  //     setOpenModal(false);
  //   }

  //   // Runs if failed to add member
  //   else if (error) {
  //     handleError(error);
  //   }
  // };

  // //
  // // This updates the shareholders information
  // const handleShareholderUpdate = async (formData, selectedShareholder) => {
  //   // Responses from the backend
  //   let shareholdersUpdateResponse = await shareholderUpdate(
  //     formData,
  //     selectedShareholder,
  //     updateShareholder
  //   );
  //   let memberUpdateResponse = await memberUpdate(
  //     formData,
  //     selectedShareholder,
  //     updateMember
  //   );

  //   // The data from the response gotten from backend
  //   const shareholdersUpdatedData = await shareholdersUpdateResponse?.data;
  //   const memberUpdatedData = await memberUpdateResponse?.data;

  //   const error = shareholdersUpdateResponse?.error;

  //   const selectedDirector = {
  //     launchCode: selectedShareholder.launchCode,
  //     memberCode: selectedShareholder.memberCode,
  //     directorCode: selectedShareholder.directorCode,
  //     directorRole: selectedShareholder.directorRole,
  //   };

  //   let isDirector = await directorExists(selectedDirector);
  //   // Executes if data is returned from the backend
  //   if (shareholdersUpdatedData && memberUpdatedData) {
  //     toast.success("Shareholder updated successfully");
  //     // Update or add director's role if role exists or does not respectively
  //     if (formData.isDirector) {
  //       if (!isDirector) {
  //         handleDirectorAdd(
  //           selectedShareholder.launchCode,
  //           formData,
  //           memberUpdatedData
  //         );
  //       } else {
  //         handleDirectorUpdate(formData, selectedDirector);
  //       }
  //       handleModalClose();
  //     }

  //     // Else delete director info
  //     else {
  //       handleDirectorDelete(selectedDirector);
  //       handleModalClose();
  //     }
  //   } else {
  //     handleError(error);
  //   }
  // };

  // //
  // // This deletes a shareholder's informataion
  // const handleDelete = async (shareholder) => {
  //   const selectedDirector = {
  //     launchCode: shareholder.launchCode,
  //     memberCode: shareholder.memberCode,
  //     directorCode: shareholder.directorCode,
  //     directorRole: shareholder.directorRole,
  //   };

  //   const isDirector = await directorExists(selectedDirector);

  //   setSelectedToDelete(shareholder);
  //   // The delete response gotten from the backend
  //   let deleteResponse = await shareholderDelete(
  //     isDirector,
  //     shareholder,
  //     deleteShareholder,
  //     deleteMember
  //   );

  //   let data = deleteResponse.data;
  //   let error = deleteResponse.error;

  //   // This runs if an error is recieved
  //   if (data) toast.success("Shareholder deleted successfully");
  //   else handleError(error);
  // };

  // // Get the data from backend and set to state
  // const viewDraft = async () => {
  //   let requiredData = {
  //     launchCode: launchResponse.launchCode,
  //     registrationCountry: launchResponse.registrationCountry,
  //     registrationType: launchResponse.registrationType,
  //   };

  //   // Get data from view endpoints
  //   let shareholders = await viewShareholders(requiredData);
  //   let shareholdersData = [...shareholders.data.businessShareholders];
  //   let members = await viewMembers(requiredData);
  //   let membersData = [...members.data.businessMembers];
  //   let directors = await viewDirectors(requiredData);
  //   let directorsData = [...directors.data.businessDirectors];

  //   // Merge shareholders shareholder's data and member data
  //   let mergedInfo = mergeInfo(shareholdersData, membersData);

  //   // Merge shareholders director role, if the shareholer is a director
  //   mergeDirectorRole(mergedInfo, directorsData);

  //   setShareholdersInfo(mergedInfo);

  //   if (mergedInfo.length > 0) {
  //     setUseSidebriefShareholders(false);
  //     localStorage.removeItem("useSidebriefShareholders");
  //   }
  //   if (shareholders.error) handleError(shareholders.error);

  //   return mergedInfo;
  // };

  // useEffect(() => {
  //   viewDraft();
  // }, [addState.isSuccess, deleteState.isSuccess, updateState.isSuccess]);

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
          checked={useSidebriefShareholders}
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
                shares={
                  shareholder?.shareholderRegistrationNumber
                    ? "company"
                    : "individual"
                }
                email={shareholder?.memberEmail}
                phone={shareholder?.memberPhone}
                sharesPercentage={shareholder?.shareholderOwnershipPercentage}
                editAction={() => handleEditButton(shareholder)}
                deleteAction={() => handleDelete(shareholder)}
                isLoading={
                  selectedToDelete?.shareholdingCode ===
                    shareholder?.shareholdingCode &&
                  (deleteState.isLoading || memberDelState?.isLoading)
                    ? true
                    : false
                }
              />
            ))}
            {!useSidebriefShareholders && (
              <AddMore onClick={handleAddButton}>
                <AddIcon />
                <span>Add a Shareholder</span>
              </AddMore>
            )}
            <Dialog open={openModal}>
              <DialogContent style={modalStyle}>
                {/* <CheckoutFormInfo
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
                /> */}
                <MembersBasicInfo
                  title="Shareholder"
                  handleClose={() => setOpenModal(false)}
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
              forwardAction={() => navigate("/launch/directors-info")}
              forwardText={"Proceed"}
              forwardDisable={
                shareholdersInfo.length === 0 && !useSidebriefShareholders
              }
            />
          </Bottom>
        </LaunchPrimaryContainer>
      </Body>
      {/* <AppFeedback subProject="Shareholders Info" /> */}
    </Container>
  );

};

export default ShareHoldersInfo;

//

//

//

//

//

//

//

//

// import HeaderCheckout from "components/Header/HeaderCheckout";
// import { CheckoutController } from "containers";
// import {
//   CheckoutFormInfo,
//   CheckoutSection,
//   MembersBasicInfo,
// } from "containers/Checkout";
// import LaunchFormContainer from "containers/Checkout/CheckoutFormContainer/LaunchFormContainer";
// import LaunchPrimaryContainer from "containers/Checkout/CheckoutFormContainer/LaunchPrimaryContainer";
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import {
//   LaunchReducer,
//   setCheckoutProgress,
//   setDirectorsLaunchInfo,
//   setShareHoldersLaunchInfo,
// } from "redux/Slices";
// import { store } from "redux/Store";
// import {
//   AddMore,
//   Body,
//   Bottom,
//   Container,
//   Loading,
//   modalStyle,
// } from "../styled";
// import { ReactComponent as AddIcon } from "asset/Launch/Add.svg";
// import { Dialog, DialogContent } from "@mui/material";
// import LaunchSummaryCard from "components/cards/LaunchSummaryCard";
// import {
//   checkInfoShareCompSchema,
//   checkInfoShareDirSchema,
//   checkInfoShareholderSchema,
// } from "utils/config";
// import {
//   useAddDirectorMutation,
//   useAddMemberMutation,
//   useAddShareHolderMutation,
//   useDeleteDirectorMutation,
//   useDeleteMemberMutation,
//   useDeleteShareholderMutation,
//   useGetUserDraftQuery,
//   useUpdateDirectorMutation,
//   useUpdateMemberMutation,
//   useUpdateShareholderMutation,
//   useViewDirectorsMutation,
//   useViewMembersMutation,
//   useViewShareholdersMutation,
// } from "services/launchService";
// import toast from "react-hot-toast";
// import {
//   mergeDirectorRole,
//   mergeInfo,
//   shareHolderAdd,
//   shareholderDelete,
//   shareholderUpdate,
//   updateDirectorRole,
// } from "./actions";
// import {
//   memberAdd,
//   memberUpdate,
// } from "containers/Checkout/InfoSection/actions";
// import {
//   directorAdd,
//   directorDelete,
//   directorUpdate,
// } from "../DirectorsInfo/actions";
// import { Puff } from "react-loading-icons";
// import AppFeedback from "components/AppFeedback";

// const ShareHoldersInfo = () => {
//   const navigate = useNavigate();
//   const [openModal, setOpenModal] = useState(false);
//   const [cardAction, setCardAction] = useState();
//   const [isDirector, setIsDirector] = useState(false);
//   const [selectedToEdit, setSelectedToEdit] = useState({});
//   const [selectedToDelete, setSelectedToDelete] = useState({});
//   const [useSidebriefShareholders, setUseSidebriefShareholders] = useState(
//     localStorage.getItem("useSidebriefShareholders")
//   );
//   const [shareholdersInfo, setShareholdersInfo] = useState([]);

//   // Endpont hook for shareholder add
//   const [addShareHolder, addState] = useAddShareHolderMutation();
//   const [deleteShareholder, deleteState] = useDeleteShareholderMutation();
//   const [updateShareholder, updateState] = useUpdateShareholderMutation();
//   const [addMember, memberAddState] = useAddMemberMutation();
//   const [updateMember, memberUpdateState] = useUpdateMemberMutation();
//   const [deleteMember] = useDeleteMemberMutation();
//   const [addDirector, dirAddState] = useAddDirectorMutation();
//   const [updateDirector, dirUpdateState] = useUpdateDirectorMutation();
//   const [deleteDirector, dirDeleteState] = useDeleteDirectorMutation();
//   const [viewShareholders, viewState] = useViewShareholdersMutation();
//   const [viewMembers, viewMembersState] = useViewMembersMutation();
//   const [viewDirectors, viewDirectorsState] = useViewDirectorsMutation();

//   // This gets some information from the store
//   const LaunchApplicationInfo = useSelector((store) => store.LaunchReducer);
//   const { shareHoldersLaunchInfo, directorsLaunchInfo, launchResponse } =
//     LaunchApplicationInfo;

//   const handleNext = () => {
//     navigate("/launch/directors-info");
//   };

//   const handlePrev = () => {
//     navigate(-1);
//   };

//   const handleCheckbox = (checked) => {
//     setUseSidebriefShareholders(checked === true ? checked : false);
//     if (checked) {
//       localStorage.setItem("useSidebriefShareholders", checked);
//     } else {
//       localStorage.removeItem("useSidebriefShareholders");
//     }
//   };

//   const handleAddMore = () => {
//     setCardAction("add");
//     setOpenModal(true);
//   };
//   const handleModalClose = () => {
//     setOpenModal(false);
//   };

//   const handleEdit = (shareholder) => {
//     setCardAction("edit");
//     setOpenModal(true);
//     setSelectedToEdit(shareholder);
//   };

//   const handleError = (error) => {
//     if (error?.status === "FETCH_ERROR") {
//       toast.error("Please check your internet connection");
//     } else {
//       toast.error(error?.data.message);
//     }
//   };

//   //
//   // This adds a new director
//   const handleDirectorAdd = async (launchCode, formData, memberInfo) => {
//     let addDirectorResponse = await directorAdd(
//       launchCode,
//       formData,
//       memberInfo,
//       addDirector
//     );

//     let error = addDirectorResponse?.error;

//     if (addDirectorResponse.data) {
//       setOpenModal(false);
//     } else {
//       handleError(error);
//     }
//   };

//   //
//   // This updates the director's information
//   const handleDirectorUpdate = async (formData, selectedDirector) => {
//     // Responses from the backend
//     let directorsUpdateResponse = await directorUpdate(
//       formData,
//       selectedDirector,
//       updateDirector
//     );

//     // The data from the response got from the backend
//     let directorsUpdatedData = directorsUpdateResponse?.data;

//     let error = directorsUpdateResponse?.error;

//     if (directorsUpdatedData) {
//       handleModalClose();
//     } else {
//       handleError(error);
//     }
//   };

//   //
//   // Checks if a director exists
//   const directorExists = async (selectedDirector) => {
//     let requiredViewData = {
//       launchCode: launchResponse.launchCode,
//       registrationCountry: launchResponse.registrationCountry,
//       registrationType: launchResponse.registrationType,
//     };

//     const directors = await viewDirectors(requiredViewData);
//     const directorsData = directors?.data?.businessDirectors;
//     let isDirector = directorsData?.find(
//       (e) => e.directorCode === selectedDirector.directorCode
//     );

//     return isDirector;
//   };

//   //
//   // This deletess the director's information
//   const handleDirectorDelete = async (selectedDirector) => {
//     let requiredData = {
//       launchCode: launchResponse.launchCode,
//       registrationCountry: launchResponse.registrationCountry,
//       registrationType: launchResponse.registrationType,
//     };
//     let directors = await viewDirectors(requiredData);
//     let directorsData = [...directors.data.businessDirectors];

//     let exists = directorsData.findIndex(
//       (e) => e.memberCode === selectedDirector.memberCode
//     );
//     if (exists >= 0) {
//       const res = await directorDelete(
//         // LaunchApplicationInfo,
//         selectedDirector,
//         // viewShareholders,
//         deleteDirector
//         // deleteMember
//       );
//     }
//   };

//   //
//   // This adds a new shareholder
//   const handleShareholderAdd = async (formData, launchCode) => {
//     // Add a member
//     let addMemberResponse = await memberAdd(launchCode, formData, addMember);

//     let error = addMemberResponse?.error;

//     // Runs if successfully added member
//     if (addMemberResponse.data) {
//       const memberInfo = addMemberResponse.data;
//       const addShareHolderResponse = await shareHolderAdd(
//         launchCode,
//         formData,
//         memberInfo,
//         addShareHolder
//       );

//       let data = addShareHolderResponse?.data;
//       let error = addShareHolderResponse?.error;

//       if (data) {
//         toast.success("Shareholder added successfully");
//       } else {
//         toast.error(error.data.message);
//       }

//       // Add shareholder as a director if he is a director (i.e director role exists)
//       if (formData.director_role) {
//         await handleDirectorAdd(launchCode, formData, memberInfo);
//       }
//       setOpenModal(false);
//     }

//     // Runs if failed to add member
//     else if (error) {
//       handleError(error);
//     }
//   };

//   //
//   // This updates the shareholders information
//   const handleShareholderUpdate = async (formData, selectedShareholder) => {
//     // Responses from the backend
//     let shareholdersUpdateResponse = await shareholderUpdate(
//       formData,
//       selectedShareholder,
//       updateShareholder
//     );
//     let memberUpdateResponse = await memberUpdate(
//       formData,
//       selectedShareholder,
//       updateMember
//     );

//     // The data from the response gotten from backend
//     const shareholdersUpdatedData = await shareholdersUpdateResponse?.data;
//     const memberUpdatedData = await memberUpdateResponse?.data;

//     const error = shareholdersUpdateResponse?.error;

//     const selectedDirector = {
//       launchCode: selectedShareholder.launchCode,
//       memberCode: selectedShareholder.memberCode,
//       directorCode: selectedShareholder.directorCode,
//       directorRole: selectedShareholder.directorRole,
//     };

//     let isDirector = await directorExists(selectedDirector);
//     // Executes if data is returned from the backend
//     if (shareholdersUpdatedData && memberUpdatedData) {
//       toast.success("Shareholder updated successfully");
//       // Update or add director's role if role exists or does not respectively
//       if (formData.isDirector) {
//         if (!isDirector) {
//           handleDirectorAdd(
//             selectedShareholder.launchCode,
//             formData,
//             memberUpdatedData
//           );
//         } else {
//           handleDirectorUpdate(formData, selectedDirector);
//         }
//         handleModalClose();
//       }

//       // Else delete director info
//       else {
//         handleDirectorDelete(selectedDirector);
//         handleModalClose();
//       }
//     } else {
//       handleError(error);
//     }
//   };

//   //
//   // This deletes a shareholder's informataion
//   const handleDelete = async (shareholder) => {
//     const selectedDirector = {
//       launchCode: shareholder.launchCode,
//       memberCode: shareholder.memberCode,
//       directorCode: shareholder.directorCode,
//       directorRole: shareholder.directorRole,
//     };

//     const isDirector = await directorExists(selectedDirector);

//     setSelectedToDelete(shareholder);
//     // The delete response gotten from the backend
//     let deleteResponse = await shareholderDelete(
//       isDirector,
//       shareholder,
//       deleteShareholder,
//       deleteMember
//     );

//     let data = deleteResponse.data;
//     let error = deleteResponse.error;

//     // This runs if an error is recieved
//     if (data) toast.success("Shareholder deleted successfully");
//     else handleError(error);
//   };

//   // Get the data from backend and set to state
//   const viewDraft = async () => {
//     let requiredData = {
//       launchCode: launchResponse.launchCode,
//       registrationCountry: launchResponse.registrationCountry,
//       registrationType: launchResponse.registrationType,
//     };

//     // Get data from view endpoints
//     let shareholders = await viewShareholders(requiredData);
//     let shareholdersData = [...shareholders.data.businessShareholders];
//     let members = await viewMembers(requiredData);
//     let membersData = [...members.data.businessMembers];
//     let directors = await viewDirectors(requiredData);
//     let directorsData = [...directors.data.businessDirectors];

//     // Merge shareholders shareholder's data and member data
//     let mergedInfo = mergeInfo(shareholdersData, membersData);

//     // Merge shareholders director role, if the shareholer is a director
//     mergeDirectorRole(mergedInfo, directorsData);

//     setShareholdersInfo(mergedInfo);

//     if (mergedInfo.length > 0) {
//       setUseSidebriefShareholders(false);
//       localStorage.removeItem("useSidebriefShareholders");
//     }
//     if (shareholders.error) handleError(shareholders.error);

//     return mergedInfo;
//   };

//   useEffect(() => {
//     viewDraft();
//   }, [addState.isSuccess, deleteState.isSuccess, updateState.isSuccess]);

//   // Set the progress of the application
//   useEffect(() => {
//     store.dispatch(setCheckoutProgress({ total: 13, current: 6.5 })); // total- total pages and current - current page
//   }, []);

//   return (
//     <Container>
//       <HeaderCheckout />
//       <Body>
//         <CheckoutSection
//           title={"Shareholders Information"}
//           checkbox="Shareholders"
//           checkBoxAction={handleCheckbox}
//           disableCheckbox={shareholdersInfo?.length > 0 ? true : false}
//           checked={useSidebriefShareholders}
//         />
//         <LaunchPrimaryContainer>
//           {viewState.isLoading ||
//             (viewMembersState.isLoading && (
//               <Loading>
//                 <Puff stroke="#00A2D4" fill="white" />
//               </Loading>
//             ))}
//           <LaunchFormContainer>
//             {shareholdersInfo.map((shareholder, index) => (
//               <LaunchSummaryCard
//                 key={index}
//                 number={index + 1}
//                 name={shareholder?.memberName}
//                 shares={shareholder?.shareholderOwnershipType}
//                 email={shareholder?.memberEmail}
//                 phone={shareholder?.memberPhone}
//                 sharesPercentage={shareholder?.shareholderOwnershipPercentage}
//                 editAction={() => handleEdit(shareholder)}
//                 deleteAction={() => handleDelete(shareholder)}
//                 isLoading={
//                   selectedToDelete?.shareholdingCode ===
//                     shareholder?.shareholdingCode && deleteState?.isLoading
//                     ? true
//                     : false
//                 }
//               />
//             ))}
//             {!useSidebriefShareholders && (
//               <AddMore onClick={handleAddMore}>
//                 <AddIcon />
//                 <span>Add a Shareholder</span>
//               </AddMore>
//             )}
//             <Dialog open={openModal}>
//               <DialogContent style={modalStyle}>
//                 {/* <CheckoutFormInfo
//                   title="Shareholder"
//                   handleClose={handleModalClose}
//                   handleAdd={handleShareholderAdd}
//                   handleUpdate={handleShareholderUpdate}
//                   cardAction={cardAction}
//                   checkInfoSchema={checkInfoShareholderSchema}
//                   shareDirSchema={checkInfoShareDirSchema}
//                   isDirector={isDirector}
//                   shareholder
//                   director={isDirector ? true : false}
//                   addIsLoading={
//                     addState.isLoading ||
//                     deleteState.isLoading ||
//                     updateState.isLoading ||
//                     memberAddState.isLoading ||
//                     memberUpdateState.isLoading ||
//                     dirAddState.isLoading
//                   }
//                   selectedToEdit={selectedToEdit}
//                   directorsInfo={directorsLaunchInfo}
//                 /> */}
//                 <MembersBasicInfo
//                   title="Shareholder"
//                   handleClose={handleModalClose}
//                   handleAdd={handleShareholderAdd}
//                   handleUpdate={handleShareholderUpdate}
//                   cardAction={cardAction}
//                   checkInfoSchema={checkInfoShareholderSchema}
//                   shareDirSchema={checkInfoShareDirSchema}
//                   isDirector={isDirector}
//                   shareholder
//                   director={isDirector ? true : false}
//                   addIsLoading={
//                     addState.isLoading ||
//                     deleteState.isLoading ||
//                     updateState.isLoading ||
//                     memberAddState.isLoading ||
//                     memberUpdateState.isLoading ||
//                     dirAddState.isLoading
//                   }
//                   selectedToEdit={selectedToEdit}
//                   directorsInfo={directorsLaunchInfo}
//                   submitForm={() => {}}
//                   populateModal={() => {}}
//                   shareCompanySchema={checkInfoShareCompSchema}
//                   infoSchema={checkInfoShareholderSchema}
//                   info={selectedToEdit}
//                   isLoading={
//                     addState.isLoading ||
//                     updateState.isLoading ||
//                     memberAddState.isLoading ||
//                     memberUpdateState.isLoading ||
//                     dirAddState.isLoading
//                   }
//                 />
//               </DialogContent>
//             </Dialog>
//           </LaunchFormContainer>
//           <Bottom>
//             <CheckoutController
//               backAction={handlePrev}
//               backText={"Previous"}
//               forwardAction={handleNext}
//               forwardText={"Proceed"}
//               forwardDisable={
//                 shareholdersInfo.length === 0 && !useSidebriefShareholders
//               }
//             />
//           </Bottom>
//         </LaunchPrimaryContainer>
//       </Body>
//       {/* <AppFeedback subProject="Shareholders Info" /> */}
//     </Container>
//   );
// };

// export default ShareHoldersInfo;
