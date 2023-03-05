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
import ComingSoon from "pages/Dashboard/User/Settings/comingsoon";
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
import StaffRewardAnalyticsPage from "pages/Dashboard/staffDashboard/Reward/Analytics";
import StaffRewardDetailsPage from "pages/Dashboard/staffDashboard/Reward/Details";
import StaffAllRewards from "pages/Dashboard/staffDashboard/Reward/AllRewards";
import AllBusinessesSummary from "pages/Dashboard/staffDashboard/Businesses/All";
import InProgressBusinessesSummary from "pages/Dashboard/staffDashboard/Businesses/InProgress";
import AwaitingBusinessesSummary from "pages/Dashboard/staffDashboard/Businesses/Awaiting";
import CompletedBusinessesSummary from "pages/Dashboard/staffDashboard/Businesses/Completed";
import Draft from "pages/Dashboard/staffDashboard/Businesses/BusinessRegistration/Draft";
import StaffComingSoon from "pages/Dashboard/staffDashboard/comingSoonPage";
import { checkStaffEmail } from "utils/globalFunctions";
import BankAccountDetails from "pages/Dashboard/User/BankAccount/BankAccountDetails";
import { useViewPayLaunchMutation } from "services/launchService";
import PaidDraft from "pages/Dashboard/staffDashboard/Businesses/BusinessRegistration/PaidDraft";
import ServiceDownload from "pages/Dashboard/User/Manage/Download";
import StripePaymentSuccess from "pages/Launch/StripePaymentSuccess/StripePaymentSuccess";

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
const Manage = lazy(() => import("pages/Dashboard/User/Manage"));
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
const StaffBusinessDetailLayout = lazy(() =>
	import(
		"pages/Dashboard/staffDashboard/Businesses/BusinessRegistration/Detail/layout"
	)
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
const UserSettingsLayout = lazy(() =>
	import("pages/Dashboard/User/Settings/layout")
);
const PersonalSettings = lazy(() =>
	import("pages/Dashboard/User/Settings/personal")
);
const PaymentSetting = lazy(() =>
	import("pages/Dashboard/User/Settings/payment")
);
const Stafflayout = lazy(() => import("pages/Dashboard/staffDashboard/layout"));
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

const SidebriefTeam = lazy(() =>
	import("pages/Dashboard/staffDashboard/Settings/team")
);

const Services = lazy(() =>
	import("pages/Dashboard/staffDashboard/Businesses/Services/Service")
);
const AllServices = lazy(() =>
	import("pages/Dashboard/staffDashboard/Businesses/Services/AllServices")
);
const ChatLayout = lazy(() =>
	import("pages/Dashboard/staffDashboard/Businesses/Services/Chat")
);

const AppRouter = () => {
	const userData = useSelector((store) => store.UserDataReducer);
	const { launchResponse, launchPaid } = useSelector(
		(store) => store.LaunchReducer
	);

	// Get user information from local storage
	const userInfo = JSON.parse(localStorage.getItem("userInfo"));
	let token = userInfo?.token;
	let user_token = userInfo?.user_token;
	let userEmail = localStorage.getItem("userEmail");
	const loggedIn = token?.length > 0 || user_token > 0;

	//

	// Get launch information from local storage
	const launchInfo = JSON.parse(localStorage.getItem("launchInfo"));
	const entityLaunchCode = launchInfo?.launchCode;
	const selectedCountryISO = localStorage.getItem("countryISO");
	const paymentDetails = JSON.parse(localStorage.getItem("paymentDetails"));
	let paidStatus =
		paymentDetails?.paymentStatus === "successful" ? true : false;

	//

	const [isLoggedIn, setisLoggedIn] = useState(
		token?.length > 0 || user_token > 0
	);
	const [launchCode, setLaunchCode] = useState(entityLaunchCode);
	const [countryISO, setCountryISO] = useState(selectedCountryISO);
	const [paid, setPaid] = useState(paidStatus);
	const [staff, setStaff] = useState(
		userEmail?.includes("@sidebrief.com") ? true : false
	);

	const allowLaunch = launchCode && countryISO;

	//

	useEffect(() => {
		setisLoggedIn(loggedIn);
		let staffEmail = checkStaffEmail(userEmail);
		setStaff(staffEmail);
	}, [loggedIn, userData.refreshApp, userData.userInfo]);

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
						<Route path="register" element={<Outlet />}>
							<Route index element={<UserRegistration />} />
							{/* <Route path="user" element={<Outlet />}> */}
							{/* <Route index element={<UserRegistration />} /> */}
							<Route path="success" element={<EmailSuccess />} />
							{/* </Route> */}
							<Route
								path="reseller"
								element={<ResellerRegistration />}
							/>
							<Route
								path="partner"
								element={<PartnerRegistration />}
							/>
						</Route>

						<Route path="login" element={<Outlet />}>
							<Route index element={<SignIn />} />
							<Route
								path="verifyaccount"
								element={<EmailVerify />}
							/>

							<Route path="forgotpassword" element={<Outlet />}>
								<Route index element={<ForgotPassword />} />
								<Route path="verifyotp" element={<Outlet />}>
									<Route index element={<ResetVerify />} />
									<Route
										path="resetpassword"
										element={<Outlet />}
									>
										<Route
											index
											element={<ResetPassword />}
										/>
										<Route
											path="success"
											element={<ResetSuccess />}
										/>
									</Route>
								</Route>
							</Route>
						</Route>

						{/* User dashboard routes */}
						<Route
							path="dashboard"
							element={
								<Protected isVerified={isLoggedIn}>
									<Protected
										isVerified={!staff}
										path="/staff-dashboard"
									>
										<UserDashboard />
									</Protected>
								</Protected>
							}
						>
							<Route index element={<BusinessRegistration />} />
							<Route
								path="business-registration"
								element={<BusinessRegistration />}
							/>
							<Route
								path="application"
								element={<Application />}
							></Route>
							<Route path="bank-account" element={<Outlet />}>
								<Route index element={<BankAccount />} />
								<Route
									path=":bankCode"
									element={<BankAccountDetails />}
								/>
							</Route>
							<Route
								path="business-registration"
								element={<BusinessRegistration />}
							/>
							<Route
								path="settings"
								element={<UserSettingsLayout />}
							>
								<Route index element={<PersonalSettings />} />
								<Route
									path="personal"
									element={<PersonalSettings />}
								/>
								<Route
									path="payment"
									element={<PaymentSetting />}
								/>
							</Route>
							<Route
								path="resources"
								element={<Resources />}
							></Route>
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
								<Route path="chats" element={<ChatLayout />} />
							</Route>
							<Route
								path="business"
								element={<BusinessDetailLayout />}
							>
								<Route
									path="detail"
									element={<BusinessDetail />}
								/>
								<Route
									path="shareholders"
									element={<DetailShareholders />}
								/>
								<Route
									path="directors"
									element={<DetailDirectors />}
								/>
								<Route
									path="beneficiaries"
									element={<DetailBeneficiaries />}
								/>
							</Route>
							<Route
								path="compliance"
								element={<Compliance />}
							></Route>
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
								<Route
									path="all-rewards"
									element={<AllRewards />}
								></Route>
								<Route
									path="my-rewards"
									element={<MyRewards />}
								></Route>
								<Route
									path="details"
									element={<RewardDetails />}
								/>
								<Route
									path=":rewardID"
									element={<RewardDetails />}
								/>
							</Route>

							<Route
								path="reward-details"
								element={<RewardDetails />}
							/>
						</Route>

						{/* Staff dashboard routes */}
						<Route
							path="staff-dashboard"
							element={
								<Protected isVerified={isLoggedIn}>
									<Protected
										isVerified={staff}
										path="/dashboard"
									>
										<Stafflayout />
									</Protected>
								</Protected>
							}
						>
							<Route index element={<StaffDashboard />} />
							<Route path="home" element={<StaffDashboard />} />
							<Route path="businesses" element={<Outlet />}>
								<Route element={<StaffBusinesses />}>
									<Route
										index
										element={<AllBusinessesSummary />}
									/>
									<Route
										path="all"
										element={<AllBusinessesSummary />}
									/>
									<Route
										path="awaiting-approval"
										element={<AwaitingBusinessesSummary />}
									/>
									<Route
										path="in-progress"
										element={
											<InProgressBusinessesSummary />
										}
									/>
									<Route
										path="completed"
										element={<CompletedBusinessesSummary />}
									/>
								</Route>
								<Route
									path="registration"
									element={<Registrationlayout />}
								>
									<Route index element={<All />} />
									<Route path="all" element={<All />} />
									<Route
										path="awaiting-approval"
										element={<Awaiting />}
									/>
									<Route
										path="in-progress"
										element={<InProgress />}
									/>
									<Route
										path="rejected"
										element={<Completed />}
									/>
									<Route path="pending" element={<Draft />} />
									<Route
										path="paid-draft"
										element={<PaidDraft />}
									/>
								</Route>
								<Route path="entities" element={<Outlet />}>
									<Route index element={<StaffEntities />} />
								</Route>

								<Route path="countries" element={<Outlet />}>
									<Route index element={<Countries />} />
									<Route
										path=":ISO"
										element={<CountryDetailLayout />}
									>
										<Route
											path="detail"
											element={<CountryDetails />}
										/>
										<Route
											path="entities"
											element={<CountryEntities />}
										/>
									</Route>
								</Route>

								<Route path="services" element={<Outlet />}>
									<Route index element={<Services />} />
									<Route
										path="all"
										element={<AllServices />}
									/>
									<Route
										path="chats"
										element={<ChatLayout />}
									/>
								</Route>
							</Route>
							<Route
								path="business"
								element={<StaffBusinessDetailLayout />}
							>
								<Route
									path="detail"
									element={<BusinessDetail />}
								/>
								<Route
									path="shareholders"
									element={<DetailShareholders />}
								/>
								<Route
									path="directors"
									element={<DetailDirectors />}
								/>
								<Route
									path="beneficiaries"
									element={<DetailBeneficiaries />}
								/>
							</Route>
							<Route path="all-rewards" element={<Outlet />}>
								<Route index element={<StaffAllRewards />} />
								<Route path="reward" element={<StaffReward />}>
									<Route
										path=":rewardID"
										element={<StaffRewardDetailsPage />}
									/>
									<Route
										path="analytics"
										element={<StaffRewardAnalyticsPage />}
									/>
								</Route>
							</Route>
							<Route path="taxes" element={<StaffComingSoon />} />
							<Route
								path="hiring-and-payroll"
								element={<StaffComingSoon />}
							/>
							<Route
								path="assets"
								element={<StaffComingSoon />}
							/>
							<Route
								path="payments"
								element={<StaffComingSoon />}
							/>
							<Route
								path="resources"
								element={<StaffComingSoon />}
							/>
							<Route
								path="settings"
								element={<StaffSettingLayout />}
							>
								<Route
									path="general"
									element={<StaffGeneralSettings />}
								/>
								<Route
									path="notification"
									element={<StaffNotificationSettings />}
								/>
								<Route
									path="user-permissions"
									element={<StaffComingSoon />}
								/>
								<Route
									path="team"
									element={<SidebriefTeam />}
								/>
							</Route>
						</Route>
					</Route>

					{/* <Route path="dashboard-staff" element={<StaffDashboard />}></Route> */}
					<Route path="manage" element={<Manage />} />
					<Route
						path="download-manage"
						element={<ServiceDownload />}
					/>

					{/* Launch pages routes */}
					<Route
						path="launch"
						element={
							<Protected isVerified={isLoggedIn}>
								<Outlet />
							</Protected>
						}
					>
						<Route index element={<BusinessInfo />} />
						<Route
							path="business-info"
							element={<BusinessInfo />}
						/>
						<Route path="entity" element={<EntitySelect />} />
						<Route
							path="payment"
							element={
								<Protected
									isVerified={launchCode}
									path="/launch"
								>
									<PaymentPage />
								</Protected>
							}
						/>
						<Route
							path="payment-confirmation"
							element={<StripePaymentSuccess />}
						/>
						<Route
							path="address"
							element={
								<Protected
									isVerified={allowLaunch}
									path="/launch"
								>
									<Protected
										isVerified={paid}
										path="/launch/payment"
									>
										<BusinessAddress />
									</Protected>
								</Protected>
							}
						/>
						<Route
							path="shareholders-info"
							element={
								<Protected
									isVerified={allowLaunch}
									path="/launch"
								>
									<Protected
										isVerified={paid}
										path="/launch/payment"
									>
										<ShareHoldersInfo />
									</Protected>
								</Protected>
							}
						/>
						<Route
							path="directors-info"
							element={
								<Protected
									isVerified={allowLaunch}
									path="/launch"
								>
									<Protected
										isVerified={paid}
										path="/launch/payment"
									>
										<DirectorsInfo />
									</Protected>
								</Protected>
							}
						/>
						<Route
							path="beneficiaries-info"
							element={
								<Protected
									isVerified={allowLaunch}
									path="/launch"
								>
									<Protected
										isVerified={paid}
										path="/launch/payment"
									>
										<BeneficiariesInfo />
									</Protected>
								</Protected>
							}
						/>
						<Route
							path="beneficiaries-kyc"
							element={
								<Protected
									isVerified={allowLaunch}
									path="/launch"
								>
									<Protected
										isVerified={paid}
										path="/launch/payment"
									>
										<BeneficiariesKYC />
									</Protected>
								</Protected>
							}
						/>
						<Route
							path="shareholders-kyc"
							element={
								<Protected
									isVerified={allowLaunch}
									path="/launch"
								>
									<Protected
										isVerified={paid}
										path="/launch/payment"
									>
										<ShareHolderKYC />
									</Protected>
								</Protected>
							}
						/>
						<Route
							path="directors-kyc"
							element={
								<Protected
									isVerified={allowLaunch}
									path="/launch"
								>
									<Protected
										isVerified={paid}
										path="/launch/payment"
									>
										<DirectorKYC />
									</Protected>
								</Protected>
							}
						/>

						<Route
							path="review-beneficiaries"
							element={
								<Protected
									isVerified={allowLaunch}
									path="/launch"
								>
									<Protected
										isVerified={paid}
										path="/launch/payment"
									>
										<BeneficiaryReview />
									</Protected>
								</Protected>
							}
						/>
						<Route
							path="review"
							element={
								<Protected
									isVerified={allowLaunch}
									path="/launch"
								>
									<Protected
										isVerified={paid}
										path="/launch/payment"
									>
										<BusinessInformationReview />
									</Protected>
								</Protected>
							}
						/>
						<Route
							path="review-directors"
							element={
								<Protected
									isVerified={allowLaunch}
									path="/launch"
								>
									<Protected
										isVerified={paid}
										path="/launch/payment"
									>
										<DirectorReview />
									</Protected>
								</Protected>
							}
						/>
						<Route
							path="review-shareholders"
							element={
								<Protected
									isVerified={allowLaunch}
									path="/launch"
								>
									<Protected
										isVerified={paid}
										path="/launch/payment"
									>
										<ShareholderReview />
									</Protected>
								</Protected>
							}
						/>
						<Route
							path="success"
							element={
								<Protected
									isVerified={allowLaunch}
									path="/launch"
								>
									<Protected
										isVerified={paid}
										path="/launch/payment"
									>
										<ApplicationSuccessPage />
									</Protected>
								</Protected>
							}
						/>
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
