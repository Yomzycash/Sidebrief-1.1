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
import { compareAsc, parseJSON } from "date-fns";

export const Chats = ({ data }) => {
  const [selected, setSelected] = useState("filter");
  const [isActive, setIsActive] = useState(false);

  const options = ["senderID", "serviceID"];

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
        {data?.map((notification, index) => (
          <ChatCard notification={notification} key={index} />
        ))}
      </ChatContainer>
    </Container>
  );
};
// .sort((a, b) =>
//             compareAsc(
//               parseJSON(a?.notification?.updatedAt),
//               parseJSON(b?.notification?.updatedAt)
//             )
//           )
