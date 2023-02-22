import {
  Container,
  Head,
  Heading,
  DropDown,
  SearchContainer,
  TextContainer,
  ArrowDown,
  TopContainer,
  ChatContainer,
  DropDownBtn,
  DropDownContent,
  DropDownItems,
} from "./style";
import Search from "components/navbar/Search";
import ChatCard from "components/cards/ChatCard";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { CommonButton } from "components/button";
import { useSearchParams } from "react-router-dom";
import { getThreadedMessages } from "./actions";

export const Chats = ({ data, isUser }) => {
  const [selected, setSelected] = useState("filter");
  const [isActive, setIsActive] = useState(false);
  const [params, setParams] = useSearchParams();

  const options = ["senderID", "serviceID"];

  const handleNew = () => {
    setParams({ serviceId: data[0]?.serviceId });
    console.log(data);
  };

  const threadedMessages = getThreadedMessages(data);
  console.log(threadedMessages);

  return (
    <Container>
      <TopContainer>
        <Head>
          <Heading>Chats ({data?.length})</Heading>

          <DropDown>
            <DropDownBtn
              onClick={() => {
                setIsActive(!isActive);
              }}
            >
              <TextContainer> {selected}</TextContainer>
              <ArrowDown
                onClick={() => setIsActive(!isActive)}
                isActive={isActive}
              >
                <IoIosArrowDown />
              </ArrowDown>
            </DropDownBtn>
            {isActive && (
              <DropDownContent>
                {options.map((option, index) => (
                  <DropDownItems
                    key={index}
                    onClick={(e) => {
                      setSelected(option);
                      setIsActive(false);
                    }}
                  >
                    {option}
                  </DropDownItems>
                ))}
              </DropDownContent>
            )}
          </DropDown>
        </Head>
        <SearchContainer>
          <Search />
        </SearchContainer>
      </TopContainer>
      <ChatContainer>
        <CommonButton text="New Conversation" action={handleNew} />

        {threadedMessages?.map((thread, index) => (
          <ChatCard lastMessage={thread?.messages[0]} key={index} />
        ))}
      </ChatContainer>
    </Container>
  );
};
