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
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useLoginNewUserMutation } from "services/authService";
import { loginSchema } from "utils/config";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { ThreeDots } from "react-loading-icons";
import { store } from "redux/Store";
import { saveUserInfo, saveUserLoginInfo, saveUserToken } from "redux/Slices";
import AppFeedback from "components/AppFeedback";
import { checkStaffEmail, handleError } from "utils/globalFunctions";
import { useLoginStaffMutation } from "services/staffService";

const SignIn = () => {
  const [navSticked, setNavSticked] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const [loginNewUser, { isLoading, isSuccess }] = useLoginNewUserMutation();
  const [loginStaff, staffState] = useLoginStaffMutation();

  const navigate = useNavigate();
  const location = useLocation();

  const TestRef = useRef();

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

  // Login function block
  const submitForm = async (formData) => {
    let staffCheck = checkStaffEmail(formData.email);

    let response = staffCheck
      ? await loginStaff(JSON.stringify(formData))
      : await loginNewUser(JSON.stringify(formData));

    let data = response?.data;
    let error = response?.error;

    console.log("response data", data);
    console.log("response error", error);
    if (data) {
      store.dispatch(saveUserInfo(data)); // !important DO NOT REMOVE
      localStorage.setItem("userInfo", JSON.stringify(data));
      localStorage.setItem("userEmail", formData.email);
      navigate(staffCheck ? "/staff-dashboard" : "/dashboard");
      toast.success(data.message);
    } else if (error) {
      handleError(error);
    }
  };

  return (
    <AuthLayout
      linkText="Sign Up"
      link="/register/user"
      question="Don't have an account?"
    >
      <Registration>
        <Form onSubmit={handleSubmit(submitForm)}>
          <HeadText
            title="Welcome Back"
            body="Sign in to your account"
            align="flex-start"
            margintop="8px"
          />
          <Body>
            <div>
              <InputWithLabel
                placeholder="example@example.com"
                label="Email"
                type="email"
                name="email"
                register={register}
                errorMessage={errors.Email?.message}
              />
              <InputWithLabel
                placeholder="********"
                label="Password"
                type="password"
                rightText
                name="password"
                register={register}
                errorMessage={errors.Password?.message}
              />
              <motion.div
                key="SignInNavLink"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <NavLink
                  to="/login/forgotpassword"
                  style={{
                    textDecoration: "none",
                    color: "var(--SecondaryBlue)",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  Forgot password?
                </NavLink>
              </motion.div>
            </div>
            <MainButton
              title="Sign In"
              type="submit"
              loading={isLoading || staffState.isLoading}
              disabled={isLoading || staffState.isLoading}
            />
          </Body>
        </Form>
        {/* <AppFeedback subProject="Sign In" /> */}
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
              text: "Don't have an account? ",
              link: { text: "Sign Up", to: "/register" },
            },
          ]}
          // $mobileResponsive
        />
      </Bottom>
    </AuthLayout>
  );
};

export default SignIn;

const Registration = styled.div`
  display: flex;
  flex-flow: column;
  height: max-content;
  gap: 8px;
  padding: 59px;
  background-color: white;
  border: 1px solid #edf1f7;
  box-shadow: -10px -10px 10px -5px rgba(149, 150, 151, 0.04),
    10px 10px 10px -5px rgba(149, 150, 151, 0.04);
  border-radius: 12px;
  @media screen and (max-width: 1000px) {
    gap: 32px;
  }
  @media screen and (max-width: 700px) {
    padding-inline: 24px;
  }
`;
const TestBlock = styled.div`
  height: 1px;
  width: 100%;
`;
const Form = styled.form`
  display: flex;
  flex-flow: column;
  gap: 40px;
  height: max-content;
`;
const Body = styled.div`
  display: flex;
  flex-flow: column;
  gap: 24px;
`;
const Bottom = styled.div`
  display: flex;
  flex-flow: column;
  gap: 16px;
  justify-content: center;
  align-items: center;
  margin-bottom: 150px;
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
