import { RewardCard, RewardSummaryCard } from 'components/cards'
import ActiveNav from 'components/navbar/ActiveNav'
import Search from 'components/navbar/Search'
import React, { useEffect, useRef, useState } from 'react'
import { GladeLogo, lendhaLogo, OkraLogo, SterlingLogo } from 'asset/images'
import {
  Body,
  BodyLeft,
  BodyRight,
  Container,
  Footer,
  Header,
  MainHeader,
  SubHeader,
} from './styled'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { store } from 'redux/Store'
import { setRewardsPageHeader } from 'redux/Slices'
import { myRewards } from 'utils/config'
import { useGetUserRewardQuery } from 'services/RewardService'

const rewardsCategories = ['All', 'Human Resources', 'Productivity']

const MyRewards = () => {
  const navigate = useNavigate()

  // This displays rewards header for this page
  useEffect(() => {
    store.dispatch(setRewardsPageHeader(true))
  }, [])

  const handleRewardClick = (title) => {
    navigate(`/dashboard/rewards/${title}`)
  }
  const { data, isLoading, isError, isSuccess } = useGetUserRewardQuery()
  const [myRewards, setMyRewards] = useState([])
  // const [selectedCategory, setSelectedCategory] = useState("All")
  const [category, setCategory] = useSearchParams()
  const [filteredReward, setFilteredReward] = useState([])

  const handleCategory = (category) => {
    setCategory({ category }) // converting category to object and category is the key
  }
  const toPromise = (data) => {
    return new Promise((resolve, reject) => resolve(data))
  }
  const handleSelectedCategory = async () => {}

  useEffect(() => {
    console.log(data)
    setMyRewards(data)
  }, [data])

  useEffect(() => {
    let selectedCategory = category.get('category')
    if (selectedCategory === 'Productivity') {
      let filtered = myRewards?.filter(
        (reward) => reward.rewardCategory === 'Productivity',
      )
      console.log(myRewards)
      setFilteredReward(filtered)
      console.log(filteredReward)
    } else if (selectedCategory === 'Human Resources') {
      let filtered = myRewards?.filter(
        (reward) => reward?.rewardCategory === 'Human Resources',
      )
      setFilteredReward(filtered)
      //console.log(filtered)
    } else {
      setFilteredReward(myRewards)
    }

    // console.log(category.get('category'))
  }, [category, myRewards])

  return (
    <Container>
      <Body>
        <BodyLeft>
          <h3>Categories</h3>
          {/* <h4>Al</h4> */}
          <ul>
            {rewardsCategories?.map((category, index) => (
              <li key={index} onClick={() => handleCategory(category)}>
                {category}
              </li>
            ))}
          </ul>
        </BodyLeft>
        <BodyRight>
          {filteredReward?.map((reward, index) => (
            <RewardCard
              key={index}
              title={reward?.rewardName}
              body={reward?.rewardDescription}
              image={reward?.rewardImage}
              // imageAlt={reward.alt}
              // action={() => handleRewardClick(reward.title)}
              rewardspage
            />
          ))}
        </BodyRight>
      </Body>
      <Footer></Footer>
    </Container>
  )
}

export default MyRewards
