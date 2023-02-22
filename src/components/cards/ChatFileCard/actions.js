import { downLoadImage } from 'utils/staffHelper'

export const useActions = ({ link, documentType }) => {
  const downloadFileAction = async () => {
    const download = await downLoadImage(link, documentType)
    return download
  }

  return {
    downloadFileAction,
  }
}
