import HeaderDetail from "components/Header/HeaderDetail";
import ConfirmDelete from "components/modal/ConfirmDelete";
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
  const [cardAction, setCardAction] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const [deleteCountry, deleteState] = useDeleteCountryMutation();

  const location = useLocation();
  const navigate = useNavigate();

  // Get country ISO from the current location path
  let pathArray = location.pathname.split("/");
  console.log(pathArray)
  const ISO = pathArray[pathArray.length - 2];

  const { data, isSuccess } = useGetSingleCountryQuery(ISO);

  // This deletes an entity
  const handleEntityDel = async () => {
    if (isSuccess) {
      let delResponse = await deleteCountry(data);
      let resData = delResponse?.data;
      let error = delResponse?.error;
      if (resData) {
        setDeleteConfirm(false);
        toast.success("Country deleted successfully");
        navigate("/staff-dashboard/businesses/countries");
      } else {
        handleError(error);
      }
    }
  };

  return (
    <Container>
      <HeaderDetail
        setCardAction={setCardAction}
        delLoading={deleteState.isLoading}
        setDeleteConfirm={setDeleteConfirm}
      />
      <ConfirmDelete
        toDelete="Country"
        open={deleteConfirm}
        setOpen={setDeleteConfirm}
        handleDelete={handleEntityDel}
        loading={deleteState.isLoading}
      />
      <DetailBody>
        <Outlet context={[cardAction, setCardAction]} />
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
