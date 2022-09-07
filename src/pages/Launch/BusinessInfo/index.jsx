import React, { useState } from "react";
import HeaderCheckout from "components/Header/HeaderCheckout";
import DropDownWithSearch from "components/input/DropDownWithSearch";
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

  // This object is only here temporarily. It will be moved to utils later
  const Objectives = [
    { id: 1, text: "Marketing" },
    { id: 2, text: "Art and Designs" },
    { id: 3, text: "Construction" },
    { id: 4, text: "Information and Technology" },
    { id: 5, text: "Science and Technology" },
    { id: 6, text: "Art and Design" },
    { id: 7, text: "Musical Industry" },
    { id: 8, text: "Technicial" },
  ];
  const [country, setCountry] = useState("");
  const [objectives, setObjectives] = useState("");

  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/checkout/entity");
    store.dispatch(setCheckoutProgress({ total: 10, current: 1 })); // total- total pages and current - current page
  };
  const handlePrev = () => {
    navigate(-1);
  };

  return (
    <Container>
      <Header>
        <HeaderCheckout />
      </Header>
      <Body>
        <CheckoutSection title="Let's sail you through, take this swift walk with us." />
        <TagInput />
        <InputsWrapper>
          <DropDownWithSearch
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
          />
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
