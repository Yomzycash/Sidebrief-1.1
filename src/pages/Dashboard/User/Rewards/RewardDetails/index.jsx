import { RewardCard } from 'components/cards'

import DashboardSection from 'layout/DashboardSection'
import { HiArrowNarrowLeft, HiArrowNarrowRight } from 'react-icons/hi'
import React, { useEffect, useState } from 'react'
import {
  StaffContainer,
  NavigationWrapper,
  RewardShortDetails,
  ImageWrapper,
  ButtonWrapper,
  Image,
  Badge,
  RewardShortText,
  RewardDescription,
  BadgeText,
  VisitLink,
  TextDes,
  TextLink,
  TextWrapper,
  rewardModalStyle,
  Back,
  RewardsScroll,
  MobileButtonWrapper,
} from './styled'

import Button from 'components/button'
import { ScrollBox } from 'containers'
import { IoArrowForward } from 'react-icons/io5'
import { useSelector } from 'react-redux'
import { store } from 'redux/Store'
import { setRewardsPageHeader } from 'redux/Slices'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Dialog from '@mui/material/Dialog'
import RewardModal from 'components/modal/RewardModal'
import { useGetAllRewardsQuery } from 'services/RewardService'
import { DialogContent } from '@mui/material'
import AppFeedback from 'components/AppFeedback'

const RewardDetails = (props) => {
  const [open, setOpen] = useState(false)
  const [selectedReward, setSelectedReward] = useState({})

  const { data, isLoading, isError, isSuccess } = useGetAllRewardsQuery({
    refetchOnMountOrArgChange: true,
  })
  console.log(data)

  const layoutInfo = useSelector((store) => store.LayoutInfo)
  const { sidebarWidth } = layoutInfo

  const navigate = useNavigate()

  useEffect(() => {
    store.dispatch(setRewardsPageHeader(false))
  }, [])

  const { rewardID } = useParams()

  useEffect(() => {
    const responseData = data === undefined ? [] : [...data]

    const rewardDetails = responseData.find(
      (reward) => reward.rewardID === rewardID,
    )
    setSelectedReward(rewardDetails)
    console.log(rewardDetails)
  }, [data])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleRewardClick = (reward) => {
    setSelectedReward(reward)
    console.log(reward)
  }

  return (
    <StaffContainer sidebarWidth={sidebarWidth}>
      <NavigationWrapper>
        <Back to="/dashboard/rewards/all-rewards">
          <HiArrowNarrowLeft />
          <p>Back to Rewards</p>
        </Back>
        <span>Rewards</span>
      </NavigationWrapper>
      <RewardShortDetails>
        <ImageWrapper>
          <Image src={selectedReward?.rewardImage} alt="" />
          <TextWrapper>
            <Badge>
              <BadgeText>{selectedReward?.rewardCategory}</BadgeText>
            </Badge>
            <h4>{selectedReward?.rewardPartner}</h4>
            <RewardShortText>{selectedReward?.rewardName}</RewardShortText>
          </TextWrapper>
        </ImageWrapper>
        <ButtonWrapper>
          <Button title="Claim Reward" onClick={handleClickOpen} />
        </ButtonWrapper>
        <Dialog onClose={handleClose} open={open}>
          <DialogContent style={rewardModalStyle}>
            <RewardModal handleClose={handleClose} />
          </DialogContent>
        </Dialog>
      </RewardShortDetails>
      <RewardDescription>
        <TextDes>
          {' '}
          <div>{selectedReward?.rewardDescription}</div>
        </TextDes>
        {/* <VisitLink to="">
          <TextLink>Visit Guide's website</TextLink>
          <HiArrowNarrowRight />
        </VisitLink> */}
      </RewardDescription>
      <MobileButtonWrapper>
        <Button title="Claim Reward" onClick={handleClickOpen} />
      </MobileButtonWrapper>
      <RewardsScroll>
        <DashboardSection
          title="Rewards"
          body="Accept offers and rewards when you register your business with Sidebrief"
          carousel
          link={{
            text: 'View all',
            to: '/dashboard',
            icon: <IoArrowForward />,
          }}
        >
          <ScrollBox>
            {data?.slice(0, 8).map((reward, index) => (
              <RewardCard
                key={index}
                title={reward?.rewardPartner}
                body={reward?.rewardName}
                image={reward?.rewardImage}
                action={() => handleRewardClick(reward)}
              />
            ))}
          </ScrollBox>
        </DashboardSection>
      </RewardsScroll>
      <AppFeedback subProject="Rewards details" />
    </StaffContainer>
  )
}

export default RewardDetails
