import React, { useState, useRef, useEffect } from "react";
import {
  Body,
  Bottom,
  DoubleGridWrapper,
  Form,
  OrText,
  OrWrapper,
  QuestionWrap,
  Registration,
} from "./styles";
import MainButton from "components/button";
import { DropDown, InputWithLabel } from "components/input";
import { HeadText, TextsWithLink } from "components/texts";
import { AuthLayout } from "layout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useRegisterNewUserMutation } from "services/authService";
import { store } from "redux/Store";
import { saveUserInfo } from "redux/Slices";
import { referOptions, userRegistrationSchema } from "utils/config";
import toast from "react-hot-toast";

import { checkStaffEmail } from "utils/globalFunctions";
import { useRegisterNewStaffMutation } from "services/staffService";

const UserRegistration = () => {
  const [navSticked, setNavSticked] = useState("");
  const [registerNewUser, { isLoading, isSuccess }] =
    useRegisterNewUserMutation();
  const [registerNewStaff, staffState] = useRegisterNewStaffMutation();

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

  // Sign up function block
  const submitForm = async (formData) => {
    let staffCheck = checkStaffEmail(formData.email);
    let response = staffCheck
      ? await registerNewStaff(JSON.stringify(formData))
      : await registerNewUser(JSON.stringify(formData));

    let data = response?.data;
    let error = response?.error;
    if (data) {
      store.dispatch(saveUserInfo(data));
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ ...data, newUser: true })
      );
      localStorage.setItem("userEmail", formData.email);
      toast.success(data.message);
      navigate(`${location.pathname}/success`);
    } else if (error) {
      // console.log(error.data.message);
      toast.error(error.data.message);
    }
  };

  // const correctFormDate = (formData) => {
  //   let data = formData;
  //   let dateArray = [...data.date];
  //   let bDay = dateArray[0].toString() + dateArray[1].toString();
  //   let bMonth = dateArray[3].toString() + dateArray[4].toString();
  //   let bYear = dateArray[6].toString() + dateArray[9].toString();
  //   let newData = { ...data, bDay, bMonth, bYear };
  //   delete newData["date"];
  //   return newData;
  // };

  const handleGenderChange = (value) => {
    var string = Object.values(value)[0];
    setValue("gender", string, { shouldValidate: true });
    // console.log(string);
  };
  const handleDateChange = (value) => {
    setValue("date", value, { shouldValidate: true });
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
            body="Create an account to scale your business now"
            align="flex-start"
            margintop="8px"
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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

              <InputWithLabel
                placeholder="Enter your email address"
                label="Email"
                type="email"
                name="email"
                register={register}
                errorMessage={errors.email?.message}
              />
              <InputWithLabel
                placeholder="Min. of 6 characters"
                label="Password"
                type="password"
                rightText
                name="password"
                register={register}
                errorMessage={errors.password?.message}
              />
              {/* <DateInput
                label={"Date of birth"}
                name="date"
                register={register}
                selectDate={handleDateChange}
                errorMessage={errors.date?.message}
              /> */}
              {/* <DropDown
                label="Gender"
                options={genderOptions}
                name="gender"
                register={register}
                onChange={handleGenderChange}
                errorMessage={errors.gender?.message}
              /> */}
              <InputWithLabel
                placeholder="Phone number"
                label="Phone Number"
                name="phone"
                type="number"
                register={register}
                errorMessage={errors.phone?.message}
              />

              {/* <InputWithLabel
								placeholder="How did you find us?"
								label="Referred by"
								name="referrer"
								type="text"
								register={register}
								errorMessage={errors.referrer?.message}
							/> */}

              <DropDown
                label="How did you find us?"
                options={referOptions}
                name="referrer"
                register={register}
                onChange={handleGenderChange}
                errorMessage={errors.referrer?.message}
              />
            </div>
            <TextsWithLink
              text={[
                {
                  text: "By creating an account , you agree to Sidebrief's",
                  link: {
                    text: "Privacy Policy",
                    to: "",
                  },
                  action: () =>
                    window.open(
                      "https://policy.sidebrief.com/privacy",
                      "_blank"
                    ),
                },
                {
                  text: "&",
                  link: {
                    text: "Terms of Use.",
                    to: "",
                  },
                  action: () =>
                    window.open("https://policy.sidebrief.com/terms", "_blank"),
                },
              ]}
            />

            <MainButton
              title="Sign Up"
              type="submit"
              loading={isLoading || staffState.isLoading}
              disabled={isLoading || staffState.isLoading}
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
        {/* <AppFeedback subProject="User registration" /> */}
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
              link: {
                text: "Service Partner",
                to: "/register/partner",
              },
            },
          ]}
          // $mobileResponsive
        />
        <TextsWithLink
          text={[
            {
              text: "Create a  ",
              link: {
                text: "Reseller Account",
                to: "/register/reseller",
              },
            },
          ]}
          // $mobileResponsive
        />
      </Bottom>
    </AuthLayout>
  );
};

export default UserRegistration;
