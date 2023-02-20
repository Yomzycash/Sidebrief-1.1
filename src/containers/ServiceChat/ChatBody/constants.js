import * as yup from 'yup'
import { sub } from 'date-fns'

export const messageSchema = yup.object().shape({
  subject: yup.string().required(),
  body: yup.string().required(),
})

export const mockMessages = [
  {
    text:
      'Hi Ayomide, your business registration has been completed. Thank you for using Sidebrief.',
    date: sub(Date.now(), {
      minutes: 10,
    }),
    containsFile: true,
    fileName: 'CAC-registration.pdf',
    fileType: 'application/pdf',
    fileSize: '7.1MB',
  },
  {
    text:
      'We have a couple of banks we have partnered with to ease your business creation process. With these partners, you can easily create bank accounts, with perks, through us. If you’re interested, let me know. I can put you through the process.',
    date: sub(Date.now(), {
      minutes: 3,
    }),
  },
]
