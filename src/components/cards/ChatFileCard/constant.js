import pdf from '../../../asset/images/pdf.png'
import png from '../../../asset/images/png.png'
import jpg from '../../../asset/images/jpg.png'
import doc from '../../../asset/images/doc.png'
import { ViewSvg,DownloadSvg  } from '../../../asset/svg'
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

export const imageTypeImage = [
{
  id: '1',
  fileUrl: 'www.link.com',
  fileName: 'passportlocal',
  fileType: 'pdf',
  image: pdf,
},

{
  id: '2',
  fileUrl: 'www.link.com',
  fileName: 'passportlocal',
  fileType: 'png',
  image: png,
},
{
  id: '4',
  fileUrl: 'www.link.com',
  fileName: 'passportlocal',
  fileType: 'jpg',
  image: jpg,
},
]