import { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Auth/Login"));
const Success = lazy(() =>
  import("../pages/Auth/Registration/verification/success/success")
);
const SignIn = lazy(() => import("../pages/Auth/SignIn/SignIn"));
const ResellerRegistration = lazy(() =>
  import("../pages/Auth/Registration/ResellerRegistration")
);
const PartnerRegistration = lazy(() =>
  import("../pages/Auth/Registration/PartnerRegistration")
);
const AccountType = lazy(() =>
  import("../pages/Auth/Registration/AccountType")
);
const UserRegistration = lazy(() =>
  import("../pages/Auth/Registration/UserRegistration")
);

const routes = [
  {
    path: "/testing",
    exact: true,
    component: Home,
    protected: false,
  },
  {
    path: "/login",
    exact: true,
    component: Login,
    protected: false,
  },
  {
    path: "/success",
    exact: true,
    component: Success,
    protected: false,
  },
  {
    path: "/signin",
    exact: true,
    component: SignIn,
    protected: false,
  },
  {
    path: "/register",
    exact: true,
    component: AccountType,
    protected: false,
  },
  {
    path: "/partner",
    exact: true,
    component: PartnerRegistration,
    protected: false,
  },
  {
    path: "/reseller",
    exact: true,
    component: ResellerRegistration,
    protected: false,
  },
  {
    path: "/user",
    exact: true,
    component: UserRegistration,
    protected: false,
  },
];

export default routes;
