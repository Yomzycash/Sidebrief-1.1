import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import { AccountType } from "./pages/Auth/Registration";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<Home />} />
          <Route path="register" element={<AccountType />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
