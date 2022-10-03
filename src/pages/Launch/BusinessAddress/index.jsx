import React, { useState } from 'react'
import HeaderCheckout from 'components/Header/HeaderCheckout'
import { CheckoutController, CheckoutSection } from 'containers'
import { DropDownWithSearch, InputWithLabel } from 'components/input'
import { Page, Inputs, Bottom, Body, Container } from '../styled'
import { Country, State, City } from 'country-state-city'
import { useNavigate } from 'react-router-dom'
import { store } from 'redux/Store'
import { setBusinessAddress, setCheckoutProgress } from 'redux/Slices'
import { defaultLocation, addressSchema } from '../constants'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAddBusinessAddressMutation } from 'services/launchService'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import LaunchPrimaryContainer from 'containers/Checkout/CheckoutFormContainer/LaunchPrimaryContainer'
import LaunchFormContainer from 'containers/Checkout/CheckoutFormContainer/LaunchFormContainer'

const BusinessAddress = () => {
  const [country, setCountry] = useState(defaultLocation)
  const [state, setState] = useState(defaultLocation)
  const [city, setCity] = useState(defaultLocation)
  const [addressNo, setAddressNo] = useState('200')
  const [addBusinessAddress] = useAddBusinessAddressMutation()
  const generatedLaunchCode = useSelector(
    (store) => store.LaunchReducer.generatedLaunchCode,
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(addressSchema),
  })

  const selectCountry = (data) => {
    setCountry(data)
    setValue('country', data.name, { shouldValidate: true })
    setState(defaultLocation)
    setCity(defaultLocation)
  }

  const selectState = (data) => {
    setState(data)
    setValue('state', data.name, { shouldValidate: true })
    setCity(defaultLocation)
  }

  const selectCity = (data) => {
    setCity(data)
    setValue('city', data.name, { shouldValidate: true })
  }

  const SubmitForm = async (data) => {
    const requiredAddressData = {
      launchCode: generatedLaunchCode,

      businessAddress: {
        addressCountry: data.country,
        addressState: data.state,
        addressCity: data.city,
        addressStreet: data.street,
        addressZipCode: data.zipcode,
        addressNumber: addressNo,
        addressEmail: data.email,
      },
    }

    const response = await addBusinessAddress(requiredAddressData)
    console.log(response)

    if (response.data) {
      store.dispatch(setBusinessAddress(requiredAddressData))
      handleNext()
    } else if (response.error) {
      console.log(response.error?.data.message)
      toast.error(response.error?.data.message)
    }
  }

  const countries = Country.getAllCountries()
  const states = State.getStatesOfCountry(country.isoCode)
  const cities = City.getCitiesOfState(country.isoCode, state.isoCode)

  const navigate = useNavigate()

  const handleNext = () => {
    navigate("/launch/shareholders-info");
    store.dispatch(setCheckoutProgress({ total: 13, current: 5 })); // total- total pages and current - current page
  };

  const handlePrev = () => {
    navigate(-1);
    store.dispatch(setCheckoutProgress({ total: 13, current: 4 })); // total- total pages and current - current page
  };

  return (
    <Container>
      <HeaderCheckout />
      <Body onSubmit={handleSubmit(SubmitForm)}>
        <CheckoutSection
          title={'Business Address'}
          subtitle={'Please provide the address for this business'}
        />
        <LaunchPrimaryContainer>
          <LaunchFormContainer>
            <Inputs>
              <DropDownWithSearch
                name={'country'}
                title={'Country'}
                list={countries}
                renderer={({ item }) => <span>{item.name}</span>}
                selectAction={selectCountry}
                filterBy={'name'}
                value={country}
                errorMessage={errors.country?.message}
              />
              <DropDownWithSearch
                name={'state'}
                title={'State'}
                list={states}
                renderer={({ item }) => <span>{item.name}</span>}
                selectAction={selectState}
                filterBy={'name'}
                value={state}
                errorMessage={errors.state?.message}
              />
              <DropDownWithSearch
                name={'city'}
                title={'City'}
                list={cities}
                renderer={({ item }) => <span>{item.name}</span>}
                selectAction={selectCity}
                filterBy={'name'}
                value={city}
                errorMessage={errors.city?.message}
              />
              <InputWithLabel
                containerStyle={'checkoutInput'}
                labelStyle={'checkoutInputLabel'}
                placeholder="--"
                label="Street"
                type="text"
                name="street"
                register={register}
                errorMessage={errors.street?.message}
              />
              <InputWithLabel
                containerStyle={'checkoutInput'}
                labelStyle={'checkoutInputLabel'}
                placeholder="--"
                label="House Number"
                type="number"
                name="number"
                register={register}
                errorMessage={errors.number?.message}
              />
              <InputWithLabel
                containerStyle={'checkoutInput'}
                labelStyle={'checkoutInputLabel'}
                placeholder="--"
                label="Zip Code"
                type="text"
                name="zipcode"
                register={register}
                errorMessage={errors.zipcode?.message}
              />
              <InputWithLabel
                containerStyle={'checkoutInput'}
                labelStyle={'checkoutInputLabel'}
                placeholder="example@example.com"
                label="Email Address"
                bottomText="Please provide sidebrief with a functional Email to help us contact you fast"
                type="email"
                name="email"
                register={register}
                errorMessage={errors.email?.message}
              />
            </Inputs>
          </LaunchFormContainer>
          <Bottom>
            <CheckoutController
              backText={'Previous'}
              forwardText={'Next'}
              forwardAction={handleNext}
              backAction={handlePrev}
              forwardSubmit={true}
            />
          </Bottom>
        </LaunchPrimaryContainer>
      </Body>
    </Container>
  )
}

export default BusinessAddress
