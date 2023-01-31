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
} from './style'
import numeral from 'numeral'
import Search from 'components/navbar/Search'
import { chatArray } from 'utils/config'
import ChatCard from 'components/cards/ChatCard'
import { IoIosArrowDown } from 'react-icons/io'
import { useState } from 'react'

export const Chats = () => {
  const options = ['filter', 'name', 'chat']

  const [selected, setSelected] = useState('')
  const [isActive, setIsActive] = useState(false)

  return (
    <Container>
      <TopContainer>
        <Head>
          <Heading>Chats ({numeral(2002).format('0,0')})</Heading>
         git  <DropDown>
            <DropDownBtn
              onClick={(e) => {
                setIsActive(!isActive)
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
                {options.map((option) => (
                  <DropDownItems
                    onClick={(e) => {
                      setSelected(option)
                      setIsActive(false)
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
