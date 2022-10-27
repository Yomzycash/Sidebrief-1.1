import { BusinessTable } from 'components/Tables'
import React, { useEffect } from 'react'
import { useState } from 'react'
import {
  useGetAllCountriesQuery,
  useGetUserDraftQuery,
} from 'services/launchService'
import { Body, Container, Loading } from './styled'
import { format, compareDesc } from 'date-fns'
import { Puff } from 'react-loading-icons'
import Media from 'react-media'
const DraftApplications = () => {
  const { data, error, isLoading, isSuccess } = useGetUserDraftQuery()

  const countries = useGetAllCountriesQuery()

  const [dataArr, setDataArr] = useState([])
  useEffect(() => {
    if (isSuccess && countries.isSuccess) {
      const response = [...data]
      response.sort((launch1, launch2) => {
        return compareDesc(
          new Date(launch1.updatedAt),
          new Date(launch2.updatedAt),
        )
      })
      setDataArr(response)
    }
  }, [data, isSuccess, countries.isSuccess])

  return (
    <Container>
      <Body>
        {isLoading || countries.isLoading ? (
          <Loading>
            <Puff stroke="#00A2D4" />
          </Loading>
        ) : dataArr.length > 0 ? (
          <>
            <Media query="(max-width:600px)">
              {(matches) => {
                return matches ? (
                  <BusinessTable
                    data={dataArr.map((element) => {
                      return {
                        name: element.businessNames
                          ? element.businessNames.businessName1
                          : 'No name ',
                        type: element?.registrationType,
                        country: countries?.data?.find(
                          (country) =>
                            country.countryISO === element.registrationCountry,
                        ).countryName,
                        date: format(new Date(element.updatedAt), 'dd/MM/yyyy'),
                        code: element.launchCode,
                        countryISO: element.registrationCountry,
                      }
                    })}
                  />
                ) : (
                  <h2>femi</h2>
                )
              }}
            </Media>
          </>
        ) : (
          ''
        )}
        {error?.status === 'FETCH_ERROR' ||
        countries?.isLoading === 'FETCH_ERROR' ? (
          <p>Please check your internet connection</p>
        ) : (
          ''
        )}
        {/* {console.log(countries.isError)} */}
      </Body>
    </Container>
  )
}

export default DraftApplications
