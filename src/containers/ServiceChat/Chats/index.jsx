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
import numeral from "numeral";
import Search from "components/navbar/Search";
import { chatArray } from "utils/config";
import ChatCard from "components/cards/ChatCard";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { useGetAllNotificationsQuery } from "services/chatService";
import { useEffect } from "react";
import profile from "../../../asset/images/profile.svg";
import {
  formatDistance,
  subDays,
  subHours,
  subMonths,
  subSeconds,
} from "date-fns";
import { useSearchParams } from "react-router-dom";

export const Chats = () => {
  const options = ["senderID", "serviceID"];
  const [id, setId] = useSearchParams();

  const [selected, setSelected] = useState("filter");
  const [user, setUser] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const { data, isError } = useGetAllNotificationsQuery();
  const [category, setCategory] = useSearchParams();

  // console.log(user)
  const handleChatClick = (notificationId) => {
    setId({ id: notificationId });
  };

  return (
    <Container>
      <TopContainer>
        <Head>
          <Heading>Chats ({user.length})</Heading>
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
        {data?.map((chat, index) => {
          return (
            <div key={index}>
              <ChatCard
                image={profile}
                name={chat.senderID ? chat.senderID : "No senderID"}
                serviceName={chat.serviceID ? chat.serviceID : "No serviceID"}
                message={chat?.messageSubject}
                actions={() => handleChatClick(chat?.notificationId)}
                time={formatDistance(
                  subHours(new Date(chat?.createdAt), -8),
                  new Date(),
                  { addSuffix: true }
                )}
              />
            </div>
          );
        })}
      </ChatContainer>
    </Container>
  );
};
