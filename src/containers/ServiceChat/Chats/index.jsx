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
import { useParams, useSearchParams } from "react-router-dom";
import { getThreadedMessages } from "./actions";
import EmptyChatLeft from "components/texts/EmptyChat/EmptyChatLeft";

export const Chats = ({ data, threadsRefetch }) => {
  const [selected, setSelected] = useState("filter");
  const [isActive, setIsActive] = useState(false);
  const [params, setParams] = useSearchParams();

  const options = ["senderID", "serviceID"];

  let serviceId = params.get("serviceId");

  const handleNew = () => {
    setParams({ serviceId: serviceId });
  };

  const threadedMessages = getThreadedMessages(data);

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
        <CommonButton text="New Conversation" action={handleNew} />
      </TopContainer>
      <ChatContainer>
        {threadedMessages?.length > 0 ? (
          <>
            {threadedMessages?.map((thread, index) => (
              <ChatCard
                messages={thread?.messages}
                key={index}
                threadsRefetch={threadsRefetch}
              />
            ))}
          </>
        ) : (
          <EmptyChatLeft />
        )}
      </ChatContainer>
    </Container>
  );
};
