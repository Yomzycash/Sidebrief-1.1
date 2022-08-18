import { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Auth/Login"));


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
    }
]

export default routes;