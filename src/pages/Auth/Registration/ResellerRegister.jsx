import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import MainButton from "components/button";
import { InputWithLabel } from "components/input";
import LogoNav from "components/navbar/LogoNav";
import { HeadText } from "components/texts";
import TextsWithLink from "components/texts/TextWithLinks";
import { AuthLayout } from "layout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useRegisterNewResellerMutation } from "services/authService";
import toast from "react-hot-toast";
import CountryInput from "components/input/countryInput";
import { resellerRegistrationSchema } from "utils/config";
import { saveResellerInfo } from "redux/Slices";
import { store } from "redux/Store";
import { ThreeDots } from "react-loading-icons";
import AppFeedback from "components/AppFeedback";

const ResellerRegister = () => {
  const [navSticked, setNavSticked] = useState("");
  const [registerNewReseller, { isLoading, isSuccess }] =
    useRegisterNewResellerMutation();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resellerRegistrationSchema),
  });

  const TestRef = useRef();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    var observer = new IntersectionObserver((e) => {
      if (e[0].intersectionRatio === 0) {
        setNavSticked("true");
      } else if (e[0].intersectionRatio === 1) {
        setNavSticked("");
      }
    });
    if (TestRef.current) {
      observer.observe(TestRef.current);
    } else {
      const mutationObserver = new MutationObserver(() => {
        if (TestRef.current) {
          mutationObserver.disconnect();
          observer.observe(TestRef.current);
        }
        mutationObserver.observe(document, {
          subtree: true,
          childList: true,
        });
      });
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  const submitForm = async (formData) => {
    let response = await registerNewReseller(JSON.stringify(formData));
    // console.log(response);
    let data = response?.data;
    let error = response?.error;
    if (data) {
      store.dispatch(saveResellerInfo(data));
      // console.log(data.message);
      toast.success(data.message);
      navigate(`${location.pathnamgite}/verifyotp`);
    } else if (error) {
      // console.log(error.data.message);
      toast.error(error.data.message);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess]);

  const handleCountryChange = (e) => {
    let value = e.target.value;
    setValue("operational_country", value, { shouldValidate: true });
  };

  return (
    <AuthLayout
      register={true}
      linkText="Sign In"
      link="/login"
      question="Already have an account?"
    >
      <Registration>
        <Form onSubmit={handleSubmit(submitForm)}>
          <HeadText
            title="Get started with Sidebrief"
            body="Create a reseller  account to scale your business now"
            align="flex-start"
            margintop="8px"
          />
          <Body>
            <div>
              <DoubleGridWrapper>
                <InputWithLabel
                  placeholder="Enter your first name"
                  label="First name"
                  type="text"
                  name="first_name"
                  register={register}
                  errorMessage={errors.first_name?.message}
                />
                <InputWithLabel
                  placeholder="Enter your last name"
                  label="Last name"
                  type="text"
                  name="last_name"
                  register={register}
                  errorMessage={errors.last_name?.message}
                />
              </DoubleGridWrapper>
              {/* <InputWithLabel
                placeholder="Corporate Name"
                label="Corporate name"
                type="text"
                name="corporate_name"
                register={register}
                errorMessage={errors.corporate_name?.message}
              /> */}
              <CountryInput
                label="Operational country"
                name="operational_country"
                register={register}
                onChange={handleCountryChange}
                errorMessage={errors.operational_country?.message}
              />
              <InputWithLabel
                placeholder="example@example.com"
                label="Email"
                type="email"
                name="email"
                register={register}
                errorMessage={errors.email?.message}
                error={errors}
              />
              <InputWithLabel
                placeholder="Min. of 6  characters"
                label="Password"
                type="password"
                rightText
                name="password"
                register={register}
                errorMessage={errors.password?.message}
              />
              <InputWithLabel
                placeholder="Phone number"
                label="Phone Number"
                name="phone"
                type="number"
                register={register}
                errorMessage={errors.phone?.message}
              />
            </div>
            <TextsWithLink
              text={[
                {
                  text: "By creating an account , you agree to Sidebrief's",
                  link: { text: "Privacy Policy", to: "/" },
                },
                {
                  text: "&",
                  link: { text: "Terms of Use", to: "/" },
                },
              ]}
            />
            <MainButton
              title="Sign Up"
              type="submit"
              loading={isLoading}
              disabled={isLoading}
            />

            <QuestionWrap>
              <TextsWithLink
                text={[
                  {
                    text: "Have an account? ",
                    link: { text: "Sign In", to: "/login" },
                  },
                ]}
                // $mobileResponsive
              />
            </QuestionWrap>
          </Body>
        </Form>
        {/* <AppFeedback subProject="Reseller register" /> */}
      </Registration>

      <OrWrapper>
        <hr />
        <OrText> OR </OrText>
        <hr />
      </OrWrapper>
      <Bottom>
        <TextsWithLink
          text={[
            {
              text: "Become a ",
              link: { text: "Service Partner", to: "/register/partner" },
            },
          ]}
          // $mobileResponsive
        />
        <TextsWithLink
          text={[
            {
              text: "Create a  ",
              link: { text: "User Business Account", to: "/register" },
            },
          ]}
          // $mobileResponsive
        />
      </Bottom>
    </AuthLayout>
  );
};

export default ResellerRegister;

const Registration = styled.div`
  display: flex;
  flex-flow: column;
  height: max-content;
  gap: 12px;
  padding: 59px;
  background-color: white;
  border: 1px solid #edf1f7;
  box-shadow: -10px -10px 10px -5px rgba(149, 150, 151, 0.04),
    10px 10px 10px -5px rgba(149, 150, 151, 0.04);
  border-radius: 12px;
`;
const TestBlock = styled.div`
  height: 1px;
  width: 100%;
`;
const Form = styled.form`
  display: flex;
  flex-flow: column;
  gap: clamp(32px, 3.2vw, 40px);
  height: max-content;

  @media screen and (max-width: 1000px) {
    margin-top: 20px;
  }
`;
const Body = styled.div`
  display: flex;
  flex-flow: column;
  gap: 1rem;
`;

const Bottom = styled.div`
  display: flex;
  flex-flow: column;
  gap: 16px;
  justify-content: center;
  align-items: center;
`;

const DoubleGridWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, minmax(45%, 1fr));
  row-gap: 24px;
  column-gap: 24px;

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;
const OrWrapper = styled.div`
  display: flex;
  gap: 24px;
  padding: 24px;
  hr {
    width: 40%;
    height: 0.1px;
    margin-top: 6px;
    color: #f4f4f4;
    opacity: 0.2;
  }
`;
const OrText = styled.p`
  font-weight: 400;
  font-size: 14px;
  color: #959697;
`;
const QuestionWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
`;
