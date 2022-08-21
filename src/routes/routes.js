import { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));
const EmailSuccess = lazy(() =>
  import("pages/Auth/Registration/verification/EmailVerify/success")
);
const EmailVerify = lazy(() =>
  import("pages/Auth/Registration/verification/EmailVerify/verify")
);
const ResetSuccess = lazy(() =>
  import("pages/Auth/Registration/verification/resetVerify/success")
);
const ResetVerify = lazy(() =>
  import("pages/Auth/Registration/verification/resetVerify/verify")
);
const AccountType = lazy(() =>
  import("pages/Auth/Registration/accountType/accountType")
);
const PartnerRegistration = lazy(() =>
  import("pages/Auth/Registration/partnerRegistration")
);
const ForgotPassword = lazy(() =>
  import("pages/Auth/SignIn/forgotPassword/forgotpassword.jsx")
);
const ResetPassword = lazy(() =>
  import("pages/Auth/SignIn/resetPassword/resetPassword.jsx")
);
const SignIn = lazy(() => import("pages/Auth/SignIn/SignIn"));
const UserRegistration = lazy(() =>
  import("../pages/Auth/Registration/userRegistration")
);
const ResellerRegistration = lazy(() =>
  import("../pages/Auth/Registration/resellerRegistration")
);

const routes = [
  {
    path: "/testing",
    exact: true,
    component: Home,
    protected: false,
  },
  {
    path: "/account-type",
    exact: true,
    component: AccountType,
    protected: false,
  },
  {
    path: "/emailsuccess",
    exact: true,
    component: EmailSuccess,
    protected: false,
  },
  {
    path: "/emailverify",
    exact: true,
    component: EmailVerify,
    protected: false,
  },
  {
    path: "/resetsuccess",
    exact: true,
    component: ResetSuccess,
    protected: false,
  },
  {
    path: "/resetverify",
    exact: true,
    component: ResetVerify,
    protected: false,
  },
  {
    path: "/partner",
    exact: true,
    component: PartnerRegistration,
    protected: false,
  },
  {
    path: "/user",
    exact: true,
    component: UserRegistration,
    protected: false,
  },
  {
    path: "/reseller",
    exact: true,
    component: ResellerRegistration,
    protected: false,
  },
  {
    path: "/forgotpassword",
    exact: true,
    component: ForgotPassword,
    protected: false,
  },
  {
    path: "/login",
    exact: true,
    component: SignIn,
    protected: false,
  },
  {
    path: "/resetpassword",
    exact: true,
    component: ResetPassword,
    protected: false,
  },
];

export default routes;
