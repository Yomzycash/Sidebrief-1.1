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
import AllBusinesses from "pages/Dashboard/User/Business/AllBusinesses";
import Test from "pages/Test";
import DraftApplications from "pages/Dashboard/User/Business/DraftApplications";
import PendingApplications from "pages/Dashboard/User/Business/PendingApplications";
import StaffBusinesses from "pages/Dashboard/staffDashboard/Businesses";
import CountryDetailLayout from "pages/Dashboard/staffDashboard/Businesses/Countries/CountryDetail/layout";
import CountryDetails from "pages/Dashboard/staffDashboard/Businesses/Countries/CountryDetail/CountryDetails";
import CountryEntities from "pages/Dashboard/staffDashboard/Businesses/Countries/CountryDetail/CountryEntities";
import Countries from "pages/Dashboard/staffDashboard/Businesses/Countries/Countries";
import Registrationlayout from "pages/Dashboard/staffDashboard/Businesses/BusinessRegistration/layout";
import All from "pages/Dashboard/staffDashboard/Businesses/BusinessRegistration/All";
import Awaiting from "pages/Dashboard/staffDashboard/Businesses/BusinessRegistration/AwaitingApproval";
import InProgress from "pages/Dashboard/staffDashboard/Businesses/BusinessRegistration/InProgress";
import Completed from "pages/Dashboard/staffDashboard/Businesses/BusinessRegistration/Completed";
import StaffEntities from "pages/Dashboard/staffDashboard/Businesses/StaffEntities/StaffEntities";
import StaffReward from "pages/Dashboard/staffDashboard/Reward";
import StaffRewardDetails from "pages/Dashboard/staffDashboard/Reward/Details";
import StaffRewardAnalytics from "pages/Dashboard/staffDashboard/Reward/Analytics";
import StaffRewardAnalyticsPage from "pages/Dashboard/staffDashboard/Reward/Analytics";
import StaffRewardDetailsPage from "pages/Dashboard/staffDashboard/Reward/Details";
import StaffAllRewards from "pages/Dashboard/staffDashboard/Reward/AllRewards";
import StaffSettings from "pages/Dashboard/staffDashboard/Settings";
import StaffGeneral from "pages/Dashboard/staffDashboard/Settings/general";
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
const BusinessInfo = lazy(() => import("pages/Launch/BusinessInfo"));
const EntitySelect = lazy(() => import("pages/Launch/EntitySelect"));
const ShareHoldersInfo = lazy(() => import("pages/Launch/ShareHoldersInfo"));
const DirectorsInfo = lazy(() => import("pages/Launch/DirectorsInfo"));
const BeneficiariesInfo = lazy(() => import("pages/Launch/BeneficiariesInfo"));
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
const BusinessDetailLayout = lazy(() =>
  import("pages/Dashboard/User/Business/Detail/layout")
);
const BusinessDetail = lazy(() =>
  import("pages/Dashboard/User/Business/Detail")
);
const DetailShareholders = lazy(() =>
  import("pages/Dashboard/User/Business/Detail/shareholders")
);
const DetailDirectors = lazy(() =>
  import("pages/Dashboard/User/Business/Detail/directors")
);
const DetailBeneficiaries = lazy(() =>
  import("pages/Dashboard/User/Business/Detail/beneficiaries")
);
const SettingLayout = lazy(() =>
  import("pages/Dashboard/User/Settings/layout")
);
const StaffSettingLayout = lazy(() =>
  import("pages/Dashboard/staffDashboard/Settings/layout")
);
const NotificationSettings = lazy(() =>
  import("pages/Dashboard/User/Settings/notification")
);
const StaffNotificationSettings = lazy(() =>
  import("pages/Dashboard/staffDashboard/Settings/notification")
);
const StaffGeneralSettings = lazy(() =>
  import("pages/Dashboard/staffDashboard/Settings/general")
);

const AppRouter = () => {
  const userData = useSelector((store) => store.UserDataReducer);
  const launchData = useSelector((store) => store.LaunchReducer.launchResponse);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  let token = userInfo?.token;
  let user_token = userInfo?.user_token;

  const launchInfo = JSON.parse(localStorage.getItem("launchInfo"));
  const entityLaunchCode = launchInfo?.launchCode;
  //const selectedCountryISO = JSON.parse(localStorage.getItem('country'))?.ISO
  const selectedCountryISO = localStorage.getItem("countryISO");

  const [isLoggedIn, setisLoggedIn] = useState(
    token?.length > 0 || user_token > 0
  );
  const [launchCode, setLaunchCode] = useState(entityLaunchCode);
  const [countryISO, setCountryISO] = useState(selectedCountryISO);

  const loggedIn = token?.length > 0 || user_token > 0;
  useEffect(() => {
    setisLoggedIn(loggedIn);
  }, [loggedIn, userData.userInfo]);

  useEffect(() => {
    setLaunchCode(entityLaunchCode);
  }, [entityLaunchCode, launchData.launchCode]);

  const allowLaunch = launchCode && countryISO;

  useEffect(() => {
    setisLoggedIn(loggedIn);
  }, [loggedIn]);

  useEffect(() => {
    setLaunchCode(entityLaunchCode);
  }, [entityLaunchCode]);

  useEffect(() => {
    setCountryISO(selectedCountryISO);
  }, [selectedCountryISO, launchData.registrationCountry]);

  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route path="test" element={<Test />} />

            <Route path="staff-dashboard" element={<Outlet />}>
              <Route index element={<StaffDashboard />} />
              <Route path="home" element={<StaffDashboard />} />
              <Route path="businesses" element={<Outlet />}>
                <Route index element={<StaffBusinesses />} />
                <Route path="registration" element={<Outlet />}>
                  <Route element={<Registrationlayout />}>
                    <Route path="all" element={<All />} />
                    <Route path="awating-approval" element={<Awaiting />} />
                    <Route path="in-progress" element={<InProgress />} />
                    <Route path="completed" element={<Completed />} />
                  </Route>
                </Route>
                <Route path="entities" element={<Outlet />}>
                  <Route index element={<StaffEntities />} />
                </Route>

                <Route path="countries" element={<Outlet />}>
                  <Route index element={<Countries />} />
                  <Route element={<CountryDetailLayout />}>
                    <Route path="countrydetail" element={<CountryDetails />} />
                    <Route
                      path="entitydetail"
                      element={<CountryEntities />}
                    ></Route>
                  </Route>
                </Route>
              </Route>
              <Route path="all-rewards" element={<Outlet />}>
                <Route index element={<StaffAllRewards />} />
                <Route path="reward" element={<StaffReward />}>
                  <Route path="details" element={<StaffRewardDetailsPage />} />
                  <Route
                    path="analytics"
                    element={<StaffRewardAnalyticsPage />}
                  />
                </Route>
              </Route>
              <Route path="settings" element={<StaffSettingLayout />}>
                <Route path="general" element={<StaffGeneral />} />
                <Route path="notification" element={<NotificationSettings />} />
                <Route path="general" element={<StaffGeneralSettings />} />
                <Route
                  path="notification"
                  element={<StaffNotificationSettings />}
                />
                <Route path="user-permissions" element={<Settings />} />
                <Route path="team" element={<Settings />} />
              </Route>
            </Route>

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
              <Route path="settings" element={<SettingLayout />}>
                <Route path="general" element={<Settings />} />
                <Route path="account" element={<Settings />} />
                <Route path="security" element={<Settings />} />
                <Route path="notification" element={<NotificationSettings />} />
                <Route path="others" element={<Settings />} />
              </Route>
              <Route path="resources" element={<Resources />}></Route>
              <Route path="businesses" element={<Business />}>
                <Route index element={<AllBusinesses />} />
                <Route
                  path="all-businesses"
                  element={<AllBusinesses />}
                ></Route>
                <Route
                  path="submitted-applications"
                  element={<PendingApplications />}
                ></Route>
                <Route
                  path="draft-applications"
                  element={<DraftApplications />}
                ></Route>
              </Route>
              <Route path="business/:code" element={<BusinessDetailLayout />}>
                <Route path="detail" element={<BusinessDetail />} />
                <Route path="shareholders" element={<DetailShareholders />} />
                <Route path="directors" element={<DetailDirectors />} />
                <Route path="beneficiaries" element={<DetailBeneficiaries />} />
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
            {/* <Route path="dashboard-staff" element={<StaffDashboard />}></Route> */}
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
                  <Protected isVerified={allowLaunch} path="/launch">
                    <BusinessAddress />
                  </Protected>
                }
              />
              <Route
                path="shareholders-info"
                element={
                  <Protected isVerified={allowLaunch} path="/launch">
                    <ShareHoldersInfo />
                  </Protected>
                }
              />
              <Route
                path="directors-info"
                element={
                  <Protected isVerified={allowLaunch} path="/launch">
                    <DirectorsInfo />
                  </Protected>
                }
              />
              <Route
                path="beneficiaries-info"
                element={
                  <Protected isVerified={allowLaunch} path="/launch">
                    <BeneficiariesInfo />
                  </Protected>
                }
              />
              <Route
                path="beneficiaries-kyc"
                element={
                  <Protected isVerified={allowLaunch} path="/launch">
                    <BeneficiariesKYC />
                  </Protected>
                }
              />
              <Route
                path="sharehholders-kyc"
                element={
                  <Protected isVerified={allowLaunch} path="/launch">
                    <ShareHolderKYC />
                  </Protected>
                }
              />
              <Route
                path="directors-kyc"
                element={
                  <Protected isVerified={allowLaunch} path="/launch">
                    <DirectorKYC />
                  </Protected>
                }
              />

              <Route
                path="/launch/review-beneficiary"
                element={
                  <Protected isVerified={allowLaunch} path="/launch">
                    <BeneficiaryReview />
                  </Protected>
                }
              />
              <Route
                path="/launch/review"
                element={
                  <Protected isVerified={allowLaunch} path="/launch">
                    <BusinessInformationReview />
                  </Protected>
                }
              />
              <Route
                path="/launch/review-director"
                element={
                  <Protected isVerified={allowLaunch} path="/launch">
                    <DirectorReview />
                  </Protected>
                }
              />
              <Route
                path="/launch/review-shareholder"
                element={
                  <Protected isVerified={allowLaunch} path="/launch">
                    <ShareholderReview />
                  </Protected>
                }
              />
              <Route
                path="/launch/review-success"
                element={
                  <Protected isVerified={allowLaunch} path="/launch">
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
              margin: "10px",
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
