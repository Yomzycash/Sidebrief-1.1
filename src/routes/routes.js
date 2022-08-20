import { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));
const Success = lazy(() =>
	import("../pages/Auth/Registration/verification/success/success")
);
const EmailVerify = lazy(() =>
	import("../pages/Auth/Registration/verification/verify/verify")
);
const AccountType = lazy(() =>
	import("../pages/Auth/Registration/accountType/accountType")
);
const PartnerRegistration = lazy(() =>
	import("../pages/Auth/Registration/partnerRegistration")
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
		path: "/success",
		exact: true,
		component: Success,
		protected: false,
	},
	{
		path: "/e-verify",
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
