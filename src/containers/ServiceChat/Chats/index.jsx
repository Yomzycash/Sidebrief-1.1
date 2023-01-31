import {
  Container,
  Head,
  Heading,
  DropDown,
  SearchContainer,
  TextContainer,
  Option,
  TopContainer,
  ChatContainer,
} from './style'
import numeral from 'numeral'
import Search from 'components/navbar/Search'
import { chatArray } from 'utils/config'
import ChatCard from 'components/cards/ChatCard/ChatCard'

export const Chats = () => {
  return (
    <Container>
      <TopContainer>
        <Head>
          <Heading>Chats ({numeral(2002).format('0,0')})</Heading>
          <DropDown>
            <TextContainer>
              <Option value="filter">filter</Option>
              <Option value="All">All</Option>
            </TextContainer>
          </DropDown>
        </Head>
        <SearchContainer>
          <Search />
        </SearchContainer>
      </TopContainer>
      <ChatContainer>
        {chatArray.map((chat, index) => {
          return (
            <div key={index}>
              <ChatCard
                image={chat.image}
                name={chat.name}
                serviceName={chat.serviceName}
                time={chat.time}
                message={chat.message}
              />
            </div>
          )
        })}
      </ChatContainer>
    </Container>
  )
}
