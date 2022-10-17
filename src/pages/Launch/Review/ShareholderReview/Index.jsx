import { CheckoutController, CheckoutSection } from 'containers'
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Container } from '../styled'
import styled from 'styled-components'
import { ReviewTab } from 'utils/config'
import LaunchSummaryCard from 'components/cards/LaunchSummaryCard'
import HeaderCheckout from 'components/Header/HeaderCheckout'
import { useSelector } from 'react-redux'
import { ReactComponent as EditIcon } from 'asset/Launch/Edit.svg'
import { store } from 'redux/Store'
import { setCheckoutProgress } from 'redux/Slices'
import ReviewCard from 'components/cards/ReviewCard'
import {
  useViewMembersKYCMutation,
  useViewMembersMutation,
  useViewShareholdersMutation,
} from 'services/launchService'
import { useEffect } from 'react'
const ShareholderReview = () => {
  const ActiveStyles = {
    color: '#151717',
    borderBottom: '4px solid #00A2D4',
    borderRadius: 0,
  }
  const [shareholderInfo, setShareholderInfo] = useState([])
  const [shareholdersKycInfo, setShareholdersKycInfo] = useState([])
  const [members, setMembers] = useState([])
  const [mergedResponse, setMergedResponse] = useState([])
  const LaunchApplicationInfo = useSelector((store) => store.LaunchReducer)
  //console.log(LaunchApplicationInfo)

  const navigate = useNavigate()
  const handleNext = () => {
    navigate('/launch/review-director')
    store.dispatch(setCheckoutProgress({ total: 13, current: 11 })) // total- total pages and current - current page
  }
  const handlePrev = () => {
    navigate(-1)
  }
  const LaunchInfo = useSelector((store) => store.LaunchReducer)
  const { launchResponse } = LaunchInfo
  const [viewShareholders] = useViewShareholdersMutation()
  const [viewShareholdersKyc] = useViewMembersKYCMutation()
  const [viewMembers] = useViewMembersMutation()

  const handleViewShareholders = async () => {
    let responseData = await viewShareholders(launchResponse)
    //    console.log(responseData)
    setShareholderInfo(Object.values(responseData.data.businessShareholders))
  }
  const handleViewShareholdersKyc = async () => {
    let responseData = await viewShareholdersKyc(launchResponse)
    // console.log(responseData)
    setShareholdersKycInfo(Object.values(responseData.data.businessMembersKYC))
  }
  const handleMembers = async () => {
    let responseData = await viewMembers(launchResponse)
    // console.log(responseData.data.businessMembers)
    setMembers(responseData.data.businessMembers)
  }
  // console.log(shareholderInfo)
  // console.log(shareholdersKycInfo)
  // console.log(members)

  // console.log(mergedResponse)

  // //merging the last endpoint
  // const mergedKycData = []
  // mergedData.forEach((shareholder) => {
  //   shareholdersKycInfo.forEach((kyc) => {
  //     if (kyc.memberCode === mergedData.memberCode) {
  //       let merged = { ...shareholder, ...kyc }
  //       mergedKycData.push(merged)
  //     }
  //   })
  // })
  // console.log(mergedKycData)

  const handleNavigate = () => {
    navigate('/launch/shareholder-info')
  }
  useEffect(() => {
    handleViewShareholders()
    handleViewShareholdersKyc()
    handleMembers()
  }, [])

  useEffect(() => {
    const mergedData = []
    members.forEach((member) => {
      shareholderInfo.forEach((shareholder) => {
        let merged = {}
        if (shareholder.memberCode === member.memberCode) {
          merged = { ...merged, ...shareholder, ...member }
          let kycDocs = shareholdersKycInfo.filter(
            (element) => element.memberCode === shareholder.memberCode,
          )
          merged = { ...merged, documents: [...kycDocs] }
          mergedData.push(merged)
        }
        console.log(mergedData)
        setMergedResponse(mergedData)
      })
    })
  }, [shareholderInfo.length, shareholdersKycInfo.length])

  return (
    <>
      <Container>
        <HeaderCheckout />
        <Body>
          <CheckoutSection
            title={'Review Information'}
            HeaderParagraph="Please ensure all information provided for this business are correct"
          />
          <Nav>
            {ReviewTab.map((item, index) => (
              <ReviweTabWrapper to={item.path} key={index}>
                <NavLink
                  to={item.path}
                  style={({ isActive }) => (isActive ? ActiveStyles : {})}
                >
                  {item.title}
                </NavLink>
              </ReviweTabWrapper>
            ))}
          </Nav>
          <ContentWrapper>
            <EditWrapper onClick={handleNavigate}>
              <EditIcon />
              <EditText>Edit Shareholder Information</EditText>
            </EditWrapper>
          </ContentWrapper>

          <CardWrapper>
            {mergedResponse.map((shareholder, index) => (
              <ReviewCard
                key={index}
                number={index + 1}
                name={shareholder?.memberName}
                shares={shareholder?.shareholderOwnershipType}
                email={shareholder?.memberEmail}
                phone={shareholder?.memberPhone}
                sharesPercentage={shareholder?.shareholderOwnershipPercentage}
                icon
                government
                proof
                passport
              />
            ))}{' '}
          </CardWrapper>
          <ButtonWrapper>
            <CheckoutController
              backText={'Previous'}
              forwardText={'Proceed'}
              forwardAction={handleNext}
              backAction={handlePrev}
            />
          </ButtonWrapper>
        </Body>
      </Container>
    </>
  )
}

export default ShareholderReview

const Nav = styled.nav`
  background: #ffffff;
  width: 100%;
  border-width: 1px;
  border-style: solid;
  border-color: #edf1f7;
  padding: 20px 40px 0px 40px;
  display: flex;
  align-items: center;
  gap: 24px;
`
const ReviweTabWrapper = styled.div`
  display: flex;
  flex: 1;

  > a {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    padding: 7px 10px;
    transition: 0.3s all ease;
    padding-bottom: 20px;

    border: none;

    margin: 0;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: #959697;
    white-space: nowrap;
  }
`
const ContentWrapper = styled.div`
  width: 100%;
  padding: 40px 40px 0px;
`
const EditWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
  cursor: pointer;
`

const EditText = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 27px;
  color: #00a2d4;
`
const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 40px;
  gap: 40px;
`
const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 40px;
`
const Body = styled.form`
  display: flex;
  flex-flow: column;
  height: 100%;
  margin: auto;
  width: 100%;
  max-width: 962px;
  background-color: white;
  border: 1px solid #edf1f6;
  border-top: none;
  flex: 1;
  padding-bottom: 50px;
  border-top: none;
`
