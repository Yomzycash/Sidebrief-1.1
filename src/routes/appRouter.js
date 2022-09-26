import RewardsPage from "pages/Dashboard/User/Rewards";
import AllRewards from "pages/Dashboard/User/Rewards/AllRewards";
import MyRewards from "pages/Dashboard/User/Rewards/MyRewards";
import RewardDetails from "pages/Dashboard/User/Rewards/RewardDetails";
import ShareHolderKYC from "pages/Launch/ShareHolderKYC";
import React, { Suspense, lazy } from "react";
import { Toaster } from "react-hot-toast";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Loader from "../components/loader/loader";
import Compliance from "pages/Dashboard/User/Home/Compliance";
import HiringAndPayroll from "pages/Dashboard/User/Home/HiringAndPayroll";
import InetellectualAssets from "pages/Dashboard/User/Home/IntellectualAssets";
import Taxes from "pages/Dashboard/User/Home/Taxes";
import Rewards from "pages/Dashboard/User/Rewards";
import PaymentPage from "pages/Launch/PaymentPage";

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
const UserDashboard = lazy(() => import("pages/Dashboard/User"));
const BusinessRegistration = lazy(() =>
  import("pages/Dashboard/User/Home/BusinessRegistration")
);
const StaffDashboard = lazy(() => import("pages/Dashboard/staffDashboard"));
const BusinessAddress = lazy(() => import("pages/Launch/BusinessAddress"));
const BusinessForm = lazy(() => import("pages/Launch/BusinessForm"));
const BusinessInfo = lazy(() => import("pages/Launch/BusinessInfo"));
const EntitySelect = lazy(() => import("pages/Launch/EntitySelect"));
const ShareHoldersInfo = lazy(() => import("pages/Launch/ShareHoldersInfo"));
const DirectorsInfo = lazy(() => import("pages/Launch/DirectorsInfo"));
const BeneficiariesInfo = lazy(() => import("pages/Launch/BeneficiariesInfo"));
const ReviewInformation = lazy(() => import("pages/Launch/Review"));
const BeneficiariesKYC = lazy(() => import("pages/Launch/BeneficiariesKYC"));

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
                <Route path="verifyotp" element={<Outlet />}>
                  <Route index element={<ResetVerify />} />
                  <Route path="resetpassword" element={<Outlet />}>
                    <Route index element={<ResetPassword />} />
                    <Route path="success" element={<ResetSuccess />} />
                  </Route>
                </Route>
              </Route>
            </Route>
            <Route path="dashboard" element={<UserDashboard />}>
              <Route index element={<BusinessRegistration />} />
              <Route
                path="business-registration"
                element={<BusinessRegistration />}
              />
              <Route path="compliance" element={<Compliance />}></Route>
              <Route
                path="hiring-and-payroll"
                element={<HiringAndPayroll />}
              ></Route>
              <Route
                path="intellectualAssets"
                element={<InetellectualAssets />}
              ></Route>
              <Route path="taxes" element={<Taxes />}></Route>
              <Route path="rewards" element={<Rewards />}>
                <Route index element={<AllRewards />} />
                <Route path="all-rewards" element={<AllRewards />}></Route>
                <Route path="my-rewards" element={<MyRewards />}></Route>
                <Route path=":rewardID" element={<RewardDetails />} />
              </Route>
              <Route path="reward-details" element={<RewardDetails />} />
            </Route>
            <Route path="dashboard-staff" element={<StaffDashboard />}></Route>
            <Route path="launch" element={<Outlet />}>
              <Route index element={<BusinessInfo />} />
              <Route path="business-info" element={<BusinessInfo />} />
              <Route path="entity" element={<EntitySelect />} />
              <Route path="payment" element={<PaymentPage />} />
              <Route path="address" element={<BusinessAddress />} />
              {/* <Route path="form-info" element={<BusinessForm />} /> */}
              <Route path="shareholders-info" element={<ShareHoldersInfo />} />
              <Route path="directors-info" element={<DirectorsInfo />} />
              <Route
                path="beneficiaries-info"
                element={<BeneficiariesInfo />}
              />
              <Route path="review" element={<ReviewInformation />} />
              <Route path="beneficiaries-kyc" element={<BeneficiariesKYC />} />
              <Route path="sharehholders-kyc" element={<ShareHolderKYC />} />
            </Route>
          </Route>
        </Routes>
        <Toaster
          position="top-right"
          toastOptions={{
            className: "",
            style: {
              margin: "30px",
              padding: "10px",
              display: "inline-flex",
              fontSize: "14px",
              zIndex: 999999,
            },
            duration: 4000,
            error: {
              style: {
                background: "#ff6363",
                color: "white",
              },
              iconTheme: {
                primary: "white",
                secondary: "red",
              },
            },
            success: {
              style: {
                background: "green",
                color: "white",
              },
              iconTheme: {
                primary: "white",
                secondary: "green",
              },
            },
          }}
        />
      </Router>
    </Suspense>
  );
};

export default AppRouter;

// import RewardsPage from "pages/Dashboard/User/Rewards";
// import AllRewards from "pages/Dashboard/User/Rewards/AllRewards";
// import MyRewards from "pages/Dashboard/User/Rewards/MyRewards";
// import RewardDetails from "pages/Dashboard/RewardDetails";
// import ShareHolderKYC from "pages/Launch/ShareHolderKYC";
// import React, { Suspense, lazy } from "react";
// import { Toaster } from "react-hot-toast";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Outlet,
// } from "react-router-dom";
// import Loader from "../components/loader/loader";

// const Home = lazy(() => import("../pages/Home"));
// const EmailSuccess = lazy(() =>
//   import("pages/Auth/Registration/EmailVerify/success")
// );
// const EmailVerify = lazy(() =>
//   import("pages/Auth/Registration/EmailVerify/verify")
// );
// const ResetSuccess = lazy(() =>
//   import("pages/Auth/SignIn/resetVerify/success")
// );
// const ResetVerify = lazy(() => import("pages/Auth/SignIn/resetVerify/verify"));
// const AccountType = lazy(() =>
//   import("pages/Auth/Registration/accountType/accountType")
// );
// const PartnerRegistration = lazy(() =>
//   import("pages/Auth/Registration/partnerRegistration")
// );
// const ForgotPassword = lazy(() =>
//   import("pages/Auth/SignIn/forgotPassword/forgotpassword.jsx")
// );
// const ResetPassword = lazy(() =>
//   import("pages/Auth/SignIn/resetPassword/resetPassword.jsx")
// );
// const SignIn = lazy(() => import("pages/Auth/SignIn/SignIn"));
// const UserRegistration = lazy(() =>
//   import("../pages/Auth/Registration/userRegistration")
// );
// const ResellerRegistration = lazy(() =>
//   import("../pages/Auth/Registration/ResellerRegister")
// );
// const UserDashboard = lazy(() => import("pages/Dashboard/User/Home"));
// const BusinessRegistration = lazy(() =>
//   import("pages/Dashboard/User/Home/BusinessRegistration")
// );
// const StaffDashboard = lazy(() => import("pages/Dashboard/staffDashboard"));
// const BusinessAddress = lazy(() => import("pages/Launch/BusinessAddress"));
// const BusinessForm = lazy(() => import("pages/Launch/BusinessForm"));
// const BusinessInfo = lazy(() => import("pages/Launch/BusinessInfo"));
// const EntitySelect = lazy(() => import("pages/Launch/EntitySelect"));
// const ShareHoldersInfo = lazy(() => import("pages/Launch/ShareHoldersInfo"));
// const DirectorsInfo = lazy(() => import("pages/Launch/DirectorsInfo"));
// const BeneficiariesInfo = lazy(() => import("pages/Launch/BeneficiariesInfo"));
// const ReviewInformation = lazy(() => import("pages/Launch/Review"));
// const BeneficiariesKYC = lazy(() => import("pages/Launch/BeneficiariesKYC"));

// const AppRouter = () => {
//   return (
//     <Suspense fallback={<Loader />}>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Outlet />}>
//             <Route index element={<Home />} />
//             <Route path="register" element={<Outlet />}>
//               <Route index element={<AccountType />} />
//               <Route path="user" element={<Outlet />}>
//                 <Route index element={<UserRegistration />} />
//                 <Route path="verifyotp" element={<Outlet />}>
//                   <Route index element={<EmailVerify />} />
//                   <Route path="success" element={<EmailSuccess />} />
//                 </Route>
//               </Route>
//               <Route path="reseller" element={<Outlet />}>
//                 <Route index element={<ResellerRegistration />} />
//                 <Route path="verifyotp" element={<Outlet />}>
//                   <Route index element={<EmailVerify />} />
//                   <Route path="success" element={<EmailSuccess />} />
//                 </Route>
//               </Route>
//               <Route path="partner" element={<Outlet />}>
//                 <Route index element={<PartnerRegistration />} />
//                 <Route path="verifyotp" element={<Outlet />}>
//                   <Route index element={<EmailVerify />} />
//                   <Route path="success" element={<EmailSuccess />} />
//                 </Route>
//               </Route>
//             </Route>
//             <Route path="login" element={<Outlet />}>
//               <Route index element={<SignIn />} />
//               <Route path="forgotpassword" element={<Outlet />}>
//                 <Route index element={<ForgotPassword />} />
//                 <Route path="verifyotp" element={<Outlet />}>
//                   <Route index element={<ResetVerify />} />
//                   <Route path="resetpassword" element={<Outlet />}>
//                     <Route index element={<ResetPassword />} />
//                     <Route path="success" element={<ResetSuccess />} />
//                   </Route>
//                 </Route>
//               </Route>
//             </Route>
//             <Route path="dashboard" element={<UserDashboard />}>
//               <Route index element={<BusinessRegistration />} />
//               {/* <Route
//                 path="business-registration"
//                 element={<BusinessRegistration />}
//               /> */}
//               <Route path="staff" element={<StaffDashboard />} />
//               <Route path="reward-details" element={<RewardDetails />} />

//               {/* <Route path="partner" element={<PartnerDashboard />} />
//               <Route path="partner" element={<StaffDashboard />} />
//               <Route path="partner" element={<DeveloperDashboard />} /> */}
//             </Route>
//             <Route path="launch" element={<Outlet />}>
//               <Route index element={<BusinessInfo />} />
//               <Route path="business-info" element={<BusinessInfo />} />
//               <Route path="entity" element={<EntitySelect />} />
//               <Route path="address" element={<BusinessAddress />} />
//               {/* <Route path="form-info" element={<BusinessForm />} /> */}
//               <Route path="shareholders-info" element={<ShareHoldersInfo />} />
//               <Route path="directors-info" element={<DirectorsInfo />} />
//               <Route
//                 path="beneficiaries-info"
//                 element={<BeneficiariesInfo />}
//               />
//               <Route path="review" element={<ReviewInformation />} />
//               <Route path="beneficiaries-kyc" element={<BeneficiariesKYC />} />
//               <Route path="sharehholders-kyc" element={<ShareHolderKYC />} />
//             </Route>
//             <Route path="rewards" element={<RewardsPage />}>
//               <Route index element={<AllRewards />} />
//               <Route path="all-rewards" element={<AllRewards />} />
//               <Route path="my-rewards" element={<MyRewards />} />
//               <Route path="details" element={<RewardDetails />} />
//             </Route>
//           </Route>
//         </Routes>
//         <Toaster
//           position="top-right"
//           toastOptions={{
//             className: "",
//             style: {
//               margin: "30px",
//               minWidth: "370px",
//               padding: "10px",
//               display: "inline-flex",
//               fontSize: "18px",
//               zIndex: 999999,
//             },
//             duration: 4000,
//             error: {
//               style: {
//                 background: "red",
//                 color: "white",
//               },
//               iconTheme: {
//                 primary: "white",
//                 secondary: "red",
//               },
//             },
//             success: {
//               style: {
//                 background: "green",
//                 color: "white",
//               },
//               iconTheme: {
//                 primary: "white",
//                 secondary: "green",
//               },
//             },
//           }}
//         />
//       </Router>
//     </Suspense>
//   );
// };

// export default AppRouter;
