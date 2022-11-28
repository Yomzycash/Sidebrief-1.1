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

  const submitForm = async (formData) => {
    let response = await loginNewUser(JSON.stringify(formData));
    let data = response?.data;
    let error = response?.error;
    if (data) {
      store.dispatch(saveUserInfo(data)); // !important DO NOT REMOVE
      localStorage.setItem("userInfo", JSON.stringify(data));
      localStorage.setItem("userEmail", formData.email);
      // console.log(data);
      toast.success(data.message);
      navigate("/dashboard");
    } else if (error) {
      if (error.status === "FETCH_ERROR") {
        toast.error("Please check your internet connection");
      } else {
        toast.error(error.data?.message);
      }
      // console.log(error);
    }
  };

  return (
    <AuthLayout>
      <Registration>
        <TestBlock ref={TestRef} id="testdiv" />
        <LogoNav stick={0} nav_sticked={navSticked} $loginPage />
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
              loading={isLoading}
              disabled={isLoading}
            />
          </Body>
          <Bottom>
            <TextsWithLink
              text={[
                {
                  text: "Don't have an account? ",
                  link: { text: "Sign Up", to: "/register" },
                },
              ]}
              $mobileResponsive
            />
          </Bottom>
        </Form>
        <AppFeedback subProject="Sign In" />
      </Registration>
    </AuthLayout>
  );
};

export default SignIn;

const Registration = styled.div`
  display: flex;
  flex-flow: column;
  height: max-content;
  gap: 8px;

  @media screen and (max-width: 1000px) {
    gap: 32px;
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
`;
