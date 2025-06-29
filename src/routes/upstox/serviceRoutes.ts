import upstoxService from "../../services/upstox/upstoxServices";
import { routeInterface, RoutesInfoInterface } from "../../types/routeInterface";

const serviceRoutes: RoutesInfoInterface = {
    name: "Upstox services",
    routes: [
        {
            path: "/upstox/profile",
            method: "GET",
            handler: upstoxService.getProfile,
        },
        {
            path: "/upstox/holdings",
            method: "GET",
            handler: upstoxService.getHoldings,
        },
        {
            path: "/upstox/nse-quote/:symbol",
            method: "GET",
            handler: upstoxService.getNSEQuote,
        },
        {
            path: "/upstox/ohlc/:instrumentToken",
            method: "GET",
            handler: upstoxService.getOHLC,
        },
    ],
};

export default serviceRoutes;
