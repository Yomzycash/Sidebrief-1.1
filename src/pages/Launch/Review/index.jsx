import HeaderCheckout from "components/Header/HeaderCheckout";
import { CheckoutController, CheckoutSection } from "containers";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { setCheckoutProgress } from "redux/Slices";
import { store } from "redux/Store";
import { InputContainer, InputFrame } from "../BusinessForm/styles";
import { Page } from "../styled";
import { Data, DataTitle, SectionTitle } from "./styled";

const ReviewInformation = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/dashboard");
    store.dispatch(setCheckoutProgress({ total: 10, current: 7 })); // total- total pages and current - current page
  };

  const handlePrev = () => {
    navigate(-1);
    store.dispatch(setCheckoutProgress({ total: 10, current: 7 })); // total- total pages and current - current page
  };

  return (
    <>
      <HeaderCheckout />
      <Page>
        <CheckoutSection
          title="Review Information"
          subtitle="Please ensure all information provided for this business are correct"
          review
          sectionTitle="Business Information:"
          linkTitle="Edit"
          to="/checkout"
        >
          <InputContainer>
            <InputFrame>
              <DataTitle>Operational Country</DataTitle>
              <Data>
                <p>Nigeria</p>
              </Data>

              <DataTitle>Business Name 1</DataTitle>
              <Data>
                <p>Aim Designs</p>
              </Data>

              <DataTitle>Business Name 3</DataTitle>
              <Data>
                <p>Grace</p>
              </Data>
              <DataTitle>Entity Name</DataTitle>
              <Data>
                <p>Limited Liability company</p>
              </Data>
            </InputFrame>

            <InputFrame>
              <DataTitle>Business Objectives</DataTitle>
              <Data>
                <p>Information and Technology</p>
              </Data>

              <DataTitle>Business Name 2</DataTitle>
              <Data>
                <p>Aim Designs</p>
              </Data>

              <DataTitle>Business Name 4</DataTitle>
              <Data>
                <p>Grace</p>
              </Data>

              <DataTitle>Entry Description</DataTitle>
              <Data>
                <p>Local Sharholders only</p>
              </Data>
            </InputFrame>
          </InputContainer>
        </CheckoutSection>

        <CheckoutSection
          review
          sectionTitle="Business Information:"
          linkTitle="Edit"
          to="/checkout"
        >
          <InputContainer>
            <InputFrame>
              <DataTitle>Operational Country</DataTitle>
              <Data>
                <p>Nigeria</p>
              </Data>

              <DataTitle>Operational Country</DataTitle>
              <Data>
                <p>Aim Designs</p>
              </Data>

              <DataTitle>Operational Country</DataTitle>
              <Data>
                <p>Grace</p>
              </Data>

              <DataTitle>Operational Country</DataTitle>
              <Data>
                <p>Limited Liability company</p>
              </Data>
            </InputFrame>

            <InputFrame>
              <DataTitle>Operational Country</DataTitle>
              <Data>
                <p>Nigeria</p>
              </Data>

              <DataTitle>Operational Country</DataTitle>
              <Data>
                <p>Aim Designs</p>
              </Data>

              <DataTitle>Operational Country</DataTitle>
              <Data>
                <p>Grace</p>
              </Data>

              <DataTitle>Operational Country</DataTitle>
              <Data>
                <p>Limited Liability company</p>
              </Data>
            </InputFrame>
          </InputContainer>
        </CheckoutSection>

        <CheckoutSection
          review
          sectionTitle="Business Address:"
          linkTitle="Edit"
          to="/checkout"
        >
          <InputContainer>
            <InputFrame>
              <DataTitle>Country</DataTitle>
              <Data>
                <p>Nigeria</p>
              </Data>

              <DataTitle>City</DataTitle>
              <Data>
                <p>Aim Designs</p>
              </Data>

              <DataTitle>Zip Code</DataTitle>
              <Data>
                <p>3401</p>
              </Data>
            </InputFrame>

            <InputFrame>
              <DataTitle>State</DataTitle>
              <Data>
                <p>Information and Technology</p>
              </Data>

              <DataTitle>Number and Street</DataTitle>
              <Data>
                <p>Aim Designs</p>
              </Data>

              <DataTitle>Email Address</DataTitle>
              <Data>
                <p>Grace</p>
              </Data>
            </InputFrame>
          </InputContainer>
        </CheckoutSection>

        <CheckoutSection
          review
          sectionTitle="Shareholders Information:"
          linkTitle="Edit"
          to="/checkout"
        >
          <InputContainer>
            <InputFrame>
              <DataTitle>Shareholder 1</DataTitle>
              <Data>
                <p>Nigeria</p>
              </Data>

              <DataTitle>Shareholder 3</DataTitle>
              <Data>
                <p>Limited Liability company</p>
              </Data>
            </InputFrame>

            <InputFrame>
              <DataTitle>Shareholder 2</DataTitle>
              <Data>
                <p>Aim Designs</p>
              </Data>

              <DataTitle>Shareholder 4</DataTitle>
              <Data>
                <p>Grace</p>
              </Data>
            </InputFrame>
          </InputContainer>
        </CheckoutSection>

        <CheckoutSection
          review
          sectionTitle="Beneficiary Information:"
          linkTitle="Edit"
          to="/checkout"
        >
          <InputContainer>
            <InputFrame>
              <DataTitle>Beneficiary 1</DataTitle>
              <Data>
                <p>Nigeria</p>
              </Data>

              <DataTitle>Beneficiary 3</DataTitle>
              <Data>
                <p>Limited Liability company</p>
              </Data>
            </InputFrame>

            <InputFrame>
              <DataTitle>Beneficiary 2</DataTitle>
              <Data>
                <p>Aim Designs</p>
              </Data>

              <DataTitle>Beneficiary 4</DataTitle>
              <Data>
                <p>Grace</p>
              </Data>
            </InputFrame>
          </InputContainer>
        </CheckoutSection>
        <CheckoutController
          backText={"Previous"}
          forwardText={"continue"}
          forwardAction={handleNext}
          backAction={handlePrev}
        />
      </Page>
    </>
  );
};

export default ReviewInformation;
