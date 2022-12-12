import Navbar from "components/navbar";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import StaffSidebar from "components/sidebar/StaffSidebar";
import StaffHeader from "components/Header/StaffHeader";
import { CountryCardDetails, EntityCardDetails } from "utils/config";
import StaffEntityCard from "components/cards/StaffEntityCard";
import { useGetAllTheEntitiesQuery } from "services/launchService";
import { Puff } from "react-loading-icons";
import StaffEntityModal from "components/modal/StaffEntityModal";

const StaffEntities = () => {
  const [entities, setEntities] = useState([]);
  const [open, setOpen] = useState(false);
  const [clickedEntity, setClickedEntity] = useState({});

  const layoutInfo = useSelector((store) => store.LayoutInfo);
  const { sidebarWidth } = layoutInfo;
  const { data, isLoading, isSuccess, isError } = useGetAllTheEntitiesQuery();

  useEffect(() => {
    if (data) {
      setEntities(data);
    }
  }, [data]);

  const handleCardClick = (entity) => {
    setOpen(true);
    setClickedEntity(entity);
  };

  return (
    <Dashboard>
      <Navbar
        dashboard
        imgStyles={{ maxWidth: "100px" }}
        style={{ padding: "12px 24px" }}
        hideSearch
      />
      <Body>
        <BodyLeft>
          <StaffSidebar />
        </BodyLeft>
        <BodyRight SidebarWidth={sidebarWidth}>
          <StaffHeader
            title="Entities"
            shown={entities.length}
            total={entities.length}
            Description="Add Entity"
            placeholder="Search an entity"
          />
          {isLoading && (
            <Loading height="300px">
              <Puff stroke="#00A2D4" fill="white" />
            </Loading>
          )}
          <CardContainer>
            <CardWrapper>
              {entities.map((entity, index) => (
                <StaffEntityCard
                  key={entity.id}
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
                disableAll={true}
                open={open}
                setOpen={setOpen}
                cardAction="edit"
                title="Entity Information"
                entityInfo={clickedEntity}
              />
            </CardWrapper>
          </CardContainer>
        </BodyRight>
      </Body>
    </Dashboard>
  );
};

export default StaffEntities;
const Dashboard = styled.div`
  display: flex;
  flex-flow: column;
  width: 100%;
  flex: 1;
`;
const Body = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;
const BodyLeft = styled.div``;

const BodyRight = styled.div`
  display: flex;
  flex-flow: column;
  width: calc(100% - ${({ SidebarWidth }) => SidebarWidth});
  padding-bottom: 40px;
`;
const CardContainer = styled.div`
  border: 1px solid #edf1f7;
  border-top: 0;
  margin: 0 40px;
  width: calc(100% - ${({ SidebarWidth }) => SidebarWidth});
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
const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 40px;
  height: ${({ height }) => height && height};
`;
