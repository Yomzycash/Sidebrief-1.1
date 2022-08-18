import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import { AccountType } from "./pages/Auth/Registration";
import UserRegistration from "./pages/Auth/Registration/UserRegistration";
import SignIn from "./pages/Auth/SignIn/SignIn";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<Home />} />
          <Route path="register" element={<Outlet />}>
            <Route index element={<AccountType />} />
            <Route path="user" element={<UserRegistration />} />
          </Route>
          <Route path="signin" element={<SignIn />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
