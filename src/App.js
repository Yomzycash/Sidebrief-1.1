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
import { LiveChatLoaderProvider } from "react-live-chat-loader";

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

  return (
    <>
      {/* <LiveChatLoaderProvider providerKey="78933" provider="chatwoot"> */}
      <AnimatePresence exitBeforeEnter>
        <GlobalStyle />
        <AppRouter />
      </AnimatePresence>
      {/* </LiveChatLoaderProvider> */}
    </>
  );
}

export default App;
