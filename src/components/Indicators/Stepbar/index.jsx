import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ReactComponent as Close } from 'asset/images/close.svg'
import { format } from 'date-fns'

const Stepbar = ({ mobile, handleClose, applied }) => {
  const [data, setData] = useState([
    {
      id: '1',
      title: 'Applied',
      color: '#00A2D4',
      background: 'rgba(0, 162, 212, 0.05)',
      date: '--',
    },
    {
      id: '2',
      title: 'Submitted',
      color: '#D400CC',
      background: 'rgba(212, 0, 204, 0.05)',
      date: '--',
    },
    {
      id: '3',
      title: 'In Progress',
      color: '#FFBF29',
      background: 'rgba(255, 191, 41, 0.05)',
      date: '--',
    },
    {
      id: '4',
      title: 'Completed',
      color: '#00D448',
      background: 'rgba(0, 212, 72, 0.05)',
      date: '--',
    },
  ])

  useEffect(() => {
    if (applied) {
      setData((prev) => {
        const updated = [...prev]
        updated[updated.findIndex((el) => el.title === 'Applied')] = {
          ...updated[updated.findIndex((el) => el.title === 'Applied')],
          date: format(new Date(applied), 'do MMMM, yyyy'),
        }
        return updated
      })
    }
  }, [applied])

  return (
    <>
      {!mobile && (
        <StepContainer>
          <div>
            <List>
              {data.map((item, index) => (
                <ListItem color={item.color}>
                  <ListSpan
                    color={item.color}
                    backgroundColor={item.background}
                  >
                    {item.title}
                  </ListSpan>{' '}
                  <br /> <DateSpan>{item.date}</DateSpan>
                </ListItem>
              ))}
            </List>
          </div>
        </StepContainer>
      )}
      {mobile && (
        <StatusWrapper>
          <TimelineWrapper>
            <Text>Process Timeline</Text>
            <Close onClick={handleClose} style={{ cursor: 'pointer' }} />
          </TimelineWrapper>
          <StatusContainer>
            {data.map((item, index) => (
              <ListItem color={item.color}>
                <ListSpan color={item.color} backgroundColor={item.background}>
                  {item.title}
                </ListSpan>{' '}
                <DateSpan>{item.date}</DateSpan>
              </ListItem>
            ))}
          </StatusContainer>
        </StatusWrapper>
      )}
    </>
  )
}

export default Stepbar

const StepContainer = styled.div`
  border: 1px solid #edf1f7;
  box-shadow: 0px 10px 10px -5px rgba(149, 150, 151, 0.04);
  border-radius: 16px;
  background-color: white;
  padding-top: 40px;
  padding-bottom: 40px;
  padding: 24px 32px;
  max-width: 250px;
  flex: 1;

  @media screen and (max-width: 700px) {
    display: none;
  }

  div {
    border-left: dashed #727474 1px;
    /* height: calc(100% - 35px); */
    height: 280px;
    margin-bottom: 50px;
    transform: translateY(3%);
    position: relative;
  }
`

const List = styled.ul`
  gap: 48px;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-top: -10px;
  ::after {
    /* content: "";
    position: absolute;
    left: 0px;
    top: 0;
    width: 3px;
    z-index: 1px; */
  }
`

const ListItem = styled.li`
  list-style-type: none;
  margin: -5px auto 0px auto;
  ::before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    background-color: ${(props) => props.color};
    border-radius: 50%;
    left: -8px;
  }
`

const ListSpan = styled.span`
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
  padding: 4px 16px;
  display: inline;
  border-radius: 12px;
`
const DateSpan = styled.span`
  font-size: 14px;
  line-height: 31px;
  color: #4e5152;
`
const StatusWrapper = styled.div`
  max-width: 380px;
  background: #ffffff;
  border: 1px solid #edf1f7;
  box-shadow: 0px 10px 10px -5px rgba(149, 150, 151, 0.04);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 46px;
  width: 100%;
`
const TimelineWrapper = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  margin-inline: 24px 24px;
  margin-top: 44px;
`

const Text = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.02em;
  text-transform: capitalize;
  color: #242627;
`
const StatusContainer = styled.div`
  width: 289px;
  margin-inline: 45px 45px;
  margin-bottom: 29px;
  gap: 50px;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-top: -10px;
  @media screen and (max-width: 400px) {
    width: auto;
  }

  div {
    border-left: dashed #727474 1px;
    /* height: calc(100% - 35px); */
    height: 280px;
    margin-bottom: 50px;
    transform: translateY(3%);
    position: relative;
  }
`
const StatusDateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 24px;
`
const Status = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 4px 16px;
  gap: 10px;
  width: 87px;
  background: rgba(0, 162, 212, 0.05);
  border-radius: 12px;
`
const StatusContent = styled.h3`
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: 0.01em;
  color: #00a2d4;
`
const DateContainer = styled.h3`
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #4e5152;
`
