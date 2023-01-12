import HeaderDetail from "components/Header/HeaderDetail";
import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import {
  useDeleteEntityMutation,
  useGetSingleCountryQuery,
} from "services/staffService";
import styled from "styled-components";
import { handleError } from "utils/globalFunctions";

const CountryDetailLayout = (pages) => {
  const [open, setOpen] = useState(false);

  const [deleteEntity, deleteState] = useDeleteEntityMutation();

  const location = useLocation();

  let pathArray = location.pathname.split("/");
  let ISO = pathArray[pathArray.length - 2];

  const { data, isError, isSuccess } = useGetSingleCountryQuery(ISO);

  const handleEntityDel = async () => {
    if (isSuccess) {
      let delResponse = await deleteEntity(data);
      let resData = delResponse?.data;
      let error = delResponse?.error;
      if (data) {
      } else {
        handleError(error);
      }
      console.log(delResponse);
    }
  };

  return (
    <Container>
      <HeaderDetail
        setOpen={setOpen}
        handleDelete={handleEntityDel}
        delLoading={deleteState.isLoading}
      />
      <DetailBody>
        <Outlet context={[open, setOpen]} />
      </DetailBody>
    </Container>
  );
};

export default CountryDetailLayout;

const Container = styled.div`
  padding-inline: clamp(0px, 2vw, 40px);
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;
  height: max-content;
  width: 100%;

  @media screen and (max-width: 700px) {
    padding-inline: 0;
    gap: 24px;
  }
`;

const DetailBody = styled.div`
  width: 100%;

  @media screen and (max-width: 700px) {
    padding-inline: 24px;
  }
`;
