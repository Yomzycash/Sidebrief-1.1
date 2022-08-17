import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Dashboard } from "./features/dashboard";
import {
  AccountSuccess,
  AccountType,
  EmailVerification,
  PartnerRegistration,
  ResellerRegistration,
  SignIn,
  UserRegisteration,
} from "./features/authentication";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Dashboard />} />
          <Route index element={<Home />} />
          <Route path="register" element={<UserRegisteration />}>
            <Route path="account-type" element={<AccountType />} />
            <Route path="success" element={<AccountSuccess />} />
            <Route path="verify-email" element={<EmailVerification />} />
            <Route path="partner" element={<PartnerRegistration />} />
            <Route path="reseller" element={<ResellerRegistration />} />
            <Route path="user" element={<UserRegisteration />} />
          </Route>
          <Route path="signin" element={<SignIn />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
