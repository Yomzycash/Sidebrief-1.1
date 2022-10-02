import HeaderCheckout from 'components/Header/HeaderCheckout'
import { CheckoutController } from 'containers'
import { CheckoutFormInfo, CheckoutSection } from 'containers/Checkout'
import LaunchFormContainer from 'containers/Checkout/CheckoutFormContainer/LaunchFormContainer'
import LaunchPrimaryContainer from 'containers/Checkout/CheckoutFormContainer/LaunchPrimaryContainer'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  LaunchReducer,
  setCheckoutProgress,
  setDirectorsLaunchInfo,
  setShareHoldersLaunchInfo,
} from 'redux/Slices'
import { store } from 'redux/Store'
import { AddMore, Body, Bottom, Container } from '../styled'
import { ReactComponent as AddIcon } from 'asset/Launch/Add.svg'
import { Dialog } from '@mui/material'
import LaunchSummaryCard from 'components/cards/LaunchSummaryCard'
import {
  checkInfoShareDirSchema,
  checkInfoShareholderSchema,
} from 'utils/config'
import {
  useAddDirectorMutation,
  useAddShareHolderMutation,
  useDeleteMemberMutation,
  useDeleteShareholderMutation,
  useUpdateMemberMutation,
  useUpdateShareholderMutation,
} from 'services/launchService'
import toast from 'react-hot-toast'

const ShareHoldersInfo = () => {
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false)
  const [cardAction, setCardAction] = useState()
  const [isDirector, setIsDirector] = useState(false)
  const [selectedToEdit, setSelectedToEdit] = useState({})
  const [selectedToDelete, setSelectedToDelete] = useState({})
  const [useSidebriefShareholders, setUseSidebriefShareholders] = useState(
    false,
  )

  // Endpont hook for shareholder add
  const [addShareHolder, addState] = useAddShareHolderMutation()
  const [deleteShareholder, deleteState] = useDeleteShareholderMutation()
  const [updateShareholder, updateState] = useUpdateShareholderMutation()
  const [updateMember, memberUpdateState] = useUpdateMemberMutation()
  const [deleteMember] = useDeleteMemberMutation()
  const [addDirector, dirAddState] = useAddDirectorMutation()

  // This gets the shareholders information from the store
  const LaunchApplicationInfo = useSelector((store) => store.LaunchReducer)
  const { shareHoldersLaunchInfo, directorsLaunchInfo } = LaunchApplicationInfo

  const handleNext = () => {
    navigate("/launch/directors-info");
    store.dispatch(setCheckoutProgress({ total: 13, current: 6 })); // total- total pages and current - current page
  };

  const handlePrev = () => {
    navigate(-1);
    store.dispatch(setCheckoutProgress({ total: 13, current: 5 })); // total- total pages and current - current page
  };

  const handleCheckbox = (checked) => {
    setUseSidebriefShareholders(checked)
  }

  const handleAddMore = () => {
    setCardAction('add')
    setOpenModal(true)
  }
  const handleModalClose = () => {
    setOpenModal(false)
  }

  const handleEdit = (shareholder) => {
    setCardAction('edit')
    setOpenModal(true)
    setSelectedToEdit(shareholder)
  }

  // This deletes a shareholder's informataion
  const handleDelete = async (shareholder) => {
    setSelectedToDelete(shareholder)
    const requiredDeleteData = {
      launchCode: shareholder.launchCode,
      shareholdingCode: shareholder.shareholdingCode,
      memberCode: shareholder.memberCode,
      shareholderOwnershipPercentage:
        shareholder.shareholderOwnershipPercentage,
      shareholderOwnershipType: shareholder.shareholderOwnershipType,
    }
    // The delete response gotten from the backend
    let deleteResponse = await deleteShareholder(requiredDeleteData)
    console.log(deleteResponse)
    // This fires off, if delete response is success
    if (deleteResponse.data) {
      // This filters and set the filtered shareholders info to the store
      let filteredShareholders = shareHoldersLaunchInfo.filter(
        (shareholder) =>
          shareholder.shareholdingCode !== requiredDeleteData.shareholdingCode,
      )
      store.dispatch(setShareHoldersLaunchInfo({ info: filteredShareholders }))
      // This checks if the deleted shareholder is a director
      let memberCheck = directorsLaunchInfo.filter(
        (director) => director?.memberCode === requiredDeleteData?.memberCode,
      )
      // if memberCheck length is 0 (i.e the shareholder is not a director), member delete endpoint is called.
      if (memberCheck.length === 0) {
        let requiredMemberDeleteData = {
          launchCode: shareholder.launchCode,
          memberCode: shareholder.memberCode,
        }
        let memberDeleteResponse = await deleteMember(requiredMemberDeleteData)
        console.log(memberDeleteResponse)
      }
    } else {
      if (deleteResponse.error.status === 'FETCH_ERROR') {
        toast.error('Please check your internet connection')
      } else {
        toast.error(deleteResponse.error.data.message)
      }
    }
  }

  // This adds a new director
  const handleDirectorAdd = async (formData, launchCode, memberInfo) => {
    const requiredDirectorData = {
      launchCode: launchCode,
      memberCode: memberInfo.memberCode,
      directorRole: formData.director_role,
    }

    let addDirectorResponse = await addDirector(requiredDirectorData)
    if (addDirectorResponse.data) {
      // Get the information of all added directors
      const allDirectors = Object.entries(
        addDirectorResponse.data.businessDirectors,
      )
      // Get the information of the just added director
      const directorInfo = allDirectors[allDirectors.length - 1][1]
      // Merge the member information and the director information of the just added director
      let directorAllInfo = { ...memberInfo, ...directorInfo }
      // Set the combined information to store
      store.dispatch(
        setDirectorsLaunchInfo({ info: directorAllInfo, type: 'add' }),
      )
      setOpenModal(false)
    } else {
      toast.error(addDirectorResponse.error.data.message)
    }
  }

  // This adds a new shareholder
  const handleShareholderAdd = async (formData, launchCode, memberInfo) => {
    const requiredShareholderData = {
      launchCode: launchCode,
      memberCode: memberInfo.memberCode,
      shareholderOwnershipPercentage: formData.share_percentage,
      shareholderOwnershipType: formData.share_type,
    }

    let addShareHolderResponse = await addShareHolder(requiredShareholderData)
    if (addShareHolderResponse.data) {
      // Get the information of all added shareholder
      const allShareholders = Object.entries(
        addShareHolderResponse.data.businessShareholders,
      )
      // Get the information of the just added shareholder
      const shareholderInfo = allShareholders[allShareholders.length - 1][1]
      // Merge the member information and the shareholder information of the just added shareholder
      let shareholderAllInfo = { ...memberInfo, ...shareholderInfo }
      console.log(shareholderAllInfo)
      // Set the combined information to store
      store.dispatch(
        setShareHoldersLaunchInfo({ info: shareholderAllInfo, type: 'add' }),
      )
      console.log(addShareHolderResponse)
    } else {
      toast.error(addShareHolderResponse.error.data.message)
    }
    if (isDirector) {
      handleDirectorAdd(formData, launchCode, memberInfo)
    } else {
      setOpenModal(false)
    }
  }

  // This updates the shareholders information
  const handleShareholderUpdate = async (formData, selectedShareholder) => {
    const requiredShareholderUpdateData = {
      launchCode: selectedShareholder.launchCode,
      memberCode: selectedShareholder.memberCode,
      shareholderOwnershipPercentage: formData.share_percentage,
      shareholderOwnershipType: formData.share_type,
      shareholdingCode: selectedShareholder.shareholdingCode,
    }
    const requiredMemberUpdateData = {
      launchCode: selectedShareholder.launchCode,
      memberCode: selectedShareholder.memberCode,
      businessMember: {
        memberName: formData.full_name,
        memberEmail: formData.email,
        memberPhone: formData.phone,
      },
    }
    // Responses from the backend
    let shareholdersUpdateResponse = await updateShareholder(
      requiredShareholderUpdateData,
    )
    let membersUpdateResponse = await updateMember(requiredMemberUpdateData)

    // The data from the response got from the backend
    let shareholdersUpdatedData =
      shareholdersUpdateResponse?.data?.businessShareholders
    let membersUpdatedData = membersUpdateResponse?.data?.businessMembers

    // Executes if data is returned from the backend
    if (shareholdersUpdatedData) {
      let shareholdersMembersMerged = []
      shareholdersUpdatedData.forEach((shareholder) => {
        membersUpdatedData.forEach((member) => {
          if (member.memberCode === shareholder.memberCode) {
            let merged = { ...shareholder, ...member }
            shareholdersMembersMerged.push(merged)
          }
        })
      })
      console.log(shareholdersMembersMerged)
      store.dispatch(
        setShareHoldersLaunchInfo({ info: shareholdersMembersMerged }),
      )
      handleModalClose()
    } else {
      if (shareholdersUpdateResponse.error.status === 'FETCH_ERROR') {
        toast.error('Please check your internet connection')
      } else {
        toast.error(shareholdersUpdateResponse.error.data.message)
      }
    }
  }

  return (
    <Container>
      <HeaderCheckout />
      <Body>
        <CheckoutSection
          title={'Shareholders Information'}
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

export default ShareHoldersInfo
