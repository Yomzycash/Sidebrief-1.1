import Navbar from "components/navbar";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import StaffSidebar from "components/sidebar/StaffSidebar";
import StaffHeader from "components/Header/StaffHeader";
import { CountryCardDetails, EntityCardDetails } from "utils/config";
import StaffEntityCard from "components/cards/StaffEntityCard";

const StaffEntities = () => {
  const layoutInfo = useSelector((store) => store.LayoutInfo);
  const { sidebarWidth } = layoutInfo;

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
            shown="12"
            total="12"
            Description="Add Entity"
            placeholder="Search an entity"
          />
          <CardContainer>
            <CardWrapper>
              {EntityCardDetails.map((entity, index) => (
                <StaffEntityCard
                  key={entity.id}
                  entityName={entity.entityName}
                  shareholderType={entity.entityName}
                  entityTimeline={entity.entityTimeline}
                  entityType={entity.entityType}
                  countryCode={entity.countryCode}
                  entityPackage={entity.entityPackage}
                />
              ))}
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
