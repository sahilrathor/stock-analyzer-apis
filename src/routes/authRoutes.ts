import AuthService from "../services/auth";
import { routeInterface } from "../types/routeInterface";

const authRoutes: routeInterface[] = [
    {
        path: "/auth/register",
        method: "POST",
        handler: AuthService.register,
    },
];

export default authRoutes;
