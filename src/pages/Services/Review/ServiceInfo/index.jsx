import { PdfCard } from "components/cards";
import InfoCard from "components/cards/InfoCard";
import ManageCard from "components/cards/ManageCard";
import React from "react";
import { useEffect } from "react";
import { setServiceCheckoutProgress } from "redux/Slices";
import { store } from "redux/Store";
import { Wrapper } from "./style";

const ServiceInfoReview = () => {
  // Set the progress of the application
  useEffect(() => {
    store.dispatch(setServiceCheckoutProgress({ total: 5, current: 5 })); // total- total pages and current - current page
  }, []);
  return (
    <Wrapper>
      <InfoCard />
    </Wrapper>
  );
};

export default ServiceInfoReview;
