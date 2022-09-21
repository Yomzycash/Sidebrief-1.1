import React, { useEffect, useState } from 'react'
import HeaderCheckout from 'components/Header/HeaderCheckout'
// import DropDownWithSearch from "components/input/DropDownWithSearch";
import TagInput from 'components/input/TagInput'
import { CheckoutController, CheckoutSection } from 'containers'
import {
  NigeriaFlag,
  KenyaFlag,
  SouthAfricaFlag,
  MalawiFlag,
  ZimbabweFlag,
} from 'asset/flags'
import {
  Body,
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

const BusinessInfo = () => {
  const [businessNames, setBusinessNames] = useState([])
  const [selectedCountry, setselectedCountry] = useState('')
  const [selectedObjectives, setselectedObjectives] = useState([])
  const [countries, setCountries] = useState([])
  const [countriesData, setCountriesData] = useState([])
  const [selectedCountryISO, setselectedCountryISO] = useState('')

  const { data, error, isLoading, isSuccess } = useGetAllCountriesQuery()

  const navigate = useNavigate()

  const handleNext = () => {
    store.dispatch(setCountryISO(selectedCountryISO))
    store.dispatch(setCountry(selectedCountry))
    store.dispatch(setSelectedBusinessNames(businessNames))
    store.dispatch(setBusinessObjectives(selectedObjectives))
    store.dispatch(setCheckoutProgress({ total: 10, current: 1 })) // total- total pages and current - current page
    navigate('/launch/entity')
  }

  const handlePrev = () => {
    navigate(-1)
  }

  const handleBusinessNames = (valuesSelected) => {
    setBusinessNames(valuesSelected)
  }

  // This fires off whenever next button is clicked
  // useEffect(() => {
  //
  // }, [nextClicked]);

  // Handle supported countries fetch
  const handleCountry = async (value) => {
    let responseData = await data
    let countries = []
    responseData?.forEach((data) => {
      countries = [...countries, data?.countryName]
    })
    setCountriesData([...responseData])
    setCountries([...countries])
    setselectedCountry(value)
  }

  const handleObjectives = (valuesSelected) => {
    setselectedObjectives(valuesSelected)
  }

  // Update the supported countries when data changes
  useEffect(() => {
    handleCountry()
  }, [data])

  // Set the selected country's ISO
  useEffect(() => {
    const countryData = countriesData.filter(
      (data) => data.countryName === selectedCountry,
    )
    let selectedCountryObj = { ...countryData[0] }
    setselectedCountryISO(selectedCountryObj.countryISO)
  }, [selectedCountry])

  const handleSubmit = async (e) => {
    e.preventDefault()
  }

  return (
    <Container onClick={handleSubmit}>
      <Header>
        <HeaderCheckout />
      </Header>
      <Body>
        <CheckoutSection title="Let's sail you through, take this swift walk with us." />
        <TagInput getSelectedValues={handleBusinessNames} />
        <InputsWrapper>
          <TagInputWithSearch
            label="Operational Country"
            list={countries}
            getValue={handleCountry}
          />
          <TagInputWithSearch
            label="Business Objectives"
            list={BusinessObjectives}
            getValue={handleObjectives}
            MultiSelect
            ExistsError="Tag has already been selected"
            MatchError="Please select objectives from the list"
            EmptyError="Please select at least one objective"
            MaxError="You cannot select more than 4"
          />
        </InputsWrapper>
      </Body>
      <Bottom>
        <CheckoutController
          forwardAction={handleNext}
          backAction={handlePrev}
          backText={'Previous'}
          forwardText={'Next'}
          hidePrev
        />
      </Bottom>
    </Container>
  )
}

export default BusinessInfo
