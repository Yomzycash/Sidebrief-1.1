import Navbar from 'components/navbar'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

import StaffSidebar from 'components/sidebar/StaffSidebar'
import StaffHeader from 'components/Header/StaffHeader'
import { CountryCardDetails, EntityCardDetails } from 'utils/config'
import StaffEntityCard from 'components/cards/StaffEntityCard'
import { useGetAllTheEntitiesQuery } from 'services/launchService'
import { Puff } from 'react-loading-icons'
import StaffEntityModal from 'components/modal/StaffEntityModal'
import {
  useAddEntityMutation,
  useUpdateEntityMutation,
} from 'services/staffService'
import { handleError } from 'utils/globalFunctions'
import { toast } from 'react-hot-toast'

const StaffEntities = () => {
  const [entities, setEntities] = useState([])
  const [open, setOpen] = useState(false)
  const [clickedEntity, setClickedEntity] = useState({})
  const [cardAction, setCardAction] = useState('')

  const layoutInfo = useSelector((store) => store.LayoutInfo)
  const { sidebarWidth } = layoutInfo

  const { data, isLoading, isSuccess, isError } = useGetAllTheEntitiesQuery()
  const [updateEntity, updateState] = useUpdateEntityMutation()
  const [addEntity, addState] = useAddEntityMutation()

  useEffect(() => {
    if (data) {
      setEntities(data)
    }
  }, [data])

  const handleCardClick = (entity) => {
    setCardAction('edit')
    setOpen(true)
    setClickedEntity(entity)
  }

  // // This updates an existing entity
  // const handleEntity = async (formData) => {
  //   let requiredData = {
  //     entityName: formData?.entity_name,
  //     entityShortName: formData?.short_name,
  //     entityType: formData?.type,
  //     entityCode: formData?.code,
  //     entityCountry: formData?.country,
  //     entityFee: formData?.fee,
  //     entityCurrency: formData?.currency,
  //     entityDescription: formData?.description,
  //     entityTimeline: formData?.timeline,
  //     entityRequirements: formData?.requirement,
  //     entityShares: formData?.shares,
  //   };
  //   let response = await updateEntity(requiredData);
  //   if (response.error) {
  //     handleError(response.error);
  //   }
  //   console.log(response);
  // };

  const getRequired = (formData) => {
    return {
      entityName: formData?.entity_name,
      entityShortName: formData?.short_name,
      entityType: formData?.type,
      entityCode: formData?.code,
      entityCountry: formData?.country,
      entityFee: formData?.fee,
      entityCurrency: formData?.currency,
      entityDescription: formData?.description,
      entityTimeline: formData?.timeline,
      entityRequirements: formData?.requirements,
      entityShares: formData?.shares,
    }
  }

  const handleAddButton = () => {
    setOpen(true)
    setCardAction('add')
  }

  // This updates an existing entity
  const handleEntityAdd = async (formData) => {
    let requiredData = getRequired(formData)
    console.log(requiredData)
    let response = await addEntity(requiredData)
    let data = response?.data
    let error = response?.error
    if (data) {
      toast.success('Entity added successfully')
    } else {
      handleError(error)
    }
    console.log(response)
  }

  // This updates an existing entity
  const handleEntityUpdate = async (formData) => {
    let requiredData = getRequired(formData)
    console.log(requiredData)
    let response = await updateEntity(requiredData)
    let data = response?.data
    let error = response?.error
    if (data) {
      toast.success('Entity added successfully')
    } else {
      handleError(error)
    }
    console.log(response)
  }

  return (
    <Container>
      <StaffHeader
        title="Entities"
        shown={entities.length}
        total={entities.length}
        Description="Add Entity"
        placeholder="Search an entity"
        handleEntityAdd={handleEntityAdd}
        loading={addState.isLoading}
        handleButton={handleAddButton}
      />
      {isLoading && (
        <Loading height="300px">
          <Puff stroke="#00A2D4" fill="white" />
        </Loading>
      )}
      <CardContainer>
        <CardWrapper>
          {entities &&
            [...entities]
              .sort(
                (a, b) =>
                  a.entityCountry.charCodeAt(0) - b.entityCountry.charCodeAt(0),
              )
              .map((entity, index) => (
                <StaffEntityCard
                  key={index}
                  entityName={entity?.entityName}
                  entityCode={entity?.entityShortName}
                  shareholderType={entity?.entityDescription}
                  entityTimeline={entity?.entityTimeline}
                  entityType={entity?.entityType}
                  countryCode={entity?.entityCountry}
                  entityPackage={entity?.entityRequirements}
                  clickAction={() => handleCardClick(entity)}
                />
              ))}
          <StaffEntityModal
            disableAll={cardAction === 'edit' ? true : false}
            open={open}
            setOpen={setOpen}
            cardAction={cardAction}
            title={
              cardAction === 'edit' ? 'Entity Information' : 'Add New Entity'
            }
            entityInfo={clickedEntity}
            submitAction={handleEntityUpdate}
            loading={updateState.isLoading}
          />
        </CardWrapper>
      </CardContainer>
    </Container>
  )
}

export default StaffEntities

const Container = styled.div`
  display: flex;
  flex-flow: column;
  width: calc(100% - ${({ SidebarWidth }) => SidebarWidth});
  padding-bottom: 40px;
`
const CardContainer = styled.div`
  border: 1px solid #edf1f7;
  border-top: 0;
  margin: 0 40px;
  width: calc(100% - ${({ SidebarWidth }) => SidebarWidth});
  height: 100%;
  padding-inline: 24px;
  padding-block: 40px;
`
const CardWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto auto;
  gap: 24px;
  @media screen and (min-width: 1900px) {
    grid-template-columns: auto auto auto;
    gap: 24px;
  }
`
const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 40px;
  height: ${({ height }) => height && height};
`
