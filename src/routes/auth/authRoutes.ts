import { authenticateToken } from "../../middlewares/authenticateToken";
import AuthService from "../../services/auth/auth";
import { routeInterface, RoutesInfoInterface } from "../../types/routeInterface";

const authRoutes: RoutesInfoInterface = {
    name: "authRoute",
    routes: [
        // {
        //     path: "/auth/register",
        //     method: "POST",
        //     handler: AuthService.register,
        // },
        {
            path: "/auth/login",
            method: "POST",
            handler: AuthService.login,
        },
        {
            path: "/auth/register",
            method: "POST",
            handler: AuthService.register,
        },
        {
            path: "/auth/me",
            method: "GET",
            handler: AuthService.getProfile,
            middlewares: [authenticateToken],
        },
        {
            path: "/auth/users",
            method: "GET",
            handler: AuthService.getAllUsers,
            middlewares: [authenticateToken],
        },
    ],
};

export default authRoutes;
