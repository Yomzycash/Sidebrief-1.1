import "./App.css";
import AppRouter from "./routes/appRouter";
import { createGlobalStyle } from "styled-components";
import { AnimatePresence } from "framer-motion";

// Added style reset
const GlobalStyle = createGlobalStyle`
body{
  font-family: 'BR Firma', sans-serif;
}
`;

function App() {
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
