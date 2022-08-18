import { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Auth/Login"));
const Success = lazy(() => import("../pages/Auth/Registration/verification/success/success"));


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
    }
]

export default routes;