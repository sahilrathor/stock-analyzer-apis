import loginService from "../../services/upstox/login";
import { routeInterface } from "../../types/routeInterface";

const loginRoutes: routeInterface[] = [
    {
        path: "/upstox/login",
        method: "GET",
        handler: loginService.login,
    },
    {
        path: "/upstox/callback",
        method: "GET",
        handler: loginService.callback,
    },
];

export default loginRoutes;

