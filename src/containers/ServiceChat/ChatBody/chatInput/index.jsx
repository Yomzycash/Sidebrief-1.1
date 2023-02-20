import { SubjectInput, TextBody, TextInput, TextInputForm } from './style'
import { CommonButton } from 'components/button'
import { Send } from 'asset/svg'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { messageSchema } from '../constants'
import { SlateEditor } from 'components/input'
import { useAddNotificationMutation } from 'services/chatService'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'

export const ChatInput = ({ noEditor }) => {
  const { handleSubmit, register, reset } = useForm({
    resolver: yupResolver(messageSchema),
  })
  const [subjectText, setSubjectText] = useState('')
  const [bodyText, setBodyText] = useState('')

  const [addNotification] = useAddNotificationMutation()
  const location = useLocation()
  let params = new URLSearchParams(location.search)
  let serviceId = params.get('serviceId')
  const username = JSON.parse(localStorage.getItem('userInfo'))

  const SubmitForm = async (data) => {
    const requiredChatData = {
      serviceId: serviceId,
      senderId: username?.username,
      messageSubject: 'Re: Please upload signature',
      messageBody: "Gbubemi's message ",
      messageIsRead: false,
      messageFiles: [
        {
          fileUrl: 'www.link.com',
          fileName: 'passportlocal',
          fileType: 'pdf',
        },
      ],
    }
    reset()
  }
  const handleSubjectChange = (e) => {
    setSubjectText(e.target.value)
  }
  const handleBodyChange = (e) => {
    setBodyText(e.target.value)
    console.log(e)
  }

  const sendMessage = (data) => {
    // console.log('femi', serviceId)
    reset()
  }

  

  return (
    <TextInputForm onSubmit={handleSubmit(sendMessage)}>
      <SubjectInput
        placeholder="Subject"
        {...register('subject')}
        onChange={handleSubjectChange}
        value={subjectText}
      />
      <TextBody>
        {/* <TextInput
					placeholder="Send a message"
					{...register("message")}
				/> */}
        {!noEditor && (
          <>
            <SlateEditor
              bodyText={bodyText}
              placeholder="Send a message..."
              onChange={handleBodyChange}
            />
          </>
        )}
        <CommonButton text={'Send'} RightIcon={Send} />
      </TextBody>
    </TextInputForm>
  )
}
