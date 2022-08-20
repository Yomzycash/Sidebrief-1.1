import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "../components/loader/loader";
import routes from "./routes";

const AppRouter = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <Routes>
          {routes.map((item, index) => (
            <Route
              key={index}
              path={item.path}
              exact={item.exact}
              element={<item.component />}
            />
          ))}
        </Routes>
      </Router>
    </Suspense>
  );
};

export default AppRouter;
