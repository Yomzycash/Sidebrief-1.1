import pdf from '../../../asset/images/pdf.png'
import png from '../../../asset/images/png.png'
import jpg from '../../../asset/images/jpg.png'
import { ViewSvg, DownloadSvg } from '../../../asset/svg'
export const contextContent = [
  {
    text: 'View',
    Icon: ViewSvg,
    action: '',
    style: 'normal',
  },

  {
    text: 'Download',
    Icon: DownloadSvg,
    action: '',
    style: 'normal',
  },
]

export const imageTypeImage = {
  pdf: pdf,
  jpg: jpg,
  png: png,
}
