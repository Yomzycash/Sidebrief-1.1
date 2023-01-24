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
import { store } from "redux/Store";
import { Country } from "country-state-city";
import { CustomerlyProvider } from "react-live-chat-customerly";
import {
  Elements,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
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
      //console.log(JSON.parse(localUserInfo));
    }
  }, [localUserInfo]);

  useEffect(() => {
    if (launchInfo) {
      store.dispatch(setLaunchResponse(JSON.parse(launchInfo)));
      store.dispatch(setGeneratedLaunchCode(JSON.parse(launchInfo).launchCode));
      //console.log(JSON.parse(launchInfo));
    }
  }, [launchInfo]);

  useEffect(() => {
    if (country) {
      store.dispatch(setCountryISO(JSON.parse(country).ISO));
      store.dispatch(setCountry(JSON.parse(country).name));
      // console.log(country);
    }
  }, [country]);

  const stripePromise = loadStripe(
    "pk_test_51MH8TfAWcsFJb6bwNtmV01wJKYUHmWALSRJUFBc68Eqjxyz4Jr5E0UEdfRKfJShRxsS9kIGq3vHSlHYoI7g8Gq1H00RNGhaPIE"
  );

  // const options = {
  //   // passing the client secret obtained from the server
  //   clientSecret:
  //     "sk_test_51MH8TfAWcsFJb6bwfYHbfDYyZWKiYumx349QFY6w0QR1DdgMhSJ0jCuR2YNavWblfdxWb6gNKgNkApuIsm94QPog00vWA7ULGf",
  // };

  return (
    <>
      <Elements stripe={stripePromise}>
        <CustomerlyProvider appId={"YOUR_APP_ID"}>
          ,
          <AnimatePresence exitBeforeEnter>
            <GlobalStyle />
            <AppRouter />
          </AnimatePresence>
        </CustomerlyProvider>
      </Elements>
    </>
  );
}

export default App;
