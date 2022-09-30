import "./App.css";
import AppRouter from "./routes/appRouter";
import { createGlobalStyle } from "styled-components";
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

// Added style reset
const GlobalStyle = createGlobalStyle`
body{
  font-family: 'BR Firma', sans-serif;

}
`;

function App() {
  const token = useSelector((store) => store.LaunchReducer.token);

  window.onbeforeunload = () => {
    // localStorage.setItem("token", token);
    console.log("unmount");
  };

  window.onload = () => {
    // let localToken = localStorage.getItem("token");
    // console.log(localToken);
    console.log("Token Set");
  };
  return (
    <>
      <AnimatePresence exitBeforeEnter>
        <GlobalStyle />
        <AppRouter />
      </AnimatePresence>
    </>
  );
}

export default App;
