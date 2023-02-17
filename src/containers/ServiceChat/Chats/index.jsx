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
import { useGetAllNotificationsQuery } from "services/chatService";
import { getUsersMessages } from "./actions";

export const Chats = ({ setParamsId }) => {
  const options = ["senderID", "serviceID"];

  const [selected, setSelected] = useState("filter");
  const [isActive, setIsActive] = useState(false);
  const { data, isError, isLoading } = useGetAllNotificationsQuery();

  let usersMessages = getUsersMessages(data);

  console.log(usersMessages);

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
        {usersMessages.map((chats, index) => {
          return (
            <ChatCard chats={chats} key={index} setParamsId={setParamsId} />
          );
        })}
      </ChatContainer>
    </Container>
  );
};

// ?.sort((a, b) =>
//   compareAsc(
//     parseJSON(a.notification.slice(-1)[0]?.createdAt),
//     parseJSON(b.notification.slice(-1)[0]?.createdAt),
//   ),
// )
