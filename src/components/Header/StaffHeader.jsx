import { RewardSummaryCard } from 'components/cards'
import Search from 'components/navbar/Search'
import React from 'react'
import styled from 'styled-components'
import { ReactComponent as AddIcon } from '../../../src/asset/svg/Plus.svg'

const StaffHeader = ({
  title = 'Countries',
  shown = '12',
  total = '12',
  Description = 'Add Country',
}) => {
  const searchStyle = {
    borderRadius: '12px',
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  }

  const iconStyle = { width: '17px', height: '17px' }
  return (
    <Container>
      <Header>
        <MainHeader>
          <TopContent>
            <div>
              <PageTitle>{title}</PageTitle>
              <RewardSummaryCard shown={shown} total={total} />
            </div>
            <Drop>
              <select>
                <option value="Sort">Sort</option>
                <option value="All">All</option>
              </select>
            </Drop>
          </TopContent>
          <BottomContent>
            <SearchWrapper>
              <Search style={searchStyle} iconStyle={iconStyle} />
            </SearchWrapper>
            <ButtonWrapper>
              <button>
                <AddIcon />
                {Description}
              </button>
            </ButtonWrapper>
          </BottomContent>
        </MainHeader>
      </Header>
    </Container>
  )
}
export default StaffHeader
const Container = styled.div`
  display: flex;
  flex-flow: column;
  margin: 0 40px;
`
const Header = styled.div`
  position: sticky;
  top: 57.1px;
  display: flex;
  flex-flow: column;
  background-color: white;
  z-index: 2;
`
const MainHeader = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  padding: 40px 0px;
  gap: 24px;
  /* height: clamp(80px, 10vw, 150px); */
  border: 1px solid #edf1f7;
  border-top: none;
  transition: 0.2s all ease;
`

//TODO: maybe hide scroll bar

const TopContent = styled.div`
  display: flex;
  /* gap: 48px; */
  align-items: center;
  padding-inline: 24px;
  flex: 1;
  justify-content: space-between;

  > div {
    display: flex;
    gap: 48px;
    justify-content: space-between;
  }
`
const PageTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: clamp(20px, 2vw, 24px);
  font-weight: 700;
  color: #151717;
`
const BottomContent = styled.div`
  display: flex;
  align-items: center;
  padding-inline: 24px;
  gap: 60px;
  flex: 1;
  justify-content: space-between;
`
const Drop = styled.div`
  display: flex;
  border: 1px solid #f1f1f1;
  border-radius: 12px;
  background-color: #fafafa;
  padding: 8px 16px;

  select {
    border: none;
    outline: none;
    width: 60px;
    background: none;
  }
`
const ButtonWrapper = styled.div`
  width: 200px;

  button {
    width: 100%;
    height: 100%;
    background-color: #00a2d4;
    border-radius: 8px;
    border: none;
    outline: none;
    color: #ffffff;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
    padding: 10px 24px;
    display: flex;
    gap: 8px;
    align-items: center;
  }
`

const SearchWrapper = styled.div`
  max-width: 384px;
  height: 40px;
  width: 100%;
  @media screen and (max-width: 700px) {
    max-width: 100%;
    width: 100%;
  }
`
