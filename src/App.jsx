import "./App.css";
import AppRouter from "./routes/appRouter";
import { createGlobalStyle } from "styled-components";
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {
  saveUserInfo,
  setLaunchResponse,
  setGeneratedLaunchCode,
  setCountryISO,
  setCountry,
} from "redux/Slices";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { store } from "redux/Store";
import { Country } from "country-state-city";

// Added style reset
const GlobalStyle = createGlobalStyle`
body{
  font-family: 'BR Firma', sans-serif;
}
`;

function App() {
  let localUserInfo = localStorage.getItem("userInfo");
  let launchInfo = localStorage.getItem("launchInfo");
  let country = localStorage.getItem("country");

  useEffect(() => {
    if (localUserInfo) {
      store.dispatch(saveUserInfo(JSON.parse(localUserInfo)));
    }
  }, [localUserInfo]);

  useEffect(() => {
    if (launchInfo) {
      store.dispatch(setLaunchResponse(JSON.parse(launchInfo)));
      store.dispatch(setGeneratedLaunchCode(JSON.parse(launchInfo).launchCode));
    }
  }, [launchInfo]);

  useEffect(() => {
    if (country) {
      store.dispatch(setCountryISO(JSON.parse(country).ISO));
      store.dispatch(setCountry(JSON.parse(country).name));
    }
  }, [country]);

  const PUBLIC_KEY = `${process.env.REACT_APP_STRIPE_PUBLIC_LIVE_KEY}`;
  // process.env.NODE_ENV === "production"
  //   ? `${process.env.REACT_APP_STRIPE_PUBLIC_LIVE_KEY}`
  //   : `${process.env.REACT_APP_STRIPE_PUBLIC_TEST_KEY}`;

  // const PUBLIC_KEY =
  //   "pk_test_51HeX6TIfUU2kDtjPErnZWbbWJ0o68xZNSFm5448kvxfyCR7Hz0wfoU9eO035HGbA7KrYSYEXIxQJ0DLsrPUEaIHJ00KBYIckOc";

  const stripeTestPromise = loadStripe(PUBLIC_KEY);

  return (
    <>
      <Elements stripe={stripeTestPromise}>
        <AnimatePresence exitBeforeEnter>
          <GlobalStyle />
          <AppRouter />
        </AnimatePresence>
      </Elements>
    </>
  );
}

export default App;
