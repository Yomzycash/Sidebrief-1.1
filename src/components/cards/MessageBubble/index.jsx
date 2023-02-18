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
} from "./style";
import { ReactComponent as PdfIcon } from "asset/svg/pdf.svg";
import { ThreeDotMenu } from "components/Menu";
import { format, isToday, isYesterday, parseJSON } from "date-fns";

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
  const menuContent = [
    {
      text: "View",
      action: () => {},
    },
    {
      text: "Download",
      action: () => {},
    },
  ];

  const formatDate = (updatedAt) => {
    if (isToday(new Date(updatedAt))) {
      return "Today";
    } else if (isYesterday(new Date(updatedAt))) {
      return "Yesterday";
    } else {
      let date = new Date(updatedAt);
      return date.toLocaleString("default", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  return (
    <Wrapper>
      {messageBody ? (
        <Container>
          <Title>{messageSubject}</Title>
          <Body>{messageBody}</Body>
        </Container>
      ) : null}

      {containsFile ? (
        <FileContainer>
          <PdfIcon />
          <TextContainer>
            <Name>{fileName}</Name>
            <Size>{fileSize}</Size>
          </TextContainer>
          <ContextContainer>
            <ThreeDotMenu contextContent={menuContent} />
          </ContextContainer>
        </FileContainer>
      ) : null}
      {updatedAt && (
        <TimeStamp>
          <span>{formatDate(updatedAt)}</span>
          <span>{format(parseJSON(updatedAt), "hh:mm aaa")}</span>
        </TimeStamp>
      )}
    </Wrapper>
  );
};
// updatedAt?.slice(11, 16);
