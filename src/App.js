import "./App.css";
import AppRouter from "./routes/appRouter";
import { createGlobalStyle } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
const GlobalStyle = createGlobalStyle`
body{
  font-family: 'BR Firma', sans-serif;
}
`;

function App() {
  return (
    <>
      <AnimatePresence>
        <GlobalStyle />
        <AppRouter />
      </AnimatePresence>
    </>
  );
}

export default App;
