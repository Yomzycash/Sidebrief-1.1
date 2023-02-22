import {
  Container,
  FileContainer,
  Wrapper,
  Name,
  Size,
  TextContainer,
  ContextContainer,
  Title,
  Body,
  TimeStamp,
  CardContainer,
} from './style'
import { ReactComponent as PdfIcon } from 'asset/svg/pdf.svg'
import { ThreeDotMenu } from 'components/Menu'
import { format, isToday, isYesterday, parseJSON } from 'date-fns'
import ChatFileCard from '../ChatFileCard'

export const MessageBubble = ({
  messageBody,
  messageSubject,
  messageFiles,
  updatedAt,
  date,
  containsFile,
  fileName,
  fileType,
  fileSize,
}) => {
  console.log(messageFiles)
  const menuContent = [
    {
      text: 'View',
      action: () => {},
    },
    {
      text: 'Download',
      action: () => {},
    },
  ]

  const formatDate = (updatedAt) => {
    if (isToday(new Date(updatedAt))) {
      return 'Today'
    } else if (isYesterday(new Date(updatedAt))) {
      return 'Yesterday'
    } else {
      let date = new Date(updatedAt)
      return date.toLocaleString('default', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    }
  }

  return (
    <Wrapper>
      {messageBody ? (
        <Container>
          <Title>{messageSubject}</Title>
          <Body>{messageBody}</Body>
        </Container>
      ) : null}
      <CardContainer>
        {messageFiles?.length > 0
          ? messageFiles?.map((el, index) => {
              return (
                <ChatFileCard
                  key={index}
                  fileName={el?.fileName}
                  fileType={el?.fileType}
                />
              )
            })
          : null}
      </CardContainer>
      {updatedAt && (
        <TimeStamp>
          <span>{formatDate(updatedAt)}</span>
          <span>{format(parseJSON(updatedAt), 'hh:mm aaa')}</span>
        </TimeStamp>
      )}
    </Wrapper>
  )
}
// updatedAt?.slice(11, 16);
