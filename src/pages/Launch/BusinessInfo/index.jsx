import React, { useEffect, useState, useCallback } from 'react'
import HeaderCheckout from 'components/Header/HeaderCheckout'
// import DropDownWithSearch from "components/input/DropDownWithSearch";
import TagInput from 'components/input/TagInput'
import { CheckoutController, CheckoutSection } from 'containers'
import { Body, Bottom, Container } from '../styled'
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
import {
  useGetAllCountriesQuery,
  useViewBusinessNamesMutation,
  useViewBusinessObjectivesMutation,
} from 'services/launchService'
import LaunchFormContainer from 'containers/Checkout/CheckoutFormContainer/LaunchFormContainer'
import LaunchPrimaryContainer from 'containers/Checkout/CheckoutFormContainer/LaunchPrimaryContainer'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import AppFeedback from 'components/AppFeedback'
import { set } from 'date-fns'

const BusinessInfo = () => {
  const LaunchInfo = useSelector((store) => store.LaunchReducer)
  const { launchResponse } = LaunchInfo

  const [businessNames, setBusinessNames] = useState([])
  const [selectedCountry, setselectedCountry] = useState('')
  const [selectedObjectives, setselectedObjectives] = useState([])
  const [countries, setCountries] = useState([])
  const [countriesData, setCountriesData] = useState([])
  const [selectedCountryISO, setselectedCountryISO] = useState('')

  const { data, error, isLoading, isSuccess } = useGetAllCountriesQuery()
  const [viewBusinessNames, viewNamesState] = useViewBusinessNamesMutation()
  const [
    viewBusinessObjectives,
    viewObjectivesState,
  ] = useViewBusinessObjectivesMutation()

  const navigate = useNavigate()

  // This runs when next button is clicked
  const handleNext = () => {
    store.dispatch(setCountry(selectedCountry))
    store.dispatch(setCountryISO(selectedCountryISO))
    localStorage.setItem('countryISO', selectedCountryISO)
    store.dispatch(setCountryISO(selectedCountryISO))
    let resultToReturn = false
    // call some function with callback function as argument
    resultToReturn = businessNames.some((element, index) => {
      return businessNames.indexOf(element) !== index
    })
    if (businessNames.length === 4 && !resultToReturn) {
      store.dispatch(setSelectedBusinessNames(businessNames))
    } else if (businessNames.length !== 4) {
      toast.error('Please add exactly 4 business names')
      return
    } else if (resultToReturn) {
      toast.error('Please input unique business names')
      return
    }
    console.log(businessNames)

    if (selectedObjectives.length >= 1) {
      store.dispatch(setBusinessObjectives(selectedObjectives))
    } else {
      toast.error('Please add at least one objective')
      return
    }
    if (!selectedCountry) {
      toast.error('Please select an operational country')
      return
    }

    let navigatedFrom = localStorage.getItem('navigatedFrom')

    if (navigatedFrom) {
      navigate(navigatedFrom)
      localStorage.removeItem('navigatedFrom')
    } else {
      navigate('/launch/entity')
    }
  }

  const handlePrev = () => {
    navigate(-1)
  }

  const handleBusinessNames = (valuesSelected) => {
    setBusinessNames(valuesSelected)
  }

  // Handle supported countries fetch
  const handleCountry = useCallback(
    async (value) => {
      let responseData = data
      let countries = []
      responseData?.forEach((data) => {
        countries = [...countries, data?.countryName]
      })
      if (responseData) {
        setCountriesData([...responseData])
        setCountries([...countries])
        setselectedCountry(value)
      }
    },
    [data],
  )

  const handleObjectives = (valuesSelected) => {
    setselectedObjectives(valuesSelected)
  }

  // Update the supported countries when data changes
  useEffect(() => {
    handleCountry()
    if (launchResponse && data) {
      let countrySelected = data?.filter(
        (country) => country.countryISO === launchResponse.registrationCountry,
      )
      setselectedCountry(countrySelected[0]?.countryName)
    }
  }, [data, handleCountry, launchResponse])

  // Set the selected country's ISO
  useEffect(() => {
    viewDraft()
    const countryData = countriesData.filter(
      (data) => data.countryName === selectedCountry,
    )
    let selectedCountryObj = { ...countryData[0] }
    setselectedCountryISO(selectedCountryObj.countryISO)
  }, [selectedCountry])

  const handleSubmit = async (e) => {
    e.preventDefault()
  }

  // Set the progress of the application
  useEffect(() => {
    store.dispatch(setCheckoutProgress({ total: 13, current: 0 })) // total- total pages and current - current page
  }, [])

  // This calls the view endpoint and set the recieved data to the respective states
  const viewDraft = async () => {

    // const namesData = await viewBusinessNames(launchResponse)
    // const objectivesData = await viewBusinessObjectives(launchResponse)

    if (Object.keys(launchResponse).length === 0) return;
    const namesData = await viewBusinessNames(launchResponse);
    const objectivesData = await viewBusinessObjectives(launchResponse);
    if (namesData.data)
      setBusinessNames(Object.values(namesData.data.businessNames))
    if (objectivesData.data) {
      let objectives = Object.values(objectivesData.data.businessObjects)
      let filtered = objectives.filter((objective) => objective !== 'null')
      setselectedObjectives(filtered)
    }
  }

  useEffect(() => {
    viewDraft()
  }, [])

  return (
    <>
      <Container onClick={handleSubmit}>
        <HeaderCheckout getStarted />

        <Body>
          <CheckoutSection
            title="Business Information"
            HeaderParagraph="Let's sail you through, take this swift walk with us."
          />
          <LaunchPrimaryContainer>
            <LaunchFormContainer>
              <TagInput
                initialValues={businessNames}
                getSelectedValues={handleBusinessNames}
              />

              <TagInputWithSearch
                label="Business Objectives"
                list={BusinessObjectives.sort()}
                getValue={handleObjectives}
                initialValues={selectedObjectives}
                MultiSelect
                ExistsError="Objective has already been selected"
                MatchError="Please select objectives from the list"
                EmptyError="Please select at least one objective"
                MaxError="You cannot select more than 4"
              />
              <div style={{ maxWidth: '430px' }}>
                <TagInputWithSearch
                  label="Operational Country"
                  list={countries}
                  getValue={handleCountry}
                  initialValue={selectedCountry}
                  suggestionLoading={isLoading}
                />
              </div>
            </LaunchFormContainer>
            <Bottom>
              <CheckoutController
                forwardAction={handleNext}
                backAction={handlePrev}
                backText={'Previous'}
                forwardText={'Next'}
                // forwardDisable={
                // 	businessNames.length !== 4 ||
                // 	selectedObjectives.length < 1 ||
                // 	!selectedCountry
                // }
                hidePrev
              />
            </Bottom>
          </LaunchPrimaryContainer>
        </Body>
      </Container>
      <AppFeedback subProject="Business information" />
    </>
  )
}

export default BusinessInfo
