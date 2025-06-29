import loginService from "../../services/upstox/login";
import { routeInterface, RoutesInfoInterface } from "../../types/routeInterface";

const loginRoutes: RoutesInfoInterface = {
    name: "upstox login",
    routes: [
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
    ],
};

export default loginRoutes;
