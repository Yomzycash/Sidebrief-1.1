import StaffEntityCard from "components/cards/StaffEntityCard";
import React from "react";
import styled from "styled-components";
import {
  useAddEntityMutation,
  useDeleteEntityMutation,
  useGetCountryEntitiesQuery,
  useGetSingleCountryQuery,
  useUpdateEntityMutation,
} from "services/staffService";
import { useOutletContext, useParams } from "react-router-dom";
import { Puff } from "react-loading-icons";
import StaffEntityModal from "components/modal/StaffEntityModal";
import { useState } from "react";
import { useEffect } from "react";
import { handleError } from "utils/globalFunctions";
import { toast } from "react-hot-toast";

const CountryEntities = () => {
  const [open, setOpen] = useOutletContext();
  const [clickedEntity, setClickedEntity] = useState({});
  const [cardAction, setCardAction] = useState("");

  const { ISO } = useParams();
  const { data, isLoading, refetch } = useGetCountryEntitiesQuery(ISO);
  const countryInfo = useGetSingleCountryQuery(ISO);
  const [updateEntity, updateState] = useUpdateEntityMutation();
  const [addEntity, addState] = useAddEntityMutation();
  const [deleteEntity, deleteState] = useDeleteEntityMutation();

  const handleCardClick = (entity) => {
    setCardAction("edit");
    setOpen(true);
    setClickedEntity(entity);
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  const getRequired = (formData) => {
    console.log("required", formData);
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
    };
  };

  // This updates an existing entity
  const handleEntityUpdate = async (formData) => {
    let requiredData = getRequired(formData);
    let response = await updateEntity(requiredData);
    let data = response?.data;
    let error = response?.error;
    if (data) {
      toast.success("Entity updated successfully");
      setOpen(false);
    } else {
      handleError(error);
    }
    refetch();
  };

  // This adds a new entity
  const handleEntityAdd = async (formData) => {
    let requiredData = getRequired(formData);
    let response = await addEntity(requiredData);
    let data = response?.data;
    let error = response?.error;
    if (data) {
      toast.success("Entity added successfully");
      setOpen(false);
    } else {
      handleError(error);
    }
    refetch();
  };

  // This runs when the delete icon is pressed
  const handleEntityDelete = async (entityInfo) => {
    console.log(entityInfo);
    console.log("deleted");
    let response = await deleteEntity(entityInfo);
    console.log(response);
    let data = response?.data;
    let error = response?.error;
    if (data) {
      toast.success("Entity deleted successfully");
      setOpen(false);
    } else {
      handleError(error);
    }
    refetch();
  };

  return (
    <Wrapper>
      <CardContainer>
        <CardWrapper>
          {isLoading ? (
            <Loader>
              <Puff stroke="#00A2D4" fill="white" />
            </Loader>
          ) : (
            data?.map((entity, index) => (
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
            ))
          )}
          <StaffEntityModal
            disableAll={cardAction === "edit" ? true : false}
            open={open}
            setOpen={setOpen}
            cardAction={cardAction}
            setCardAction={setCardAction}
            title={
              cardAction === "edit" ? "Entity Information" : "Add New Entity"
            }
            entityInfo={clickedEntity}
            countryInfo={countryInfo?.data}
            submitAction={
              cardAction === "edit" ? handleEntityUpdate : handleEntityAdd
            }
            loading={updateState.isLoading || addState.isLoading}
            deleteState={deleteState}
            handleEntityDelete={handleEntityDelete}
          />
        </CardWrapper>
      </CardContainer>
    </Wrapper>
  );
};

export default CountryEntities;
const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  width: 100%;
  border: 1px solid #edf1f7;
  border-top: 0;
  margin-top: 0;
`;
const CardContainer = styled.div`
  border-top: 0;
  margin: 0 40px;
  width: 100%;
  height: 100%;
  padding-inline: 24px;
  padding-block: 40px;
`;
const CardWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto auto;
  gap: 24px;

  @media screen and (min-width: 1900px) {
    grid-template-columns: auto auto auto;
    gap: 24px;
  }
`;

const Loader = styled.div`
  grid-column: 1/3;
  display: grid;
  place-items: center;
  width: 100%;
  height: 100px;
`;
