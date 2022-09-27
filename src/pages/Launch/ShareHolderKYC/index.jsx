import React, { useState } from "react";
import HeaderCheckout from "components/Header/HeaderCheckout";
import { Container, Bottom, Body } from "../styled";
import {
  CheckoutController,
  CheckoutSection,
  CheckoutInfoKYC,
} from "containers";
import LaunchPrimaryContainer from "containers/Checkout/CheckoutFormContainer/LaunchPrimaryContainer";
import LaunchFormContainer from "containers/Checkout/CheckoutFormContainer/LaunchFormContainer";
import { setCheckoutProgress } from "redux/Slices";
import { store } from "redux/Store";
import { useNavigate } from "react-router-dom";
import { useAddMemberKYCMutation } from "services/launchService";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ContentWrapper, FileContainer, Name } from "./styles";
import FileUpload from "components/FileUpload";
import { fileFormSchema } from "utils/config";
import { InputWithLabel } from "components/input";
import DragAndDrop from "components/FileUpload/DragAndDrop";

const data = [
  {
    id: "1",
    name: "ade",
  },
  {
    id: "2",
    name: "bag",
  },
  {
    id: "3",
    name: "say",
  },
];
const ShareHolderKYC = () => {
  const navigate = useNavigate();
  const [first, setFirst] = useState("");
  const [second, setsecond] = useState("");
  const [third, setthird] = useState("");

  const handleNext = () => {
    navigate("/launch/directors-kyc");
    // store.dispatch(setCheckoutProgress({ total: 13, current: 9 })); // total- total pages and current - current page
  };

  const handlePrev = () => {
    navigate(-1);
    store.dispatch(setCheckoutProgress({ total: 13, current: 8 })); // total- total pages and current - current page
  };

  const handleImageChange = (value, name) => {
    // const uploadedImage = e.target.files[0];
    console.log(name);
    console.log(value);
    setFirst(value);
    setsecond(value);
    setthird(value);

    // console.log(uploadedImage);
  };
  return (
    <Container>
      <HeaderCheckout />
      <Body>
        <CheckoutSection
          title={"Shareholder KYC Documentation:"}
          HeaderParagraph={
            "Please attach the necessary documents for all shareholders"
          }
        />
        <LaunchPrimaryContainer>
          <LaunchFormContainer>
            <FileContainer>
              <Name>Mrs Grace Nwankwo</Name>
              <ContentWrapper>
                <FileUpload
                  TopText={"Government Issued ID"}
                  name="file1"
                  onChange={handleImageChange}
                  BottomText={
                    "Driver’s Licence, National ID Card, Voters Card or International Passport"
                  }
                />

                {/* <FileUpload
                  TopText={"Proof of Home Address"}
                  name="file2"
                  onChange={handleImageChange}
                  BottomText={
                    "Utility Bill, Water Corporation Bill or a Rent Invoice"
                  }
                />

                <FileUpload
                  TopText={"Passport Photograph"}
                  name="file3"
                  onChange={handleImageChange}
                  BottomText={"Kindly ensure image is not larger than 3MB"}
                /> */}
              </ContentWrapper>
            </FileContainer>
            {/* <button type="submit">test</button> */}
            {/* <DragAndDrop /> */}
          </LaunchFormContainer>
          <Bottom>
            <CheckoutController
              backAction={handlePrev}
              backText={"Previous"}
              forwardAction={handleNext}
              forwardText={"Proceed"}
            />
          </Bottom>
        </LaunchPrimaryContainer>
      </Body>
    </Container>
  );
};

export default ShareHolderKYC;
