import React, { useEffect, useState } from 'react'
import HeaderCheckout from 'components/Header/HeaderCheckout'
// import DropDownWithSearch from "components/input/DropDownWithSearch";
import TagInput from 'components/input/TagInput'
import { Body } from './styles.js'

import {
  CheckoutController,
  CheckoutSection,
  PaymentForm,
  PaymentHeader,
  PaymentSelector,
} from 'containers'
import {
  NigeriaFlag,
  KenyaFlag,
  SouthAfricaFlag,
  MalawiFlag,
  ZimbabweFlag,
} from 'asset/flags'
import {
  Bottom,
  Container,
  Header,
  InputsWrapper,
  CountryItem,
} from '../styled'
import { useNavigate } from 'react-router-dom'
import { store } from 'redux/Store'
import {
  setCheckoutProgress,
  setCountryISO,
  setCountry,
  setSelectedBusinessNames,
  setBusinessObjectives,
} from 'redux/Slices'
import TagInputWithSearch from 'components/input/TagInputWithSearch'
import { BusinessObjectives } from 'utils/config'
import { useGetAllCountriesQuery } from 'services/launchService'
import LaunchFormContainer from 'containers/Checkout/CheckoutFormContainer/LaunchFormContainer'
import LaunchPrimaryContainer from 'containers/Checkout/CheckoutFormContainer/LaunchPrimaryContainer'

const PaymentPage = () => {
  const navigate = useNavigate()

  const handleNext = () => {
    navigate('/launch/entity')
  }

  const handlePrev = () => {
    navigate(-1)
  }

  // This fires off whenever next button is clicked
  // useEffect(() => {
  //
  // }, [nextClicked]);

  return (
    <Container>
      <Header>
        <HeaderCheckout />
      </Header>

      <Body>
        <CheckoutSection
          title="Payment Method"
          HeaderParagraph="Please select a payment method to continue with."
        />
        <PaymentSelector />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '40px',
          }}
        >
          <PaymentForm currency="NGN" amount={22000} USDprice={845} />
        </div>
      </Body>
    </Container>
  )
}

export default PaymentPage
