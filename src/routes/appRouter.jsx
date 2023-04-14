import React, { Suspense, lazy, useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/loader/loader";
import Protected from "./Protected";
import { checkStaffEmail } from "utils/globalFunctions";
import Test from "pages/Test";
import ServiceSuccessPage from "../pages/Services/ServiceSuccessPage";
import ServicesDetailLayout from "pages/Services/Detail/layout";
import ServiceInformation from "pages/Services/Detail/ServiceInformation";
import ReviewDocuments from "pages/Services/Review/ReviewDocuments";
import FormInformation from "pages/Services/Detail/FormInformation";
import DocumentInfoDetails from "pages/Services/Detail/DocumentInfoDetails";

const BankAccount = lazy(() => import("pages/Dashboard/User/BankAccount"));
const Resources = lazy(() => import("pages/Dashboard/User/Resources"));
const Business = lazy(() => import("pages/Dashboard/User/Business"));
const Application = lazy(() => import("pages/Dashboard/User/Application"));
const BankAccountDetails = lazy(() =>
  import("pages/Dashboard/User/BankAccount/BankAccountDetails")
);
const AllBusinesses = lazy(() => import("pages/Dashboard/User/Business/AllBusinesses"));
const DraftApplications = lazy(() => import("pages/Dashboard/User/Business/DraftApplications"));
const PendingApplications = lazy(() => import("pages/Dashboard/User/Business/PendingApplications"));
const StaffBusinesses = lazy(() => import("pages/Dashboard/staffDashboard/Businesses"));
const CountryDetailLayout = lazy(() =>
  import("pages/Dashboard/staffDashboard/Businesses/Countries/CountryDetail/layout")
);
const CountryDetails = lazy(() =>
  import("pages/Dashboard/staffDashboard/Businesses/Countries/CountryDetail/CountryDetails")
);
const CountryEntities = lazy(() =>
  import("pages/Dashboard/staffDashboard/Businesses/Countries/CountryDetail/CountryEntities")
);
const Countries = lazy(() =>
  import("pages/Dashboard/staffDashboard/Businesses/Countries/Countries")
);
const Registrationlayout = lazy(() =>
  import("pages/Dashboard/staffDashboard/Businesses/BusinessRegistration/layout")
);
const All = lazy(() =>
  import("pages/Dashboard/staffDashboard/Businesses/BusinessRegistration/All")
);
const Awaiting = lazy(() =>
  import("pages/Dashboard/staffDashboard/Businesses/BusinessRegistration/AwaitingApproval")
);
const InProgress = lazy(() =>
  import("pages/Dashboard/staffDashboard/Businesses/BusinessRegistration/InProgress")
);
const Completed = lazy(() =>
  import("pages/Dashboard/staffDashboard/Businesses/BusinessRegistration/Completed")
);
const StaffEntities = lazy(() =>
  import("pages/Dashboard/staffDashboard/Businesses/StaffEntities/StaffEntities")
);
const StaffReward = lazy(() => import("pages/Dashboard/staffDashboard/Reward"));
const StaffRewardAnalyticsPage = lazy(() =>
  import("pages/Dashboard/staffDashboard/Reward/Analytics")
);
const StaffRewardDetailsPage = lazy(() => import("pages/Dashboard/staffDashboard/Reward/Details"));
const StaffAllRewards = lazy(() => import("pages/Dashboard/staffDashboard/Reward/AllRewards"));
const AllBusinessesSummary = lazy(() => import("pages/Dashboard/staffDashboard/Businesses/All"));
const InProgressBusinessesSummary = lazy(() =>
  import("pages/Dashboard/staffDashboard/Businesses/InProgress")
);
const AwaitingBusinessesSummary = lazy(() =>
  import("pages/Dashboard/staffDashboard/Businesses/Awaiting")
);
const CompletedBusinessesSummary = lazy(() =>
  import("pages/Dashboard/staffDashboard/Businesses/Completed")
);
const Draft = lazy(() =>
  import("pages/Dashboard/staffDashboard/Businesses/BusinessRegistration/Draft")
);
const StaffComingSoon = lazy(() => import("pages/Dashboard/staffDashboard/comingSoonPage"));
const PaidDraft = lazy(() =>
  import("pages/Dashboard/staffDashboard/Businesses/BusinessRegistration/PaidDraft")
);

const StripePaymentSuccess = lazy(() =>
  import("pages/Launch/StripePaymentSuccess/StripePaymentSuccess")
);
const ServiceInfo = lazy(() => import("pages/Services/ServiceInfo"));
const ServiceForm = lazy(() => import("pages/Services/ServiceForm"));
const ServicePayment = lazy(() => import("pages/Services/Payment"));
const ServiceDocuments = lazy(() => import("pages/Services/Documents"));
const ServiceReview = lazy(() => import("pages/Services/Review"));
const ServiceInfoReview = lazy(() => import("pages/Services/Review/ServiceInfo"));
const ServiceFormReview = lazy(() => import("pages/Services/Review/ServiceForm"));
const ServiceDocumentsReview = lazy(() => import("pages/Services/Review/Documents"));

const Home = lazy(() => import("../pages/Home"));
const EmailSuccess = lazy(() => import("pages/Auth/Registration/EmailVerify/success"));
const EmailVerify = lazy(() => import("pages/Auth/Registration/EmailVerify/verify"));
const ResetSuccess = lazy(() => import("pages/Auth/SignIn/resetVerify/success"));
const ResetVerify = lazy(() => import("pages/Auth/SignIn/resetVerify/verify"));
const AccountType = lazy(() => import("pages/Auth/Registration/accountType/accountType"));
const PartnerRegistration = lazy(() => import("pages/Auth/Registration/partnerRegistration"));
const ForgotPassword = lazy(() => import("pages/Auth/SignIn/forgotPassword/forgotpassword.jsx"));
const ResetPassword = lazy(() => import("pages/Auth/SignIn/resetPassword/resetPassword.jsx"));
const SignIn = lazy(() => import("pages/Auth/SignIn/SignIn"));
const UserRegistration = lazy(() => import("../pages/Auth/Registration/userRegistration"));
const ResellerRegistration = lazy(() => import("../pages/Auth/Registration/ResellerRegister"));
const UserDashboard = lazy(() => import("pages/Dashboard/User"));
const BusinessRegistration = lazy(() => import("pages/Dashboard/User/Home/BusinessRegistration"));
const StaffDashboard = lazy(() => import("pages/Dashboard/staffDashboard"));
const BusinessInfo = lazy(() => import("pages/Launch/BusinessInfo"));

const EntitySelect = lazy(() => import("pages/Launch/EntitySelect"));
const ProtectedShareholdersInfo = lazy(() => import("./ProtectedLaunch/ShareholdersInfo"));
const ProtectedDirectorsInfo = lazy(() => import("./ProtectedLaunch/DirectorsInfo"));
const ProtectedBeneficiariesInfo = lazy(() => import("./ProtectedLaunch/BeneficiariesInfo"));
const ProtectedBeneficiariesKyc = lazy(() => import("./ProtectedLaunch/BeneficiariesKyc"));
const ProtectedShareholdersKyc = lazy(() => import("./ProtectedLaunch/ShareholdersKyc"));
const ProtectedDirectorsKyc = lazy(() => import("./ProtectedLaunch/DirectorsKyc"));
const ProtectedReview = lazy(() => import("./ProtectedLaunch/Review"));
const ProtectedBusinessAddress = lazy(() => import("./ProtectedLaunch/BusinessAddress"));
const ProtectedApplicationSuccess = lazy(() => import("./ProtectedLaunch/ApplicationSuccess"));

const AllRewards = lazy(() => import("pages/Dashboard/User/Rewards/AllRewards"));
const MyRewards = lazy(() => import("pages/Dashboard/User/Rewards/MyRewards"));
const RewardDetails = lazy(() => import("pages/Dashboard/User/Rewards/RewardDetails"));
const Compliance = lazy(() => import("pages/Dashboard/User/Home/Compliance"));
const HiringAndPayroll = lazy(() => import("pages/Dashboard/User/Home/HiringAndPayroll"));
const InetellectualAssets = lazy(() => import("pages/Dashboard/User/Home/IntellectualAssets"));
const Taxes = lazy(() => import("pages/Dashboard/User/Home/Taxes"));
const Rewards = lazy(() => import("pages/Dashboard/User/Rewards"));
const PaymentPage = lazy(() => import("pages/Launch/PaymentPage"));
const BeneficiaryReview = lazy(() => import("pages/Launch/Review/BeneficiaryReview"));
const BusinessInformationReview = lazy(() =>
  import("pages/Launch/Review/BusinessInformationReview/Index")
);
const DirectorReview = lazy(() => import("pages/Launch/Review/DirectorReview/Index"));
const ShareholderReview = lazy(() => import("pages/Launch/Review/ShareholderReview/Index"));
const BusinessDetailLayout = lazy(() => import("pages/Dashboard/User/Business/Detail/layout"));
const StaffBusinessDetailLayout = lazy(() =>
  import("pages/Dashboard/staffDashboard/Businesses/BusinessRegistration/Detail/layout")
);
const BusinessDetail = lazy(() => import("pages/Dashboard/User/Business/Detail"));
const BusinessPaymet = lazy(() => import("pages/Dashboard/User/Business/Detail/payment"));
const DetailShareholders = lazy(() => import("pages/Dashboard/User/Business/Detail/shareholders"));
const DetailDirectors = lazy(() => import("pages/Dashboard/User/Business/Detail/directors"));
const DetailBeneficiaries = lazy(() =>
  import("pages/Dashboard/User/Business/Detail/beneficiaries")
);
const UserSettingsLayout = lazy(() => import("pages/Dashboard/User/Settings/layout"));
const PersonalSettings = lazy(() => import("pages/Dashboard/User/Settings/personal"));
const PaymentSetting = lazy(() => import("pages/Dashboard/User/Settings/payment"));
const Stafflayout = lazy(() => import("pages/Dashboard/staffDashboard/layout"));
const StaffSettingLayout = lazy(() => import("pages/Dashboard/staffDashboard/Settings/layout"));
const NotificationSettings = lazy(() => import("pages/Dashboard/User/Settings/notification"));
const StaffNotificationSettings = lazy(() =>
  import("pages/Dashboard/staffDashboard/Settings/notification")
);
const StaffGeneralSettings = lazy(() => import("pages/Dashboard/staffDashboard/Settings/general"));

const SidebriefTeam = lazy(() => import("pages/Dashboard/staffDashboard/Settings/team"));

const Services = lazy(() => import("pages/Dashboard/staffDashboard/Businesses/Services/Service"));
const AllServices = lazy(() =>
  import("pages/Dashboard/staffDashboard/Businesses/Services/AllServices")
);
const ChatLayout = lazy(() => import("pages/Dashboard/staffDashboard/Businesses/Services/Chat"));
const UserServicesPageLayout = lazy(() => import("pages/Dashboard/User/Service/index"));
const UserServicesDraft = lazy(() => import("pages/Dashboard/User/Service/draft"));
const UserServicesAll = lazy(() => import("pages/Dashboard/User/Service/all"));
const UserServicesSubmitted = lazy(() => import("pages/Dashboard/User/Service/submitted"));
const AllComplyLayout = lazy(() =>
  import("pages/Dashboard/staffDashboard/Businesses/Services/AllComply")
);
const AllComply = lazy(() =>
  import("pages/Dashboard/staffDashboard/Businesses/Services/AllComply/all")
);

//

//

const AppRouter = () => {
  const userData = useSelector((store) => store.UserDataReducer);
  const { launchResponse, launchPaid } = useSelector((store) => store.LaunchReducer);

  // Get user information from local storage
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  let token = userInfo?.token;
  let user_token = userInfo?.user_token;
  let userEmail = localStorage.getItem("userEmail");
  let isStaff = checkStaffEmail(userEmail);
  const loggedIn = token?.length > 0 || user_token > 0;

  //

  // Get launch information from local storage
  const launchInfo = JSON.parse(localStorage.getItem("launchInfo"));
  const entityLaunchCode = launchInfo?.launchCode;
  const selectedCountryISO = localStorage.getItem("countryISO");
  const paymentDetails = JSON.parse(localStorage.getItem("paymentDetails"));
  let paidStatus = paymentDetails?.paymentStatus === "successful" ? true : false;

  //

  const [isLoggedIn, setisLoggedIn] = useState(token?.length > 0 || user_token > 0);
  const [launchCode, setLaunchCode] = useState(entityLaunchCode);
  const [countryISO, setCountryISO] = useState(selectedCountryISO);
  const [paid, setPaid] = useState(paidStatus);
  const [staff, setStaff] = useState(isStaff);

  //

  useEffect(() => {
    setisLoggedIn(loggedIn);
  }, [loggedIn, userData.userInfo]);

  useEffect(() => {
    let staffEmail = checkStaffEmail(userEmail);
    setStaff(staffEmail);
  }, [isLoggedIn]);

  //

  //
  useEffect(() => {
    setLaunchCode(entityLaunchCode);
    setCountryISO(selectedCountryISO);
    setPaid(paidStatus);
  }, [launchResponse, launchPaid]);

  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route path="test" element={<Test />} />

            {/* Protected home route */}
            <Route
              index
              element={
                <Protected isVerified={isLoggedIn}>
                  <Home />
                </Protected>
              }
            />

            {/* Autentication pages */}
            <Route
              path="register"
              element={
                <Protected isVerified={!loggedIn} redirect="/">
                  <Outlet />
                </Protected>
              }
            >
              <Route index element={<UserRegistration />} />
              {/* <Route path="user" element={<Outlet />}> */}
              {/* <Route index element={<UserRegistration />} /> */}
              <Route path="success" element={<EmailSuccess />} />
              {/* </Route> */}
              <Route path="reseller" element={<ResellerRegistration />} />
              <Route path="partner" element={<PartnerRegistration />} />
            </Route>

            <Route
              path="login"
              element={
                <Protected isVerified={!isLoggedIn} redirect="/">
                  <Outlet />
                </Protected>
              }
            >
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

            {/* User dashboard routes */}
            <Route
              path="dashboard"
              element={
                <Protected isVerified={isLoggedIn}>
                  <Protected isVerified={!isStaff} redirect="/staff-dashboard">
                    <UserDashboard />
                  </Protected>
                </Protected>
              }
            >
              <Route path="services" element={<UserServicesPageLayout />}>
                <Route path="all" element={<UserServicesAll />} />
                <Route path="draft" element={<UserServicesDraft />} />
                <Route path="submitted" element={<UserServicesSubmitted />} />
              </Route>
              <Route path="services/:complycode" element={<ServicesDetailLayout />}>
                <Route index element={<ServiceInformation />} />
                <Route path="info" element={<ServiceInformation />} />
                <Route path="forminfo" element={<FormInformation />} />
                <Route path="documentinfo" element={<DocumentInfoDetails />} />
              </Route>

              <Route index element={<BusinessRegistration />} />
              <Route path="business-registration" element={<BusinessRegistration />} />
              <Route path="application" element={<Application />}></Route>
              <Route path="bank-account" element={<Outlet />}>
                <Route index element={<BankAccount />} />
                <Route path=":bankCode" element={<BankAccountDetails />} />
              </Route>

              <Route path="business-registration" element={<BusinessRegistration />} />
              <Route path="settings" element={<UserSettingsLayout />}>
                <Route index element={<PersonalSettings />} />
                <Route path="personal" element={<PersonalSettings />} />
                <Route path="payment" element={<PaymentSetting />} />
              </Route>
              <Route path="resources" element={<Resources />}></Route>
              <Route path="businesses" element={<Business />}>
                <Route index element={<AllBusinesses />} />
                <Route path="all-businesses" element={<AllBusinesses />}></Route>
                <Route path="submitted-applications" element={<PendingApplications />}></Route>
                <Route path="draft-applications" element={<DraftApplications />}></Route>
                <Route path="chats" element={<ChatLayout />} />
              </Route>
              <Route path="business" element={<BusinessDetailLayout />}>
                <Route path="detail" element={<BusinessDetail />} />
                <Route path="payment" element={<BusinessPaymet />} />
                <Route path="shareholders" element={<DetailShareholders />} />
                <Route path="directors" element={<DetailDirectors />} />
                <Route path="beneficiaries" element={<DetailBeneficiaries />} />
              </Route>

              <Route path="compliance" element={<Compliance />}></Route>
              <Route path="hiring-and-payroll" element={<HiringAndPayroll />}></Route>
              <Route path="intellectualAssets" element={<InetellectualAssets />}></Route>
              <Route path="taxes" element={<Taxes />}></Route>
              <Route path="rewards" element={<Rewards />}>
                <Route index element={<AllRewards />} />
                <Route path="all-rewards" element={<AllRewards />}></Route>
                <Route path="my-rewards" element={<MyRewards />}></Route>
                <Route path="details" element={<RewardDetails />} />
                <Route path=":rewardID" element={<RewardDetails />} />
              </Route>

              <Route path="reward-details" element={<RewardDetails />} />
            </Route>

            {/* Staff dashboard routes */}
            <Route
              path="staff-dashboard"
              element={
                <Protected isVerified={isLoggedIn}>
                  <Protected isVerified={isStaff} redirect="/dashboard">
                    <Stafflayout />
                  </Protected>
                </Protected>
              }
            >
              <Route index element={<StaffDashboard />} />
              <Route path="home" element={<StaffDashboard />} />
              <Route path="businesses" element={<Outlet />}>
                <Route element={<StaffBusinesses />}>
                  <Route index element={<AllBusinessesSummary />} />
                  <Route path="all" element={<AllBusinessesSummary />} />
                  <Route path="awaiting-approval" element={<AwaitingBusinessesSummary />} />
                  <Route path="in-progress" element={<InProgressBusinessesSummary />} />
                  <Route path="completed" element={<CompletedBusinessesSummary />} />
                </Route>
                <Route path="registration" element={<Registrationlayout />}>
                  <Route index element={<All />} />
                  <Route path="all" element={<All />} />
                  <Route path="awaiting-approval" element={<Awaiting />} />
                  <Route path="in-progress" element={<InProgress />} />
                  <Route path="rejected" element={<Completed />} />
                  <Route path="pending" element={<Draft />} />
                  <Route path="paid-draft" element={<PaidDraft />} />
                </Route>
                <Route path="entities" element={<Outlet />}>
                  <Route index element={<StaffEntities />} />
                </Route>

                <Route path="countries" element={<Outlet />}>
                  <Route index element={<Countries />} />
                  <Route path=":ISO" element={<CountryDetailLayout />}>
                    <Route path="detail" element={<CountryDetails />} />
                    <Route path="entities" element={<CountryEntities />} />
                  </Route>
                </Route>

                <Route path="services" element={<Outlet />}>
                  <Route index element={<Services />} />
                  <Route path="all" element={<AllServices />} />
                  <Route path="chats" element={<ChatLayout />} />
                  <Route path=":complycode" element={<ServicesDetailLayout />}>
                    <Route index element={<ServiceInformation />} />
                    <Route path="info" element={<ServiceInformation />} />
                    <Route path="forminfo" element={<FormInformation />} />
                    <Route path="documentinfo" element={<DocumentInfoDetails />} />
                  </Route>
                  <Route path="allcomply" element={<AllComplyLayout />}>
                    <Route path="all" element={<AllComply />} />
                  </Route>
                </Route>
              </Route>
              <Route path="business" element={<StaffBusinessDetailLayout />}>
                <Route path="detail" element={<BusinessDetail />} />
                <Route path="payment" element={<BusinessPaymet />} />
                <Route path="shareholders" element={<DetailShareholders />} />
                <Route path="directors" element={<DetailDirectors />} />
                <Route path="beneficiaries" element={<DetailBeneficiaries />} />
              </Route>
              <Route path="all-rewards" element={<Outlet />}>
                <Route index element={<StaffAllRewards />} />
                <Route path="reward" element={<StaffReward />}>
                  <Route path=":rewardID" element={<StaffRewardDetailsPage />} />
                  <Route path="analytics" element={<StaffRewardAnalyticsPage />} />
                </Route>
              </Route>
              <Route path="taxes" element={<StaffComingSoon />} />
              <Route path="hiring-and-payroll" element={<StaffComingSoon />} />
              <Route path="assets" element={<StaffComingSoon />} />
              <Route path="payments" element={<StaffComingSoon />} />
              <Route path="resources" element={<StaffComingSoon />} />
              <Route path="settings" element={<StaffSettingLayout />}>
                <Route path="general" element={<StaffGeneralSettings />} />
                <Route path="notification" element={<StaffNotificationSettings />} />
                <Route path="user-permissions" element={<StaffComingSoon />} />
                <Route path="team" element={<SidebriefTeam />} />
              </Route>
            </Route>

            {/* Services pages Routes */}
            <Route
              path="services"
              element={
                <Protected isVerified={isLoggedIn} redirect="/login">
                  <Outlet />
                </Protected>
              }
            >
              <Route index element={<ServiceInfo />} />
              <Route path="payment" element={<ServicePayment />} />
              <Route path="form" element={<ServiceForm />} />
              <Route path="documents" element={<ServiceDocuments />} />
              <Route path="review" element={<ServiceReview />}>
                <Route path="info" element={<ServiceInfoReview />} />
                <Route path="form" element={<ServiceFormReview />} />
                <Route path="documents" element={<ReviewDocuments />} />
              </Route>
              <Route path="success" element={<ServiceSuccessPage />} />
            </Route>

            {/* Launch pages routes */}
            <Route
              path="launch"
              element={
                <Protected isVerified={isLoggedIn} redirect="/login">
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
                  <Protected isVerified={launchCode} redirect="/launch">
                    <PaymentPage />
                  </Protected>
                }
              />
              <Route path="payment-confirmation" element={<StripePaymentSuccess />} />
              <Route path="address" element={<ProtectedBusinessAddress />} />
              <Route path="shareholders-info" element={<ProtectedShareholdersInfo />} />
              <Route path="directors-info" element={<ProtectedDirectorsInfo />} />
              <Route path="beneficiaries-info" element={<ProtectedBeneficiariesInfo />} />
              <Route path="beneficiaries-kyc" element={<ProtectedBeneficiariesKyc />} />
              <Route path="shareholders-kyc" element={<ProtectedShareholdersKyc />} />
              <Route path="directors-kyc" element={<ProtectedDirectorsKyc />} />

              <Route path="review" element={<ProtectedReview />}>
                <Route index element={<BusinessInformationReview />} />
                <Route path="business-info" element={<BusinessInformationReview />} />
                <Route path="shareholders" element={<ShareholderReview />} />
                <Route path="directors" element={<DirectorReview />} />
                <Route path="beneficiaries" element={<BeneficiaryReview />} />
              </Route>
              <Route path="success" element={<ProtectedApplicationSuccess />} />
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
