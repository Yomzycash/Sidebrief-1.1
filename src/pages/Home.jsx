import React from "react";
import RewardModal from "components/modal/RewardModal";
import StaffModalCards from 'components/modal/StaffModalCards';
import PdfCards from 'components/cards/PdfCard/PdfCards';

import { CheckoutFormInfo } from "containers";
const Home = () => {
  return (
    <>    <RewardModal/>
    <StaffModalCards/> 
    <PdfCards/>
    <CheckoutFormInfo title="Shareholder's Information" />
    </>

  )
}


export default Home;
