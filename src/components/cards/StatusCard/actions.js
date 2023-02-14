import { navigateToDetailPage } from 'utils/globalFunctions'
import { store } from 'redux/Store'
import { setLaunchResponse } from 'redux/Slices'

export const useActions = ({
  navigate,
  setShowDelete,
  launchInfo,
  viewPayLaunch,
}) => {
  const showDeleteModal = () => {
    setShowDelete(true)
  }

  const hideDeleteModal = () => {
    setShowDelete(false)
  }

  const viewAction = () => {
    navigateToDetailPage(navigate, launchInfo, viewPayLaunch)
  }

  const editAction = async () => {
    await handleEditNavigation()
  }

  const deleteAction = () => {
    showDeleteModal()
  }

  const checkPaymentStatus = async () => {
    let viewResponse = await viewPayLaunch(launchInfo)
    // console.log(viewResponse);
    return viewResponse
  }

  const handleEditNavigation = async () => {
    let status = await checkPaymentStatus()

    let data = status?.data?.businessPayment

    let error = status?.error

    store.dispatch(setLaunchResponse(launchInfo))
    localStorage.setItem('launchInfo', JSON.stringify(launchInfo))
    console.log(data)
    if (data) {
      if (data.length === 0) {
        navigate('/launch')
      } else {
        navigate('/launch/address')
      }
    } else {
      // console.log("This block ran");
      console.log(error)
    }
  }

  return {
    viewAction,
    editAction,
    deleteAction,
    hideDeleteModal,
  }
}
