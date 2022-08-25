import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Loader from "../components/loader/loader";
const Home = lazy(() => import("../pages/Home"));
const EmailSuccess = lazy(() =>
  import("pages/Auth/Registration/EmailVerify/success")
);
const EmailVerify = lazy(() =>
  import("pages/Auth/Registration/EmailVerify/verify")
);
const ResetSuccess = lazy(() =>
  import("pages/Auth/SignIn/resetVerify/success")
);
const ResetVerify = lazy(() => import("pages/Auth/SignIn/resetVerify/verify"));
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
  import("../pages/Auth/Registration/ResellerRegister")
);

const AppRouter = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route index element={<Home />} />
            <Route path="register" element={<Outlet />}>
              <Route index element={<AccountType />} />
              <Route path="user" element={<Outlet />}>
                <Route index element={<UserRegistration />} />
                <Route path="verifyotp" element={<Outlet />}>
                  <Route index element={<EmailVerify />} />
                  <Route path="success" element={<EmailSuccess />} />
                </Route>
              </Route>
              <Route path="reseller" element={<Outlet />}>
                <Route index element={<ResellerRegistration />} />
                <Route path="verifyotp" element={<Outlet />}>
                  <Route index element={<EmailVerify />} />
                  <Route path="success" element={<EmailSuccess />} />
                </Route>
              </Route>
              <Route path="partner" element={<Outlet />}>
                <Route index element={<PartnerRegistration />} />
                <Route path="verifyotp" element={<Outlet />}>
                  <Route index element={<EmailVerify />} />
                  <Route path="success" element={<EmailSuccess />} />
                </Route>
              </Route>
            </Route>
            <Route path="login" element={<Outlet />}>
              <Route index element={<SignIn />} />
              <Route path="forgotpassword" element={<Outlet />}>
                <Route index element={<ForgotPassword />} />
                <Route path="resetpassword" element={<Outlet />}>
                  <Route index element={<ResetPassword />} />
                  <Route path="verifyotp" element={<Outlet />}>
                    <Route index element={<ResetVerify />} />
                    <Route path="success" element={<ResetSuccess />} />
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </Suspense>
    // <Suspense fallback={<Loader />}>
    //   <Router>
    //     <Routes>
    //       <Route path="/" element={<Outlet />}>
    //         <Route index element={<Home />} />
    //         <Route path="register" element={<Outlet />}>
    //           <Route index element={<AccountType />} />
    //           <Route path="user" element={<Outlet />}>
    //             <Route index element={<UserRegistration />} />
    //             <Route path="verifyotp" element={<Outlet />}>
    //               <Route index element={<EmailVerify />} />
    //               <Route path="success" element={<EmailSuccess />} />
    //             </Route>
    //           </Route>
    //           <Route path="reseller" element={<Outlet />}>
    //             <Route index element={<ResellerRegistration />} />
    //             <Route path="verifyotp" element={<Outlet />}>
    //               <Route index element={<EmailVerify />} />
    //               <Route path="success" element={<EmailSuccess />} />
    //             </Route>
    //           </Route>
    //           <Route path="partner" element={<Outlet />}>
    //             <Route index element={<PartnerRegistration />} />
    //             <Route path="verifyotp" element={<Outlet />}>
    //               <Route index element={<EmailVerify />} />
    //               <Route path="success" element={<EmailSuccess />} />
    //             </Route>
    //           </Route>
    //         </Route>
    //         <Route path="login" element={<Outlet />}>
    //           <Route index element={<SignIn />} />
    //           <Route path="forgotpassword" element={<Outlet />}>
    //             <Route index element={<ForgotPassword />} />
    //             <Route path="resetpassword" element={<Outlet />}>
    //               <Route index element={<ResetPassword />} />
    //               <Route path="verifyotp" element={<Outlet />}>
    //                 <Route index element={<ResetVerify />} />
    //                 <Route path="success" element={<ResetSuccess />} />
    //               </Route>
    //             </Route>
    //           </Route>
    //         </Route>
    //       </Route>
    //     </Routes>
    //   </Router>
    // </Suspense>
  );
};

export default AppRouter;

// {routes.map((item, index) => (
//   <Route
//     key={index}
//     path={item.path}
//     exact={item.exact}
//     element={<item.component />}
//   />
// ))}
