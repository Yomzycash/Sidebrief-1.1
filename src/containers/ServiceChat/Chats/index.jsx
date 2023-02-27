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
import { compareAsc } from "date-fns";

export const Chats = ({ data, threadsRefetch }) => {
  const [selected, setSelected] = useState("filter");
  const [isActive, setIsActive] = useState(false);
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState("");

  const options = ["senderID", "serviceID"];

  let serviceId = params.get("serviceId");

  const handleNew = () => {
    setParams({ serviceId: serviceId });
  };

  const threadedMessages = getThreadedMessages(data).filter((el) =>
    el?.subject?.toLowerCase()?.includes(search.toLowerCase())
  );

  return (
    <Container>
      <TopContainer>
        <Head>
          <Heading>Chats ({threadedMessages?.length})</Heading>
        </Head>
        <SearchContainer>
          <Search onChange={(e) => setSearch(e.target.value)} />
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
