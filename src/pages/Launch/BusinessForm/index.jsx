import React, { useState } from "react";
import HeaderCheckout from "components/Header/HeaderCheckout";
import { Page, Inputs } from "../styled";
import { InputFrame, InputContainer, Gap } from "./styles";
import { CheckoutController, CheckoutSection } from "containers";
import { DropDownWithSearch, Checkbox, InputWithLabel } from "components/input";
import { store } from "redux/Store";
import { setBusinessFormInfo, setCheckoutProgress } from "redux/Slices";
import { useNavigate } from "react-router-dom";

const BusinessForm = () => {
  const [expectedNumOfShareHolders, setExpectedNumOfShareHolders] = useState([
    1, 2, 3, 4, 5,
  ]);
  const [numOfShareHolders, setNumofShareHolders] = useState();
  const [expectedNumOfDirectors, setExpectedNumOfDirectors] = useState([
    1, 2, 3, 4, 5,
  ]);
  const [numOfDirectors, setNumOfDirectors] = useState();
  const [expectedNumOfBeneficiary, setExpectedNumOfBeneficiary] = useState([
    1, 2, 3, 4, 5,
  ]);
  const [numOfBeneficiary, setNumOfBeneficiary] = useState();

  const selectNumofShareholders = (data) => {
    setNumofShareHolders(data);
    store.dispatch(setBusinessFormInfo({ name: "shareholders", number: data }));
  };

  const selectNumofDirectors = (data) => {
    setNumOfDirectors(data);
    store.dispatch(setBusinessFormInfo({ name: "directors", number: data }));
  };

  const selectNumofBeneficiary = (data) => {
    setNumOfBeneficiary(data);
    store.dispatch(
      setBusinessFormInfo({ name: "beneficiaries", number: data })
    );
  };

  function handleCreate(number, where) {
    switch (where) {
      case "shareholder":
        setNumofShareHolders(number);
        setExpectedNumOfShareHolders((prev) => [...prev, number]);
        break;

      case "director":
        setNumOfDirectors(number);
        setExpectedNumOfDirectors((prev) => [...prev, number]);
        break;

      case "beneficiary":
        setNumOfBeneficiary(number);
        setExpectedNumOfBeneficiary((prev) => [...prev, number]);
        break;

      default:
        break;
    }
  }

  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/checkout/shareholders-info");
    store.dispatch(setCheckoutProgress({ total: 10, current: 4 })); // total- total pages and current - current page
  };

  const handlePrev = () => {
    navigate(-1);
    store.dispatch(setCheckoutProgress({ total: 10, current: 3 })); // total- total pages and current - current page
  };

  return (
    <>
      <HeaderCheckout />
      <Page>
        <CheckoutSection
          title={"Mandatory Information"}
          subtitle={
            "Please provide Sidebrief with the following information or use sidebrief's contact"
          }
        >
          <InputContainer>
            <InputFrame>
              <DropDownWithSearch
                name={"numOfShareholders"}
                title={"Shareholder’s Information"}
                list={expectedNumOfShareHolders}
                renderer={({ item }) => item}
                selectAction={selectNumofShareholders}
                bottomText={
                  "Please provide sidebrief with the number of shareholders available in your company"
                }
                allowCreate={true}
                onCreate={(number) => handleCreate(number, "shareholder")}
                value={numOfShareHolders}
                setValue={(value) => setNumofShareHolders(value)}
              />
              {/* TODO: checkbox needs some work */}
              {/* <Checkbox name={"sideBriefShareholder"} /> */}
            </InputFrame>
            <InputFrame>
              <DropDownWithSearch
                name={"numOfDirectors"}
                title={"Director’s Information"}
                list={expectedNumOfDirectors}
                renderer={({ item }) => item}
                selectAction={selectNumofDirectors}
                bottomText={
                  "Please provide sidebrief with the number of directors available in your company" // shareholders?
                }
                allowCreate={true}
                onCreate={(number) => handleCreate(number, "director")}
                value={numOfDirectors}
                setValue={(value) => setNumOfDirectors(value)}
              />
            </InputFrame>
          </InputContainer>
        </CheckoutSection>
        <Gap height={40} />
        <CheckoutSection
          title={"Optional Information"}
          subtitle={
            "Please provide Sidebrief with the following information or use sidebrief's contact"
          }
        >
          <Inputs>
            <DropDownWithSearch
              name={"numOfBeneficiary"}
              title={"Beneficiary’s Information"}
              list={expectedNumOfBeneficiary}
              renderer={({ item }) => item}
              selectAction={selectNumofBeneficiary}
              bottomText={
                "Please provide sidebrief with the number of beneficiaries available in your company"
              }
              allowCreate={true}
              onCreate={(number) => handleCreate(number, "beneficiary")}
              value={numOfBeneficiary}
              setValue={(value) => setNumOfBeneficiary(value)}
            />
          </Inputs>
        </CheckoutSection>
        <CheckoutController
          backText={"Previous"}
          forwardText={"Next"}
          forwardAction={handleNext}
          backAction={handlePrev}
        />
      </Page>
    </>
  );
};

export default BusinessForm;
