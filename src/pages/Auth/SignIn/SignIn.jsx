import React, { useState, useRef } from "react";
import styled from "styled-components";
import TestButton from "components/button";
import { InputWithLabel } from "components/input";
import LogoNav from "components/navbar/LogoNav";
import { HeadText } from "components/texts";
import TextsWithLink from "components/texts/TextWithLinks";
import { AuthLayout } from "layout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavLink, useNavigate } from "react-router-dom";
import { useLoginNewUserMutation } from "services/authService";
import { loginSchema } from "utils/config";
import { motion } from "framer-motion";

const SignIn = () => {
  const [navSticked, setNavSticked] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const [loginNewUser] = useLoginNewUserMutation();

  const navigate = useNavigate();

  const TestRef = useRef();

  var observer = new IntersectionObserver((e) => {
    if (e[0].intersectionRatio === 0) {
      setNavSticked(true);
    } else if (e[0].intersectionRatio === 1) {
      setNavSticked(false);
    }
  });

  setTimeout(() => {
    observer.observe(TestRef.current);
  }, 500);

  const submitForm = async (formData) => {
    let response = await loginNewUser(formData);
    let data = response?.json();
    let error = response?.error();
    if (response) {
      console.log(data);
      navigate("/");
    } else if (error) {
      console.log(error.data.message);
    }
  };

  return (
    <AuthLayout register={true}>
      <Registration>
        <TestBlock ref={TestRef} id="testdiv" />
        <LogoNav stick={0} navSticked={navSticked} />
        <Form onSubmit={handleSubmit(submitForm)}>
          <HeadText
            title="Welcome Back"
            body="Sign in to your account"
            align="flex-start"
            marginT="8px"
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
                type="text"
                rightText
                name="password"
                register={register}
                errorMessage={errors.Password?.message}
              />
              <motion.div
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
                  }}
                >
                  Forgot password?
                </NavLink>
              </motion.div>
            </div>
            <TestButton title="Sign In" type="submit" />
          </Body>
          <Bottom>
            <TextsWithLink
              text={[
                {
                  text: "Already have an account? ",
                  link: { text: "Sign Up", to: "/register" },
                },
              ]}
            />
          </Bottom>
        </Form>
      </Registration>
    </AuthLayout>
  );
};

export default SignIn;

const Registration = styled.div`
  display: flex;
  flex-flow: column;
  height: max-content;
`;
const TestBlock = styled.div`
  height: 1px;
  width: 100%;
`;
const Form = styled.form`
  display: flex;
  flex-flow: column;
  gap: 4rem;
  height: max-content;
`;
const Body = styled.div`
  display: flex;
  flex-flow: column;
  gap: 1rem;
`;
const Bottom = styled.div`
  display: flex;
`;
