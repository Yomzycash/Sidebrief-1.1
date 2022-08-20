import { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));
const EmailSuccess = lazy(() =>
	import("pages/Auth/Registration/verification/EmailVerify/success")
);
const EmailVerify = lazy(() =>
	import("pages/Auth/Registration/verification/EmailVerify/verify")
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
		path: "/partner",
		exact: true,
		component: PartnerRegistration,
		protected: false,
	},
	{
		path: "/forgotpassword",
		exact: true,
		component: ForgotPassword,
		protected: false,
	},
];

export default routes;
