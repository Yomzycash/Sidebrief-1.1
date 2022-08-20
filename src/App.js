import "./App.css";
import AppRouter from "./routes/AppRouter";
import {createGlobalStyle} from 'styled-components';
const GlobalStyle = createGlobalStyle`
body{
  font-family: 'BR Firma', sans-serif;
}
`

function App() {
  return (
    <>
      <GlobalStyle />
      <AppRouter />
    </>
  );
}

export default App;
