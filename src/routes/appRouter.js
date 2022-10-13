import React, { Suspense, lazy, useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Loader from "../components/loader/loader";
import { useSelector } from "react-redux";
import Protected from "./Protected";
import ApplicationSuccessPage from "pages/Launch/ApplicationSuccessPage";
import Settings from "pages/Dashboard/User/Settings";
import Resources from "pages/Dashboard/User/Resources";
import Business from "pages/Dashboard/User/Business";
import BankAccount from "pages/Dashboard/User/BankAccount";
import Application from "pages/Dashboard/User/Application";
import PendingApplications from "pages/Dashboard/User/Business/PendingApplications";
import AllBusinesses from "pages/Dashboard/User/Business/AllBusinesses";
import Test from "pages/Test";
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
const AllRewards = lazy(() =>
  import("pages/Dashboard/User/Rewards/AllRewards")
);
const MyRewards = lazy(() => import("pages/Dashboard/User/Rewards/MyRewards"));
const RewardDetails = lazy(() =>
  import("pages/Dashboard/User/Rewards/RewardDetails")
);
const ShareHolderKYC = lazy(() => import("pages/Launch/ShareHolderKYC"));
const Compliance = lazy(() => import("pages/Dashboard/User/Home/Compliance"));
const HiringAndPayroll = lazy(() =>
  import("pages/Dashboard/User/Home/HiringAndPayroll")
);
const InetellectualAssets = lazy(() =>
  import("pages/Dashboard/User/Home/IntellectualAssets")
);
const Taxes = lazy(() => import("pages/Dashboard/User/Home/Taxes"));
const Rewards = lazy(() => import("pages/Dashboard/User/Rewards"));
const PaymentPage = lazy(() => import("pages/Launch/PaymentPage"));
const BeneficiaryReview = lazy(() =>
  import("pages/Launch/Review/BeneficiaryReview")
);
const BusinessInformationReview = lazy(() =>
  import("pages/Launch/Review/BusinessInformationReview/Index")
);
const DirectorReview = lazy(() =>
  import("pages/Launch/Review/DirectorReview/Index")
);
const ShareholderReview = lazy(() =>
  import("pages/Launch/Review/ShareholderReview/Index")
);
const DirectorKYC = lazy(() => import("pages/Launch/DirectorsKYC"));

const AppRouter = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  let token = userInfo?.token;
  let user_token = userInfo?.user_token;
  const loggedIn = token?.length > 0 || user_token > 0;

  const launchInfo = JSON.parse(localStorage.getItem("launchInfo"));
  let entityLaunchCode = launchInfo?.launchCode;
  let selectedCountryISO = localStorage.getItem("countryISO");

  const [isLoggedIn, setisLoggedIn] = useState(loggedIn);
  const [launchCode, setLaunchCode] = useState(entityLaunchCode);
  const [countryISO, setCountryISO] = useState(selectedCountryISO);

  useEffect(() => {
    setisLoggedIn(loggedIn);
  }, [loggedIn]);

  useEffect(() => {
    setLaunchCode(entityLaunchCode);
  }, [entityLaunchCode]);

  useEffect(() => {
    setCountryISO(selectedCountryISO);
  }, [selectedCountryISO]);

  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route path="test" element={<Test />} />
            <Route
              index
              element={
                <Protected isVerified={isLoggedIn}>
                  <Home />
                </Protected>
              }
            />
            <Route path="register" element={<Outlet />}>
              <Route index element={<AccountType />} />
              <Route path="user" element={<Outlet />}>
                <Route index element={<UserRegistration />} />
                <Route path="success" element={<EmailSuccess />} />
              </Route>
              <Route path="reseller" element={<ResellerRegistration />} />
              <Route path="partner" element={<PartnerRegistration />} />
            </Route>
            <Route path="login" element={<Outlet />}>
              <Route index element={<SignIn />} />
              <Route path="verifyaccount" element={<EmailVerify />} />

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
            <Route
              path="dashboard"
              element={
                <Protected isVerified={isLoggedIn}>
                  <UserDashboard />
                </Protected>
              }
            >
              <Route index element={<BusinessRegistration />} />
              <Route
                path="business-registration"
                element={<BusinessRegistration />}
              />
              <Route path="application" element={<Application />}></Route>
              <Route path="bank-account" element={<BankAccount />}></Route>
              <Route path="settings" element={<Settings />}></Route>
              <Route path="resources" element={<Resources />}></Route>
              <Route path="businesses" element={<Business />}>
                <Route index element={<AllBusinesses />} />
                <Route
                  path="all-businesses"
                  element={<AllBusinesses />}
                ></Route>
                <Route
                  path="pending-applications"
                  element={<PendingApplications />}
                ></Route>
              </Route>
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
            <Route
              path="launch"
              element={
                <Protected isVerified={isLoggedIn}>
                  <Outlet />
                </Protected>
              }
            >
              <Route index element={<BusinessInfo />} />
              <Route path="business-info" element={<BusinessInfo />} />
              <Route path="entity" element={<EntitySelect />} />
              <Route
                path="payment"
                element={
                  <Protected isVerified={launchCode} path="/launch">
                    <PaymentPage />
                  </Protected>
                }
              />
              <Route
                path="address"
                element={
                  <Protected
                    isVerified={launchCode && countryISO}
                    path="/launch"
                  >
                    <BusinessAddress />
                  </Protected>
                }
              />
              <Route
                path="shareholders-info"
                element={
                  <Protected
                    isVerified={launchCode && countryISO}
                    path="/launch"
                  >
                    <ShareHoldersInfo />
                  </Protected>
                }
              />
              <Route
                path="directors-info"
                element={
                  <Protected
                    isVerified={launchCode && countryISO}
                    path="/launch"
                  >
                    <DirectorsInfo />
                  </Protected>
                }
              />
              <Route
                path="beneficiaries-info"
                element={
                  <Protected
                    isVerified={launchCode && countryISO}
                    path="/launch"
                  >
                    <BeneficiariesInfo />
                  </Protected>
                }
              />
              <Route
                path="beneficiaries-kyc"
                element={
                  <Protected
                    isVerified={launchCode && countryISO}
                    path="/launch"
                  >
                    <BeneficiariesKYC />
                  </Protected>
                }
              />
              <Route
                path="sharehholders-kyc"
                element={
                  <Protected
                    isVerified={launchCode && countryISO}
                    path="/launch"
                  >
                    <ShareHolderKYC />
                  </Protected>
                }
              />
              <Route
                path="directors-kyc"
                element={
                  <Protected
                    isVerified={launchCode && countryISO}
                    path="/launch"
                  >
                    <DirectorKYC />
                  </Protected>
                }
              />

              <Route
                path="/launch/review-beneficiary"
                element={
                  <Protected
                    isVerified={launchCode && countryISO}
                    path="/launch"
                  >
                    <BeneficiaryReview />
                  </Protected>
                }
              />
              <Route
                path="/launch/review"
                element={
                  <Protected
                    isVerified={launchCode && countryISO}
                    path="/launch"
                  >
                    <BusinessInformationReview />
                  </Protected>
                }
              />
              <Route
                path="/launch/review-director"
                element={
                  <Protected
                    isVerified={launchCode && countryISO}
                    path="/launch"
                  >
                    <DirectorReview />
                  </Protected>
                }
              />
              <Route
                path="/launch/review-shareholder"
                element={
                  <Protected
                    isVerified={launchCode && countryISO}
                    path="/launch"
                  >
                    <ShareholderReview />
                  </Protected>
                }
              />
              <Route
                path="/launch/review-success"
                element={
                  <Protected
                    isVerified={launchCode && countryISO}
                    path="/launch"
                  >
                    <ApplicationSuccessPage />
                  </Protected>
                }
              />
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
