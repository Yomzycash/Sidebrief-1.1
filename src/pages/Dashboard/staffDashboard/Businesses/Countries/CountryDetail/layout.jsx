import HeaderDetail from "components/Header/HeaderDetail";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  useDeleteCountryMutation,
  useGetSingleCountryQuery,
} from "services/staffService";
import styled from "styled-components";
import { handleError } from "utils/globalFunctions";

const CountryDetailLayout = (pages) => {
  const [open, setOpen] = useState(false);

  const [deleteCountry, deleteState] = useDeleteCountryMutation();

  const location = useLocation();
  const navigate = useNavigate();

  // Get country ISO from the current location path
  let pathArray = location.pathname.split("/");
  const ISO = pathArray[pathArray.length - 2];

  const { data, isSuccess } = useGetSingleCountryQuery(ISO);

  // This deletes an entity
  const handleEntityDel = async () => {
    if (isSuccess) {
      console.log(data);
      let delResponse = await deleteCountry(data);
      let resData = delResponse?.data;
      let error = delResponse?.error;
      if (resData) {
        toast.success("Country deleted successfully");
        navigate("/staff-dashboard/businesses/countries");
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
