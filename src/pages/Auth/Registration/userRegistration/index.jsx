import React, { useState, useRef, useEffect } from "react";
import { Body, Bottom, Form, Registration, TestBlock } from "./styles";
import TestButton from "components/button";
import { DateInput, DropDown, InputWithLabel } from "components/input";
import LogoNav from "components/navbar/LogoNav";
import { HeadText, TextsWithLink } from "components/texts";
import { AuthLayout } from "layout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useRegisterNewUserMutation } from "services/authService";
import { store } from "redux/Store";
import { saveUserInfo, saveUserToken } from "redux/Slices";
import { genderOptions, userRegistrationSchema } from "utils/config";
import toast from "react-hot-toast";
import { ThreeDots } from "react-loading-icons";

const UserRegistration = () => {
  const [navSticked, setNavSticked] = useState("");
  const [registerNewUser, { isLoading, isSuccess }] =
    useRegisterNewUserMutation();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userRegistrationSchema),
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
    let correctedData = correctFormDate(formData);
    let response = await registerNewUser(JSON.stringify(correctedData));
    let data = response?.data;
    console.log(data);
    let error = response?.error;
    if (data) {
      store.dispatch(saveUserInfo(data));
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ ...data, newUser: true })
      );
      console.log(data.message);
      toast.success(data.message);
      navigate(`${location.pathname}/success`);
    } else if (error) {
      console.log(error.data.message);
      toast.error(error.data.message);
    }
  };

  const correctFormDate = (formData) => {
    let data = formData;
    let dateArray = [...data.date];
    let bDay = dateArray[0].toString() + dateArray[1].toString();
    let bMonth = dateArray[3].toString() + dateArray[4].toString();
    let bYear = dateArray[6].toString() + dateArray[9].toString();
    let newData = { ...data, bDay, bMonth, bYear };
    delete newData["date"];
    return newData;
  };

  const handleGenderChange = (value) => {
    var string = Object.values(value)[0];
    setValue("gender", string, { shouldValidate: true });
    console.log(string);
  };
  const handleDateChange = (value) => {
    setValue("date", value, { shouldValidate: true });
  };

  return (
    <AuthLayout register={true}>
      <Registration>
        <TestBlock ref={TestRef} id="testdiv" />
        <LogoNav stick={0} nav_sticked={navSticked} />
        <Form onSubmit={handleSubmit(submitForm)}>
          <HeadText
            title="Get started with Sidebrief"
            body="Create an account to scale your business now"
            align="flex-start"
            margintop="8px"
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <Body>
            <div>
              <InputWithLabel
                placeholder="First Name"
                label="First name"
                type="text"
                name="first_name"
                register={register}
                errorMessage={errors.first_name?.message}
              />
              <InputWithLabel
                placeholder="Last Name"
                label="Last name"
                type="text"
                name="last_name"
                register={register}
                errorMessage={errors.last_name?.message}
              />
              <InputWithLabel
                placeholder="example@example.com"
                label="Email"
                type="email"
                name="email"
                register={register}
                errorMessage={errors.email?.message}
              />
              <InputWithLabel
                placeholder="Min. of 8  characters"
                label="Password"
                type="password"
                rightText
                name="password"
                register={register}
                errorMessage={errors.password?.message}
              />
              <DateInput
                label={"Date of birth"}
                name="date"
                register={register}
                selectDate={handleDateChange}
                errorMessage={errors.date?.message}
              />
              <DropDown
                label="Gender"
                options={genderOptions}
                name="gender"
                register={register}
                onChange={handleGenderChange}
                errorMessage={errors.gender?.message}
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
            <TestButton
              title={
                isLoading === true ? (
                  <ThreeDots stroke="#98ff98" fill="white" width={60} />
                ) : (
                  "Sign Up"
                )
              }
              type="submit"
              disabled={isLoading ? true : false}
            />
          </Body>
          <Bottom>
            <TextsWithLink
              text={[
                {
                  text: "Already have an account? ",
                  link: { text: "Sign In", to: "/login" },
                },
              ]}
            />
          </Bottom>
        </Form>
      </Registration>
    </AuthLayout>
  );
};

export default UserRegistration;
