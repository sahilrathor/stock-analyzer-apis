import AuthService from "../../services/auth/auth";
import { routeInterface } from "../../types/routeInterface";

const authRoutes: routeInterface[] = [
    // {
    //     path: "/auth/register",
    //     method: "POST",
    //     handler: AuthService.register,
    // },
    {
        path: "/auth/login",
        method: 'POST',
        handler: AuthService.login,
    },
    {
        path: "/auth/register",
        method: 'POST',
        handler: AuthService.register,
    },
    {
        path: "/auth/get-profile",
        method: "GET",
        handler: AuthService.getProfile,
    }
];

export default authRoutes;
