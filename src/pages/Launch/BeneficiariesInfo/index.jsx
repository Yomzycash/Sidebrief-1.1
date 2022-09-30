import HeaderCheckout from 'components/Header/HeaderCheckout'
import { CheckoutController } from 'containers'
import { CheckoutFormInfo, CheckoutSection } from 'containers/Checkout'
import LaunchFormContainer from 'containers/Checkout/CheckoutFormContainer/LaunchFormContainer'
import LaunchPrimaryContainer from 'containers/Checkout/CheckoutFormContainer/LaunchPrimaryContainer'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  setBeneficiariesLaunchInfo,
  setCheckoutProgress,
  setDirectorsLaunchInfo,
} from 'redux/Slices'
import { store } from 'redux/Store'
import { AddMore, Body, Bottom, Container } from '../styled'
import { ReactComponent as AddIcon } from 'asset/Launch/Add.svg'
import { Dialog } from '@mui/material'
import LaunchSummaryCard from 'components/cards/LaunchSummaryCard'
import {
  checkInfoBeneficiarySchema,
  checkInfoDirectorSchema,
} from 'utils/config'
import {
  useAddBeneficiaryMutation,
  useDeleteBeneficiaryMutation,
  useDeleteMemberMutation,
  useUpdateBeneficiaryMutation,
  useUpdateMemberMutation,
} from 'services/launchService'
import toast from 'react-hot-toast'

const DirectorsInfo = () => {
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false)
  const [cardAction, setCardAction] = useState()
  const [selectedToEdit, setSelectedToEdit] = useState({})
  const [selectedToDelete, setSelectedToDelete] = useState({})
  const [useSidebriefBeneficiaries, setUseSidebriefBeneficiaries] = useState(
    false,
  )

  // Endpont hooks
  const [addBeneficiary, addState] = useAddBeneficiaryMutation()
  const [deleteBeneficiary, deleteState] = useDeleteBeneficiaryMutation()
  const [updateBeneficiary, updateState] = useUpdateBeneficiaryMutation()

  // This gets the beneficiary information from the store
  const LaunchApplicationInfo = useSelector((store) => store.LaunchReducer)
  const { beneficiariesLaunchInfo, generatedLaunchCode } = LaunchApplicationInfo

  const handleNext = () => {
    navigate('/launch/sharehholders-kyc')
    store.dispatch(setCheckoutProgress({ total: 13, current: 8 })) // total- total pages and current - current page
  }

  const handlePrev = () => {
    navigate(-1)
    store.dispatch(setCheckoutProgress({ total: 13, current: 7 })) // total- total pages and current - current page
  }

  const handleCheckbox = (checked) => {
    setUseSidebriefBeneficiaries(checked)
  }

  const handleAddMore = () => {
    setCardAction('add')
    setOpenModal(true)
  }
  const handleModalClose = () => {
    setOpenModal(false)
  }

  const handleEdit = (beneficiary) => {
    setCardAction('edit')
    setOpenModal(true)
    setSelectedToEdit(beneficiary)
  }

  // This deletes a beneficiary's informataion
  const handleDelete = async (beneficiary) => {
    setSelectedToDelete(beneficiary)
    const requiredDeleteData = {
      launchCode: generatedLaunchCode,
      beneficialOwnerCode: beneficiary.beneficialOwnerCode,
    }
    let deleteResponse = await deleteBeneficiary(requiredDeleteData)
    console.log(deleteResponse)
    if (deleteResponse.data) {
      // This filters and set the filtered beneficiaries info to the store
      let filteredBeneficiaries = beneficiariesLaunchInfo.filter(
        (beneficiary) =>
          beneficiary.beneficialOwnerCode !==
          requiredDeleteData.beneficialOwnerCode,
      )
      store.dispatch(
        setBeneficiariesLaunchInfo({ info: filteredBeneficiaries }),
      )
    } else {
      if (deleteResponse.error.status === 'FETCH_ERROR') {
        toast.error('Please check your internet connection')
      } else {
        toast.error(deleteResponse.error.data.message)
      }
    }
  }

  // This adds a new beneficiary
  const handleBeneficiaryAdd = async (formData, launchCode) => {
    const requiredDirectorData = {
      launchCode: launchCode,
      beneficialOwner: {
        beneficialOwnerName: formData.full_name,
        beneficialOwnerEmail: formData.email,
        beneficialOwnerPhone: formData.phone,
        beneficialOwnerOccupation: formData.occupation,
        beneficialOwnershipStake: formData.stake,
      },
    }

    let addBeneficiaryResponse = await addBeneficiary(requiredDirectorData)
    console.log(addBeneficiaryResponse)
    if (addBeneficiaryResponse.data) {
      // Get the information of all added beneficiaries
      const allBeneficiaries = Object.entries(
        addBeneficiaryResponse.data.businessBeneficialOwners,
      )
      // Get the information of the just added beneficiary
      const beneficiaryInfo = allBeneficiaries[allBeneficiaries.length - 1][1]
      // Merge the member information and the beneficiary information of the just added beneficiary
      // Set the combined information to store
      store.dispatch(
        setBeneficiariesLaunchInfo({ info: beneficiaryInfo, type: 'add' }),
      )
      setOpenModal(false)
      console.log(addBeneficiaryResponse)
    } else {
      console.log(addBeneficiaryResponse.error)
      toast.error(addBeneficiaryResponse.error.data.message)
    }
  }

  // This updates the beneficiary's information
  const handleBeneficiaryUpdate = async (
    formData,
    launchCode,
    selectedBeneficiary,
  ) => {
    const requiredBeneficiaryUpdateData = {
      launchCode: launchCode,
      beneficialOwnerCode: selectedBeneficiary.beneficialOwnerCode,
      beneficialOwner: {
        beneficialOwnerName: formData.full_name,
        beneficialOwnerEmail: formData.email,
        beneficialOwnerPhone: formData.phone,
        beneficialOwnershipStake: formData.stake,
      },
    }
    // Responses from the backend
    let beneficiaryUpdateResponse = await updateBeneficiary(
      requiredBeneficiaryUpdateData,
    )
    console.log(beneficiaryUpdateResponse)
    // The data from the response got from the backend
    let beneficiariesUpdatedData =
      beneficiaryUpdateResponse?.data?.businessBeneficialOwners
    console.log(beneficiariesUpdatedData)
    // Executes if data is returned from the backend
    if (beneficiariesUpdatedData) {
      store.dispatch(setDirectorsLaunchInfo({ info: beneficiariesUpdatedData }))
      handleModalClose()
    } else {
      if (beneficiaryUpdateResponse.error.status === 'FETCH_ERROR') {
        toast.error('Please check your internet connection')
      } else {
        toast.error(beneficiaryUpdateResponse.error.data.message)
      }
    }
  }

  return (
    <Container>
      <HeaderCheckout />
      <Body>
        <CheckoutSection
          title={'Beneficiaries Information (Optional)'}
          checkbox="Beneficiaries"
          checkBoxAction={handleCheckbox}
          disableCheckbox={beneficiariesLaunchInfo.length > 0 ? true : false}
        />
        <LaunchPrimaryContainer>
          <LaunchFormContainer>
            {beneficiariesLaunchInfo.map((beneficiary, index) => (
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
            {!useSidebriefBeneficiaries && (
              <AddMore onClick={handleAddMore}>
                <AddIcon />
                <span>Add a Beneficiary</span>
              </AddMore>
            )}
            <Dialog open={openModal}>
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
            </Dialog>
          </LaunchFormContainer>
          <Bottom>
            <CheckoutController
              backAction={handlePrev}
              backText={'Previous'}
              forwardAction={handleNext}
              forwardText={'Proceed'}
            />
          </Bottom>
        </LaunchPrimaryContainer>
      </Body>
    </Container>
  )
}

export default DirectorsInfo

// import HeaderCheckout from "components/Header/HeaderCheckout";
// import { CheckoutController } from "containers";
// import { CheckoutFormInfo, CheckoutSection } from "containers/Checkout";
// import LaunchFormContainer from "containers/Checkout/CheckoutFormContainer/LaunchFormContainer";
// import LaunchPrimaryContainer from "containers/Checkout/CheckoutFormContainer/LaunchPrimaryContainer";
// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import {
//   setBeneficiariesLaunchInfo,
//   setCheckoutProgress,
//   updateLaunchBeneficiaries,
// } from "redux/Slices";
// import { store } from "redux/Store";
// import { AddMore, Body, Bottom, Container, Header } from "../styled";
// import { ReactComponent as AddIcon } from "asset/Launch/Add.svg";
// import { Dialog } from "@mui/material";
// import LaunchSummaryCard from "components/cards/LaunchSummaryCard";

// const BeneficiariesInfo = () => {
//   const navigate = useNavigate();
//   const [openModal, setOpenModal] = useState(false);

//   const LaunchApplicationInfo = useSelector((store) => store.LaunchReducer);
//   const { beneficiariesLaunchInfo } = LaunchApplicationInfo;
//   console.log(beneficiariesLaunchInfo);

//   const handleNext = () => {
//     navigate("/launch/sharehholders-kyc");
//     store.dispatch(setCheckoutProgress({ total: 10, current: 5 })); // total- total pages and current - current page
//   };

//   const handlePrev = () => {
//     navigate(-1);
//     store.dispatch(setCheckoutProgress({ total: 10, current: 4 })); // total- total pages and current - current page
//   };

//   const handleCheckbox = (checked) => {
//     console.log(checked);
//   };

//   const handleModalOpen = () => {
//     setOpenModal(true);
//   };
//   const handleModalClose = () => {
//     setOpenModal(false);
//   };

//   const handleBeneficiaryInfo = (formData) => {
//     store.dispatch(setBeneficiariesLaunchInfo(formData));
//   };

//   const handleDelete = (index) => {
//     const beneficiariesInfo = [...beneficiariesLaunchInfo];
//     beneficiariesInfo.splice(index, 1);
//     store.dispatch(updateLaunchBeneficiaries(beneficiariesInfo));
//   };

//   return (
//     <Container>
//       <HeaderCheckout />
//       <Body>
//         <CheckoutSection
//           title={"Beneficiary's Information (Optional)"}
//           checkbox="Beneficiaries"
//           checkBoxAction={handleCheckbox}
//         />
//         <LaunchPrimaryContainer>
//           <LaunchFormContainer>
//             {beneficiariesLaunchInfo.map((beneficiary, index) => (
//               <LaunchSummaryCard
//                 key={index}
//                 number={index + 1}
//                 name={beneficiary.full_name}
//                 shares={beneficiary.share_type}
//                 email={beneficiary.email}
//                 phone={beneficiary.phone}
//                 sharesPercentage={beneficiary.share_percentage}
//                 deleteAction={() => handleDelete(index)}
//               />
//             ))}
//             <AddMore onClick={handleModalOpen}>
//               <AddIcon />
//               <span>Add a Beneficiary</span>
//             </AddMore>
//             <Dialog onClose={handleModalClose} open={openModal}>
//               <CheckoutFormInfo
//                 title="Beneficiary"
//                 handleClose={handleModalClose}
//                 saveToStore={handleBeneficiaryInfo}
//               />
//             </Dialog>
//           </LaunchFormContainer>
//           <Bottom>
//             <CheckoutController
//               backAction={handlePrev}
//               backText={"Previous"}
//               forwardAction={handleNext}
//               forwardText={"Proceed"}
//             />
//           </Bottom>
//         </LaunchPrimaryContainer>
//       </Body>
//     </Container>
//   );
// };

// export default BeneficiariesInfo;
