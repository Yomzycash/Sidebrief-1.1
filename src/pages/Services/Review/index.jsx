import ServicesCheckoutHeader from "components/Header/ServicesCheckoutHeader";
import { CheckoutSection } from "containers";
import React from "react";
import { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import ActiveNav from "components/navbar/ActiveNav";

import { setServiceCheckoutProgress } from "redux/Slices";
import { store } from "redux/Store";
import { Body, Container, SubHeader } from "./style";
import { ReviewTab } from "./constant";
import { Nav, ReviweTabWrapper } from "./style";
import { useOutletContext, useParams } from "react-router-dom";
import { useViewComplyQuery } from "services/complyService";

const ServiceReview = () => {
  let { option } = useParams();

  let complyInfo = JSON.parse(localStorage.getItem("complyInfo"));

  let complyCode = complyInfo?.complyCode;

  const viewComply = useViewComplyQuery({
    complyCode: complyCode,
  });


  // Set the progress of the application
  useEffect(() => {
    viewComply.refetch();
    store.dispatch(setServiceCheckoutProgress({ total: 2, current: 2 })); // total- total pages and current - current page
  }, []);

  return (
    <Container>
      <ServicesCheckoutHeader />
      <Body>          
        <CheckoutSection
          title={"Service Review Information"}
          HeaderParagraph="Please ensure all information provided for this business are correct"
        />
        <Nav>
          {/* using both relative and absolute routing to reduce the length of the pathname  */}

          <ActiveNav
            text={"Service Information"}
            // total={0}
            path={`/services/${option}/review/info`}
          />
          {viewComply?.data?.complyData?.length > 0 && (
            <ActiveNav text={"Form"} path={`/services/${option}/review/form`} />
          )}
          {viewComply?.data?.complyDocuments?.length > 0 && (
            <ActiveNav text={"Documents"} path={`/services/${option}/review/documents`} />
          )}
        </Nav>
        <Outlet context={viewComply} />
      </Body>
    </Container>
  );
};

export default ServiceReview;
