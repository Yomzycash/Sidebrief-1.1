import React, { useState } from 'react'
import styled from 'styled-components'
import { ReactComponent as Lendha } from 'asset/images/lendha.svg'
import { ReactComponent as Close } from 'asset/images/close.svg'
import { ReactComponent as Copy } from 'asset/images/copy.svg'
import Button from 'components/button/mainButton/index.jsx'
import { Link, useNavigate, useParams } from 'react-router-dom'

// import { allRewards } from "utils/config";
import {
  useClaimRewardMutation,
  useGetAllRewardsQuery,
} from 'services/RewardService'
import toast from 'react-hot-toast'
const RewardModal = ({ handleClose }) => {
  const [successful, setSuccessful] = useState(false)

  const { data, isLoading, isError, isSuccess } = useGetAllRewardsQuery()

  const [claimReward, claimState] = useClaimRewardMutation()

  const { rewardID } = useParams()

  const rewardDetails = data?.find((element) => element.rewardID === rewardID)

  const navigate = useNavigate()

  const handleClaimReward = async () => {
    let required = {
      rewardID: rewardDetails.rewardID,
    }

    let claimedResponse = await claimReward(required)
    let claimedData = claimedResponse?.data
    let error = claimedResponse?.error

    if (claimedData) {
      setSuccessful(true)

      let link = claimedData[claimedData.length - 1].rewardLink
      // console.log(link);
      window.open(link, '_blank')

      setTimeout(() => {
        handleClose()
      }, 1000)
    } else if (error) {
      if (error.status === 'FETCH_ERROR')
        toast.error('Please check your internet connection')
      else toast.error(error.data.message)
    }
  }
  const copyToClipBoard = async (copyMe) => {
    try {
      await navigator.clipboard.writeText(copyMe)
      toast.success(' copied successfully!')
    } catch (err) {
      toast.error('Failed to copy!')
    }
  }

  const imagestyle = {
    borderRadius: '50%',
    width: '45px',
  }

  return (
    <Wrapper>
      <LogoCancelWrapper>
        <LogoWrapper>
          <ImageWrapper>
            <img src={rewardDetails?.rewardImage} alt="" style={imagestyle} />
          </ImageWrapper>
          <LogoName>{rewardDetails?.rewardPartner}</LogoName>
        </LogoWrapper>
        <Close onClick={handleClose} style={{ cursor: 'pointer' }} />
      </LogoCancelWrapper>

      {successful && (
        <MiddleContainer>
          <Content>Your reward has been redeemed successfully!</Content>
        </MiddleContainer>
      )}
      <LowerContainer>
        <TextContainer>
          <UpperText>{rewardDetails?.rewardName}</UpperText>
          <LowerText>
            Please redeem this reward by inputting the code below on the
            checkout page.
          </LowerText>
        </TextContainer>
        <CopyContainer>
          <CopyDetails>{rewardDetails?.rewardCode}</CopyDetails>
          <button onClick={() => copyToClipBoard(rewardDetails?.rewardCode)}>
            <Copy />
          </button>
        </CopyContainer>

        {rewardDetails && (
          <Button
            title="Claim Reward"
            onClick={handleClaimReward}
            style={{ width: '171px', height: '44px' }}
            disabled={successful}
          />
        )}
      </LowerContainer>
    </Wrapper>
  )
}

export default RewardModal

const Wrapper = styled.div`
  max-width: 448px;
  background: #ffffff;
  border-radius: 16px;
  padding: 40px;
`
const LogoCancelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`

const ImageWrapper = styled.div`
  align-items: center;
  display: flex;
  position: relative;
  height: 50px;
`
const ModalClose = styled.div`
  width: 24px;
  height: 24px;
`
const LogoName = styled.p`
  font-family: 'BR Firma';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.02em;
  text-transform: capitalize;
  color: #151717;
`
const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`
const MiddleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 24px;
  gap: 8px;
  background: #00d44819;
  border-radius: 8px;
  margin-bottom: 40px;
`
const Content = styled.h4`
  font-family: 'BR Firma';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #00d448;
`
const LowerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
  width: inherit;
`
const UpperText = styled.h3`
  font-family: 'BR Firma';
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
  letter-spacing: -0.5px;
  color: #151717;
`
const LowerText = styled.p`
  font-family: 'BR Firma';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.5px;
  color: #4e5152;
`
const CopyContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px 24px;
  gap: 8px;
  border: 1px dashed #727474;
  border-radius: 8px;
`
const CopyDetails = styled.h4`
  font-family: 'BR Firma';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.02em;
  text-transform: capitalize;
  color: #151717;
`
