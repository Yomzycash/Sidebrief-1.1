import ManageCard from "components/cards/ManageCard";
import React from "react";
import { useEffect } from "react";
import { setServiceCheckoutProgress } from "redux/Slices";
import { store } from "redux/Store";
import { Wrapper } from "./style";

const ServiceDocumentsReview = () => {
  // Set the progress of the application
  useEffect(() => {
    store.dispatch(setServiceCheckoutProgress({ total: 5, current: 5 })); // total- total pages and current - current page
  }, []);

  return (
    <Wrapper>
      <ManageCard />
    </Wrapper>
  );
};

export default ServiceDocumentsReview;
