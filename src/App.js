import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Dashboard } from "./features/dashboard";
import { SignIn, UserRegisteration } from "./features/authentication";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Dashboard />} />
          <Route index element={<Home />} />
          <Route path="register" element={<UserRegisteration />} />
          <Route path="signin" element={<SignIn />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
