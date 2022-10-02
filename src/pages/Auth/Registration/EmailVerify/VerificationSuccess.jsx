import React from 'react'
import { Success } from 'layout'

const VerificationSuccess = () => {
  return (
    <Success
      title={'Account Verification Success'}
      paragraph={
        'Your email address  has been successfully verified. We are redirecting you to your dashboard.'
      }
    />
  )
}

export default VerificationSuccess
