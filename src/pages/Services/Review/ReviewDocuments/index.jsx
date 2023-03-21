import ServiceReviewCard from 'components/cards/ServiceReviewCard'
import { CheckoutController } from 'containers'
import React from 'react'
import { Bottom } from './style'

const ReviewDocuments = () => {
  return (
      <div>
          <ServiceReviewCard />
          <Bottom>
        <CheckoutController
          backText={"Previous"}
          forwardSubmit
          backAction={{}}
          forwardAction={{}}
          forwardText="Next"
        />
      </Bottom>
    </div>
  )
}

export default ReviewDocuments