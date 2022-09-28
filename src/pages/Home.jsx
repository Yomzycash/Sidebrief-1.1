import React from 'react'
import RewardModal from 'components/modal/RewardModal'
import StaffModalCards from 'components/modal/StaffModalCards'
import PdfCards from 'components/cards/PdfCard/PdfCards'
import { BusinessTable } from 'components/Tables'
import {
  CheckoutFormInfo,
  PaymentForm,
  PaymentHeader,
  PaymentSelector,
} from 'containers'
import SummaryCard from 'components/cards/LaunchSummaryCard'
import LaunchSummaryCard from 'components/cards/LaunchSummaryCard'
import SuccessPage from './Launch/PaymentSuccessPage/Index'
import FailedPage from './Launch/FailedPage'
import ApplicationSuccessPage from './Launch/ApplicationSuccessPage'

const Home = () => {
  return (
    <>
      <ApplicationSuccessPage />
      {/* <PaymentHeader />
			<PaymentSelector />
			<PaymentForm amount={22000} currency={"NGN"} USDprice={50.45} /> */}
      {/* <div style={{ width: '100%', padding: '20px' }}>
        <LaunchSummaryCard
          number={1}
          name="Femi Bamidele"
          shares="Preference Shares"
          email="oluwole5@gmail.com"
          phone={99999999}
          sharesPercentage={50}
        />
      </div> */}
    </>
  )
}
export default Home
