import React from "react";
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
import { Body, Bottom, Container, Header, InputsWrapper } from "../styled";

const BusinessInfo = () => {
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

  const Objectives = [
    { id: 1, text: "Marketing" },
    { id: 1, text: "Art and Designs" },
    { id: 1, text: "Construction" },
    { id: 1, text: "Information and Technology" },
    { id: 1, text: "Science and Technology" },
    { id: 1, text: "Art and Design" },
    { id: 1, text: "Musical Industry" },
    { id: 1, text: "Technicial" },
  ];

  const handleNext = () => {};

  return (
    <Container>
      <Header>
        <HeaderCheckout />
      </Header>
      <Body>
        <CheckoutSection title="Let's sail you through, take this swift walk with us." />
        <TagInput />
        <InputsWrapper>
          <DropDownWithSearch title="Operational Country" list={Countries} />
          <DropDownWithSearch title="Business Objectives" list={Objectives} />
        </InputsWrapper>
      </Body>
      <Bottom>
        <CheckoutController
          backAction={() => console.log("Back button")}
          backText={"Previous"}
          forwardAction={() => console.log("Forward button")}
          forwardText={"Proceed"}
        />
      </Bottom>
    </Container>
  );
};

export default BusinessInfo;
