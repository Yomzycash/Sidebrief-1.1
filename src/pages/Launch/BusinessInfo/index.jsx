import React, { useEffect, useState } from "react";
import HeaderCheckout from "components/Header/HeaderCheckout";
// import DropDownWithSearch from "components/input/DropDownWithSearch";
import TagInput from "components/input/TagInput";
import { CheckoutController, CheckoutSection } from "containers";
import {
  NigeriaFlag,
  KenyaFlag,
  SouthAfricaFlag,
  MalawiFlag,
  ZimbabweFlag,
} from "asset/flags";
import {
  Body,
  Bottom,
  Container,
  Header,
  InputsWrapper,
  CountryItem,
} from "../styled";
import { useNavigate } from "react-router-dom";
import { store } from "redux/Store";
import { setCheckoutProgress } from "redux/Slices";
import TagInputWithSearch from "components/input/TagInputWithSearch";
import { BusinessObjectives } from "utils/config";
import { useGetAllCountriesQuery } from "services/launchService";

const BusinessInfo = () => {
  // This object is only here temporarily. It will be moved to utils later
  const Countries = [
    { id: 1, text: "Nigeria", img: NigeriaFlag },
    { id: 2, text: "Kenya", img: KenyaFlag },
    { id: 3, text: "South Africa", img: SouthAfricaFlag },
    { id: 4, text: "Malawi", img: MalawiFlag },
    { id: 5, text: "Zimbabwe", img: ZimbabweFlag },
    { id: 1, text: "Nigeria", img: NigeriaFlag },
    { id: 2, text: "Kenya", img: KenyaFlag },
    { id: 3, text: "South Africa", img: SouthAfricaFlag },
    { id: 4, text: "Malawi", img: MalawiFlag },
    { id: 5, text: "Zimbabwe", img: ZimbabweFlag },
    { id: 1, text: "Nigeria", img: NigeriaFlag },
    { id: 2, text: "Kenya", img: KenyaFlag },
    { id: 3, text: "South Africa", img: SouthAfricaFlag },
    { id: 4, text: "Malawi", img: MalawiFlag },
    { id: 5, text: "Zimbabwe", img: ZimbabweFlag },
    { id: 1, text: "Nigeria", img: NigeriaFlag },
    { id: 2, text: "Kenya", img: KenyaFlag },
    { id: 3, text: "South Africa", img: SouthAfricaFlag },
    { id: 4, text: "Malawi", img: MalawiFlag },
    { id: 5, text: "Zimbabwe", img: ZimbabweFlag },
  ];

  const [objectives, setObjectives] = useState("");
  const [businessNames, setBusinessNames] = useState([]);

  const { data, error, isLoading, isSuccess } = useGetAllCountriesQuery();
  const [country, setCountry] = useState();

  const navigate = useNavigate();

  // useEffect(() => {
  //   getCountries();
  // }, []);

  // const getCountries = async () => {
  //   let countries = await Promise.resolve(data);
  //   console.log(countries);
  // };
  // Navigation handlers
  const handleNext = () => {
    navigate("/checkout/entity");
    store.dispatch(setCheckoutProgress({ total: 10, current: 1 })); // total- total pages and current - current page
  };
  const handlePrev = () => {
    navigate(-1);
  };

  const handleBusinessNames = (valuesSelected) => {
    setBusinessNames(valuesSelected);
  };

  const handleCountry = (valueSelected) => {
    setCountry(valueSelected);
  };

  const handleObjectives = (valuesSelected) => {
    setObjectives(valuesSelected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting");
    let countries = await data;
    console.log(countries);
  };

  return (
    <Container onSubmit={handleSubmit}>
      <Header>
        <HeaderCheckout />
      </Header>
      <Body>
        <CheckoutSection title="Let's sail you through, take this swift walk with us." />
        <TagInput getSelectedValues={handleBusinessNames} />
        <InputsWrapper>
          <TagInputWithSearch
            label="Operational Country"
            list={country}
            getValue={handleCountry}
          />
          <TagInputWithSearch
            label="Business Objectives"
            list={BusinessObjectives}
            getValue={handleObjectives}
            MultiSelect
            ExistsError="Tag has already been selected"
            MatchError="Please select objectives from the list"
            EmptyError="Please select at least one objective"
            MaxError="You cannot select more than 4"
          />
          {/* <DropDownWithSearch
            name="country"
            title="Operational Country"
            list={Countries}
            renderer={({ item }) => (
              <CountryItem>
                <img src={item.img} alt="" style={{ width: "20px" }} />
                {item.text}
              </CountryItem>
            )}
            selectAction={(data) => {
              console.log("Hello");
              console.log(data);
            }}
            value={country}
            allowCreate={true}
            setValue={(value) => setCountry(value)}
          />
          <DropDownWithSearch
            name="objective"
            title="Business Objectives"
            list={Objectives}
            renderer={({ item }) => <span>{item.text}</span>}
            selectAction={(data) => {
              console.log("Hello");
              console.log(data);
            }}
            value={objectives}
            setValue={(value) => setObjectives(value)}
            allowCreate={true}
          /> */}
        </InputsWrapper>
      </Body>
      <Bottom>
        <CheckoutController
          forwardAction={handleNext}
          backAction={handlePrev}
          backText={"Previous"}
          forwardText={"Next"}
          hidePrev
        />
      </Bottom>
    </Container>
  );
};

export default BusinessInfo;
