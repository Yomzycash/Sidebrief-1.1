import React from 'react'
import RewardModal from "components/modal/RewardModal";
 import StaffModalCards from 'components/modal/StaffModalCards';
import PdfCards from 'components/cards/PdfCard/PdfCards';
const Home = () => {
  return (
    <>    <RewardModal/>
    <StaffModalCards/> 
    <PdfCards/>
    </>

  )
}

export default Home