import ServicesCheckoutHeader from "components/Header/ServicesCheckoutHeader";
import { CheckoutSection } from "containers";
import React from "react";
import { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { setServiceCheckoutProgress } from "redux/Slices";
import { store } from "redux/Store";
import { Body, Container } from "./style";
import { ReviewTab } from "./constant";
import { Nav, ReviweTabWrapper } from "./style";

const ServiceReview = () => {
  const ActiveStyles = {
    color: "#151717",
    borderBottom: "4px solid #00A2D4",
    borderRadius: 0,
  };

  // Set the progress of the application
  useEffect(() => {
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
          {ReviewTab.map((item, index) => (
            <ReviweTabWrapper to={item.path} key={index}>
              <NavLink to={item.path} style={({ isActive }) => (isActive ? ActiveStyles : {})}>
                {item.title}
              </NavLink>
            </ReviweTabWrapper>
          ))}
        </Nav>
        <Outlet />
      </Body>
    </Container>
  );
};

export default ServiceReview;
